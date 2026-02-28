# SolarLunar 快速入门

## 1. 安装

使用 npm 安装：

```bash
npm install solarlunar
```

## 2. 基础使用

### 导入库

```javascript
// ES6 模块
import solarLunar from 'solarlunar';

// 或者 CommonJS
const solarLunar = require('solarlunar');
```

### 公历转农历

```javascript
// 将2023年10月15日转换为农历
const result = solarLunar.solar2lunar(2023, 10, 15);

console.log(result.lYear);  // 2023 (农历年)
console.log(result.lMonth); // 8   (农历月) 
console.log(result.lDay);   // 30  (农历日)
console.log(result.animal); // "兔" (生肖)
console.log(result.gzYear); // "癸卯" (年干支)
```

### 农历转公历

```javascript
// 将农历2023年八月三十转换为公历
const result = solarLunar.lunar2solar(2023, 8, 30);

console.log(result.cYear);  // 2023 (公历年)
console.log(result.cMonth); // 10  (公历月)
console.log(result.cDay);   // 15  (公历日)
```

## 3. 常用功能

### 获取中文表示

```javascript
const result = solarLunar.solar2lunar(2023, 10, 15);

console.log(result.yearCn);  // "二零二三年"
console.log(result.monthCn); // "八月" 
console.log(result.dayCn);   // "三十"
console.log(result.ncWeek);  // "星期日"
```

### 检测节气

```javascript
const result = solarLunar.solar2lunar(2023, 12, 22); // 冬至日

if (result.isTerm) {
  console.log(`今天是${result.term}节气！`); // "今天是冬至节气！"
}
```

### 生肖计算

```javascript
// 简单生肖
const animal = solarLunar.getAnimal(2023);
console.log(animal); // "兔"

// 精确生肖（考虑立春）
const preciseAnimal = solarLunar.getAnimal(2023, 2, 5); // 2023年2月5日
console.log(preciseAnimal); // "兔"
```

## 4. 常见场景

### 判断是否为今天

```javascript
const today = solarLunar.solar2lunar(); // 不传参数自动获取今天

if (today.isToday) {
  console.log(`今天是农历${today.lMonth}月${today.lDay}日`);
}
```

### 闰月处理

```javascript
// 检查某年是否有闰月
const leapMonth = solarLunar.leapMonth(2023);
if (leapMonth > 0) {
  console.log(`2023年有闰${leapMonth}月`);
} else {
  console.log('2023年无闰月');
}

// 农历转公历时处理闰月
const result = solarLunar.lunar2solar(2023, 2, 1, true); // 闰二月初一
```

## 5. 错误处理

```javascript
// 检查转换是否成功
const result = solarLunar.solar2lunar(2023, 13, 1); // 无效月份

if (result === -1) {
  console.log('转换失败：输入的日期无效');
} else {
  console.log('转换成功', result);
}
```

## 6. 性能提示

- 库的转换速度非常快（每秒可达25万次转换）
- 建议在循环中直接使用，无需缓存结果
- 支持1900-2100年的转换

## 7. 完整示例

```javascript
import solarLunar from 'solarlunar';

// 创建一个农历日历应用的简单示例
function showTodaysLunarInfo() {
  const today = solarLunar.solar2lunar(); // 获取今天信息
  
  console.log(`
    公历: ${today.cYear}年${today.cMonth}月${today.cDay}日 ${today.ncWeek}
    农历: ${today.yearCn} ${today.monthCn}${today.dayCn}
    生肖: ${today.animal}
    干支: ${today.gzYear}年 ${today.gzMonth}月 ${today.gzDay}日
    ${today.isTerm ? `节气: ${today.term}` : ''}
  `.trim());
}

showTodaysLunarInfo();
```

现在你已经掌握了 SolarLunar 的基本使用方法！要了解更多功能，请查看 [API 文档](API.md) 和 [使用示例](EXAMPLES.md)。