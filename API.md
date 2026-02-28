# SolarLunar API 文档

## 概述

SolarLunar 是一个现代化的农历转换库，支持公历与农历之间的相互转换，提供天干地支、节气、生肖等中国传统日历信息。

## 安装

```bash
npm install solarlunar
```

## 使用方法

### ES6 模块

```javascript
import solarLunar from 'solarlunar';

// 公历转农历
const lunarData = solarLunar.solar2lunar(2023, 10, 15);

// 农历转公历
const solarData = solarLunar.lunar2solar(2023, 8, 30);
```

### CommonJS

```javascript
const solarLunar = require('solarlunar');

const lunarData = solarLunar.solar2lunar(2023, 10, 15);
```

### 浏览器

```html
<script src="node_modules/solarlunar/dist/solarlunar.min.js"></script>
<script>
  const lunarData = solarLunar.solar2lunar(2023, 10, 15);
</script>
```

## API 参法

### solar2lunar(年, 月, 日)

将公历日期转换为农历日期。

**参数:**
- `year` (Number): 公历年份 (1900-2100)
- `month` (Number): 公历月份 (1-12)
- `day` (Number): 公历日期 (1-31)

**返回值:**
返回一个包含农历信息的对象，详情见[返回值格式](#返回值格式)。

**示例:**
```javascript
const result = solarLunar.solar2lunar(2023, 10, 15);
// 返回: { lYear: 2023, lMonth: 8, lDay: 30, ... }
```

### lunar2solar(年, 月, 日, [闰月])

将农历日期转换为公历日期。

**参数:**
- `year` (Number): 农历年份 (1900-2100)
- `month` (Number): 农历月份 (1-12)
- `day` (Number): 农历日期 (1-30)
- `isLeapMonth` (Boolean, 可选): 是否为闰月，默认为 false

**返回值:**
返回一个包含公历信息的对象，详情见[返回值格式](#返回值格式)。

**示例:**
```javascript
const result = solarLunar.lunar2solar(2023, 8, 30);
const leapResult = solarLunar.lunar2solar(2023, 8, 30, true); // 闰月
```

## 返回值格式

所有转换方法都返回一个包含以下属性的对象：

### 基本信息
- `lYear` (Number): 农历年份
- `lMonth` (Number): 农历月份
- `lDay` (Number): 农历日期
- `cYear` (Number): 公历年份
- `cMonth` (Number): 公历月份
- `cDay` (Number): 公历日期

### 中文表示
- `yearCn` (String): 农历年份中文表示（如："二零二三年"）
- `monthCn` (String): 农历月份中文表示（如："八月"，闰月前会加"闰"字）
- `dayCn` (String): 农历日期中文表示（如："三十"）

### 天干地支
- `gzYear` (String): 年份天干地支（如："癸卯"）
- `gzMonth` (String): 月份天干地支（如："辛酉"）
- `gzDay` (String): 日期天干地支（如："甲子"）

### 其他信息
- `animal` (String): 生肖（如："兔"）
- `nWeek` (Number): 星期几（数字表示，1-7表示周一到周日）
- `ncWeek` (String): 星期几中文表示（如："星期日"）
- `isToday` (Boolean): 是否为今天
- `isLeap` (Boolean): 农历月份是否为闰月
- `isTerm` (Boolean): 当天是否为节气
- `term` (String): 节气名称（如："寒露"），非节气日为空字符串

## 常量和辅助函数

### 常量数组
- `solarLunar.lunarInfo`: 农历1900-2100的闰月信息表
- `solarLunar.solarMonth`: 公历每月天数表
- `solarLunar.gan`: 天干表 ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
- `solarLunar.zhi`: 地支表 ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
- `solarLunar.animals`: 生肖表 ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
- `solarLunar.lunarTerm`: 24节气表
- `solarLunar.lTermInfo`: 1900-2100年24节气日期信息表
- `solarLunar.nStr1`: 数字转中文 ["日","一","二","三","四","五","六","七","八","九","十"]
- `solarLunar.nStr2`: 日期转农历称呼 ["初","十","廿","卅"]
- `solarLunar.nStr3`: 月份转农历称呼 ["正","一","二","三","四","五","六","七","八","九","十","冬","腊"]
- `solarLunar.nStr4`: 年份数字转中文 ["零","一","二","三","四","五","六","七","八","九","十"]

### 辅助函数
- `solarLunar.toChinaYear(year)`: 农历年份转中文表示
- `solarLunar.toChinaMonth(month)`: 农历月份转中文表示
- `solarLunar.toChinaDay(day)`: 农历日期转中文表示
- `solarLunar.lYearDays(year)`: 返回农历年总天数
- `solarLunar.leapMonth(year)`: 返回农历年闰月（0表示无闰月）
- `solarLunar.leapDays(year)`: 返回农历年闰月天数
- `solarLunar.monthDays(year, month)`: 返回农历月天数
- `solarLunar.solarDays(year, month)`: 返回公历月天数
- `solarLunar.toGanZhi(offset)`: 根据偏移量返回天干地支
- `solarLunar.getTerm(year, termIndex)`: 获取指定年的节气日期
- `solarLunar.getAnimal(year, [month], [day])`: 获取生肖（可精确到立春）

## 错误处理

- 当输入参数不在有效范围时（如年份不在1900-2100），方法返回 `-1`
- 日期超出当月天数范围时，方法返回 `-1`
- 月份不在1-12范围时，方法返回 `-1`

## 特殊功能

### 精确生肖计算
通过 `getAnimal` 函数的完整参数形式可以基于立春日期进行精确生肖计算：
```javascript
// 精确计算（基于立春）
const animal = solarLunar.getAnimal(2023, 2, 5); // 2023年2月5日
```

### 节气检测
转换结果中的 `isTerm` 和 `term` 字段可以检测某天是否为节气日。

## 版本兼容性

当前版本保持与原始库的完全兼容，同时提供了现代化的ES模块支持。

## 性能特点

- 平均转换时间: <0.01ms
- 支持每秒250,000+次转换操作
- 优化的算法和数据结构