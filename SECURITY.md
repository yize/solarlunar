# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 3.x     | ✅ Latest          |
| 2.x     | ⚠️ Security updates only |
| < 2.0   | ❌ Not supported   |

## Reporting a Vulnerability

To report a security vulnerability, please send an email to [maintainer email] or create an issue in the GitHub repository.

We aim to respond to security reports within 48 hours and provide regular updates during the investigation.

## Security Practices

### Dependency Management
- Dependencies are regularly audited using `npm audit`
- Security updates are applied promptly
- Only trusted, well-maintained dependencies are used

### Code Review
- All changes undergo code review
- Automated linting and formatting ensure code quality
- Comprehensive test coverage helps prevent regressions

### Audit Script
Run security audit with:
```bash
npm run security
npm run audit
```

## Dependencies

This package has no production dependencies, which reduces the attack surface significantly. The development dependencies are regularly updated and audited.

## Versioning
We follow semantic versioning to ensure predictable updates and maintain backward compatibility.