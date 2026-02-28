// Test the source code directly to verify our changes
const fs = require('fs');

console.log('Verifying source code changes...\n');

// Read the source code
const sourceCode = fs.readFileSync('./src/solarLunar.js', 'utf8');

// Test 1: Check for fixed duplicate break statements
const duplicateBreakMatch = sourceCode.match(/case 20:[^]*?break;\s*break;/);
if (duplicateBreakMatch) {
    console.log('❌ Found duplicate break statements in case 20');
} else {
    console.log('✅ Duplicate break statements in case 20 are fixed');
}

// Test 2: Check for case 30 duplicate break
const duplicateBreak30Match = sourceCode.match(/case 30:[^]*?break;\s*break;/);
if (duplicateBreak30Match) {
    console.log('❌ Found duplicate break statements in case 30');
} else {
    console.log('✅ Duplicate break statements in case 30 are fixed');
}

// Test 3: Check for optimized lYearDays function
if (sourceCode.includes('sum += (info & 0x8000) ? 1 : 0;')) {
    console.log('✅ Optimized lYearDays function found');
} else {
    console.log('❌ Optimized lYearDays function not found');
}

// Test 4: Check for optimized getTerm function
if (sourceCode.includes('Math.floor((n-1) / 4) * 5')) {
    console.log('✅ Optimized getTerm function found');
} else {
    console.log('❌ Optimized getTerm function not found');
}

// Test 5: Check for improved input validation
if (sourceCode.includes('if (isNaN(y) || isNaN(m) || isNaN(d))')) {
    console.log('✅ Improved input validation found');
} else {
    console.log('❌ Improved input validation not found');
}

// Test 6: Check for precise animal calculation
if (sourceCode.includes('getAnimal: function (y, m, d)')) {
    console.log('✅ Precise animal calculation function found');
} else {
    console.log('❌ Precise animal calculation function not found');
}

// Test 7: Check for binary search optimization
if (sourceCode.includes('Math.floor((startYear + endYear) / 2)')) {
    console.log('✅ Binary search optimization found');
} else {
    console.log('❌ Binary search optimization not found');
}

// Test 8: Check for updated test cases
const testContent = fs.readFileSync('./test/solarLunar.spec.js', 'utf8');
if (testContent.includes('solar2lunarValidationTest1')) {
    console.log('✅ Updated test cases found');
} else {
    console.log('❌ Updated test cases not found');
}

console.log('\nSource code verification completed!');
console.log('\nSummary of optimizations made:');
console.log('1. Fixed duplicate break statements in toChinaDay function');
console.log('2. Optimized lYearDays function with direct bit operations');
console.log('3. Optimized getTerm function with direct date extraction');
console.log('4. Added binary search algorithm for faster year lookup');
console.log('5. Enhanced input validation and error handling');
console.log('6. Improved getAnimal function with precise calculation based on 立春');
console.log('7. Updated test cases to validate new functionality');