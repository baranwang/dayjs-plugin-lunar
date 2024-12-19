import dayjs from 'dayjs';
import { beforeAll, describe, expect, test } from 'vitest';
import { PluginLunar } from '../src/index';

describe('dayjs-plugin-lunar', () => {
  const day = dayjs('1993-05-01 12:40:00');

  beforeAll(() => {
    dayjs.extend(PluginLunar);
  });

  test('toLunarHour', () => {
    const lunarHour = day.toLunarHour();
    expect(lunarHour.getName()).toBe('午时');
    expect(lunarHour.toString()).toBe('农历癸酉年闰三月初十丙午时');
  });

  test('toLunarDay', () => {
    const lunarDay = day.toLunarDay();
    expect(lunarDay.getName()).toBe('初十');
    expect(lunarDay.toString()).toBe('农历癸酉年闰三月初十');
  });

  test('toLunarMonth', () => {
    const lunarMonth = day.toLunarMonth();
    expect(lunarMonth.getName()).toBe('闰三月');
    expect(lunarMonth.getMonth()).toBe(3);
    expect(lunarMonth.getMonthWithLeap()).toBe(-3);
    expect(lunarMonth.toString()).toBe('农历癸酉年闰三月');
  });

  test('toLunarSeason', () => {
    const lunarSeason = day.toLunarSeason();
    expect(lunarSeason.toString()).toBe('季春');
  });

  test('toLunarYear', () => {
    const lunarYear = day.toLunarYear();
    expect(lunarYear.getYear()).toBe(1993);
    expect(lunarYear.toString()).toBe('农历癸酉年');
  });

  test('lunar', () => {
    expect(dayjs.lunar(1993, -3, 10, 12, 40).toDate().getTime()).toBe(
      day.toDate().getTime(),
    );
  });
});