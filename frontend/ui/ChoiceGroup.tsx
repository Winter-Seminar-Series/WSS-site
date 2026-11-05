interface Props {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
  defaultValue?: string;
}

/** Radio buttons drawn as chips: one tap target per option, wide enough for a thumb. */
export function ChoiceGroup({ legend, name, options, defaultValue }: Props) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-semibold text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-4 text-[0.9375rem] font-medium text-ink transition-colors hover:border-brand-muted has-checked:border-brand has-checked:bg-brand-soft has-checked:text-brand-strong has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={defaultValue === option.value}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
