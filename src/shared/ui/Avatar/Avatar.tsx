import { CSSProperties, FC, useMemo } from "react";
import { classNames } from "../../lib/classNames/classNames";
import cls from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src?: string
  size?: number
  alt?: string
}

export const Avatar: FC<AvatarProps> = (props) => {
  const {
    className,
    src,
    size,
    alt
  } = props
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size
    }
  }, [size])
  return (
    <img
      src={src}
      alt={alt}
      className={classNames(cls.Avatar, {}, [className])}
      style={styles}
    />
  );
};
