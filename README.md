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

更多用法参看[测试用例](./tests/index.test.ts)


### 自定义配置

`tyme4ts` 将农历的 `冬月` 和 `腊月` 表述为 `十一月` 和 `十二月`，`dayjs-plugin-lunar` 希望更遵循传统命名，对此进行了修改。若需显示 `tyme4ts` 的原始表述，可将 `traditional` 设置为 `false`。

```ts
dayjs.extend(PluginLunar, { traditional: false });

// 转换为农历月份（使用 `tyme4ts` 原始表述）
dayjs.lunar(2024, 11, 1).toLunarMonth().getName(); // 十一月
```

## API 参考

[types.ts](./src/types.ts)

## License

MIT