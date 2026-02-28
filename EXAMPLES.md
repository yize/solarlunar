# SolarLunar 使用示例

## 基础转换

### 公历转农历

```javascript
import solarLunar from 'solarlunar';

// 基础转换
const result = solarLunar.solar2lunar(2023, 10, 15);
console.log(result);
/*
输出:
{
  lYear: 2023,
  lMonth: 8,
  lDay: 30,
  animal: '兔',
  yearCn: '二零二三年',
  monthCn: '八月',
  dayCn: '三十',
  gzYear: '癸卯',
  gzMonth: '辛酉',
  gzDay: '甲子',
  cYear: 2023,
  cMonth: 10,
  cDay: 15,
  isToday: false,
  isLeap: false,
  nWeek: 7,
  ncWeek: '星期日',
  isTerm: false,
  term: ''
}
*/
```

### 农历转公历

```javascript
// 农历转公历
const solarResult = solarLunar.lunar2solar(2023, 8, 30);
console.log(solarResult.cYear, solarResult.cMonth, solarResult.cDay); // 2023 10 15
```

## 节气检测

```javascript
// 检测节气日
const winterSolstice = solarLunar.solar2lunar(2023, 12, 22); // 冬至
console.log(winterSolstice.isTerm); // true
console.log(winterSolstice.term); // "冬至"

// 非节气日
const regularDay = solarLunar.solar2lunar(2023, 12, 23);
console.log(regularDay.isTerm); // false
console.log(regularDay.term); // ""
```

## 闰月处理

```javascript
// 农历转公历（闰月）
const leapMonthResult = solarLunar.lunar2solar(2023, 2, 15, true); // 2023年闰二月十五
console.log(leapMonthResult);

// 检查某年是否有闰月
const leapMonth = solarLunar.leapMonth(2023);
console.log(leapMonth); // 0 表示无闰月，其他数字表示闰月

// 获取闰月天数
const leapDays = solarLunar.leapDays(2020); // 2020年有闰四月
console.log(leapDays); // 29 或 30
```

## 天干地支

```javascript
// 天干地支转换
const dateInfo = solarLunar.solar2lunar(2024, 2, 10); // 甲辰年正月初一
console.log(dateInfo.gzYear); // "甲辰"
console.log(dateInfo.gzMonth); // "丙寅" 
console.log(dateInfo.gzDay); // 具体的日柱

// 直接获取天干地支
const ganZhi = solarLunar.toGanZhi(35); // 从甲子开始数第36个
console.log(ganZhi); // "乙亥"
```

## 生肖计算

```javascript
// 基础生肖
const animal1 = solarLunar.getAnimal(2023);
console.log(animal1); // "兔"

// 精确生肖（基于立春）
const animal2 = solarLunar.getAnimal(2023, 1, 31); // 立春前
console.log(animal2); // "虎" (按2022年计算)
const animal3 = solarLunar.getAnimal(2023, 2, 5); // 立春后  
console.log(animal3); // "兔" (按2023年计算)
```

## 中文显示

```javascript
const date = solarLunar.solar2lunar(2023, 11, 25);

// 中文月日
console.log(date.yearCn);  // "二零二三年"
console.log(date.monthCn); // "十月"
console.log(date.dayCn);   // "十一"

// 月份中文转换
const monthCn = solarLunar.toChinaMonth(11);
console.log(monthCn); // "冬月"

// 日期中文转换
const dayCn = solarLunar.toChinaDay(21);
console.log(dayCn); // "廿一"
```

## 批量转换示例

```javascript
// 批量转换多个日期
const dates = [
  [2023, 1, 1],
  [2023, 2, 14], 
  [2023, 5, 1],
  [2023, 10, 1],
  [2023, 12, 25]
];

const results = dates.map(([year, month, day]) => {
  const lunar = solarLunar.solar2lunar(year, month, day);
  return {
    solar: `${year}-${month}-${day}`,
    lunar: `${lunar.lYear}年${lunar.lMonth}月${lunar.lDay}日`,
    animal: lunar.animal,
    gzYear: lunar.gzYear
  };
});

console.log(results);
```

## 节假日应用

```javascript
// 判断是否为传统节日（基于农历）
function isTraditionalFestival(year, month, day) {
  const lunar = solarLunar.solar2lunar(year, month, day);
  
  // 春节 (正月初一)
  if (lunar.lMonth === 1 && lunar.lDay === 1) {
    return '春节';
  }
  
  // 元宵节 (正月十五)  
  if (lunar.lMonth === 1 && lunar.lDay === 15) {
    return '元宵节';
  }
  
  // 端午节 (五月初五)
  if (lunar.lMonth === 5 && lunar.lDay === 5) {
    return '端午节';
  }
  
  // 中秋节 (八月十五)
  if (lunar.lMonth === 8 && lunar.lDay === 15) {
    return '中秋节';
  }
  
  // 除夕 (腊月最后一天)
  const maxDays = solarLunar.monthDays(year, 12);
  if (lunar.lMonth === 12 && lunar.lDay === maxDays) {
    return '除夕';
  }
  
  return null;
}

// 测试
const festival = isTraditionalFestival(2024, 2, 10); // 公历2024年2月10日
console.log(festival); // "春节" (农历正月初一)
```

## 错误处理

```javascript
// 错误输入处理
const invalidResult = solarLunar.solar2lunar(1800, 1, 1); // 年份超出范围
console.log(invalidResult); // -1

const invalidResult2 = solarLunar.solar2lunar(2023, 13, 1); // 月份超出范围
console.log(invalidResult2); // -1

const invalidResult3 = solarLunar.solar2lunar(2023, 2, 30); // 日期超出范围
console.log(invalidResult3); // -1

// 安全的转换函数
function safeSolar2Lunar(year, month, day) {
  const result = solarLunar.solar2lunar(year, month, day);
  if (result === -1) {
    throw new Error(`无效的日期: ${year}-${month}-${day}`);
  }
  return result;
}
```

## 性能优化示例

```javascript
// 批量转换的高效实现
function batchConvert(startDate, days) {
  const results = [];
  const date = new Date(startDate);
  
  for (let i = 0; i < days; i++) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const lunar = solarLunar.solar2lunar(year, month, day);
    results.push({
      solar: `${year}-${month}-${day}`,
      lunar: lunar,
      isToday: lunar.isToday
    });
    
    date.setDate(date.getDate() + 1);
  }
  
  return results;
}

// 转换一年的数据
const yearData = batchConvert('2023-01-01', 365);
console.log(`转换了 ${yearData.length} 天的数据`);
```

## 实用工具函数

```javascript
// 获取某年所有的节气
function getAllTermsInYear(year) {
  const terms = [];
  for (let i = 1; i <= 24; i++) {
    const day = solarLunar.getTerm(year, i);
    const termName = solarLunar.lunarTerm[i - 1];
    
    // 计算具体日期
    let month = Math.ceil(i / 2); // 大月节气
    if (i % 2 === 0) {
      month = i / 2;
    } else {
      month = (i + 1) / 2;
    }
    
    terms.push({
      name: termName,
      date: `${year}-${month}-${day}`
    });
  }
  return terms;
}

// 使用示例
const yearTerms = getAllTermsInYear(2023);
console.log(yearTerms[0]); // 第一个节气
```

这些示例展示了 SolarLunar 库的各种功能和使用场景，从基础转换到高级应用都有涵盖。