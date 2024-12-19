# Dayjs Plugin Lunar

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

默认情况下，`dayjs-plugin-lunar` 将农历的 `冬月` 和 `腊月` 表述为 `十一月` 和 `十二月`。如果希望遵循传统命名，可以设置插件配置 traditional 为 true（默认值）。
若需显示 tyme4ts 的原始表述，可将 traditional 设置为 false。

```ts
dayjs.extend(PluginLunar, { traditional: false });

// 转换为农历月份（使用 `tyme4ts` 原始表述）
dayjs('2024-12-19 12:00:00').toLunarMonth().getName(); // 十一月
```

## API 参考

[types.ts](./src/types.ts)