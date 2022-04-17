import ModalWindow from "../../components/modal/Modal";
import AvatarSettingsInfo from "./AvatarSettingsInfo";
import GeneralSettingsInfo from "./GeneralSettingsInfo";
import PasswordSettingsInfo from "./PasswordSettingsInfo";

export default function SettingsWindow() {
  return (
    <ModalWindow
      title="Настройки пользователя"
      pagesNames={["Общие", "Аватар", "Пароль"]}
    >
      <GeneralSettingsInfo />
      <AvatarSettingsInfo />
      <PasswordSettingsInfo />
    </ModalWindow>
  );
}
