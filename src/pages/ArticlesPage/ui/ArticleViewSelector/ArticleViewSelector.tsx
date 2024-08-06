import { FC, memo } from "react";
import { Button, classNames, Icon, ThemeButton } from "../../../../shared";
import cls from "./ArticleViewSelector.module.scss";
import { ReactComponent as ListIcon } from "../../../../shared/assets/icons/list-24-24.svg";
import { ReactComponent as TableIcon } from "../../../../shared/assets/icons/tiled-24-24.svg";
import { ArticleView } from "../../../../entities/Article";

interface ArticleViewSelectorProps {
  className?: string;
  view?: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.TABLE,
    icon: TableIcon,
  },
  {
    view: ArticleView.LIST,
    icon: ListIcon,
  },
];

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo(
  (props) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView);
    };

    return (
      <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
        {viewTypes.map((viewType) => (
          <Button theme={ThemeButton.CLEAR} onClick={onClick(viewType.view)}>
            <Icon
              Svg={viewType.icon}
              className={classNames("", {
                [cls.notSelected]: viewType.view !== view,
              })}
            />
          </Button>
        ))}
      </div>
    );
  },
);
