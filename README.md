# Dayjs Plugin Lunar

[![NPM Version](https://img.shields.io/npm/v/dayjs-plugin-lunar)](https://npmjs.com/package/dayjs-plugin-lunar)
[![NPM Downloads](https://img.shields.io/npm/dm/dayjs-plugin-lunar)](https://npmcharts.com/compare/dayjs-plugin-lunar?minimal=true)
![NPM License](https://img.shields.io/npm/l/dayjs-plugin-lunar)

`dayjs-plugin-lunar` 是一个基于 [Day.js](https://github.com/iamkun/dayjs) 的扩展插件，用于方便地处理和转换农历时间。它依赖 [`tyme4ts`](https://github.com/6tail/tyme4ts) 作为底层时间计算库。


## 安装

```bash
npm install dayjs dayjs-plugin-lunar
```

如果你的 npm 版本低于 7，则需要额外安装 tyme4ts：

```bash
npm install tyme4ts
```

## 快速开始

### 基础使用

```ts
import dayjs from 'dayjs';
import { PluginLunar } from 'dayjs-plugin-lunar';

// 注册插件
dayjs.extend(PluginLunar);

dayjs('2024-12-19 12:00:00').format('LMLDLhLK') // 冬月十九午正初刻

// 转换为农历时辰
dayjs('2024-12-19 12:00:00').toLunarHour().getName(); // 午时

// 转换为农历日期
dayjs('2024-12-19 12:00:00').toLunarDay().getName(); // 十九

// 转换为农历月份
dayjs('2024-12-19 12:00:00').toLunarMonth().getName(); // 冬月

// 通过农历构造日期
dayjs.lunar(2025, 1, 1).format('YYYY-MM-DD') // 2025-01-29
```

### 自定义配置

`tyme4ts` 将农历的 `冬月` 和 `腊月` 表述为 `十一月` 和 `十二月`，`dayjs-plugin-lunar` 希望更遵循传统命名，对此进行了修改。若需显示 `tyme4ts` 的原始表述，可将 `traditional` 设置为 `false`。

```ts
dayjs.extend(PluginLunar, { traditional: false });

// 转换为农历月份（使用 `tyme4ts` 原始表述）
dayjs.lunar(2024, 11, 1).toLunarMonth().getName(); // 十一月
```

更多用法参看[测试用例](./tests/index.test.ts)

## API 参考

### format

基于 dayjs 原始 [`format`](https://day.js.org/docs/en/display/format) 方法拓展，新增农历格式化模板

#### 扩展的 format 模版

| 模板 | 输出              | 详情       |
|----|-----------------|----------|
| LY | 甲子 乙丑 ... 癸亥    | 干支纪年     |
| LM | 正月 二月 ... 腊月    | 农历月份     |
| LD | 初一 初二 ... 三十    | 农历日期     |
| LH | 子时 丑时 ... 亥时    | 农历时辰     |
| Lh | 子 丑 ... 亥       | 农历时辰（简写） |
| LK | 初初刻 初一刻 ... 正三刻 | 农历刻数（采用[九十六刻制](https://zh-yue.wikipedia.org/wiki/%E5%88%BB_(%E6%99%82%E9%96%93)#%E4%B9%9D%E5%8D%81%E5%85%AD%E5%88%BB%E5%88%B6)）     |


### add / subtract

基于 dayjs 原始 [`add`](https://day.js.org/docs/en/manipulate/add) / [`subtract`](https://day.js.org/docs/en/manipulate/subtract) 方法拓展，新增农历单位加减

| 单位              | 详情   |
|-----------------|------|
| lunar-year      | 农历年  |
| lunar-month     | 农历月  |
| lunar-day       | 农历日  |
| lunar-dual-hour | 农历时辰 |


<!-- START: AUTO-GENERATED-TYPES -->
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### lunar

使用农历时间创建 Dayjs 对象

#### Parameters

*   `lunarYear` **[number][1]** 农历年
*   `lunarMonth` **[number][1]?** 农历月，1 到 12，闰月为负数
*   `lunarDay` **[number][1]?** 农历日，1 到 30
*   `lunarHour` **[number][1]?** 时，0 到 23
*   `lunarMinute` **[number][1]?** 分，0 到 59
*   `lunarSecond` **[number][1]?** 秒，0 到 59

#### Examples

```javascript
dayjs.lunar(2025, 1, 1).format('YYYY-MM-DD') // 2025-01-29
```

Returns **Dayjs**&#x20;

### toLunarHour

转换为农历的时辰

#### Examples

```javascript
dayjs('2024-12-19 12:00:00').toLunarHour().getName(); // 午时
```

Returns **LunarHour** `tyme4ts` 中的 `LunarHour` 类

### toLunarDay

转换为农历的日期

#### Examples

```javascript
dayjs('2025-01-29').toLunarDay().getName(); // 初一
```

Returns **LunarDay** `tyme4ts` 中的 `LunarDay` 类

### toLunarMonth

转换为农历的月份

#### Examples

```javascript
dayjs('2025-01-29').toLunarMonth().getName(); // 正月
```

Returns **LunarMonth** `tyme4ts` 中的 `LunarMonth` 类

### toLunarSeason

转换为农历的季节

#### Examples

```javascript
dayjs('2025-01-29').toLunarSeason().getName(); // 孟春
```

Returns **LunarSeason** `tyme4ts` 中的 `LunarSeason` 类

### toLunarYear

转换为农历的年份

#### Examples

```javascript
dayjs('2025-01-01').toLunarYear().getYear(); // 2024
```

Returns **LunarYear** `tyme4ts` 中的 `LunarYear` 类

### addLunar

添加农历时间

#### Parameters

*   `value` **[number][1]** 数量
*   `unit` **LunarUnit** 单位

#### Examples

```javascript
dayjs('2024-12-20 12:00:00').addLunar(1, 'dual-hour').toLunarHour().getName(); // 未时
```

Returns **Dayjs**&#x20;

### subtractLunar

减去农历时间，与 addLunar 相反

#### Parameters

*   `value` **[number][1]** 数量
*   `unit` **LunarUnit** 单位

#### Examples

```javascript
dayjs('2024-12-20 12:00:00').subtractLunar(1, 'dual-hour').toLunarHour().getName(); // 巳时
```

Returns **Dayjs**&#x20;

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

<!-- END: AUTO-GENERATED-TYPES -->

## License

MIT