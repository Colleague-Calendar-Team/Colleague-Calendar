export function GenNumbersArr(len: number, begin:number = 0): number[] {
  return new Array(len - begin).fill(null).map((_, i) => i + begin); 
}