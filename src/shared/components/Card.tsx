import type {
  CSSProperties,
  HTMLAttributes,
  LiHTMLAttributes,
} from "react";
import { cx } from "@/shared/utils/cx";

type DivProps = HTMLAttributes<HTMLDivElement>;
type ArticleProps = HTMLAttributes<HTMLElement>;
type LiProps = LiHTMLAttributes<HTMLLIElement>;

interface CardOwnProps {
  as?: "div" | "article" | "li";
  padding?: "sm" | "md" | "lg";
}

type CardProps = CardOwnProps & DivProps & ArticleProps & LiProps;

const paddingValue: Record<NonNullable<CardOwnProps["padding"]>, string> = {
  sm: "12px",
  md: "16px",
  lg: "24px",
};

function buildStyle(padding: CardOwnProps["padding"], style?: CSSProperties): CSSProperties {
  return {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-lg)",
    padding: paddingValue[padding ?? "md"],
    ...style,
  };
}

export function Card(props: CardProps) {
  const {
    as = "div",
    padding = "md",
    className,
    style,
    children,
    ...rest
  } = props;

  if (as === "article") {
    const articleRest = rest as ArticleProps;
    return (
      <article
        className={cx(className)}
        style={buildStyle(padding, style)}
        {...articleRest}
      >
        {children}
      </article>
    );
  }
  if (as === "li") {
    const liRest = rest as LiProps;
    return (
      <li
        className={cx(className)}
        style={buildStyle(padding, style)}
        {...liRest}
      >
        {children}
      </li>
    );
  }
  const divRest = rest as DivProps;
  return (
    <div
      className={cx(className)}
      style={buildStyle(padding, style)}
      {...divRest}
    >
      {children}
    </div>
  );
}