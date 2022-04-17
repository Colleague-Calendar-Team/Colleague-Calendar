import ModalWindow from "../../components/modal/Modal";
import Login from "./Login";
import Registration from "./Registration";

const AuthWindow = () => {
  return (
    <ModalWindow
      pagesNames={["Вход", "Регистрация"]}
    >
      <Login />
      <Registration />
    </ModalWindow>
  );
}

export default AuthWindow;


