# Contributing Guidelines

## Code Style

### TypeScript
- Use strict mode (enabled in `tsconfig.json`)
- Avoid `any` type - use proper typing
- Use interfaces for data structures
- Add JSDoc comments for public methods

### HTML
- Use semantic HTML elements
- Add ARIA labels for accessibility
- Keep templates clean and readable
- Use Angular directives properly

### SCSS
- Use variables for colors and spacing
- Follow BEM naming convention for classes
- Keep styles scoped to components
- Use mixins for reusable styles

## Component Structure

```typescript
// 1. Imports
import { Component, OnInit } from '@angular/core';

// 2. Component decorator
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})

// 3. Class definition
export class ExampleComponent implements OnInit {
  // Properties
  // Constructor
  // Lifecycle hooks
  // Methods
}
```

## Testing

- Write unit tests for services
- Test component logic and interactions
- Aim for >80% code coverage
- Run tests: `npm test`

## Git Workflow

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push to remote: `git push origin feature/feature-name`
4. Create a Pull Request on GitHub

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build/dependency changes

### Example
```
feat(emissions-table): add export to CSV functionality

- Added CSV export button
- Implemented data formatting
- Added unit tests

Closes #123
```

## Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors or warnings
- [ ] Documentation updated if needed
- [ ] Commit messages are clear

## Performance Guidelines

- Keep bundle size minimal
- Use lazy loading for features
- Optimize images and assets
- Avoid unnecessary re-renders
- Use OnPush change detection when possible

## Accessibility

- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

## Questions?

Open an issue on GitHub for questions or discussions.

