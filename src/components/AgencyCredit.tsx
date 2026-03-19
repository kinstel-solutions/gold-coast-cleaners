import React from "react";

interface AgencyCreditProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> {
  className?: string;
}

export function AgencyCredit({ className = "", ...props }: AgencyCreditProps) {
  return (
    <a
      href="https://kinstel.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Designed and developed by Kinstel Solutions"
      title="Kinstel Solutions"
      className={`transition-colors ${className}`}
      {...props}>
      Designed & Developed by Kinstel Solutions
    </a>
  );
}
