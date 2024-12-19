import 'dayjs';

declare module 'dayjs' {
  export function lunar(
    /** 农历年 */
    lunarYear: number,
    /**
     * 农历月，1 到 12，闰月为负数
     */
    lunarMonth?: number,
    /**
     * 农历日，1 到 30
     */
    lunarDay?: number,
    /**
     * 时，0 到 23
     */
    lunarHour?: number,
    /**
     * 分，0 到 59
     */
    lunarMinute?: number,
    /**
     * 秒，0 到 59
     */
    lunarSecond?: number,
  ): import('dayjs').Dayjs;

  export interface Dayjs {
    /**
     * 转换为农历的时辰，返回 LunarHour 类型
     */
    toLunarHour(): import('tyme4ts').LunarHour;

    /**
     * 转换为农历的日期，返回 LunarDay 类型
     */
    toLunarDay(): import('tyme4ts').LunarDay;

    /**
     * 转换为农历的月份，返回 LunarMonth 类型
     */
    toLunarMonth(): import('tyme4ts').LunarMonth;

    /**
     * 转换为农历的季节，返回 LunarSeason 类型
     */
    toLunarSeason(): import('tyme4ts').LunarSeason;

    /**
     * 转换为农历的年份，返回 LunarYear 类型
     */
    toLunarYear(): import('tyme4ts').LunarYear;
  }
}
