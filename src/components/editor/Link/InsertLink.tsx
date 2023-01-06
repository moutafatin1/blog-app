import { useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { Button } from "../EditorButton";
import type { LinkOptions } from "./LinkForm";
import { LinkForm } from "./LinkForm";

type InsertLinkProps = {
  onSubmit: (link: LinkOptions) => void;
};

export const InsertLink = ({ onSubmit }: InsertLinkProps) => {
  const [visible, setVisible] = useState(false);
  const handleSubmit = (link: LinkOptions) => {
    if (!link.url.trim()) return setVisible(false);
    onSubmit(link);
    setVisible(false);
  };
  return (
    <div className="relative">
      <Button onClick={() => setVisible(!visible)}>
        <BsLink45Deg />
      </Button>
      <div className="absolute top-full z-50 mt-4">
        <LinkForm visible={visible} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
