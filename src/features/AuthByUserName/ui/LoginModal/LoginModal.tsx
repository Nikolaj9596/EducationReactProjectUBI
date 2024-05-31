import React, { FC } from "react";
import { classNames } from "../../../../shared/lib";
import { Modal } from "../../../../shared/ui";
import { LoginForm } from "../LoginForm/LoginForm";
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
    >
      <LoginForm />
    </Modal>
  );
};
