import dayjs from "dayjs";

export function getWeek(day = dayjs()) {
  let curDate = dayjs(day).date() - dayjs(day).day() - (dayjs(day).day() === 0 ? 7 : 0);
  const month = dayjs(day).month();
  const year = dayjs(day).year();
  // console.log('date: ' + curDate + " " + month + " " + year)

  const weekDays = new Array(7).fill(null).map(() => {
    curDate++;
    return dayjs(new Date(year, month, curDate));
  });

  // console.log('day 0:', weekDays[0]);

  return weekDays;
}