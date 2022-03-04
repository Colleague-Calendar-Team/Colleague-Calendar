import dayjs from "dayjs";

export function getWeek(day = dayjs()) {
  const year = dayjs().year();
  const month = dayjs().month();
  console.log('day: ', day, ' day of week: ', day.day())

  let curDate = day.date() - day.day();
  const weekDays = new Array(7).fill(null).map(() => {
    curDate++;
    return dayjs(new Date(year, month, curDate));
  });

  return weekDays;
}