// 测试节气计算
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// 重新构建常量
const lTermInfo = require('./const/lTermInfo.js').default;
const lunarTerm = require('./const/lunarTerm.js').default;

// 原始getTerm函数
const getTerm = function (y, n) {
  if (y < 1900 || y > 2100) return -1;
  if (n < 1 || n > 24) return -1;
  var _table = lTermInfo[y - 1900];
  var _info = [
    parseInt('0x' + _table.substr(0, 5)).toString(),
    parseInt('0x' + _table.substr(5, 5)).toString(),
    parseInt('0x' + _table.substr(10, 5)).toString(),
    parseInt('0x' + _table.substr(15, 5)).toString(),
    parseInt('0x' + _table.substr(20, 5)).toString(),
    parseInt('0x' + _table.substr(25, 5)).toString()
  ];
  var _calDay = [
    _info[0].substr(0, 1),
    _info[0].substr(1, 2),
    _info[0].substr(3, 1),
    _info[0].substr(4, 2),

    _info[1].substr(0, 1),
    _info[1].substr(1, 2),
    _info[1].substr(3, 1),
    _info[1].substr(4, 2),

    _info[2].substr(0, 1),
    _info[2].substr(1, 2),
    _info[2].substr(3, 1),
    _info[2].substr(4, 2),

    _info[3].substr(0, 1),
    _info[3].substr(1, 2),
    _info[3].substr(3, 1),
    _info[3].substr(4, 2),

    _info[4].substr(0, 1),
    _info[4].substr(1, 2),
    _info[4].substr(3, 1),
    _info[4].substr(4, 2),

    _info[5].substr(0, 1),
    _info[5].substr(1, 2),
    _info[5].substr(3, 1),
    _info[5].substr(4, 2)
  ];
  return parseInt(_calDay[n - 1]);
};

console.log('=== 修复后的节气调试信息 ===');
console.log('2015年寒露（第19个节气）的日期:', getTerm(2015, 19));
console.log('2015年霜降（第20个节气）的日期:', getTerm(2015, 20));
console.log('10月份的节气：');
console.log('寒露 (19):', getTerm(2015, 19));
console.log('霜降 (20):', getTerm(2015, 20));
console.log('对应节气名称：');
console.log('节气19:', lunarTerm[18], '(寒露)');
console.log('节气20:', lunarTerm[19], '(霜降)');

console.log('\n测试日期 2015-10-8 (m=10, d=8):');
const firstNode = getTerm(2015, 10 * 2 - 1); // 10月节是第19个节气 寒露
const secondNode = getTerm(2015, 10 * 2); // 10月气是第20个节气 霜降
console.log('firstNode (m * 2 - 1 = 19):', firstNode, '(寒露)');
console.log('secondNode (m * 2 = 20):', secondNode, '(霜降)');
console.log('测试日期: 8');
console.log('firstNode === d?', firstNode === 8);
console.log('secondNode === d?', secondNode === 8);