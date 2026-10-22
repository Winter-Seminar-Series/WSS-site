interface Props {
  /** Sanitized HTML from `lib/markdown.ts`. */
  html: string;
  className?: string;
}

export function RichText({ html, className = '' }: Props) {
  if (!html) return null;
  return (
    <div
      className={`prose max-w-none prose-neutral prose-a:text-brand prose-a:underline-offset-2 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
