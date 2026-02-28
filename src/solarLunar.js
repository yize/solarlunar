/**
 * @1900-2100区间内的公历、农历互转
 * @charset  UTF-8
 * @author  Ajing(JJonline@JJonline.Cn)
 * @Time  2014-7-21
 * @Version  $ID$
 * @公历转农历：solarLunar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
 * @农历转公历：solarLunar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
 * @link http://blog.jjonline.cn/userInterFace/173.html
 */

import lunarInfo from '../const/lunarInfo';
import solarMonth from '../const/solarMonth';
import gan from '../const/gan';
import zhi from '../const/zhi';
import animals from '../const/animals';
import lunarTerm from '../const/lunarTerm';
import lTermInfo from '../const/lTermInfo';
import nStr1 from '../const/nStr1';
import nStr2 from '../const/nStr2';
import nStr3 from '../const/nStr3';
import nStr4 from '../const/nStr4';

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
   * @param lunar Year
   * @return Number
   * @eg:var count = solarLunar.lYearDays(1987) ;//count=387
   */
  lYearDays: function (y) {
    var sum = 348;
    var info = solarLunar.lunarInfo[y - 1900];
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
    return (sum + solarLunar.leapDays(y));
  },


  /**
   * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
   * @param lunar Year
   * @return Number (0-12)
   * @eg:var leapMonth = solarLunar.leapMonth(1987) ;//leapMonth=6
   */
  leapMonth: function (y) { //闰字编码 \u95f0
    return (solarLunar.lunarInfo[y - 1900] & 0xf);
  },


  /**
   * 返回农历y年闰月的天数 若该年没有闰月则返回0
   * @param lunar Year
   * @return Number (0、29、30)
   * @eg:var leapMonthDay = solarLunar.leapDays(1987) ;//leapMonthDay=29
   */
  leapDays: function (y) {
    if (solarLunar.leapMonth(y)) {
      return ((solarLunar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
    }
    return (0);
  },


  /**
   * 返回农历 y 年 m 月（非闰月）的总天数，计算 m 为闰月时的天数请使用 leapDays 方法
   * @param lunar Year
   * @return Number (-1、29、30)
   * @eg:var MonthDay = solarLunar.monthDays(1987,9) ;//MonthDay=29
   */
  monthDays: function (y, m) {
    if (m > 12 || m < 1) {
      return -1;
    }//月份参数从1至12，参数错误返回-1
    return ((solarLunar.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
  },


  /**
   * 返回公历(!)y年m月的天数
   * @param solar Year
   * @return Number (-1、28、29、30、31)
   * @eg:var solarMonthDay = solarLunar.leapDays(1987) ;//solarMonthDay=30
   */
  solarDays: function (y, m) {
    if (m > 12 || m < 1) {
      return -1;
    } //若参数错误 返回-1
    var ms = m - 1;
    if (ms == 1) { //2月份的闰平规律测算后确认返回28或29
      return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
    } else {
      return (solarLunar.solarMonth[ms]);
    }
  },


  /**
   * 传入offset偏移量返回干支
   * @param offset 相对甲子的偏移量
   * @return Cn string
   */
  toGanZhi: function (offset) {
    return (solarLunar.gan[offset % 10] + solarLunar.zhi[offset % 12]);
  },


  /**
   * 传入公历(!) y 年获得该年第 n 个节气的公历日期
   * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
   * @return number Number
   * @eg:var _24 = solarLunar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
   */
  getTerm: function (y, n) {
    if (y < 1900 || y > 2100) {
      return -1;
    }
    if (n < 1 || n > 24) {
      return -1;
    }
    var _table = solarLunar.lTermInfo[y - 1900];
    // 优化：直接访问预计算的日期，避免重复解析整个字符串
    var start = Math.floor((n-1) / 4) * 5; // 每5个字符包含4个日期
    var pos = (n-1) % 4;
    
    // 根据位置获取节气日期
    var dateStr = '';
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
  },

  /**
   * 传入农历年份数字返回汉语通俗表示法
   * @param lunar year
   * @return string
   * @eg:
   */
  toChinaYear: function (y) { //年 => \u5E74
    var oxxx = parseInt(y / 1000);
    var xoxx = parseInt(y % 1000 / 100);
    var xxox = parseInt(y % 100 / 10);
    var xxxo = y % 10;

    return solarLunar.nStr4[oxxx] + solarLunar.nStr4[xoxx] + solarLunar.nStr4[xxox] + solarLunar.nStr4[xxxo] + "\u5E74";
  },

  /**
   * 传入农历数字月份返回汉语通俗表示法
   * @param lunar month
   * @return number string
   * @eg:var cnMonth = solarLunar.toChinaMonth(12) ;//cnMonth='腊月'
   */
  toChinaMonth: function (m) { // 月 => \u6708
    if (m > 12 || m < 1) {
      return -1;
    } //若参数错误 返回-1
    var s = solarLunar.nStr3[m - 1];
    s += "\u6708";//加上月字
    return s;
  },


  /**
   * 传入农历日期数字返回汉字表示法
   * @param lunar day
   * @return Cn string
   * @eg:var cnDay = solarLunar.toChinaDay(21) ;//cnMonth='廿一'
   */
  toChinaDay: function (d) { //日 => \u65e5
    var s;
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
        s = solarLunar.nStr2[Math.floor(d / 10)];
        s += solarLunar.nStr1[d % 10];
    }
    return (s);
  },


  /**
   * 年份转生肖 => 精确划分生肖分界线是"立春"
   * @param y year
   * @param m month (可选，用于精确计算)
   * @param d day (可选，用于精确计算)
   * @return Cn string
   * @eg:var animal = solarLunar.getAnimal(1987) ;//animal='兔'
   */
  getAnimal: function (y, m, d) {
    // 如果提供了月日参数，基于立春进行精确计算
    if (m !== undefined && d !== undefined) {
      var term3 = solarLunar.getTerm(y, 3); // 立春日期
      // 如果日期在立春之前，则生肖按上一年计算
      if (m < 2 || (m === 2 && d < term3)) {
        y = y - 1;
      }
    }
    return solarLunar.animals[(y - 4) % 12];
  },


  /**
   * 传入公历年月日获得详细的公历、农历object信息 <=>JSON
   * @param y  solar year
   * @param m solar month
   * @param d  solar day
   * @return JSON object
   * @eg:console.log(solarLunar.solar2lunar(1987,11,01));
   */
  solar2lunar: function (y, m, d) { //参数区间1900.1.31~2100.12.31
    // 输入验证
    if (y == null || m == null || d == null) {
      var objDate = new Date();
      y = objDate.getFullYear();
      m = objDate.getMonth() + 1;
      d = objDate.getDate();
    }
    
    // 类型转换和验证
    y = parseInt(y, 10);
    m = parseInt(m, 10);
    d = parseInt(d, 10);
    
    if (isNaN(y) || isNaN(m) || isNaN(d)) {
      return -1;
    }
    
    if (y < 1900 || y > 2100) {
      return -1;
    }//年份限定、上限
    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    }//下限
    
    // 验证月份和日期的有效性
    if (m < 1 || m > 12) {
      return -1;
    }
    var maxDay = solarLunar.solarDays(y, m);
    if (d < 1 || d > maxDay) {
      return -1;
    }
    if (y < 1900 || y > 2100) {
      return -1;
    }//年份限定、上限
    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    }//下限
    if (!y) { //未传参 获得当天
      var objDate = new Date();
    } else {
      var objDate = new Date(y, parseInt(m) - 1, d);
    }
    var i, leap = 0, temp = 0;
    //修正ymd参数
    var y = objDate.getFullYear(), m = objDate.getMonth() + 1, d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    
    // 优化：使用二分查找快速定位年份
    var startYear = 1900, endYear = 2100;
    var currentOffset = 0;
    var midYear;
    
    while (startYear <= endYear) {
      midYear = Math.floor((startYear + endYear) / 2);
      var tempOffset = currentOffset;
      for (i = startYear; i <= midYear; i++) {
        tempOffset += solarLunar.lYearDays(i);
      }
      
      if (tempOffset <= offset) {
        startYear = midYear + 1;
        currentOffset = tempOffset;
      } else {
        endYear = midYear - 1;
      }
    }
    
    // 精确调整年份和offset
    i = startYear - 1;
    offset -= currentOffset - solarLunar.lYearDays(i);
    
    if (offset < 0) {
      offset += solarLunar.lYearDays(--i);
    }

    //是否今天
    var isTodayObj = new Date(), isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    }
    //星期几
    var nWeek = objDate.getDay(), cWeek = solarLunar.nStr1[nWeek];
    if (nWeek == 0) {
      nWeek = 7;
    }//数字表示周几顺应天朝周一开始的惯例
    //农历年
    var year = i;

    var leap = solarLunar.leapMonth(i); //闰哪个月

    var isLeap = false;
    
    //效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      //闰月
      if (leap > 0 && i == (leap + 1) && isLeap == false) {
        --i;
        isLeap = true;
        temp = solarLunar.leapDays(year); //计算农历闰月天数
      }
      else {
        temp = solarLunar.monthDays(year, i);//计算农历普通月天数
      }
      //解除闰月
      if (isLeap == true && i == (leap + 1)) {
        isLeap = false;
      }
      offset -= temp;
    }

    if (offset == 0 && leap > 0 && i == leap + 1)
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    if (offset < 0) {
      offset += temp;
      --i;
    }
    //农历月
    var month = i;
    //农历日
    var day = offset + 1;

    //天干地支处理
    var sm = m - 1;
    var term3 = solarLunar.getTerm(y, 3); //该公历年立春日期
    var gzY = solarLunar.toGanZhi(y - 4);//普通按年份计算，下方尚需按立春节气来修正
    var termTimestamp = new Date(y, 1, term3).getTime();
    var dayTimestamp = new Date(y, sm, d).getTime();
    //依据立春日进行修正gzY
    if (dayTimestamp < termTimestamp) {
      gzY = solarLunar.toGanZhi(y - 5);
    }

    //月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = solarLunar.getTerm(y, (m * 2 - 1));//返回当月「节」为几日开始
    var secondNode = solarLunar.getTerm(y, (m * 2));//返回当月「节」为几日开始

    //依据12节气修正干支月
    var gzM = solarLunar.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = solarLunar.toGanZhi((y - 1900) * 12 + m + 12);
    }

    //传入的日期的节气与否
    var isTerm = false;
    var term = "";
    if (firstNode == d) {
      isTerm = true;
      term = solarLunar.lunarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
      isTerm = true;
      term = solarLunar.lunarTerm[m * 2 - 1];
    }
    //日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = solarLunar.toGanZhi(dayCyclical + d - 1);
    return {
      'lYear': year,
      'lMonth': month,
      'lDay': day,
      'animal': solarLunar.getAnimal(year),
      'yearCn': solarLunar.toChinaYear(year),
      'monthCn': (isLeap && leap === month ? "\u95f0" : '') + solarLunar.toChinaMonth(month),
      'dayCn': solarLunar.toChinaDay(day),
      'cYear': y,
      'cMonth': m,
      'cDay': d,
      'gzYear': gzY,
      'gzMonth': gzM,
      'gzDay': gzD,
      'isToday': isToday,
      'isLeap': isLeap,
      'nWeek': nWeek,
      'ncWeek': "\u661f\u671f" + cWeek,
      'isTerm': isTerm,
      'term': term
    };
  },


  /**
   * 传入公历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
   * @param y  lunar year
   * @param m lunar month
   * @param d  lunar day
   * @param isLeapMonth  lunar month is leap or not.
   * @return JSON object
   * @eg:console.log(solarLunar.lunar2solar(1987,9,10));
   */
  lunar2solar: function (y, m, d, isLeapMonth) {	//参数区间1900.1.31~2100.12.1
    // 输入验证
    y = parseInt(y, 10);
    m = parseInt(m, 10);
    d = parseInt(d, 10);
    isLeapMonth = !!isLeapMonth; // 确保是布尔值
    
    if (isNaN(y) || isNaN(m) || isNaN(d)) {
      return -1;
    }
    var leapOffset = 0;
    var leapMonth = solarLunar.leapMonth(y);
    var leapDay = solarLunar.leapDays(y);
    if (isLeapMonth && (leapMonth != m)) {
      return -1;
    }//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
      return -1;
    }//超出了最大极限值
    var day = solarLunar.monthDays(y, m);
    if (y < 1900 || y > 2100 || d > day) {
      return -1;
    }//参数合法性效验

    //计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += solarLunar.lYearDays(i);
    }
    var leap = 0, isAdd = false;
    for (var i = 1; i < m; i++) {
      leap = solarLunar.leapMonth(y);
      if (!isAdd) {//处理闰月
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
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return solarLunar.solar2lunar(cY, cM, cD);
  }
};

export default solarLunar;
