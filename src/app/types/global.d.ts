declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}
export {};

declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

export type CombinedState<T> = {
  [K in keyof T]: T[K];
};

export type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export type MountedRecord = OptionalRecord<StateSchemeKey, boolean>;


