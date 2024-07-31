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

export interface AddCommentFormProps {
  className?: string;
  onSentComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentReducer,
};

const AddCommentForm: FC<AddCommentFormProps> = memo((props) => {
  const { className, onSentComment } = props;
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

  const onSentHendler = useCallback(() => {
    onSentComment(text || "");
    onCommentTextChange("");
  }, [onSentComment, text, onCommentTextChange]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          className={cls.input}
          placeholder={t("Введите тексе комментария")}
          value={text}
          onChange={onCommentTextChange}
        />
        <Button theme={ThemeButton.OUTLINE} onClick={onSentHendler}>
          {t("Отправить")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
