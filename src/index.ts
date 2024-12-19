import type { PluginFunc } from "dayjs";
import { LunarHour, SolarTime, LunarMonth } from "tyme4ts";
import { transformToNumber, verifyLunar } from "./utils";

export * from "./types";

export const PluginLunar: PluginFunc<{
  traditional?: boolean;
// biome-ignore lint/style/useDefaultParameterLast: This is a plugin function, so the order of parameters is not important
}> = ({ traditional = true } = {}, dayjsClass, dayjsFactory) => {
  if (traditional) {
    LunarMonth.NAMES = [
      "正月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "冬月",
      "腊月",
    ];
  }

  dayjsClass.prototype.toLunarHour = function () {
    return SolarTime.fromYmdHms(
      this.year(),
      this.month() + 1,
      this.date(),
      this.hour(),
      this.minute(),
      this.second(),
    ).getLunarHour();
  };
  dayjsClass.prototype.toLunarDay = function () {
    return this.toLunarHour().getLunarDay();
  };
  dayjsClass.prototype.toLunarMonth = function () {
    return this.toLunarDay().getLunarMonth();
  };
  dayjsClass.prototype.toLunarSeason = function () {
    return this.toLunarMonth().getSeason();
  };
  dayjsClass.prototype.toLunarYear = function () {
    return this.toLunarMonth().getLunarYear();
  };

  dayjsFactory.lunar = (...args) => {
    if (!args.length) {
      return dayjsFactory();
    }
    const [year = 0, month = 1, day = 1, hour = 0, minute = 0, second = 0] =
      args.map(transformToNumber);

    verifyLunar(year, month, day, hour, minute, second);

    const lunarHour = LunarHour.fromYmdHms(
      year,
      month,
      day,
      hour,
      minute,
      second,
    );

    const solarTime = lunarHour.getSolarTime();

    return dayjsFactory(
      new Date(
        solarTime.getYear(),
        solarTime.getMonth() - 1,
        solarTime.getDay(),
        solarTime.getHour(),
        solarTime.getMinute(),
        solarTime.getSecond(),
      ),
    );
  };
};

export default PluginLunar;
