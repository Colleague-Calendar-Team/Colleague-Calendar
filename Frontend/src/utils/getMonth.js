import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 0)).day();

  let curMonthCount = 0 - firstDayOfMonth;
  const monthDays = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      curMonthCount++;
      return dayjs(new Date(year, month, curMonthCount));
    })
  });

  return monthDays;
}