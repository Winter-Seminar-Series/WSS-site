import { remark } from 'remark';
import html from 'remark-html';

export async function convertMarkdownToHTML(markdown: string) {
  return (await remark().use(html).process(markdown)).toString();
}
