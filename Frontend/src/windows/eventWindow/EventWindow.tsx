import { useState, useEffect } from "react";
import ModalWindow from "../../components/modal/Modal";
import GeneralEventInfo from "./GeneralEventInfo";
import MembersEventInfo from "./MembersEvenInfo";
import NotificationsEventInfo from "./NotificationsEventInfo";
import { EventInit, EventState } from "../../types/event";
import { getHourById } from "../../utils/getWeek";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { DEBUG_RENDER } from "../../utils/debug";

const EventWindow = () => {
  const { selectModalWindow, selectModalPage } = useActions();
  const { selectedEvent, selectedHour, selectedWeek } = useTypedSelector(
    (state) => state.selectElements
  );

  const [event, setEvent] = useState<EventState>(EventInit({}));

  if (DEBUG_RENDER) {
    console.log("render event window:");
  }

  useEffect(() => {
    if (selectedHour === -1) {
      setEvent(selectedEvent);
    } else {
      setEvent(EventInit({
        beginTime: getHourById(selectedHour, selectedWeek[0]).format("YYYY-MM-DDTHH:mm"),
        endTime: getHourById(selectedHour + 1, selectedWeek[0]).format("YYYY-MM-DDTHH:mm"),
      }))
    }
  }, []);

  return (
    <ModalWindow
      title={selectedHour === -1 ? "Редактирование мероприятия" : "Создание мероприятия"}
      pagesNames={["Общее", "Участники", "Уведомления"]}
    >
      <GeneralEventInfo isCreate={selectedHour === -1 ? false : true} event={event} setEvent={setEvent} selectModalPage={selectModalPage}/>
      <MembersEventInfo />
      <NotificationsEventInfo />
    </ModalWindow>
  );
}

export default EventWindow;


