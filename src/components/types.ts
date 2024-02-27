type PartialColorType =
  | "inherit"
  | "current"
  | "transparent"
  | "black"
  | "white";
type ColorShadesType =
  | "25"
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";
type CustomColorType = "gray" | "primary" | "error" | "warning" | "success";

export type ColorType =
  | PartialColorType
  | `${CustomColorType}-${ColorShadesType}`;
export type ElementSizeType = "sm" | "base" | "lg" | "xl";
