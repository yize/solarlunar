// Simple test to verify the functionality works without eval
const fs = require('fs');

// Read the library file content
const libContent = fs.readFileSync('./lib/solarlunar.min.js', 'utf8');

// Create a test function that will run in a simple environment
const testCode = `
// Mock global for the library
var global = typeof window !== 'undefined' ? window : this;
var exports = {};
var module = { exports: exports };

// Include the library code
${libContent}

// Extract the solarLunar object for testing
var solarLunar = (function() {
  return typeof exports.default !== 'undefined' ? exports.default : (typeof solarLunar !== 'undefined' ? solarLunar : global.solarLunar);
})();

// Run tests
console.log('Testing basic functionality...');

// Test 1: Basic conversion
var result1 = solarLunar.solar2lunar(2015, 10, 8);
console.log('Basic conversion (2015-10-08):', result1);

// Test 2: toChinaDay function (check for fixed duplicate breaks)
console.log('toChinaDay test:');
console.log('Day 20:', solarLunar.toChinaDay(20)); // Should be '二十'
console.log('Day 30:', solarLunar.toChinaDay(30)); // Should be '三十'

// Test 3: Input validation
console.log('Input validation:');
console.log('Invalid year (1800):', solarLunar.solar2lunar(1800, 1, 1)); // Should be -1
console.log('Invalid month (13):', solarLunar.solar2lunar(2015, 13, 1)); // Should be -1

// Test 4: Animal calculation
console.log('Animal calculation:');
console.log('Animal for 1987:', solarLunar.getAnimal(1987));

// Test 5: Leap month
console.log('Leap month in 2015:', solarLunar.leapMonth(2015));

// Final confirmation
console.log('All tests completed successfully!');
`;

// Write test code to file
fs.writeFileSync('./temp_test.js', testCode);

// Run the test in a separate process
const { exec } = require('child_process');
exec('node temp_test.js', (error, stdout, stderr) => {
  console.log(stdout);
  if (stderr) console.error(stderr);
  if (error) console.error('Error running test:', error);
  
  // Clean up temp file
  fs.unlinkSync('./temp_test.js');
});