"use client";

import { useState } from "react";

type ReferencesAccordionProps = {
  references: string[];
  accordionClassName: string;
  titleClassName: string;
  arrowClassName: string;
  listClassName: string;
};

export function ReferencesAccordion({
  references,
  accordionClassName,
  titleClassName,
  arrowClassName,
  listClassName,
}: ReferencesAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <details className={accordionClassName} open={isOpen}>
      <summary
        className={titleClassName}
        onClick={(event) => {
          event.preventDefault();
          setIsOpen((prev) => !prev);
        }}
      >
        <span>Список литературы</span>
        <img
          src="/icons/base_arrow_right.svg"
          alt=""
          aria-hidden="true"
          className={arrowClassName}
        />
      </summary>
      <ol className={listClassName}>
        {references.map((reference) => (
          <li key={reference}>{reference}</li>
        ))}
      </ol>
    </details>
  );
}
