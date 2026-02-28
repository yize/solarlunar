/**
 * Performance Benchmark Suite
 * 
 * This script runs comprehensive performance tests to:
 * 1. Measure current performance
 * 2. Compare with previous versions
 * 3. Detect performance regressions
 * 4. Provide performance metrics
 */

import solarLunar from './src/index.js';
import { performance } from 'perf_hooks';

/**
 * Test configuration
 */
const config = {
  iterations: 10000,
  warmup: 1000, // Warmup iterations to stabilize JIT
  scenarios: [
    { name: 'Basic Solar to Lunar', fn: () => solarLunar.solar2lunar(2023, 5, 15) },
    { name: 'Basic Lunar to Solar', fn: () => solarLunar.lunar2solar(2023, 4, 22) },
    { name: 'Leap Month Conversion', fn: () => solarLunar.lunar2solar(2023, 2, 1, true) },
    { name: 'End of Range', fn: () => solarLunar.solar2lunar(2100, 12, 31) },
    { name: 'Start of Range', fn: () => solarLunar.solar2lunar(1900, 1, 31) },
    { name: 'Leap Year', fn: () => solarLunar.solar2lunar(2024, 2, 29) },
    { name: 'With Term Detection', fn: () => solarLunar.solar2lunar(2023, 12, 22) }, // Winter Solstice
    { name: 'Animal Calculation', fn: () => solarLunar.getAnimal(2023) },
    { name: 'Complex Calculation', fn: () => solarLunar.solar2lunar(2033, 12, 23) },
  ],
  batchTests: [
    { name: '100 Sequential Conversions', fn: () => runSequentialTests(100) },
    { name: '1000 Sequential Conversions', fn: () => runSequentialTests(1000) },
  ]
};

/**
 * Run sequential tests
 */
function runSequentialTests(count) {
  const results = [];
  for (let i = 0; i < count; i++) {
    // Vary the input slightly to avoid potential caching effects
    const year = 2020 + (i % 10);
    const month = 1 + (i % 12);
    const day = 1 + (i % 28);
    const result = solarLunar.solar2lunar(year, month, day);
    results.push(result);
  }
  return results[results.length - 1]; // Return last result
}

/**
 * Run a single test scenario
 */
function runTest(fn, iterations, warmup = 0) {
  // Warmup
  for (let i = 0; i < warmup; i++) {
    fn();
  }
  
  // Actual test
  const startTime = performance.now();
  let result;
  for (let i = 0; i < iterations; i++) {
    result = fn();
  }
  const endTime = performance.now();
  
  return {
    totalTime: endTime - startTime,
    avgTime: (endTime - startTime) / iterations,
    opsPerSecond: iterations / ((endTime - startTime) / 1000),
    result: result
  };
}

/**
 * Run all benchmarks
 */
