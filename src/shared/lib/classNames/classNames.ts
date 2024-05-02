type Mods = Record<string, boolean | string>

export const classNames = (className: string, mods: Mods, additiinal: string[]): string => {
  return [
    className, 
    ...additiinal, 
    ...Object
      .entries(mods)
      .filter(([key, value]) => Boolean(value))
      .map(([className]) => className)
  ].join(' ');

}
