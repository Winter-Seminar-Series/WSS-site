"""
Rate limits for the endpoints worth attacking. The rates live in REST_FRAMEWORK['DEFAULT_THROTTLE_RATES'] and the
counters in Redis (settings.CACHES).

Views set `throttle_scope` and list the throttles they need:

- `ScopedRateThrottle` counts per client: the user when signed in, else the address resolved from X-Forwarded-For
  with NUM_PROXIES trusted hops.
- `EmailRateThrottle` counts per targeted account (`<scope>_email`), so spreading guesses for one account over many
  addresses is still capped, while a campus or mobile NAT sharing one address is not locked out by it.

Both fail open: if Redis is unreachable, requests go through (and a warning is logged) instead of failing sign-in.
"""

import hashlib
import logging

from rest_framework import throttling

logger = logging.getLogger(__name__)


class FailOpenMixin:
    def allow_request(self, request, view):
        try:
            return super().allow_request(request, view)
        except Exception:
            logger.warning('Rate limiting skipped: the throttle store is unavailable', exc_info=True)
            return True


class ScopedRateThrottle(FailOpenMixin, throttling.ScopedRateThrottle):
    pass


class EmailRateThrottle(FailOpenMixin, throttling.SimpleRateThrottle):
    def __init__(self):
        # The scope depends on the view, so the rate is resolved per request (as ScopedRateThrottle does).
        pass

    def allow_request(self, request, view):
        self.scope = f'{view.throttle_scope}_email'
        self.rate = self.get_rate()
        self.num_requests, self.duration = self.parse_rate(self.rate)
        return super().allow_request(request, view)

    def get_cache_key(self, request, view):
        email = request.data.get('email') if hasattr(request.data, 'get') else None
        if not isinstance(email, str) or not email.strip():
            return None
        # Hashed: no email addresses in the cache.
        ident = hashlib.sha256(email.strip().lower().encode()).hexdigest()
        return self.cache_format % {'scope': self.scope, 'ident': ident}
