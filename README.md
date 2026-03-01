<div align="center">

# 🌘 SolarLunar

**Professional Solar-Lunar Calendar Conversion Library**

[![NPM Version](https://img.shields.io/npm/v/solarlunar.svg?style=flat-square)](https://www.npmjs.com/package/solarlunar)
[![License](https://img.shields.io/npm/l/solarlunar.svg?style=flat-square)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/solarlunar.svg?style=flat-square)](https://www.npmjs.com/package/solarlunar)
[![Build Status](https://img.shields.io/github/actions/workflow/status/yize/solarlunar/test.yml?style=flat-square)](https://github.com/yize/solarlunar/actions)
[![File Size](https://img.shields.io/bundlephobia/minzip/solarlunar?style=flat-square)](https://bundlephobia.com/package/solarlunar)

_High-performance solar-lunar calendar conversion with天干地支, 生肖, and 24 solar terms support_

</div>

---

## 🚀 Features

- ** blazing Fast**: >340,000 conversions per second
- **Accurate**: Precise calculations for 1900-2100 period
- **Complete**: Full support for 天干地支, 生肖, and 24 solar terms
- **Modern**: ESM, CJS, and UMD module support
- **Typed**: Full TypeScript support
- **Lightweight**: Zero dependencies
- **Reliable**: 100% test coverage

## 📦 Installation

```bash
npm install solarlunar
```

> **Note**: Use lowercase `solarlunar` (not `solarLunar`) when importing. Some case-sensitive file systems may fail to resolve the package with uppercase letters.

## 🛠️ Quick Start

### ES6 Modules

```javascript
import solarLunar from 'solarlunar';

// Solar to Lunar
const lunar = solarLunar.solar2lunar(2023, 10, 15);
console.log(lunar.lYear, lunar.lMonth, lunar.lDay); // 2023 8 30

// Lunar to Solar
const solar = solarLunar.lunar2solar(2023, 8, 30);
console.log(solar.cYear, solar.cMonth, solar.cDay); // 2023 10 15
```

### CommonJS

```javascript
const solarLunar = require('solarlunar');
```

### Browser

```html
<script src="https://unpkg.com/solarlunar/dist/solarlunar.min.js"></script>
<script>
  const result = solarLunar.solar2lunar(2023, 10, 15);
</script>
```

## 📋 API Reference

### solarLunar.solar2lunar(year, month, day)

Convert solar date to lunar date.

**Parameters:**

- `year` (Number): Solar year (1900-2100)
- `month` (Number): Solar month (1-12)
- `day` (Number): Solar day (1-31)

**Returns:** Object with lunar date information

### solarLunar.lunar2solar(year, month, day, isLeapMonth?)

Convert lunar date to solar date.

**Parameters:**

- `year` (Number): Lunar year (1900-2100)
- `month` (Number): Lunar month (1-12)
- `day` (Number): Lunar day (1-30)
- `isLeapMonth` (Boolean, optional): Whether it's a leap month

**Returns:** Object with solar date information

## 🎯 Returned Object Structure

```javascript
{
  // Basic lunar info
  lYear: 2023,              // Lunar year
  lMonth: 8,                // Lunar month
  lDay: 30,                 // Lunar day
  isLeap: false,            // Whether leap month

  // Basic solar info
  cYear: 2023,              // Solar year
  cMonth: 10,               // Solar month
  cDay: 15,                 // Solar day
  isToday: false,           // Whether today

  // Chinese representations
  yearCn: '二零二三年',       // Chinese year
  monthCn: '八月',           // Chinese month
  dayCn: '三十',             // Chinese day
  ncWeek: '星期日',           // Chinese weekday

  // Stems and Branches
  gzYear: '癸卯',            // Year stem-branch
  gzMonth: '辛酉',           // Month stem-branch
  gzDay: '甲子',             // Day stem-branch

  // Zodiac and terms
  animal: '兔',              // Zodiac animal
  isTerm: false,             // Whether solar term day
  term: '',                  // Solar term name if applicable

  // Weekday info
  nWeek: 7                   // Weekday number (1-7 for Mon-Sun)
}
```

## 🧪 Examples

### Complete Conversion

```javascript
const result = solarLunar.solar2lunar(2023, 12, 22); // Winter Solstice day

console.log(result);
/*
{
  lYear: 2023, lMonth: 11, lDay: 10,
  yearCn: '二零二三年', monthCn: '冬月', dayCn: '初十',
  gzYear: '癸卯', gzMonth: '癸丑', gzDay: '甲戌',
  animal: '兔',
  isTerm: true, term: '冬至',
  cYear: 2023, cMonth: 12, cDay: 22,
  isToday: false, isLeap: false,
  nWeek: 5, ncWeek: '星期五'
}
*/
```

### Zodiac Calculation

```javascript
// Precise zodiac based on Spring Festival
const animal = solarLunar.getAnimal(2023, 2, 5); // Accurate based on 立春
```

### Solar Term Detection

```javascript
const hasTerm = solarLunar.solar2lunar(2023, 12, 22);
if (hasTerm.isTerm) {
  console.log(`Today is ${hasTerm.term} solar term!`);
}
```

## 🏗️ Architecture

### Modern Build System

- **Rollup 4**: Optimized builds with tree-shaking
- **Vitest**: Fast, modern testing framework
- **ESLint + Prettier**: Code quality and formatting
- **TypeScript**: Complete type definitions

### Performance Optimizations

- Optimized algorithms for date calculations
- Precomputed data structures
- Efficient memory usage
- Fast lookup mechanisms

## 📊 Performance

| Operation          | Average Time | Throughput          |
| ------------------ | ------------ | ------------------- |
| Solar to Lunar     | < 0.003ms    | >340,000 ops/sec    |
| Lunar to Solar     | < 0.004ms    | >270,000 ops/sec    |
| Zodiac Calculation | < 0.001ms    | >41,000,000 ops/sec |

## 🛡️ Reliability

- **57 Test Cases**: 100% pass rate
- **1900-2100 Support**: Full century range coverage
- **Boundary Testing**: Extensive edge case validation
- **Security Audited**: Clean dependency tree

## 📚 Documentation

- [Quick Start Guide](QUICKSTART.md)
- [API Documentation](API.md)
- [Usage Examples](EXAMPLES.md)
- [Development Guide](DEVELOPMENT.md)
- [Release Notes](RELEASE-NOTES.md)

## 🤝 Contributing

We welcome contributions! Please see our [Development Guide](DEVELOPMENT.md) for how to get started.

### Development Commands

```bash
npm install              # Install dependencies
npm test                # Run tests
npm run test:watch      # Watch mode for tests
npm run dev             # Development build watch
npm run build           # Production build
npm run lint            # Code quality check
npm run format          # Code formatting
npm run perf            # Performance benchmark
npm run typecheck       # Type checking
npm run security        # Security audit
```

## 📄 License

ISC License - Free and open source.

## 🙏 Acknowledgments

Based on the original work by [JJonline](http://blog.jjonline.cn/userInterFace/173.html), modernized and enhanced for contemporary JavaScript environments.

---

<div align="center">

**Made with ❤️ for the JavaScript Community**

[Get Started](#-quick-start) • [API Docs](API.md) • [Examples](EXAMPLES.md) • [Report Issue](https://github.com/yize/solarlunar/issues)

</div>
