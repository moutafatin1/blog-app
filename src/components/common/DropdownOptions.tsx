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
      className="relative "
    >
      {head}
      {showOptions && (
        <div className=" absolute  top-full right-2 z-50 mt-4 min-w-max rounded-lg  bg-indigo-400 text-left">
          <ul className="space-y-4 p-3">
            {options.map(({ label, onClick }) => (
              <li
                key={label}
                onClick={onClick}
                className="font-medium text-white transition hover:opacity-75"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
};
