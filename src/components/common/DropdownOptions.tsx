import type { ReactNode } from "react";
import { useState } from "react";

type DropdownOptionsProps = {
  options: { label: string; onClick(): void }[];
  head: ReactNode;
};

export const DropdownOptions = ({ options, head }: DropdownOptionsProps) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button
      onBlur={() => setShowOptions(false)}
      onClick={() => setShowOptions(!showOptions)}
      className="relative"
    >
      {head}
      {showOptions && (
        <div className="border-primary-dark dark:border-primary bg-primary dark:bg-primary-dark absolute top-full right-2 z-10 mt-4 min-w-max rounded border-2 text-left">
          <ul className="space-y-3 p-3">
            {options.map(({ label, onClick }) => (
              <li key={label} onClick={onClick}>
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
};
