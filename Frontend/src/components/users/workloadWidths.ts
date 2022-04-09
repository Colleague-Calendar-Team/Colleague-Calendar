import { UserWorkloadState } from "../../types/workload";

function timeToWidth(time: string) {
  const maxMinutes = 1440; // 24 * 60
  const timeSplit = time.split(':');
  const hours = Number(timeSplit[0]);
  const minutes = Number(timeSplit[1]);
  console.log("width:", ((hours * 60 + minutes) / maxMinutes) * 100, "hour:", hours, "minutes:", minutes);
  return ((hours * 60 + minutes) / maxMinutes) * 100;
}

export function WorkloadToArrOfWidth(workload:UserWorkloadState[]) {
  let widthArr = [];
  
  workload.forEach((w) => {
    widthArr.push(timeToWidth(w.beginTime));

    if (w.endTime === '00:00') {
      widthArr.push(timeToWidth('24:00'));
    } else {
      widthArr.push(timeToWidth(w.endTime));
    }
  });
  widthArr.push(100);

  return widthArr;
}