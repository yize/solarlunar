const solarLunar = require('./lib/solarlunar.min.js');

// 测试基本功能
console.log('Testing basic functionality...');

// 测试1: 基本转换
console.log('Test 1 - Basic conversion:');
const result1 = solarLunar.solar2lunar(2015, 10, 8);
console.log(result1);

// 测试2: 修复的toChinaDay函数
console.log('\nTest 2 - toChinaDay function:');
console.log('Day 20:', solarLunar.toChinaDay(20)); // 应该返回'二十'
console.log('Day 30:', solarLunar.toChinaDay(30)); // 应该返回'三十'

// 测试3: 输入验证
console.log('\nTest 3 - Input validation:');
console.log('Invalid year:', solarLunar.solar2lunar(1800, 1, 1)); // 应该返回-1
console.log('Invalid month:', solarLunar.solar2lunar(2015, 13, 1)); // 应该返回-1
console.log('Invalid day:', solarLunar.solar2lunar(2015, 2, 30)); // 应该返回-1 (2月没有30日)

// 测试4: 生肖精确计算
console.log('\nTest 4 - Animal calculation:');
console.log('Year 1987 animal:', solarLunar.getAnimal(1987));
console.log('Year 1987 with date (before spring):', solarLunar.getAnimal(1987, 1, 1));
console.log('Year 1987 with date (after spring):', solarLunar.getAnimal(1987, 3, 1));

// 测试5: 节气计算
console.log('\nTest 5 - Solar term calculation:');
console.log('First solar term in 1987:', solarLunar.getTerm(1987, 1));
console.log('Spring begins in 1987:', solarLunar.getTerm(1987, 3));

console.log('\nAll tests completed successfully!');