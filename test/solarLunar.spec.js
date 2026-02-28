import solarLunar from '../src/index.js';
const { solar2lunar, lunar2solar } = solarLunar;
import { describe, it, expect } from 'vitest';

const solar2lunarData = solar2lunar(2015, 10, 2); // 转换为阴历
const solar2lunarData2 = solar2lunar(2015, 10, 8); // 转换为阴历
const lunar2solarData = lunar2solar(2015, 10, 2); // 转换为公历
const lunar2solarData2 = lunar2solar(2015, 8, 26); // 转换为公历
const solar2lunarData3 = solar2lunar(2033, 12, 23); // 转换为阴历
const solar2lunarData4 = solar2lunar(2017, 12, 14); // 转换为阴历
const solar2lunarData5 = solar2lunar(1949, 8, 14); // 转换为阴历 7.20
const solar2lunarData6 = solar2lunar(1949, 9, 14); // 转换为阴历 闰月 7.20
const solar2lunarData7 = solar2lunar(1949, 10, 14); // 转换为阴历 8.23
const solar2lunarData8 = solar2lunar(2019, 1, 31); // 转换为阴历 2019.1.27 干支
const solar2lunarData9 = solar2lunar(2019, 2, 4); // 转换为阴历 2019.1.27 干支
const solar2lunarData10 = solar2lunar(2018, 2, 2); // 转换为阴历 2019.1.27 干支

// 新增测试用例：验证优化功能
const solar2lunarValidationTest1 = solar2lunar(1800, 1, 1); // 验证输入验证 - 年份超出范围
const solar2lunarValidationTest2 = solar2lunar(2015, 13, 1); // 验证输入验证 - 月份超出范围
const solar2lunarValidationTest3 = solar2lunar(2015, 2, 30); // 验证输入验证 - 日期超出范围

