import { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import ModalWindow from "../../components/modal/Modal";
import GeneralEventInfo from "./GeneralEventInfo";
import MembersEventInfo from "./MembersEvenInfo";
import {NotificationsEventInfo} from "./NotificationsEventInfo";
import { EventInit } from "../../types/event/eventInit";
import { EventCreationState } from "../../types/event/event";
import { getHourById } from "../../utils/getWeek";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { DEBUG_RENDER, DEBUG_REQUESTS } from "../../utils/debug";
import { UserProfileState } from "../../types/user";
import { NotificationsInit, NotificationsState } from "../../types/event/notifications";
import { EventUpdateInit, EventUpdateState } from "../../types/event/eventGeneral";
import { getProfilesOfEventParticipants } from "../../store/action-creators/event";

const EventWindow = () => {
  const { selectModalWindow, selectModalPage, addEvent } = useActions();
  const { selectedEvent, selectedHour, selectedWeek, modalWindow } = useTypedSelector(
    (state) => state.selectElements
  );
  const {token} = useTypedSelector(state=>state.auth.login);
  const navigate = useNavigate();
  const {name} = useTypedSelector(state=>state.user);

  const [event, setEvent] = useState<EventUpdateState>(EventUpdateInit({}));
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [users, setUsers] = useState<UserProfileState[]>([]);
  const [notifications, setNotifications] = useState<NotificationsState>(NotificationsInit);
  const {eventID} = useParams();

  if (DEBUG_RENDER) {
    console.log("render event window:");
  }

  function onCreate() {
    navigate('/');
    
    addEvent(token === null ? '' : token, Object.assign(event, notifications, {
      participiants: Array.from(checked),
    }), name);
  }

  useEffect(() => {
    if (selectedHour === -1) {
      setEvent(selectedEvent);
      setNotifications(selectedEvent);
    } else {
      setEvent(EventUpdateInit({
        beginTime: getHourById(selectedHour, selectedWeek[0]).format("YYYY-MM-DDTHH:mm"),
        endTime: getHourById(selectedHour + 1, selectedWeek[0]).format("YYYY-MM-DDTHH:mm"),
      }))
    }
  }, []);

  useEffect(() => {
    const data = getProfilesOfEventParticipants(token === null ? '' : token, Number(eventID));
    data?.then((response) => {
      if (DEBUG_REQUESTS) {
        console.log('RESPONSE WORKLOAD: ');
        console.log(response.data);
      }
  
      const newUsers:UserProfileState[] = response.data;
      
      setUsers(newUsers);
      const newChecked = new Set(checked);
      newUsers.forEach((u) => {
        if (!checked.has(u.userID)) {
          newChecked.add(u.userID);
        }
      })
      setChecked(newChecked);
    });
  }, []);

  return (
    <ModalWindow
      title={modalWindow === 'eventCreate' ? "Создание мероприятия" : "Редактирование мероприятия"}
      pagesNames={["Общее", "Участники", "Уведомления"]}
    >
      <GeneralEventInfo isCreate={modalWindow !== 'eventCreate' ? false : true} eventID={Number(eventID)} event={event} setEvent={setEvent} selectModalPage={selectModalPage}/>
      <MembersEventInfo isCreate={modalWindow !== 'eventCreate' ? false : true} eventID={Number(eventID)} checked={checked} setChecked={setChecked} users={users} setUsers={setUsers} date={event.beginTime}/>
      <NotificationsEventInfo isCreate={modalWindow !== 'eventCreate' ? false : true} eventID={Number(eventID)} notifications={notifications} setNotifications={setNotifications} onCreate={onCreate}/>
    </ModalWindow>
  );
}

export default EventWindow;


