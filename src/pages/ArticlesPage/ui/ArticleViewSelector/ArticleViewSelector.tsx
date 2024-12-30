import { FC, memo } from "react";
import { Button, Card, classNames, HStack, Icon } from "../../../../shared";
import cls from "./ArticleViewSelector.module.scss";
import { ReactComponent as ListIcon } from "../../../../shared/assets/icons/burger.svg";
import { ReactComponent as TableIcon } from "../../../../shared/assets/icons/tile.svg";
import { ArticleView } from "../../../../entities/Article";

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
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
      <Card
        className={classNames(cls.ArticleViewSelector, {}, [className])}
        border="round"
      >
        <HStack gap="8">
          {viewTypes.map((viewType) => (
            <Icon
              clickable
              key={viewType.view}
              onClick={onClick(viewType.view)}
              Svg={viewType.icon}
              className={classNames("", {
                [cls.notSelected]: viewType.view !== view,
              })}
            />
          ))}
        </HStack>
      </Card>
    );
  },
);