describe('solarLunar', () => {
  describe('solar2lunar', () => {
    it('should have property solar2lunar', () => {
      expect(solarLunar).toHaveProperty('solar2lunar');
    });
    
    it('lYear should equal 2015', () => {
      expect(solar2lunarData.lYear).toBe(2015);
    });
    
    it('lMonth should equal 8', () => {
      expect(solar2lunarData.lMonth).toBe(8);
    });
    
    it('lDay should equal 20', () => {
      expect(solar2lunarData.lDay).toBe(20);
    });
    
    it('animal should equal 羊', () => {
      expect(solar2lunarData.animal).toBe('羊');
    });
    
    it('yearCn should equal 二零一五年', () => {
      expect(solar2lunarData.yearCn).toBe('二零一五年');
    });
    
    it('monthCn should equal 八月', () => {
      expect(solar2lunarData.monthCn).toBe('八月');
    });
    
    it('dayCn should equal 二十', () => {
      expect(solar2lunarData.dayCn).toBe('二十');
    });
    
    it('gzYear should equal 乙未', () => {
      expect(solar2lunarData.gzYear).toBe('乙未');
    });
    
    it('gzMonth should equal 乙酉', () => {
      expect(solar2lunarData.gzMonth).toBe('乙酉');
    });
    
    it('gzDay should equal 辛亥', () => {
      expect(solar2lunarData.gzDay).toBe('辛亥');
    });
    
    it('isToday should equal false', () => {
      expect(solar2lunarData.isToday).toBe(false);
    });
    
    it('isLeap should equal false', () => {
      expect(solar2lunarData.isLeap).toBe(false);
    });
    
    it('nWeek should equal 5', () => {
      expect(solar2lunarData.nWeek).toBe(5);
    });
    
    it('ncWeek should equal 星期五', () => {
      expect(solar2lunarData.ncWeek).toBe('星期五');
    });
    
    it('isTerm should equal false', () => {
      expect(solar2lunarData.isTerm).toBe(false);
    });
    
    it('term should equal empty string', () => {
      expect(solar2lunarData.term).toBe('');
    });
  });

  describe('solar2lunar that has term', () => {
    it('isTerm should be true', () => {
      expect(solar2lunarData2.isTerm).toBe(true);
    });
    
    it('term should not be null', () => {
      expect(solar2lunarData2.term).not.toBeNull();
    });
    
    it('term should equal 寒露', () => {
      expect(solar2lunarData2.term).toBe('寒露');
    });
  });

  describe('lunar2solar', () => {
    it('should have property lunar2solar', () => {
      expect(solarLunar).toHaveProperty('lunar2solar');
    });
    
    it('lYear should equal 2015', () => {
      expect(lunar2solarData.lYear).toBe(2015);
    });
    
    it('lMonth should equal 10', () => {
      expect(lunar2solarData.lMonth).toBe(10);
    });
    
    it('lDay should equal 2', () => {
      expect(lunar2solarData.lDay).toBe(2);
    });
    
    it('animal should equal 羊', () => {
      expect(lunar2solarData.animal).toBe('羊');
    });
    
    it('yearCn should equal 二零一五年', () => {
      expect(solar2lunarData.yearCn).toBe('二零一五年');
    });
    
    it('monthCn should equal 十月', () => {
      expect(lunar2solarData.monthCn).toBe('十月');
    });
    
    it('dayCn should equal 初二', () => {
      expect(lunar2solarData.dayCn).toBe('初二');
    });
    
    it('gzYear should equal 乙未', () => {
      expect(lunar2solarData.gzYear).toBe('乙未');
    });
    
    it('gzMonth should equal 丁亥', () => {
      expect(lunar2solarData.gzMonth).toBe('丁亥');
    });
    
    it('gzDay should equal 癸巳', () => {
      expect(lunar2solarData.gzDay).toBe('癸巳');
    });
    
    it('isToday should equal false', () => {
      expect(lunar2solarData.isToday).toBe(false);
    });
    
    it('isLeap should equal false', () => {
      expect(lunar2solarData.isLeap).toBe(false);
    });
    
    it('nWeek should equal 5', () => {
      expect(lunar2solarData.nWeek).toBe(5);
    });
    
    it('ncWeek should equal 星期五', () => {
      expect(lunar2solarData.ncWeek).toBe('星期五');
    });
    
    it('isTerm should equal false', () => {
      expect(lunar2solarData.isTerm).toBe(false);
    });
    
    it('term should equal empty string', () => {
      expect(lunar2solarData.term).toBe('');
    });
  });

  describe('lunar2solar that has term', () => {
    it('isTerm should be true', () => {
      expect(lunar2solarData2.isTerm).toBe(true);
    });
    
    it('term should not be null', () => {
      expect(lunar2solarData2.term).not.toBeNull();
    });
    
    it('term should equal 寒露', () => {
      expect(lunar2solarData2.term).toBe('寒露');
    });
  });
  
  describe('2033/12/23', () => {
    it('should be leap', () => {
      expect(solar2lunarData3.isLeap).toBe(true);
    });
  });
  
  describe('2017/12/14', () => {
    it('should not be leap', () => {
      expect(solar2lunarData4.monthCn).toBe('十月');
    });
  });
  
  describe('1949/8/14', () => {
    it('monthCn should equal 七月', () => {
      expect(solar2lunarData5.monthCn).toBe('七月');
    });
    
    it('isLeap should equal false', () => {
      expect(solar2lunarData5.isLeap).toBe(false);
    });
  });
  
  describe('1949/9/14', () => {
    it('monthCn should equal 闰七月', () => {
      expect(solar2lunarData6.monthCn).toBe('闰七月');
    });
    
    it('isLeap should equal true', () => {
      expect(solar2lunarData6.isLeap).toBe(true);
    });
  });
  
  describe('1949/10/14', () => {
    it('monthCn should equal 八月', () => {
      expect(solar2lunarData7.monthCn).toBe('八月');
    });
    
    it('isLeap should equal false', () => {
      expect(solar2lunarData7.isLeap).toBe(false);
    });
  });
  
  describe('2019/2/1', () => {
    it('gzYear should be 戊戌', () => {
      expect(solar2lunarData8.gzYear).toBe('戊戌');
    });
  });
  
  describe('2019/2/5', () => {
    it('gzYear should be 己亥', () => {
      expect(solar2lunarData9.gzYear).toBe('己亥');
    });
  });
  
  describe('2018/2/2', () => {
    it('gzYear should be 丁酉', () => {
      expect(solar2lunarData10.gzYear).toBe('丁酉');
    });
  });
  
  describe('Input validation', () => {
    it('should return -1 for year out of range', () => {
      expect(solar2lunarValidationTest1).toBe(-1);
    });
    
    it('should return -1 for month out of range', () => {
      expect(solar2lunarValidationTest2).toBe(-1);
    });
    
    it('should return -1 for day out of range', () => {
      expect(solar2lunarValidationTest3).toBe(-1);
    });
  });
  
  describe('Function-specific tests', () => {
    it('toChinaDay should handle day 20 correctly', () => {
      expect(solarLunar.toChinaDay(20)).toBe('二十');
    });
    
    it('toChinaDay should handle day 30 correctly', () => {
      expect(solarLunar.toChinaDay(30)).toBe('三十');
    });
    
    it('getAnimal should handle precise calculation', () => {
      // Test with year only (old behavior)
      expect(solarLunar.getAnimal(1987)).toBe('兔');
      // Test with precise calculation (new behavior)
      expect(solarLunar.getAnimal(1987, 1, 1)).toBe('虎'); // Before 立春
      expect(solarLunar.getAnimal(1987, 3, 1)).toBe('兔'); // After 立春
    });
  });
});