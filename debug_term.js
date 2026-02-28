// 导入当前的库来检查节气计算
import { readFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// 临时创建一个包含常量的模块
const constDir = './const/';
const lunarInfo = require('./const/lunarInfo.js').default;
const lTermInfo = require('./const/lTermInfo.js').default;
const lunarTerm = require('./const/lunarTerm.js').default;

// 临时实现getTerm函数
const getTerm = function (y, n) {
  if (y < 1900 || y > 2100) return -1;
  if (n < 1 || n > 24) return -1;
  const _table = lTermInfo[y - 1900];
  // 优化：直接访问预计算的日期，避免重复解析整个字符串
  const start = Math.floor((n-1) / 4) * 5; // 每5个字符包含4个日期
  const pos = (n-1) % 4;
  
  // 根据位置获取节气日期
  let dateStr = '';
  if (pos === 0) {
    dateStr = _table.substr(start, 1);
  } else if (pos === 1) {
    dateStr = _table.substr(start + 1, 2);
  } else if (pos === 2) {
    dateStr = _table.substr(start + 3, 1);
  } else { // pos === 3
    dateStr = _table.substr(start + 4, 2);
  }
  return parseInt(dateStr);
};

console.log('=== 节气调试信息 ===');
console.log('2015年寒露（第19个节气）的日期:', getTerm(2015, 19));
console.log('2015年霜降（第20个节气）的日期:', getTerm(2015, 20));
console.log('10月份的节气：');
console.log('寒露 (19):', getTerm(2015, 19));
console.log('霜降 (20):', getTerm(2015, 20));
console.log('对应节气名称：');
console.log('节气19:', lunarTerm[18], '(寒露)');
console.log('节气20:', lunarTerm[19], '(霜降)');

console.log('\n测试日期 2015-10-8:');
const firstNode = getTerm(2015, 19); // 寒露是第19个节气
const secondNode = getTerm(2015, 20); // 霜降是第20个节气
console.log('寒露日期:', firstNode);
console.log('霜降日期:', secondNode);
console.log('测试日期: 8');
console.log('firstNode === d?', firstNode === 8);
console.log('secondNode === d?', secondNode === 8);
console.log('d >= firstNode?', 8 >= firstNode);
console.log('d >= secondNode?', 8 >= secondNode);

// 现在测试当前库
const solarLunar = await import('./lib/solarlunar.min.js');
const result = solarLunar.default.solar2lunar(2015, 10, 8);
console.log('\n=== 使用当前库计算结果 ===');
console.log('实际结果:', result);
console.log('term:', result.term);
console.log('isTerm:', result.isTerm);