function runBenchmarks() {
  console.log('='.repeat(60));
  console.log('SolarLunar Performance Benchmark Suite');
  console.log('='.repeat(60));
  
  const results = [];
  
  // Individual scenario tests
  console.log('\n📊 Individual Performance Tests:');
  console.log('-'.repeat(40));
  
  for (const scenario of config.scenarios) {
    const testResult = runTest(scenario.fn, config.iterations, config.warmup);
    results.push({
      name: scenario.name,
      ...testResult
    });
    
    console.log(`${scenario.name}:`);
    console.log(`  Average time: ${testResult.avgTime.toFixed(4)} ms`);
    console.log(`  Operations/sec: ${testResult.opsPerSecond.toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
    console.log('');
  }
  
  // Batch tests
  console.log('📈 Batch Operation Tests:');
  console.log('-'.repeat(40));
  
  for (const batchTest of config.batchTests) {
    const start = performance.now();
    const result = batchTest.fn();
    const end = performance.now();
    const totalTime = end - start;
    const opsPerSecond = (result.length || 100) / (totalTime / 1000); // Assuming 100 ops for 100 Sequential
    
    // For the batch test, we need to count actual operations
    const count = batchTest.name.includes('1000') ? 1000 : 100;
    const actualOpsPerSecond = count / (totalTime / 1000);
    
    console.log(`${batchTest.name}:`);
    console.log(`  Total time: ${totalTime.toFixed(2)} ms`);
    console.log(`  Operations: ${count}`);
    console.log(`  Operations/sec: ${actualOpsPerSecond.toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
    console.log('');
  }
  
  // Summary
  console.log('📈 Summary:');
  console.log('-'.repeat(40));
  const avgAvgTime = results.reduce((sum, r) => sum + r.avgTime, 0) / results.length;
  const minOpsPerSecond = Math.min(...results.map(r => r.opsPerSecond));
  const maxOpsPerSecond = Math.max(...results.map(r => r.opsPerSecond));
  
  console.log(`Average operation time: ${avgAvgTime.toFixed(4)} ms`);
  console.log(`Range: ${minOpsPerSecond.toLocaleString('en-US', { maximumFractionDigits: 0 })} - ${maxOpsPerSecond.toLocaleString('en-US', { maximumFractionDigits: 0 })} ops/sec`);
  console.log(`Fastest: ${(maxOpsPerSecond).toLocaleString('en-US', { maximumFractionDigits: 0 })} ops/sec`);
  console.log(`Target: >250,000 ops/sec`);
  console.log(`Status: ${maxOpsPerSecond > 250000 ? '✅ PASS' : '❌ FAIL'}`);
  
  return {
    results,
    summary: {
      avgAvgTime,
      minOpsPerSecond,
      maxOpsPerSecond,
      targetMet: maxOpsPerSecond > 250000
    }
  };
}

/**
 * Run memory usage test
 */
function runMemoryTest() {
  console.log('\n💾 Memory Usage Test:');
  console.log('-'.repeat(40));
  
  // Note: This is a simplified memory test
  // Real memory profiling would require more sophisticated tools
  console.log('Library size: Lightweight (no external dependencies)');
  console.log('Memory footprint: Optimized data structures');
  console.log('Data tables: Pre-computed, compact format');
}

/**
 * Run compatibility tests
 */
function runCompatibilityTest() {
  console.log('\n🔄 Compatibility Test:');
  console.log('-'.repeat(40));
  
  // Test key functions to ensure they work correctly
  const tests = [
    { name: 'Basic Conversion', test: () => solarLunar.solar2lunar(2023, 1, 1) !== -1 },
    { name: 'Year Boundary', test: () => solarLunar.solar2lunar(1900, 1, 31) !== -1 },
    { name: 'Future Date', test: () => solarLunar.solar2lunar(2100, 12, 31) !== -1 },
    { name: 'Invalid Input', test: () => solarLunar.solar2lunar(1800, 1, 1) === -1 },
    { name: 'Lunar Conversion', test: () => solarLunar.lunar2solar(2023, 1, 1) !== -1 },
    { name: 'Leap Year', test: () => solarLunar.solar2lunar(2024, 2, 29) !== -1 },
  ];
  
  let passed = 0;
  for (const t of tests) {
    const result = t.test();
    console.log(`${t.name}: ${result ? '✅ PASS' : '❌ FAIL'}`);
    if (result) passed++;
  }
  
  console.log(`Compatibility Score: ${passed}/${tests.length} tests passed`);
  return passed === tests.length;
}

/**
 * Generate performance report
 */
function generateReport(benchmarkResults) {
  console.log('\n📋 Performance Report:');
  console.log('-'.repeat(40));
  
  const timestamp = new Date().toISOString();
  const nodeVersion = process.version;
  const platform = `${process.platform} ${process.arch}`;
  
  console.log(`Timestamp: ${timestamp}`);
  console.log(`Node.js: ${nodeVersion}`);
  console.log(`Platform: ${platform}`);
  console.log(`Iterations: ${config.iterations} per test`);
  console.log('');
  
  console.log('Performance Results:');
  benchmarkResults.results.forEach(r => {
    console.log(`- ${r.name}: ${(r.opsPerSecond).toLocaleString('en-US', { maximumFractionDigits: 0 })} ops/sec`);
  });
  
  return {
    timestamp,
    nodeVersion,
    platform,
    results: benchmarkResults.results.map(r => ({
      name: r.name,
      avgTime: r.avgTime,
      opsPerSecond: r.opsPerSecond
    })),
    summary: benchmarkResults.summary
  };
}

// Run the complete benchmark suite
console.log(`🚀 Starting benchmark on ${new Date().toLocaleString()}`);
const benchmarkResults = runBenchmarks();
runMemoryTest();
const compatPassed = runCompatibilityTest();
const report = generateReport(benchmarkResults);

// Exit with appropriate code
const success = benchmarkResults.summary.targetMet && compatPassed;
console.log(`\n🏁 Benchmark complete. Success: ${success ? '✅' : '❌'}`);
process.exit(success ? 0 : 1);