// Simple build script to generate the library file
const fs = require('fs');
const path = require('path');

// Read the source files
const indexContent = fs.readFileSync('./src/index.js', 'utf8');
const solarLunarContent = fs.readFileSync('./src/solarLunar.js', 'utf8');

// Read constant files
const lunarInfo = fs.readFileSync('./const/lunarInfo.js', 'utf8');
const solarMonth = fs.readFileSync('./const/solarMonth.js', 'utf8');
const gan = fs.readFileSync('./const/gan.js', 'utf8');
const zhi = fs.readFileSync('./const/zhi.js', 'utf8');
const animals = fs.readFileSync('./const/animals.js', 'utf8');
const lunarTerm = fs.readFileSync('./const/lunarTerm.js', 'utf8');
const lTermInfo = fs.readFileSync('./const/lTermInfo.js', 'utf8');
const nStr1 = fs.readFileSync('./const/nStr1.js', 'utf8');
const nStr2 = fs.readFileSync('./const/nStr2.js', 'utf8');
const nStr3 = fs.readFileSync('./const/nStr3.js', 'utf8');
const nStr4 = fs.readFileSync('./const/nStr4.js', 'utf8');

// Create a bundled version (not minified, but functional)
const bundleContent = `(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('solarLunar', factory) :
  (global.solarLunar = factory());
}(this, (function () { 'use strict';

  // Constants
  ${lunarInfo.replace('export default', 'var lunarInfo =')}
  ${solarMonth.replace('export default', 'var solarMonth =')}
  ${gan.replace('export default', 'var gan =')}
  ${zhi.replace('export default', 'var zhi =')}
  ${animals.replace('export default', 'var animals =')}
  ${lunarTerm.replace('export default', 'var lunarTerm =')}
  ${lTermInfo.replace('export default', 'var lTermInfo =')}
  ${nStr1.replace('export default', 'var nStr1 =')}
  ${nStr2.replace('export default', 'var nStr2 =')}
  ${nStr3.replace('export default', 'var nStr3 =')}
  ${nStr4.replace('export default', 'var nStr4 =')}

  // Main function
  ${solarLunarContent
    .replace(/import lunarInfo from \'..\/const\/lunarInfo\';/g, '')
    .replace(/import solarMonth from \'..\/const\/solarMonth\';/g, '')
    .replace(/import gan from \'..\/const\/gan\';/g, '')
    .replace(/import zhi from \'..\/const\/zhi\';/g, '')
    .replace(/import animals from \'..\/const\/animals\';/g, '')
    .replace(/import lunarTerm from \'..\/const\/lunarTerm\';/g, '')
    .replace(/import lTermInfo from \'..\/const\/lTermInfo\';/g, '')
    .replace(/import nStr1 from \'..\/const\/nStr1\';/g, '')
    .replace(/import nStr2 from \'..\/const\/nStr2\';/g, '')
    .replace(/import nStr3 from \'..\/const\/nStr3\';/g, '')
    .replace(/import nStr4 from \'..\/const\/nStr4\';/g, '')
    .replace(/export default solarLunar;/g, '')
    .replace(/(\/\/.*$)/gm, '') // Remove comments to avoid duplication issues
    .replace(/[\r\n]+/g, '\n')} // Normalize newlines

  return solarLunar;

})));`;

// Write the bundled file
fs.writeFileSync('./lib/solarlunar.min.js', bundleContent);

console.log('Build completed! Generated ./lib/solarlunar.min.js');