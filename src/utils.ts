import type { Dayjs } from 'dayjs';
import type { SolarDay, SolarTime } from 'tyme4ts';
import type { LunarUnit } from './types';

/**
 * 检查值是否为null或undefined
 */
export const isNil = (value: unknown): value is null | undefined => value === null || value === undefined;

/**
 * 将任意类型的参数转换为数字，如果无法转换则返回undefined
 */
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

/**
 * 验证农历日期时间的各个部分是否有效
 * @throws {Error} 当任何部分超出有效范围时抛出错误
 */
export const verifyLunar = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
): void => {
  // 使用对象存储验证规则，便于扩展和维护
  const validationRules = [
    {
      value: year,
      min: -1,
      max: 9999,
      name: 'year',
      message: `Invalid lunar year: ${year}. Valid range is from -1 to 9999.`,
    },
    {
      value: month,
      specialCase: month === 0,
      min: -12,
      max: 12,
      name: 'month',
      message: `Invalid lunar month: ${month}. Valid range is from -12 to 12, where negative values represent leap months.`,
    },
    {
      value: day,
      min: 1,
      max: 30,
      name: 'day',
      message: `Invalid lunar day: ${day}. Valid range is from 1 to 30.`,
    },
    {
      value: hour,
      min: 0,
      max: 23,
      name: 'hour',
      message: `Invalid lunar hour: ${hour}. Valid range is from 0 to 23.`,
    },
    {
      value: minute,
      min: 0,
      max: 59,
      name: 'minute',
      message: `Invalid lunar minute: ${minute}. Valid range is from 0 to 59.`,
    },
    {
      value: second,
      min: 0,
      max: 59,
      name: 'second',
      message: `Invalid lunar second: ${second}. Valid range is from 0 to 59.`,
    },
  ];

  // 检查每个部分是否有效
  for (const rule of validationRules) {
    if (rule.specialCase || rule.value < rule.min || rule.value > rule.max) {
      throw new Error(rule.message);
    }
  }
};

/**
 * 将tyme4ts的日期时间对象转换为JavaScript Date对象
 */
export const tymeToDate = (tyme: SolarTime | SolarDay, dayjsInterface?: Dayjs): Date => {
  const year = tyme.getYear();
  const monthIndex = tyme.getMonth() - 1;
  const date = tyme.getDay();

  // 提取小时、分钟、秒，如果不可用则从dayjs接口获取或使用默认值
  const hour = 'getHour' in tyme ? tyme.getHour() : (dayjsInterface?.hour() ?? 0);
  const minute = 'getMinute' in tyme ? tyme.getMinute() : (dayjsInterface?.minute() ?? 0);
  const second = 'getSecond' in tyme ? tyme.getSecond() : (dayjsInterface?.second() ?? 0);
  const millisecond = dayjsInterface?.millisecond() ?? 0;

  return new Date(year, monthIndex, date, hour, minute, second, millisecond);
};

/**
 * 清除单位前缀中的"lunar-"部分，并将结果转换为LunarUnit类型
 */
export const clearLunarUnitPrefix = (unit: string): LunarUnit => unit.replace(/^lunar-/, '') as LunarUnit;
