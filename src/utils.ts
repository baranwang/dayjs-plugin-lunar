import type { Dayjs } from 'dayjs';
import type { SolarDay, SolarMonth, SolarTime, SolarYear } from 'tyme4ts';

export const isNil = (value: unknown): value is null | undefined => value === null || value === undefined;

export const transformToNumber = (arg: unknown): number | undefined => {
  if (isNil(arg)) {
    return undefined;
  }
  if (typeof arg === 'number') {
    return arg;
  }
  if (typeof arg === 'bigint') {
    return Number(arg);
  }
  const num = Number(arg);
  return Number.isNaN(num) ? undefined : num;
};

export const verifyLunar = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
): void => {
  // 验证年份范围
  if (year < -1 || year > 9999) {
    throw new Error(`Invalid lunar year: ${year}. Valid range is from -1 to 9999.`);
  }

  // 验证月份范围，闰月可用负数表示，0 是非法月份
  if (month < -12 || month > 12 || month === 0) {
    throw new Error(
      `Invalid lunar month: ${month}. Valid range is from -12 to 12, where negative values represent leap months.`,
    );
  }

  // 验证天数范围，1 至 30 日有效
  if (day < 1 || day > 30) {
    throw new Error(`Invalid lunar day: ${day}. Valid range is from 1 to 30.`);
  }

  // 验证小时范围，0 至 23 小时有效
  if (hour < 0 || hour > 23) {
    throw new Error(`Invalid lunar hour: ${hour}. Valid range is from 0 to 23.`);
  }

  // 验证分钟范围，0 至 59 分钟有效
  if (minute < 0 || minute > 59) {
    throw new Error(`Invalid lunar minute: ${minute}. Valid range is from 0 to 59.`);
  }

  // 验证秒数范围，0 至 59 秒有效
  if (second < 0 || second > 59) {
    throw new Error(`Invalid lunar second: ${second}. Valid range is from 0 to 59.`);
  }
};

export const tymeToDate = (tyme: SolarTime | SolarDay | SolarMonth | SolarYear, dayjsInterface?: Dayjs) => {
  const year = tyme.getYear();
  const monthIndex = 'getMonth' in tyme ? tyme.getMonth() - 1 : (dayjsInterface?.month() ?? 0);
  const date = 'getDay' in tyme ? tyme.getDay() : (dayjsInterface?.date() ?? 1);
  const hour = 'getHour' in tyme ? tyme.getHour() : (dayjsInterface?.hour() ?? 0);
  const minute = 'getMinute' in tyme ? tyme.getMinute() : (dayjsInterface?.minute() ?? 0);
  const second = 'getSecond' in tyme ? tyme.getSecond() : (dayjsInterface?.second() ?? 0);
  const millisecond = dayjsInterface?.millisecond() ?? 0;

  return new Date(year, monthIndex, date, hour, minute, second, millisecond);
};
