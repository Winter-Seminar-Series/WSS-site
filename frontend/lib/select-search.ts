export interface SelectOption {
  value: string;
  label: string;
  aliases?: readonly string[];
}

export function normalizeSelectSearch(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/['’ʼ.]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function searchTexts(option: SelectOption): string[] {
  const label = normalizeSelectSearch(option.label);
  const acronym = label
    .split(' ')
    .filter((word) => !['of', 'the', 'and'].includes(word))
    .map((word) => word[0])
    .join('');
  return [label, normalizeSelectSearch(option.value), acronym, ...(option.aliases ?? []).map(normalizeSelectSearch)];
}

export function findSelectOption(options: readonly SelectOption[], query: string): SelectOption | undefined {
  const search = normalizeSelectSearch(query);
  if (!search) return undefined;
  // Explicit names and aliases take priority over potentially ambiguous generated initials.
  return (
    options.find((option) =>
      [option.label, option.value, ...(option.aliases ?? [])].some((text) => normalizeSelectSearch(text) === search),
    ) ?? options.find((option) => searchTexts(option).includes(search))
  );
}

export function filterSelectOptions(options: readonly SelectOption[], query: string): SelectOption[] {
  const words = normalizeSelectSearch(query).split(' ').filter(Boolean);
  const matches = options.filter((option) => {
    if (/^others?$/.test(normalizeSelectSearch(option.label))) return true;
    const texts = searchTexts(option);
    return words.every((word) => texts.some((text) => text.includes(word)));
  });
  const exact = findSelectOption(options, query);
  return exact ? [exact, ...matches.filter((option) => option !== exact)] : matches;
}
