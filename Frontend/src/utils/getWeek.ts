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