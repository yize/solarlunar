/**
 * 性能测试
 */

import solarLunar from './src/index.js';
import { performance } from 'perf_hooks';

console.log('=== 性能测试 ===');

// 测试大量转换的性能
const iterations = 10000;
console.log(`执行 ${iterations} 次转换操作...`);

// 记录开始时间
const startTime = performance.now();

for (let i = 0; i < iterations; i++) {
  // 测试公历转农历
  solarLunar.solar2lunar(2023, 5, 15);
  
  // 测试农历转公历
  solarLunar.lunar2solar(2023, 4, 25);
}

const endTime = performance.now();
const totalTime = endTime - startTime;
const avgTime = totalTime / (iterations * 2); // 两次转换操作

console.log(`总耗时: ${totalTime.toFixed(2)} ms`);
console.log(`平均每次操作耗时: ${avgTime.toFixed(4)} ms`);
console.log(`每秒可执行操作数: ${(1000 / avgTime).toFixed(2)}`);

// 测试边界值性能
console.log('\n测试边界值性能...');
const boundaryTests = [
  [1900, 1, 31], [2100, 12, 31], 
  [2000, 2, 29], [1999, 2, 28]
];

for (const [y, m, d] of boundaryTests) {
  const start = performance.now();
  solarLunar.solar2lunar(y, m, d);
  const end = performance.now();
  console.log(`${y}-${m}-${d}: ${(end - start).toFixed(4)} ms`);
}

console.log('\n性能测试完成！');