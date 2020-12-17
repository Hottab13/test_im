import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";
import { actions, editUser } from "../../redux/AuthReducer";
import { createField, InputControl } from "../common/FormControl/FormControl";
import {
  matchPass,
  maxLengthCreator,
  requiredField,
} from "../utils/validators";
import { AppStateType } from "../../redux/ReduxStore";
import { Container, Row, Col } from "react-grid-system";
import cnu from "./EditUser.module.css";
import menuIcon from "../../assets/icon/Menu.svg";
import menuLogo from "../../assets/icon/menuLogo.svg";
import menuNameLogo from "../../assets/icon/menuNameLogo.svg";
import ProcessListsIkon from "../../assets/icon/ProcessListsIkon.svg";
import UserNames from "../../assets/icon/UserNames.svg";
import errorIcon from "../../assets/icon/error.svg";
import cl from "../Login/Login.module.css";

type UserEditFormOwnProps = {};
const maxLenght = maxLengthCreator(30);
const UserEditForm: React.FC<
  InjectedFormProps<UserEditFormValueType, UserEditFormOwnProps> &
    UserEditFormOwnProps
> = ({ handleSubmit, error, ...props }) => {
  const userName = useSelector((state: AppStateType) => state.auth);
  const [editModeButton, setEditModeButton] = useState(false);
  const dispatch = useDispatch();
  const deactivEditModeButton = () => {
    setEditModeButton(false);
  };
  if (userName.renewalEditUser) {
    setEditModeButton(true);
    setTimeout(deactivEditModeButton, 3000);
    dispatch(actions.setRenewalEditUser(false));
  }
  const [checkModeButton, setCheckModeButton] = useState(true);
  //@ts-ignore
  const soldCheckbox = ({ target: { checked } }) => {
    setCheckModeButton(checked);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Row style={{ height: "80px", marginLeft: "7px", marginRight: "7px" }}>
        <Col md={6}>
          <div className={cnu.name}>
            {userName.firstName} {userName.secondName}. Редактирование
          </div>
        </Col>
        <Col md={2} offset={{ md: 4 }}>
          <button disabled={!props.valid} className={cnu.button}>
            {editModeButton ? "Сохранено" : "Сохранить"}
          </button>
        </Col>
      </Row>
      <Row
        className={cnu.editForm}
        style={{ marginLeft: "22px", marginRight: "22px" }}
      >
        <Col md={7}>
          <Row align="end" style={{ height: "60px" }}>
            <Col md={3}>
              <div>Имя</div>
            </Col>
            <Col>
              {createField<LoginFormValueTypeKey>(
                userName.secondName,
                "firstName",
                [requiredField, maxLenght],
                InputControl
              )}
            </Col>
          </Row>
          <Row align="end" style={{ height: "50px" }}>
            <Col md={3}>
              <div>Фамилия</div>
            </Col>
            <Col>
              {createField<LoginFormValueTypeKey>(
                userName.firstName,
                "secondName",
                [requiredField, maxLenght],
                InputControl
              )}
            </Col>
          </Row>
          <Row align="end" style={{ height: "50px" }}>
            <Col md={3}>
              <div>Электронная почта</div>
            </Col>
            <Col>
              {createField<LoginFormValueTypeKey>(
                userName.email,
                "email",
                [requiredField, maxLenght],
                InputControl
              )}
            </Col>
          </Row>
          <Row align="end" style={{ height: "50px" }}>
            <Col md={3}>
              <div>Новый пароль</div>
            </Col>
            <Col>
              {createField<LoginFormValueTypeKey>(
                "Не задано",
                "pass",
                [requiredField, maxLenght],
                InputControl,
                checkModeButton
                  ? { type: "password", checkModeButton, soldCheckbox }
                  : { checkModeButton, soldCheckbox }
              )}
            </Col>
          </Row>
          <Row align="end" style={{ height: "50px" }}>
            <Col md={3}>
              <div>Повторить пароль</div>
            </Col>
            <Col>
              {createField<LoginFormValueTypeKey>(
                "Не задано ",
                "confirmPassword",
                [requiredField, matchPass],
                InputControl,
                checkModeButton
                  ? { type: "password", checkModeButton, soldCheckbox }
                  : { checkModeButton, soldCheckbox }
              )}
            </Col>
          </Row>
        </Col>
        <Col>
          <Row align="center">
            {error && (
              <div className={cl.error}>
                <img
                  src={errorIcon}
                  style={{
                    paddingLeft: "48px",
                    top: "50%",
                    transform: "translate(0,50%)",
                  }}
                />
                <div className={cl.errorText}>{error}</div>
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </form>
  );
};
const EditUserReduxForm = reduxForm<
  UserEditFormValueType,
  UserEditFormOwnProps
>({ form: "useredit" })(UserEditForm);
type UserEditFormValueType = {
  firstName: string;
  secondName: string;
  email: string;
  pass: string;
  confirmPassword: string | undefined;
};
type LoginFormValueTypeKey = Extract<keyof UserEditFormValueType, string>;

export const EditUser: React.FC = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const activEditMode = () => {
    setEditMode(true);
  };
  const deactivEditMode = () => {
    setEditMode(false);
  };
  const onSubmit = (value: UserEditFormValueType) => {
    dispatch(
      editUser(value.firstName, value.secondName, value.email, value.pass)
    );
  };
  if (!isAuth) {
    return <Redirect to={"/login"} />;
  }
  return (
    <Container fluid className={cnu.wrapper}>
      {editMode && (
        <Row className={cnu.menu}>
          <Col md={2} className={cnu.menuMod}>
            <Row
              align="center"
              style={{ height: "60px", background: "#535374" }}
              onClick={deactivEditMode}
            >
              <Col md={1} offset={{ md: 1 }}>
                <img src={menuLogo} />
              </Col>
              <Col>
                <img src={menuNameLogo} />
              </Col>
            </Row>
            <Row
              align="end"
              style={{ height: "42px", background: "#404064" }}
              onClick={deactivEditMode}
            >
              <Col md={1} offset={{ md: 1 }}>
                <img src={UserNames} style={{}} />
              </Col>
              <Col>
                <Link
                  to={`/edituser`}
                  className={cnu.menuModText}
                  style={{ textDecoration: "none" }}
                >
                  Username
                </Link>
              </Col>
            </Row>
            <Row
              align="end"
              style={{ height: "60px", background: "#404064" }}
              onClick={deactivEditMode}
            >
              <Col md={1} offset={{ md: 1 }}>
                <img src={ProcessListsIkon} style={{}} />
              </Col>
              <Col>
                <Link
                  to={`/processlist`}
                  className={cnu.menuModText}
                  style={{ textDecoration: "none" }}
                >
                  Список процессов
                </Link>
              </Col>
            </Row>
            <Row
              style={{ background: "#404064", height: "1064px" }}
              onClick={deactivEditMode}
            ></Row>
          </Col>
          <Col className={cnu.menuModMask} onClick={deactivEditMode}></Col>
        </Row>
      )}
      {!editMode && (
        <Row className={cnu.menu}>
          <div style={{ width: "224px" }}>
            <Col onClick={activEditMode}>
              <Row align="center" style={{ height: "60px" }}>
                <Col md={1} offset={{ md: 1 }}>
                  <img onClick={activEditMode} src={menuIcon} style={{}} />
                </Col>
                <Col>
                  <p onClick={activEditMode} className={cnu.menuText}>
                    Меню
                  </p>
                </Col>
              </Row>
            </Col>
          </div>
        </Row>
      )}
      <EditUserReduxForm onSubmit={onSubmit} />
    </Container>
  );
};
