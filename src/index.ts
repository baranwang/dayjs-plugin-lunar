import type { PluginFunc } from 'dayjs';
import { EarthBranch, LunarDay, LunarHour, LunarMonth, type SolarDay, SolarTime } from 'tyme4ts';
import { clearLunarUnitPrefix, transformToNumber, tymeToDate, verifyLunar } from './utils';

export * from './types';

export const PluginLunar: PluginFunc<{
  traditional?: boolean;
  // biome-ignore lint/style/useDefaultParameterLast: This is a plugin function, so the order of parameters is not important
}> = ({ traditional = true } = {}, dayjsClass, dayjsFactory) => {
  if (traditional) {
    LunarMonth.NAMES = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
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

  dayjsClass.prototype.addLunar = function (value, unit) {
    const lunarDay = this.toLunarDay();
    let newSolarDay: SolarDay;
    switch (unit) {
      case 'dual-hour':
        return dayjsFactory(tymeToDate(this.toLunarHour().next(value).getSolarTime(), this));
      case 'day':
        newSolarDay = lunarDay.next(value).getSolarDay();
        break;
      case 'month': {
        const lunarMonth = this.toLunarMonth().next(value);
        const lunarDayInMonth = Math.min(lunarDay.getDay(), lunarMonth.getDayCount());
        newSolarDay = LunarDay.fromYmd(
          lunarMonth.getYear(),
          lunarMonth.getMonthWithLeap(),
          lunarDayInMonth,
        ).getSolarDay();
        break;
      }
      case 'year': {
        const lunarYear = this.toLunarYear().next(value);
        const lunarMonth = lunarDay.getLunarMonth();
        let month = lunarMonth.getMonthWithLeap();

        // 处理闰月情况
        if (month < 0 && lunarYear.getLeapMonth() !== -month) {
          month = -month;
        }

        const newLunarDay = LunarDay.fromYmd(
          lunarYear.getYear(),
          month,
          Math.min(lunarDay.getDay(), lunarMonth.getDayCount()),
        );
        newSolarDay = newLunarDay.getSolarDay();
        break;
      }
      default:
        throw new Error(`Invalid lunar unit: ${unit}`);
    }
    return dayjsFactory(tymeToDate(newSolarDay, this));
  };

  dayjsClass.prototype.subtractLunar = function (value, unit) {
    return this.addLunar(-value, unit);
  };

  const originalAdd = dayjsClass.prototype.add;
  dayjsClass.prototype.add = function (value, unit) {
    if (unit?.startsWith('lunar-')) {
      return this.addLunar(value, clearLunarUnitPrefix(unit));
    }
    return originalAdd.bind(this)(value, unit);
  };

  const originalSubtract = dayjsClass.prototype.subtract;
  dayjsClass.prototype.subtract = function (value, unit) {
    if (unit?.startsWith('lunar-')) {
      return this.subtractLunar(value, clearLunarUnitPrefix(unit));
    }
    return originalSubtract.bind(this)(value, unit);
  };

  const originalFormat = dayjsClass.prototype.format;

  dayjsClass.prototype.format = function (formatString) {
    if (!this.isValid()) {
      return originalFormat.bind(this)(formatString);
    }

    const result = formatString?.replace(/\[([^\]]+)]|LY|LZ|LM|LD|Lh|LH|LK/g, (match) => {
      switch (match) {
        case 'LY':
          return this.toLunarYear().getSixtyCycle().getName();
        case 'LZ':
          return this.toLunarYear().getSixtyCycle().getEarthBranch().getZodiac().getName();
        case 'LM':
          return this.toLunarMonth().getName();
        case 'LD':
          return this.toLunarDay().getName();
        case 'LH':
          return this.toLunarHour().getName();
        case 'Lh':
          return EarthBranch.fromIndex(this.toLunarHour().getIndexInDay()).getName();
        case 'LK':
          return `${this.hour() % 2 ? '初' : '正'}${['初', '一', '二', '三'][Math.floor(this.minute() / 15)]}刻`;
        default:
          return match;
      }
    });
    return originalFormat.bind(this)(result);
  };

  dayjsFactory.lunar = (...args) => {
    if (!args.length) {
      return dayjsFactory();
    }
    const [year = 0, month = 1, day = 1, hour = 0, minute = 0, second = 0] = args.map(transformToNumber);

    verifyLunar(year, month, day, hour, minute, second);

    const lunarHour = LunarHour.fromYmdHms(year, month, day, hour, minute, second);

    return dayjsFactory(tymeToDate(lunarHour.getSolarTime()));
  };
};

export default PluginLunar;
