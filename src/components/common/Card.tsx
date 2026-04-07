import type { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  padding?: "sm" | "md" | "lg";
  elevation?: "flat" | "soft" | "raised";
}

export default function Card({
  children,
  className = "",
  as = "div",
  padding = "md",
  elevation = "soft",
}: Readonly<CardProps>) {
  const Component = as;

  let paddingClass;
  if (padding === "sm") {
    paddingClass = styles.paddingSm;
  } else if (padding === "lg") {
    paddingClass = styles.paddingLg;
  } else {
    paddingClass = styles.paddingMd;
  }

  let elevationClass;
  if (elevation === "flat") {
    elevationClass = styles.elevationFlat;
  } else if (elevation === "raised") {
    elevationClass = styles.elevationRaised;
  } else {
    elevationClass = styles.elevationSoft;
  }

  return (
    <Component
      className={`${styles.card} ${paddingClass} ${elevationClass} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
