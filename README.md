# SolarLunar (Modernized)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependency Status][dep-image]][dep-url]
[![devDependency Status][devdep-image]][devdep-url]
[![NPM downloads][downloads-image]][npm-url]

[npm-image]: http://img.shields.io/npm/v/solarlunar.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/solarlunar
[travis-image]: https://img.shields.io/travis/yize/solarlunar.svg?style=flat-square
[travis-url]: https://travis-ci.org/yize/solarlunar
[coveralls-image]: https://img.shields.io/coveralls/yize/solarlunar.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yize/solarlunar?branch=master
[dep-image]: http://img.shields.io/david/yize/solarlunar.svg?style=flat-square
[dep-url]: https://david-dm.org/yize/solarlunar
[devdep-image]: http://img.shields.io/david/dev/yize/solarlunar.svg?style=flat-square
[devdep-url]: https://david-dm.org/yize/solarlunar#info=devDependencies
[downloads-image]: https://img.shields.io/npm/dm/solarlunar.svg

1900 年至 2100 年公历、农历互转 - 现代化重构版本

* Solar : 公历 阳历
* Lunar : 农历 阴历

支持年份：`1900-2100`

## 安装

```bash
npm install solarlunar
```

## 使用

### ES6 模块
```js
import solarLunar from 'solarlunar';

const solar2lunarData = solarLunar.solar2lunar(2015, 10, 8); // 输入的日子为公历
const lunar2solarData = solarLunar.lunar2solar(2015, 8, 26); // 输入的日子为农历
```

### CommonJS
```js
const solarLunar = require('solarlunar');

const solar2lunarData = solarLunar.solar2lunar(2015, 10, 8);
```

### 浏览器
```html
<script src="node_modules/solarlunar/dist/solarlunar.min.js"></script>
<script>
  const solar2lunarData = solarLunar.solar2lunar(2015, 10, 8);
</script>
```

## 输出格式

```js
{
    lYear: 2015,           // 农历年
    lMonth: 8,             // 农历月
    lDay: 26,              // 农历日
    animal: '羊',           // 生肖
    monthCn: '八月',        // 农历月中文名称，如果为闰月，则会在月份前增加`闰`字
    dayCn: '廿六',          // 农历日中文名称
    cYear: 2015,           // 公历年
    cMonth: 10,            // 公历月
    cDay: 8,               // 公历日
    gzYear: '乙未',         // 年的农历叫法（干支）
    gzMonth: '丙戌',        // 月的农历叫法（干支）
    gzDay: '丁巳',          // 日的农历叫法(干支)
    isToday: false,        // 是否是今天
    isLeap: false,         // 是否是闰月
    nWeek: 4,              // 周几
    ncWeek: '星期四',        // 中文周几
    isTerm: true,          // 是否有节气
    term: '寒露'            // 节气，如果没有则返回空字符串
}
```

## API

### (Object)`solarLunar.solar2lunar`
输入的日子为公历年月日

* 参数 : (Number)年,(Number)月,(Number)日

```js
solarLunar.solar2lunar(2015, 10, 8);
solarLunar.solar2lunar(2015, 10, 08); // 等价于上者
```

### (Object)`solarLunar.lunar2solar`
输入的日子为农历年月日

* 参数 : (Number)年,(Number)月,(Number)日,(bool)是否闰月

```js
solarLunar.lunar2solar(2015, 8, 26);
solarLunar.lunar2solar(2015, 08, 26); // 等价于上者
solarLunar.lunar2solar(2015, 8, 26, true);  // 闰月
```

### 常量和辅助函数

* `solarLunar.lunarInfo` : 农历 1900-2100 的润大小信息表
* `solarLunar.solarMonth` : 公历每个月份的天数普通表
* `solarLunar.gan` : 天干地支之天干速查表 - 干 `["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]`
* `solarLunar.zhi` : 天干地支之地支速查表 - 支 `["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]`
* `solarLunar.animals` : 生肖表 `["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]`
* `solarLunar.lunarTerm` : 24 节气速查表 `["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]`
* `solarLunar.lTermInfo` : 1900-2100 各年的 24 节气日期速查表
* `solarLunar.lYearDays(y)` : 返回农历 y 年一整年的总天数
* `solarLunar.leapMonth(y)` : 返回农历 y 年闰月是哪个月；若 y 年没有闰月 则返回 0
* `solarLunar.leapDays(y)` : 返回农历 y 年闰月的天数 若该年没有闰月则返回 0
* `solarLunar.monthDays(y, m)` : 返回农历 y 年 m 月（非闰月）的总天数
* `solarLunar.toChinaMonth(m)` : 传入农历数字月份返回汉语通俗表示法
* `solarLunar.toChinaDay(d)` : 传入农历日期数字返回汉字表示法
* `solarLunar.getAnimal(y, m, d)` : 年份转生肖（精确到立春）

## 项目特点

### 现代化重构
- 使用 ES6+ 语法
- 支持多种模块格式 (UMD, CJS, ESM)
- 现代化的构建工具链 (Rollup)
- 现代化测试框架 (Vitest)
- 代码质量工具 (ESLint, Prettier)
- TypeScript 支持

### 性能优化
- 优化了算法性能
- 改进了输入验证
- 增强了错误处理

### 功能增强
- 精确的生肖计算（基于立春）
- 更好的错误处理
- 完善的输入验证

## 开发

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 运行开发模式
npm run dev

# 构建项目
npm run build

# 代码检查
npm run lint

# 格式化代码
npm run format
```

## 贡献

欢迎提交 Issue 和 Pull Request。

## License

ISC

## Links

* [http://blog.jjonline.cn/userInterFace/173.html](http://blog.jjonline.cn/userInterFace/173.html)