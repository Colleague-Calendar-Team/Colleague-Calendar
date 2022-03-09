import ModalWindow from "../components/modal/Modal";
import GeneralEventInfo from "./GeneralEventInfo";

const MembersEventInfo = () => {
  return <div>Участники</div>;
};

const NotificationsEventInfo = () => {
  return <div>Уведомления</div>;
};

export default function EventWindow() {
  return (
    <ModalWindow
      title="Создание мероприятия"
      pagesNames={["Общее", "Участники", "Уведомления"]}
    >
      <GeneralEventInfo />
      <MembersEventInfo />
      <NotificationsEventInfo />
    </ModalWindow>
  );
}
