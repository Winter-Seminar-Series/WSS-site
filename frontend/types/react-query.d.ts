import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      /** Opt one mutation out of the global error toast in `providers/DashboardProviders.tsx`. */
      skipErrorToast?: boolean;
    };
  }
}
