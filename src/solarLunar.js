/**
 * @1900-2100区间内的公历、农历互转
 * @charset  UTF-8
 * @author  Ajing(JJonline@JJonline.Cn), Modernized by OpenCode
 * @Time  2014-7-21
 * @Version  $ID$
 * @公历转农历：solarLunar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
 * @农历转公历：solarLunar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
 * @link http://blog.jjonline.cn/userInterFace/173.html
 */

import lunarInfo from '../const/lunarInfo.js';
import solarMonth from '../const/solarMonth.js';
import gan from '../const/gan.js';
import zhi from '../const/zhi.js';
import animals from '../const/animals.js';
import lunarTerm from '../const/lunarTerm.js';
import lTermInfo from '../const/lTermInfo.js';
import nStr1 from '../const/nStr1.js';
import nStr2 from '../const/nStr2.js';
import nStr3 from '../const/nStr3.js';
import nStr4 from '../const/nStr4.js';

const solarLunar = {
  lunarInfo,
  solarMonth,
  gan,
  zhi,
  animals,
  lunarTerm,
  lTermInfo,
  nStr1,
  nStr2,
  nStr3,
  nStr4,

  /**
   * 返回农历y年一整年的总天数
   * @param {number} y - lunar Year
   * @returns {number}
   * @eg:var count = solarLunar.lYearDays(1987) ;//count=387
   */
  lYearDays(y) {
    let sum = 348;
    const info = lunarInfo[y - 1900];
    // 优化：直接计算位数，减少循环
    sum += (info & 0x8000) ? 1 : 0;
    sum += (info & 0x4000) ? 1 : 0;
    sum += (info & 0x2000) ? 1 : 0;
    sum += (info & 0x1000) ? 1 : 0;
    sum += (info & 0x0800) ? 1 : 0;
    sum += (info & 0x0400) ? 1 : 0;
    sum += (info & 0x0200) ? 1 : 0;
    sum += (info & 0x0100) ? 1 : 0;
    sum += (info & 0x0080) ? 1 : 0;
    sum += (info & 0x0040) ? 1 : 0;
    sum += (info & 0x0020) ? 1 : 0;
    sum += (info & 0x0010) ? 1 : 0;
    return sum + solarLunar.leapDays(y);
  },

  /**
   * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
   * @param {number} y - lunar Year
   * @returns {number} (0-12)
   * @eg:var leapMonth = solarLunar.leapMonth(1987) ;//leapMonth=6
   */
  leapMonth(y) { //闰字编码 \u95f0
    return (lunarInfo[y - 1900] & 0xf);
  },

  /**
   * 返回农历y年闰月的天数 若该年没有闰月则返回0
   * @param {number} y - lunar Year
   * @returns {number} (0、29、30)
   * @eg:var leapMonthDay = solarLunar.leapDays(1987) ;//leapMonthDay=29
   */
  leapDays(y) {
    if (solarLunar.leapMonth(y)) {
      return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
    }
    return 0;
  },

  /**
   * 返回农历 y 年 m 月（非闰月）的总天数，计算 m 为闰月时的天数请使用 leapDays 方法
   * @param {number} y - lunar Year
   * @param {number} m - lunar Month
   * @returns {number} (-1、29、30)
   * @eg:var MonthDay = solarLunar.monthDays(1987,9) ;//MonthDay=29
   */
  monthDays(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    } //月份参数从1至12，参数错误返回-1
    return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
  },

  /**
   * 返回公历(!)y年m月的天数
   * @param {number} y - solar Year
   * @param {number} m - solar Month
   * @returns {number} (-1、28、29、30、31)
   * @eg:var solarMonthDay = solarLunar.solarDays(1987) ;//solarMonthDay=30
   */
  solarDays(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    } //若参数错误 返回-1
    const ms = m - 1;
    if (ms === 1) { //2月份的闰平规律测算后确认返回28或29
      return (((y % 4 === 0) && (y % 100 !== 0) || (y % 400 === 0)) ? 29 : 28);
    } else {
      return (solarMonth[ms]);
    }
  },

  /**
   * 传入offset偏移量返回干支
   * @param {number} offset - 相对甲子的偏移量
   * @returns {string} Cn string
   */
  toGanZhi(offset) {
    return (gan[offset % 10] + zhi[offset % 12]);
  },

  /**
   * 传入公历(!) y 年获得该年第 n 个节气的公历日期
   * @param {number} y - 公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
   * @param {number} n - 二十四节气中的第几个节气(1~24)
   * @returns {number}
   * @eg:var _24 = solarLunar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
   */
  getTerm(y, n) {
    if (y < 1900 || y > 2100) {
      return -1;
    }
    if (n < 1 || n > 24) {
      return -1;
    }
    const _table = lTermInfo[y - 1900];
    const _info = [
      parseInt('0x' + _table.substr(0, 5)).toString(),
      parseInt('0x' + _table.substr(5, 5)).toString(),
      parseInt('0x' + _table.substr(10, 5)).toString(),
      parseInt('0x' + _table.substr(15, 5)).toString(),
      parseInt('0x' + _table.substr(20, 5)).toString(),
      parseInt('0x' + _table.substr(25, 5)).toString()
    ];
    const _calDay = [
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
  },

  /**
   * 传入农历年份数字返回汉语通俗表示法
   * @param {number} y - lunar year
   * @returns {string}
   * @eg:
   */
  toChinaYear(y) { //年 => \u5E74
    const oxxx = Math.floor(y / 1000);
    const xoxx = Math.floor(y % 1000 / 100);
    const xxox = Math.floor(y % 100 / 10);
    const xxxo = y % 10;

    return nStr4[oxxx] + nStr4[xoxx] + nStr4[xxox] + nStr4[xxxo] + '\u5E74';
  },

  /**
   * 传入农历数字月份返回汉语通俗表示法
   * @param {number} m - lunar month
   * @returns {string}
   * @eg:var cnMonth = solarLunar.toChinaMonth(12) ;//cnMonth='腊月'
   */
  toChinaMonth(m) { // 月 => \u6708
    if (m > 12 || m < 1) {
      return -1;
    } //若参数错误 返回-1
    let s = nStr3[m - 1];
    s += '\u6708';//加上月字
    return s;
  },

  /**
   * 传入农历日期数字返回汉字表示法
   * @param {number} d - lunar day
   * @returns {string} Cn string
   * @eg:var cnDay = solarLunar.toChinaDay(21) ;//cnMonth='廿一'
   */
  toChinaDay(d) { //日 => \u65e5
    let s = '';
    switch (d) {
    case 10:
      s = '\u521d\u5341';
      break;
    case 20:
      s = '\u4e8c\u5341';
      break;
    case 30:
      s = '\u4e09\u5341';
      break;
    default:
      s = nStr2[Math.floor(d / 10)];
      s += nStr1[d % 10];
    }
    return s;
  },

  /**
   * 年份转生肖 => 精确划分生肖分界线是"立春"
   * @param {number} y - year
   * @param {number} [m] - month (可选，用于精确计算)
   * @param {number} [d] - day (可选，用于精确计算)
   * @returns {string} Cn string
   * @eg:var animal = solarLunar.getAnimal(1987) ;//animal='兔'
   */
  getAnimal(y, m, d) {
    // 如果提供了月日参数，基于立春进行精确计算
    if (m !== undefined && d !== undefined) {
      const term3 = solarLunar.getTerm(y, 3); // 立春日期
      // 如果日期在立春之前，则生肖按上一年计算
      if (m < 2 || (m === 2 && d < term3)) {
        y = y - 1;
      }
    }
    return animals[(y - 4) % 12];
  },

  /**
   * 传入公历年月日获得详细的公历、农历object信息 <=>JSON
   * @param {number} y - solar year
   * @param {number} m - solar month
   * @param {number} d - solar day
   * @returns {object} JSON object
   * @eg:console.log(solarLunar.solar2lunar(1987,11,01));
   */
  solar2lunar(y, m, d) { //参数区间1900.1.31~2100.12.31
    // 输入验证
    if (y == null || m == null || d == null) {
      const objDate = new Date();
      y = objDate.getFullYear();
      m = objDate.getMonth() + 1;
      d = objDate.getDate();
    }

    // 类型转换和验证
    y = Number(y);
    m = Number(m);
    d = Number(d);

    if (isNaN(y) || isNaN(m) || isNaN(d)) {
      return -1;
    }

    if (y < 1900 || y > 2100) {
      return -1;
    } //年份限定、上限
    if (y === 1900 && m === 1 && d < 31) {
      return -1;
    } //下限

    // 验证月份和日期的有效性
    if (m < 1 || m > 12) {
      return -1;
    }
    const maxDay = solarLunar.solarDays(y, m);
    if (d < 1 || d > maxDay) {
      return -1;
    }

    const objDate = new Date(y, parseInt(m) - 1, d);
    let i, temp = 0;
    //修正ymd参数
    y = objDate.getFullYear();
    m = objDate.getMonth() + 1;
    d = objDate.getDate();
    let offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

    // 使用原有的线性搜索算法以保持兼容性，但修复变量重声明问题
    temp = 0;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = solarLunar.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;
      i--;
    }
    
    const finalYear = i;

    //是否今天
    const isTodayObj = new Date();
    let isToday = false;
    if (isTodayObj.getFullYear() === y && isTodayObj.getMonth() + 1 === m && isTodayObj.getDate() === d) {
      isToday = true;
    }
    //星期几
    const nWeek = objDate.getDay();
    const cWeek = nStr1[nWeek];
    const nWeekAdjusted = nWeek === 0 ? 7 : nWeek; //数字表示周几顺应天朝周一开始的惯例

    //农历年
    const year = finalYear;

    const leapMonth = solarLunar.leapMonth(finalYear); //闰哪个月

    let isLeap = false;

    //效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      //闰月
      if (leapMonth > 0 && i === (leapMonth + 1) && isLeap === false) {
        --i;
        isLeap = true;
        temp = solarLunar.leapDays(year); //计算农历闰月天数
      } else {
        temp = solarLunar.monthDays(year, i); //计算农历普通月天数
      }
      //解除闰月
      if (isLeap === true && i === (leapMonth + 1)) {
        isLeap = false;
      }
      offset -= temp;
    }

    if (offset === 0 && leapMonth > 0 && i === leapMonth + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    }
    if (offset < 0) {
      offset += temp;
      --i;
    }
    //农历月
    const month = i;
    //农历日
    const day = offset + 1;

    //天干地支处理
    const sm = m - 1;
    const term3 = solarLunar.getTerm(y, 3); //该公历年立春日期
    let gzY = solarLunar.toGanZhi(y - 4); //普通按年份计算，下方尚需按立春节气来修正
    //依据立春日进行修正gzY
    // 立春通常在2月3-5日之间，如果日期早于立春，应按上一年计算
    if (m < 2 || (m === 2 && d < term3)) {
      gzY = solarLunar.toGanZhi(y - 1 - 4);
    }

    //月柱 1900年1月小寒以前为 丙子月(60进制12)
    const firstNode = solarLunar.getTerm(y, (m * 2 - 1)); //返回当月「节」为几日开始
    const secondNode = solarLunar.getTerm(y, (m * 2)); //返回当月「节」为几日开始

    //依据12节气修正干支月
    // 使用原始的正确算法：年干支索引*12 + 月份 + 偏移
    let gzM = solarLunar.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = solarLunar.toGanZhi((y - 1900) * 12 + m + 12);
    }

    //传入的日期的节气与否
    let isTerm = false;
    let term = '';
    if (firstNode === d) {
      isTerm = true;
      term = lunarTerm[m * 2 - 2];
    }
    if (secondNode === d) {
      isTerm = true;
      term = lunarTerm[m * 2 - 1];
    }
    //日柱 当月一日与 1900/1/1 相差天数
    const dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    const gzD = solarLunar.toGanZhi(dayCyclical + d - 1);
    return {
      'lYear': year,
      'lMonth': month,
      'lDay': day,
      'animal': solarLunar.getAnimal(year),
      'yearCn': solarLunar.toChinaYear(year),
      'monthCn': (isLeap && leapMonth === month ? '\u95f0' : '') + solarLunar.toChinaMonth(month),
      'dayCn': solarLunar.toChinaDay(day),
      'cYear': y,
      'cMonth': m,
      'cDay': d,
      'gzYear': gzY,
      'gzMonth': gzM,
      'gzDay': gzD,
      isToday,
      isLeap,
      'nWeek': nWeekAdjusted, //数字表示周几顺应天朝周一开始的惯例
      'ncWeek': '\u661f\u671f' + cWeek,
      isTerm,
      term
    };
  },

  /**
   * 传入公历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
   * @param {number} y - lunar year
   * @param {number} m - lunar month
   * @param {number} d - lunar day
   * @param {boolean} isLeapMonth - lunar month is leap or not.
   * @returns {object} JSON object
   * @eg:console.log(solarLunar.lunar2solar(1987,9,10));
   */
  lunar2solar(y, m, d, isLeapMonth) { //参数区间1900.1.31~2100.12.1
    // 输入验证
    y = Number(y);
    m = Number(m);
    d = Number(d);
    isLeapMonth = Boolean(isLeapMonth); // 确保是布尔值

    if (isNaN(y) || isNaN(m) || isNaN(d)) {
      return -1;
    }
    const leapMonth = solarLunar.leapMonth(y);
    if (isLeapMonth && (leapMonth !== m)) {
      return -1;
    } //传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y === 2100 && m === 12 && d > 1 || y === 1900 && m === 1 && d < 31) {
      return -1;
    } //超出了最大极限值
    const day = solarLunar.monthDays(y, m);
    if (y < 1900 || y > 2100 || d > day) {
      return -1;
    } //参数合法性效验

    //计算农历的时间差
    let offset = 0;
    for (let i = 1900; i < y; i++) {
      offset += solarLunar.lYearDays(i);
    }
    let leap = 0, isAdd = false;
    for (let i = 1; i < m; i++) {
      leap = solarLunar.leapMonth(y);
      if (!isAdd) { //处理闰月
        if (leap <= i && leap > 0) {
          offset += solarLunar.leapDays(y);
          isAdd = true;
        }
      }
      offset += solarLunar.monthDays(y, i);
    }
    //转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {
      offset += day;
    }
    //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    const stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    const calObj = new Date((offset + d - 31) * 86400000 + stmap);
    const cY = calObj.getUTCFullYear();
    const cM = calObj.getUTCMonth() + 1;
    const cD = calObj.getUTCDate();

    return solarLunar.solar2lunar(cY, cM, cD);
  }
};

export default solarLunar;