import React, { FC, Suspense } from "react";
import { classNames } from "../../../../shared/lib";
import { Loader, Modal } from "../../../../shared/ui";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import cls from "./LoginModal.module.scss";

interface LoginModalProps {
  className?: string;
  isOpen: boolean
  onClose: () => void
}

export const LoginModal: FC<LoginModalProps> = (props) => {
  return (
    <Modal
      className={classNames(cls.LoginModal, {}, [props.className ? props.className : ''])}
      isOpen={props.isOpen}
      onClose={props.onClose}
      lazy
    >
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={props.onClose}/>
      </Suspense>
    </Modal>
  );
};
