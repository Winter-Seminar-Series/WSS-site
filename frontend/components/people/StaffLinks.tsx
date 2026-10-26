import { Github, Globe, Linkedin, Mail } from 'lucide-react';
import type { ReactNode } from 'react';

import type { StaffLinks as Links } from '@/types/event.type';

/** Only web links are rendered as such; anything else (e.g. `javascript:`) is dropped. */
function safeHttpUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const { protocol } = new URL(value);
    return protocol === 'https:' || protocol === 'http:' ? value : null;
  } catch {
    return null;
  }
}

const iconClass = 'size-5';

interface Props {
  name: string;
  links: Links;
}

export function StaffLinks({ name, links }: Props) {
  const items: { label: string; href: string; icon: ReactNode; external: boolean }[] = [];
  const website = safeHttpUrl(links.website);
  const linkedin = safeHttpUrl(links.linkedin);
  const github = safeHttpUrl(links.github);
  if (website)
    items.push({ label: 'Website', href: website, icon: <Globe className={iconClass} aria-hidden />, external: true });
  if (linkedin)
    items.push({
      label: 'LinkedIn',
      href: linkedin,
      icon: <Linkedin className={iconClass} aria-hidden />,
      external: true,
    });
  if (github)
    items.push({ label: 'GitHub', href: github, icon: <Github className={iconClass} aria-hidden />, external: true });
  if (links.email)
    items.push({
      label: 'Email',
      href: `mailto:${links.email}`,
      icon: <Mail className={iconClass} aria-hidden />,
      external: false,
    });
  if (items.length === 0) return null;

  return (
    <ul className="mt-3 flex items-center justify-center gap-3">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            aria-label={`${name}'s ${item.label}`}
            title={item.label}
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-muted transition-colors hover:text-brand focus-visible:text-brand"
          >
            {item.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
