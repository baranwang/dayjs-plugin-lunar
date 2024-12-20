export type LunarUnit = 'dual-hour' | 'day' | 'month' | 'year';

declare module 'dayjs' {
  /**
   * 创建一个农历时间
   * @param lunarYear 农历年
   * @param lunarMonth 农历月，1 到 12，闰月为负数
   * @param lunarDay 农历日，1 到 30
   * @param lunarHour 时，0 到 23
   * @param lunarMinute 分，0 到 59
   * @param lunarSecond 秒，0 到 59
   */
  export function lunar(
    /**
     * 农历年
     */
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
     * 转换为农历的时辰
     * @returns LunarHour
     */
    toLunarHour(): import('tyme4ts').LunarHour;

    /**
     * 转换为农历的日期
     * @returns LunarDay
     */
    toLunarDay(): import('tyme4ts').LunarDay;

    /**
     * 转换为农历的月份
     * @returns LunarMonth
     */
    toLunarMonth(): import('tyme4ts').LunarMonth;

    /**
     * 转换为农历的季节
     * @returns LunarSeason
     */
    toLunarSeason(): import('tyme4ts').LunarSeason;

    /**
     * 转换为农历的年份
     * @returns LunarYear
     */
    toLunarYear(): import('tyme4ts').LunarYear;

    /**
     * 添加农历时间
     * @param value 数量
     * @param unit 单位
     * @returns 新的 Dayjs 对象
     *
     * @example
     * ```typescript
     *  dayjs('2024-12-20 12:00:00').addLunar(1, 'dual-hour').toLunarHour().getName(); // '未时'
     * ```
     */
    addLunar(value: number, unit: LunarUnit): import('dayjs').Dayjs;

    /**
     * 减去农历时间，与 addLunar 相反
     * @param value 数量
     * @param unit 单位
     */
    subtractLunar(value: number, unit: LunarUnit): import('dayjs').Dayjs;
  }
}
