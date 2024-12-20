import type { Dayjs } from 'dayjs';
import type { LunarDay, LunarHour, LunarMonth, LunarSeason, LunarYear } from 'tyme4ts';

export type LunarUnit = 'dual-hour' | 'day' | 'month' | 'year';

declare module 'dayjs' {
  /**
   * 使用农历时间创建 Dayjs 对象
   * @param lunarYear 农历年
   * @param lunarMonth 农历月，1 到 12，闰月为负数
   * @param lunarDay 农历日，1 到 30
   * @param lunarHour 时，0 到 23
   * @param lunarMinute 分，0 到 59
   * @param lunarSecond 秒，0 到 59
   * @returns {Dayjs}
   * @example dayjs.lunar(2025, 1, 1).format('YYYY-MM-DD') // 2025-01-29
   */
  export function lunar(
    lunarYear: number,
    lunarMonth?: number,
    lunarDay?: number,
    lunarHour?: number,
    lunarMinute?: number,
    lunarSecond?: number,
  ): Dayjs;

  export interface Dayjs {
    /**
     * 转换为农历的时辰
     * @returns {LunarHour}
     * @example dayjs('2024-12-19 12:00:00').toLunarHour().getName(); // 午时
     */
    toLunarHour(): LunarHour;

    /**
     * 转换为农历的日期
     * @returns {LunarDay}
     * @example dayjs('2025-01-29').toLunarDay().getName(); // 初一
     */
    toLunarDay(): LunarDay;

    /**
     * 转换为农历的月份
     * @returns {LunarMonth}
     * @example dayjs('2025-01-29').toLunarMonth().getName(); // 正月
     */
    toLunarMonth(): LunarMonth;

    /**
     * 转换为农历的季节
     * @returns {LunarSeason}
     * @example dayjs('2025-01-29').toLunarSeason().getName(); // 孟春
     */
    toLunarSeason(): LunarSeason;

    /**
     * 转换为农历的年份
     * @returns {LunarYear}
     * @example dayjs('2025-01-01').toLunarYear().getYear(); // 2024
     */
    toLunarYear(): LunarYear;

    /**
     * 添加农历时间
     * @param value 数量
     * @param unit 单位
     * @returns {Dayjs}
     * @example dayjs('2024-12-20 12:00:00').addLunar(1, 'dual-hour').toLunarHour().getName(); // 未时
     */
    addLunar(value: number, unit: LunarUnit): Dayjs;

    /**
     * 减去农历时间，与 addLunar 相反
     * @param value 数量
     * @param unit 单位
     * @returns {Dayjs}
     * @example dayjs('2024-12-20 12:00:00').subtractLunar(1, 'dual-hour').toLunarHour().getName(); // 巳时
     */
    subtractLunar(value: number, unit: LunarUnit): Dayjs;
  }
}
