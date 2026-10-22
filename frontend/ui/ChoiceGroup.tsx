interface Props {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
  defaultValue?: string;
}

export function ChoiceGroup({ legend, name, options, defaultValue }: Props) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-medium tracking-wide text-muted uppercase">{legend}</legend>
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        {options.map((option) => (
          <label key={option.value} className="flex min-h-11 items-center gap-2 text-lg font-semibold text-ink">
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={defaultValue === option.value}
              className="size-4 accent-brand"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
