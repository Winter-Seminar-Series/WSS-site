import { remark } from 'remark';
import html from 'remark-html';

// remark-html sanitizes by default, so the result is safe for dangerouslySetInnerHTML.
const processor = remark().use(html);

export async function markdownToHtml(markdown: string): Promise<string> {
  if (!markdown.trim()) return '';
  return String(await processor.process(markdown));
}
