import ModalWindow from "../../components/modal/Modal";
import GeneralEventInfo from "./GeneralEventInfo";
import MembersEventInfo from "./MembersEvenInfo";
import NotificationsEventInfo from "./NotificationsEventInfo";

const EventWindow = () => {
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

export default EventWindow;


