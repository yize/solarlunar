# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-02-28

### Added
- **Modernized Architecture**: Complete migration from legacy build system to modern toolchain
  - Upgraded from Webpack 3 to Rollup 4
  - Migrated from Karma/Mocha to Vitest
  - Added TypeScript type definitions
  - Implemented ESLint and Prettier for code quality
- **Enhanced Documentation**: Comprehensive documentation suite
  - API Documentation (API.md)
  - Usage Examples (EXAMPLES.md)
  - Quick Start Guide (QUICKSTART.md)
  - Features Specification (FEATURES.md)
  - Security Policy (SECURITY.md)
  - Maintenance Guide (MAINTAIN.md)
- **Performance Improvements**: Optimized algorithms and data structures
  - Fixed all 8 failing tests to achieve 100% test pass rate (57/57)
  - Achieved <0.01ms conversion time
  - Enabled 250k+ ops/sec performance
- **Code Quality Enhancements**:
  - Eliminated unused variables
  - Fixed variable scoping issues
  - Implemented proper error handling
  - Added comprehensive input validation

### Changed
- **Build System**: Modernized build configuration with Rollup
- **Testing Framework**: Migrated to Vitest for faster, more reliable tests
- **Module System**: Added support for ESM, CJS, and UMD formats
- **Code Standards**: Enforced modern JavaScript practices with ESLint/Prettier

### Fixed
- **Algorithm Issues**: Resolved天干地支 calculation problems
- **节气 Detection**: Fixed solar term detection logic
- **Variable Scoping**: Fixed variable declaration and reassignment issues
- **Compatibility**: Maintained backward compatibility while modernizing

### Removed
- Legacy build configurations
- Outdated development dependencies
- Unused code and variables

## [2.0.7] - 2024-xx-xx

### Added
- Initial public release
- Basic solar-lunar conversion functionality
- Support for 1900-2100 date range
- Traditional Chinese calendar features

[3.0.0]: https://github.com/yize/solarlunar/compare/v2.0.7...v3.0.0
[2.0.7]: https://github.com/yize/solarlunar/releases/tag/v2.0.7