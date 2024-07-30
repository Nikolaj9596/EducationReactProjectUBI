import {
  getAddCommentFormError,
  getAddCommentFormText,
} from "../../model/selectors/addCommentFormSelectors";
import {
  addCommentActions,
  addCommentReducer,
} from "../../model/slice/addCommentFormSlice";
import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";
import {
  classNames,
  Input,
  Button,
  ThemeButton,
  DynamicModuleLoader,
  ReducersList,
} from "../../../../shared";
import cls from "./AddCommentForm.module.scss";
import { sentComment } from "../../model/services/sentComment/sentComment";

interface AddCommentFormProps {
  className?: string;
}

const reducers: ReducersList = {
  addCommentForm: addCommentReducer,
};

const AddCommentForm: FC<AddCommentFormProps> = memo((props) => {
  const { className } = props;
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentActions.setText(value));
    },
    [dispatch],
  );

  const onSentComment = useCallback(() => {
    dispatch(sentComment());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          className={cls.input}
          placeholder={t("Введите тексе комментария")}
          value={text}
          onChange={onCommentTextChange}
        />
        <Button theme={ThemeButton.OUTLINE} onClick={onSentComment}>
          {t("Отправить")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
