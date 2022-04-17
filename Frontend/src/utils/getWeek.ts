import dayjs from "dayjs";

export function getWeek(day = dayjs()) {
  let curDate = dayjs(day).date() - dayjs(day).day() - (dayjs(day).day() === 0 ? 7 : 0);
  const month = dayjs(day).month();
  const year = dayjs(day).year();

  const weekDays = new Array(7).fill(null).map(() => {
    curDate++;
    return dayjs(new Date(year, month, curDate));
  });

  return weekDays;
}

// возвращает начальный день, с которого будем рендерить события
export function getFirstDayForToday(day = dayjs()) {
  return dayjs(day).add(1 - 14 - dayjs(day).day() - (dayjs(day).day() === 0 ? 7 : 0), 'days');
}

// возвращает день - 5*7
export function getPrevFirstDay(firstDate = dayjs()) {
  return firstDate.add(- 5*7, 'days');
}

// возвращает день + 5*7
export function getNextFirstDay(firstDate = dayjs()) {
  return firstDate.add(5*7, 'days');
}

// возвращает номер недели для рендера в соответсвии с выбранным днем
export function getRenderWeekForSelectedDay(day = dayjs(), firstDate = getFirstDayForToday(dayjs())) {
  const diff = dayjs(day).diff(firstDate, 'day') + 1;
  console.log(diff);
  switch(true) {
    case diff >= 0 && diff < 7:
      return 0;
    case diff >= 7 && diff < 14:
      return 1;
    case diff >= 14 && diff < 21:
      return 2;
    case diff >= 21 && diff < 28:
      return 3;
    case diff >= 28 && diff < 35:
      return 4;
    default:
      console.error('error in diff before firstDate and selectedDate');
      return -1;
  }
}

export function getIdOfHourInWeek(day = dayjs(), dayBegin = dayjs()) {
  const dateBegin = dayjs(dayBegin).date();
  const date = dayjs(day).date() - dateBegin;
  const hour = dayjs(day).hour();
  return (date*24 + hour); 
}

export function getHourById(id = -1, dayBegin = dayjs()) {
  const day = id / 24;
  const hour = id % 24;
  const month = dayjs(dayBegin).month();
  const year = dayjs(dayBegin).year();
  const dateBegin = dayjs(dayBegin).date();
  return dayjs(new Date(year, month, dateBegin + day, hour));
}