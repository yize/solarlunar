# 维护指南

## 项目结构

```
solarlunar/
├── src/                 # 源代码
│   └── solarLunar.js    # 主要实现
├── const/               # 常量数据
├── test/                # 测试文件
├── dist/                # 构建输出
├── docs/                # 文档（可选）
├── .github/             # GitHub 工作流
├── rollup.config.js     # 构建配置
├── eslint.config.js     # 代码检查配置
├── vite.config.js       # 测试配置
├── package.json         # 项目配置
└── README.md            # 项目说明
```

## 开发流程

### 1. 环境设置
```bash
npm install
```

### 2. 代码质量检查
```bash
# 代码规范检查
npm run lint

# 代码格式化
npm run format

# 类型检查
npm run typecheck
```

### 3. 测试
```bash
# 运行所有测试
npm test

# 开发模式运行测试
npm run test:watch

# 测试 UI 界面
npm run test:ui
```

### 4. 构建
```bash
# 构建生产版本
npm run build

# 开发模式监听构建
npm run dev
```

## 质量保证

### 测试覆盖率
- 必须保持 100% 的测试通过率
- 新功能必须有相应的测试用例
- 修复 bug 时需要添加回归测试

### 代码质量
- 使用 ESLint 进行代码规范检查
- 使用 Prettier 进行代码格式化
- 保持良好的代码复杂度

### 性能要求
- 单次转换操作时间 < 0.01ms
- 每秒支持 > 250,000 次转换操作
- 保持高效的内存使用

## 发布流程

### 版本管理
```bash
# 使用 release-it 自动发布
npm run release
```

### 发布前检查清单
- [ ] 所有测试通过 (57/57)
- [ ] 代码质量检查通过
- [ ] 性能基准测试满足要求
- [ ] API 文档已更新
- [ ] README 已更新
- [ ] CHANGELOG 已更新

### 自动化检查脚本
```bash
# 一次性运行所有检查
npm test && npm run lint && npm run typecheck && npm run build
```

## 依赖管理

### 安全检查
```bash
# 检查安全漏洞
npm run security

# 查看依赖更新
npm run outdated

# 审计依赖
npm run audit
```

### 依赖更新策略
- 开发依赖可定期更新以获取最新功能和安全修复
- 生产依赖需谨慎更新，确保向后兼容
- 所有依赖更新需通过完整测试

## 贡献指南

### 代码风格
- 使用 ESLint 和 Prettier 配置
- 采用现代 JavaScript (ES2020+)
- 添加适当的 JSDoc 注释

### 提交规范
- 使用语义化提交消息
- 遵循 conventional commits 规范

### 测试要求
- 新功能必须包含测试
- 修复必须包含回归测试
- 保持 100% 的测试覆盖率

## 性能监控

### 基准测试
```bash
# 运行性能测试
npm run perf
```

### 性能指标
- 转换速度: < 0.01ms/次
- 吞吐量: > 250,000 ops/sec
- 内存占用: 优化的数据结构

## 故障排除

### 常见问题
1. **测试失败**: 检查算法实现是否与预期相符
2. **性能下降**: 检查是否有不必要的计算或循环
3. **构建错误**: 检查依赖版本和配置文件

### 调试工具
- 使用 `npm run test:ui` 进行可视化测试调试
- 使用 `npm run dev` 进行实时构建调试

## 项目健康度

### 健康度指标
- 测试通过率: 100%
- 代码覆盖率: > 95%
- 性能指标: 符合要求
- 安全漏洞: 0

### 监控脚本
```bash
# 一次性运行所有健康度检查
npm test && npm run lint && npm run security && npm run perf
```

## 未来维护方向

### 功能增强
- 可能的国际化支持
- 更多农历相关功能
- 性能优化

### 技术升级
- 跟踪现代 JavaScript 特性
- 保持依赖更新
- 改进开发工具链