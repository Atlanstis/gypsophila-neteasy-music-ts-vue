export function getImgUrl(url: string, w: number, h: number) {
  if (!h) {
    h = w;
  }
  url += `?param=${w}y${h}`;
  return url;
}

export function pad(num: number, n = 2) {
  let len = num.toString().length;
  let numStr = `${num}`;
  while (len < n) {
    numStr = "0" + num;
    len++;
  }
  return numStr;
}

export function formatNumber(number: number | string) {
  number = Number(number) || 0;
  return number > 100000 ? `${Math.round(number / 10000)}万` : `${number}`;
}

export function formatTime(interval: number) {
  interval = interval | 0;
  const minute = pad((interval / 60) | 0);
  const second = pad(interval % 60);
  return `${minute}:${second}`;
}
