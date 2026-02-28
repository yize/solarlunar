# 发布指南

## 版本发布流程

### 1. 发布前检查清单
- [ ] 所有测试通过 (57/57)
- [ ] 代码质量检查通过 (ESLint)
- [ ] 类型检查通过 (TypeScript)
- [ ] 构建成功 (Rollup)
- [ ] 性能基准满足要求 (>250,000 ops/sec)
- [ ] 文档完整且更新
- [ ] CHANGELOG.md 更新
- [ ] package.json 版本号正确

### 2. 颞新版本号
根据变更类型选择合适的版本号更新：
- **主版本号 (X.0.0)**: 重大API变更或不兼容更新
- **次版本号 (X.Y.0)**: 向后兼容的新功能
- **修订版本 (X.Y.Z)**: 向后兼容的错误修复

### 3. 自动发布流程
```bash
# 使用 release-it 自动发布
npm run release
```

### 4. 手动发布流程
如果需要手动发布：

#### 4.1 更新版本号
```bash
npm version [major|minor|patch] -m "Release: v%s"
```

#### 4.2 构建项目
```bash
npm run build
```

#### 4.3 发布到 npm
```bash
npm publish
```

#### 4.4 推送标签
```bash
git push origin --tags
```

## 发布配置

### release-it 配置
当前使用 release-it 工具自动化发布流程，配置项包括：
- 自动更新 package.json 版本
- 自动创建 Git tag
- 自动推送到远程仓库
- 遵活的提交消息模板

### npm 发布设置
- 仅发布必要的文件 (dist/, README.md, LICENSE 等)
- 排除开发文件和临时文件
- 确保类型定义文件正确发布

## 发布后工作

### 1. GitHub Releases
- 为新版本创建 GitHub Release
- 附上 CHANGELOG 中的变更说明
- 附加构建后的文件 (如果需要)

### 2. 通知渠道
- 在相关社区发布更新通知
- 更新项目网站或文档站点
- 通知依赖此库的项目

### 3. 后续监控
- 监控 npm 下载量
- 关注用户反馈和 issue
- 监控性能指标

## 回滚流程

如果发布后发现问题，需要快速回滚：

### 1. 紧急回滚
```bash
# 取销发布 (如果立即发现问题)
npm unpublish [package]@[version]

# 或者发布修复版本
npm version patch -m "Fix: quick fix for critical issue"
npm run release
```

### 2. 代碼回滚
```bash
# 回滚到上一个稳定版本的 tag
git reset --hard v[previous.version]

# 创建新的修复版本
npm version patch
```

## 版本策略

### 语义化版本控制
- 遵循 SemVer 2.0.0 规范
- 主版本变更前需要发布候选版本
- 重要变更需要提供迁移指南

### 预发布版本
对于可能包含 breaking changes 的主版本：
```bash
npm version preminor --preid=beta  # 2.0.0-beta.0
npm run release -- --preRelease=beta
```

## 发布频率

### 定期发布
- 修订版本: 按需发布 (bug 修复)
- 次版本: 每月一次 (新功能)
- 主版本: 每季度一次 (重大更新)

### 紧急发布
对于安全漏洞或严重 bug，可以随时发布紧急修复版本。

## 发布检查工具

### 自动检查脚本
```bash
# 一次性运行所有发布前检查
npm test && npm run lint && npm run typecheck && npm run build && npm run security
```

### 发布准备命令
```bash
# 验证所有内容准备发布
npm run prepublishOnly
```

## 维护发布

### 补丁维护
- 为旧版本提供安全补丁
- 在相应分支上维护
- 为 LTS 版本提供长期支持

### 支持策略
- 最新两个主版本获得完整支持
- 旧版本仅提供安全修复
- 提供明确的 EOL (End of Life) 通知