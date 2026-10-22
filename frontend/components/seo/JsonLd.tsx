interface Props {
  data: object | object[];
}

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // Escaping `<` keeps API-provided strings from closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
