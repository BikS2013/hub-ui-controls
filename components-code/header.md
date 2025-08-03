# Header Components

This library provides two header components for building consistent application headers: `LogoHeader` and `NoLogoHeader`.

## LogoHeader

A two-line header component featuring a logo and flexible control placement.

### Features
- **Logo display**: Positioned absolutely on the left, with customizable height and click handler
- **Two-line layout**: 
  - First line: Logo on left (absolute), controls on right
  - Second line: Title on left, subtitle in middle, controls on right
- **Responsive design**: Adapts to smaller screens with adjusted padding and hidden elements
- **Theme support**: Works with light/dark themes
- **Accessibility**: Keyboard navigation for clickable logos

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logoSrc` | `string` | - | URL of the logo image |
| `logoAlt` | `string` | `'Logo'` | Alt text for the logo |
| `logoHeight` | `number` | `60` | Height of the logo in pixels |
| `onLogoClick` | `() => void` | - | Click handler for the logo |
| `title` | `ReactNode` | - | Title content (typically wrapped in heading tags) |
| `subtitle` | `ReactNode` | - | Subtitle content displayed in the middle of second line |
| `topRightControls` | `ReactNode` | - | Controls for the top right corner |
| `bottomRightControls` | `ReactNode` | - | Controls for the bottom right corner |
| `backgroundColor` | `string` | - | Custom background color |
| `className` | `string` | `''` | Additional CSS class names |
| `minHeight` | `number` | `105` | Minimum height of the header |

### Usage Example

```tsx
import { LogoHeader } from './LogoHeader';

function App() {
  return (
    <LogoHeader
      logoSrc="/logo.png"
      logoAlt="Company Logo"
      logoHeight={50}
      onLogoClick={() => navigate('/')}
      title={<h1>Dashboard</h1>}
      subtitle={<span>Last updated: 5 mins ago</span>}
      topRightControls={
        <button>Settings</button>
      }
      bottomRightControls={
        <div>
          <button>Export</button>
          <button>Refresh</button>
        </div>
      }
    />
  );
}
```

## NoLogoHeader

A two-line header component without a logo, optimized for sections that don't require branding.

### Features
- **Two-line layout**:
  - First line: Title on left, controls on right
  - Second line: Subtitle on left, controls on right
- **Consistent height**: Matches LogoHeader height for alignment
- **Force white text**: Ensures readability on dark backgrounds
- **Height adjustment**: Optional pixel adjustment for precise alignment
- **Responsive design**: Adapts to smaller screens

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | - | Title content for the first line |
| `subtitle` | `ReactNode` | - | Subtitle content for the second line |
| `topRightControls` | `ReactNode` | - | Controls for the top right corner |
| `bottomRightControls` | `ReactNode` | - | Controls for the bottom right corner |
| `backgroundColor` | `string` | - | Custom background color |
| `className` | `string` | `''` | Additional CSS class names |
| `minHeight` | `number` | `105` | Minimum height of the header |
| `heightAdjustment` | `number` | `0` | Pixel adjustment for alignment with LogoHeader |

### Usage Example

```tsx
import { NoLogoHeader } from './NoLogoHeader';

function AnalyticsPage() {
  return (
    <NoLogoHeader
      title={<h2>Analytics Dashboard</h2>}
      subtitle={
        <div className="stats-info">
          <span>Total: 150</span>
          <span>Active: 120</span>
        </div>
      }
      bottomRightControls={
        <div className="actions">
          <button>Export</button>
          <select>
            <option>All Models</option>
            <option>GPT-4</option>
            <option>Claude</option>
          </select>
        </div>
      }
      heightAdjustment={2}
    />
  );
}
```

## Styling

Both components use CSS custom properties for theming:

```css
:root {
  --header-bg: rgba(30, 30, 30, 0.9);
  --border-color: rgba(255, 255, 255, 0.1);
  --hover-bg: rgba(255, 255, 255, 0.1);
  --bg-secondary: #2a2a2a;
  --text-primary: #ffffff;
}
```

### Responsive Breakpoints

- **600px**: Reduced padding, smaller font sizes
- **400px**: Hidden subtitles, further reduced spacing

### Accessibility Features

- Keyboard navigation for clickable logos
- High contrast mode support
- Proper ARIA roles and focus indicators
- Color contrast compliant text

## Best Practices

1. **Logo Size**: Keep logo height between 40-80px for optimal visual balance
2. **Title Length**: Use concise titles that fit on one line
3. **Subtitle Content**: Ideal for status information, metadata, or breadcrumbs
4. **Control Groups**: Group related controls in a container for better organization
5. **Theme Consistency**: Headers maintain white text on dark backgrounds regardless of theme

## Common Patterns

### Dashboard Header with Logo
```tsx
<LogoHeader
  logoSrc="/company-logo.svg"
  title={<h1>Admin Panel</h1>}
  subtitle={<span>Environment: Production</span>}
  topRightControls={<UserMenu />}
  bottomRightControls={<NotificationBell />}
/>
```

### Analytics Section without Logo
```tsx
<NoLogoHeader
  title={<h2>Performance Metrics</h2>}
  subtitle={<DateRangePicker />}
  bottomRightControls={
    <>
      <ExportButton />
      <RefreshButton />
    </>
  }
/>
```

### Modal Header
```tsx
<NoLogoHeader
  title={<h3>Settings</h3>}
  topRightControls={<CloseButton />}
  minHeight={60}
/>
```