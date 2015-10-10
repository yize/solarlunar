# solar2lunar
-----

[![Build Status](https://travis-ci.org/yize/solorlunar.svg?branch=master)](https://travis-ci.org/yize/solarlunar)

公历和阴历互转

支持年份：`1900-2100`

## 用法：

```
var solarLunar = require('solarLunar')

var solar2lunarData = solarLunar.solar2lunar(2015, 10, 2);// 转换为阴历
var lunar2solarData = solarLunar.lunar2solar(2015, 10, 2);// 转换为公历
```


## API

### (`object`) solar2lunar

### (`object`) lunar2solar
