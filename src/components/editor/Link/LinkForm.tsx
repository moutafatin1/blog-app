import { useEffect, useState } from "react";

type LinkFormProps = {
  visible: boolean;
  initialState?: LinkOptions;
  onSubmit(link: LinkOptions): void;
  onRemove?(): void;
};

export type LinkOptions = { url: string; openInNewTab: boolean };
export const LinkForm = ({
  onSubmit,
  visible,
  initialState,
  onRemove,
}: LinkFormProps) => {
  const [link, setLink] = useState<LinkOptions>({
    url: "",
    openInNewTab: false,
  });
  const [openInNewTab, setOpenInNewTab] = useState(false);

  useEffect(() => {
    if (initialState) setLink(initialState);
  }, [initialState]);

  const handleSubmit = () => {
    if (!link.url.trim()) return;
    onSubmit(link);
    setLink({ url: "", openInNewTab: false });
  };
  if (!visible) return null;

  return (
    <div className="bg-primary dark:bg-primary-dark animate-reveal dark:shadow-secondary-dark z-50 rounded p-2 text-left shadow-md">
      <div className="flex items-center space-x-2">
        <input
          autoFocus
          type="text"
          className="focus:border-primary-dark dark:focus:border-primary dark:text-primary text-primary-dark rounded bg-transparent transition focus:ring-0"
          placeholder="https://example.com"
          value={link.url}
          onChange={({ target }) => setLink({ ...link, url: target.value })}
        />
      </div>

      <div className="text-secondary-dark dark:text-secondary-light mt-2 flex select-none items-center space-x-1 text-sm">
        <input
          type="checkbox"
          id="open-in-new-tab"
          checked={link.openInNewTab}
          onChange={({ target }) =>
            setLink({ ...link, openInNewTab: target.checked })
          }
          className="h-3 w-3 rounded-sm outline-none focus:ring-0"
        />
        <label htmlFor="checkbox">open in new tab</label>

        <div className="flex-1 text-right">
          <button
            onClick={handleSubmit}
            className="bg-action text-primary rounded px-2 py-1 text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
