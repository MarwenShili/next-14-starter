import React from "react";
import buttonStyle from "./button.module.scss";
import { Button } from "antd";
export default function CustomButton({
  children,
  href,
  className,
  variant,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: string;
}) {
  return (
    <Button
      className={`${buttonStyle.button} ${
        variant && buttonStyle[variant]
      } ${className}`}
      href={href}
    >
      {children}
    </Button>
  );
}
