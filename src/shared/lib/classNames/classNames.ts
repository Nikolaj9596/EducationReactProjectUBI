type Mods = Record<string, boolean | string>

export const classNames = (
  className: string, 
  mods: Mods = {}, 
  additiinal: string[] = []
): string => {
  return [
    className,
    ...additiinal.filter(Boolean),
    ...Object
      .entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className]) => className)
  ].join(' ');

}
