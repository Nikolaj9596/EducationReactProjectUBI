export type Mods = Record<string, boolean | string | undefined>

export const classNames = (
  className: string, 
  mods: Mods = {}, 
  additiinal: Array<string | undefined> = []
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
