import { Notification } from "element-ui";

type NotifyType = "success" | "warning" | "info" | "error";

/**
 * 提醒
 * @param message 提醒内容
 * @param type 提醒内容（可不传）
 */
export function notify(message: string, type?: NotifyType) {
  const params = {
    title: "",
    message,
    duration: 1500
  };
  const fn = type ? Notification[type] : Notification;
  return fn(params);
}

/**
 * 获取特定宽高的图片地址
 * @param url 图片地址
 * @param w 宽
 * @param h 高
 */
export function genImgUrl(url: string, w: number, h: number) {
  if (!h) {
    h = w;
  }
  url += `?param=${w}y${h}`;
  return url;
}

/**
 * 数字前补零
 * @param num 数字
 * @param n 位数
 */
export function pad(num: number, n = 2) {
  let len = num.toString().length;
  let numStr = `${num}`;
  while (len < n) {
    numStr = "0" + num;
    len++;
  }
  return numStr;
}
/**
 * 将大于10000的数字处理成~万
 */
export function formatNumber(number: number | string) {
  number = Number(number) || 0;
  return number > 100000 ? `${Math.round(number / 10000)}万` : `${number}`;
}

/**
 * 格式化时间，将总秒数转换成分：秒
 * @param interval 总秒数
 */
export function formatTime(interval: number) {
  interval = interval | 0;
  const minute = pad((interval / 60) | 0);
  const second = pad(interval % 60);
  return `${minute}:${second}`;
}

/**
 * 判断参数是否已定义
 * @param v 参数
 */
export function isDefined(v: any) {
  return v !== undefined && v !== null;
}

/**
 * 判断参数是否未定义
 * @param v 参数
 */
export function isUndefined(v: any) {
  return v === undefined || v === null;
}
