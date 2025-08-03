# ResizablePanel Component

A flexible panel component that allows users to resize its width by dragging a handle. Perfect for sidebars, navigation panels, or any content that benefits from adjustable width.

## Features

- **Draggable resize handle**: Smooth resizing with visual feedback
- **Width constraints**: Set minimum and maximum width limits
- **Persistent state**: Automatically saves and restores width using localStorage
- **Responsive design**: Disables resizing on mobile devices
- **Customizable**: Configure default width, constraints, and storage key
- **Performance optimized**: Efficient mouse event handling
- **Visual feedback**: Handle appears on hover with smooth transitions

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to display inside the panel |
| `defaultWidth` | `number` | `400` | Initial width in pixels |
| `minWidth` | `number` | `300` | Minimum allowed width in pixels |
| `maxWidth` | `number` | `600` | Maximum allowed width in pixels |
| `onResize` | `(width: number) => void` | - | Callback fired when panel is resized |
| `storageKey` | `string` | `'resizable-panel-width'` | LocalStorage key for persisting width |

## Usage Example

```tsx
import { ResizablePanel } from './ResizablePanel';

function App() {
  const handleResize = (newWidth: number) => {
    console.log('Panel resized to:', newWidth);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ResizablePanel
        defaultWidth={350}
        minWidth={250}
        maxWidth={500}
        onResize={handleResize}
        storageKey="sidebar-width"
      >
        <nav style={{ padding: '20px' }}>
          <h2>Navigation</h2>
          <ul>
            <li>Dashboard</li>
            <li>Projects</li>
            <li>Settings</li>
          </ul>
        </nav>
      </ResizablePanel>
      
      <main style={{ flex: 1, padding: '20px' }}>
        <h1>Main Content</h1>
        <p>The sidebar can be resized by dragging the handle.</p>
      </main>
    </div>
  );
}
```

## Styling

The component uses CSS custom properties for theming:

```css
:root {
  --bg-secondary: #222d42;
  --border-color: rgba(91, 139, 201, 0.2);
  --accent-blue: #6FA7E6;
}
```

### CSS Classes

- `.resizable-panel` - Main container
- `.resize-handle` - Draggable handle area
- `.resize-handle-inner` - Visual handle indicator

### Customizing Appearance

```css
/* Custom panel styling */
.resizable-panel {
  background-color: #f5f5f5;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

/* Custom handle color */
.resize-handle-inner {
  background-color: #007bff;
}

/* Handle hover effect */
.resize-handle:hover .resize-handle-inner {
  background-color: #0056b3;
  opacity: 1;
}
```

## Common Use Cases

### 1. File Explorer Sidebar
```tsx
<ResizablePanel
  defaultWidth={280}
  minWidth={200}
  maxWidth={400}
  storageKey="file-explorer-width"
>
  <FileExplorer />
</ResizablePanel>
```

### 2. Chat User List
```tsx
<ResizablePanel
  defaultWidth={300}
  minWidth={250}
  maxWidth={450}
  storageKey="chat-users-width"
>
  <UserList users={onlineUsers} />
</ResizablePanel>
```

### 3. Code Editor Sidebar
```tsx
<ResizablePanel
  defaultWidth={320}
  minWidth={240}
  maxWidth={500}
  onResize={(width) => updateEditorLayout(width)}
>
  <ProjectStructure />
</ResizablePanel>
```

### 4. Dashboard Filters Panel
```tsx
<ResizablePanel
  defaultWidth={350}
  minWidth={300}
  maxWidth={450}
  storageKey="dashboard-filters"
>
  <FilterPanel filters={filters} onChange={handleFilterChange} />
</ResizablePanel>
```

## Advanced Usage

### Multiple Panels with Different Storage
```tsx
function MultiPanelLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ResizablePanel 
        storageKey="left-panel-width"
        defaultWidth={250}
      >
        <LeftSidebar />
      </ResizablePanel>
      
      <div style={{ flex: 1 }}>
        <MainContent />
      </div>
      
      <ResizablePanel 
        storageKey="right-panel-width"
        defaultWidth={300}
      >
        <RightSidebar />
      </ResizablePanel>
    </div>
  );
}
```

### Dynamic Width Constraints
```tsx
function AdaptivePanel() {
  const [maxWidth, setMaxWidth] = useState(600);
  
  useEffect(() => {
    const updateMaxWidth = () => {
      setMaxWidth(window.innerWidth * 0.4); // 40% of viewport
    };
    
    window.addEventListener('resize', updateMaxWidth);
    updateMaxWidth();
    
    return () => window.removeEventListener('resize', updateMaxWidth);
  }, []);
  
  return (
    <ResizablePanel
      defaultWidth={400}
      minWidth={300}
      maxWidth={maxWidth}
    >
      <Content />
    </ResizablePanel>
  );
}
```

### Synchronized Panels
```tsx
function SyncedPanels() {
  const [sharedWidth, setSharedWidth] = useState(350);
  
  return (
    <>
      <ResizablePanel
        defaultWidth={sharedWidth}
        onResize={setSharedWidth}
        storageKey="synced-panel-width"
      >
        <TopPanel />
      </ResizablePanel>
      
      <ResizablePanel
        defaultWidth={sharedWidth}
        onResize={setSharedWidth}
        storageKey="synced-panel-width"
      >
        <BottomPanel />
      </ResizablePanel>
    </>
  );
}
```

## Accessibility

- The resize handle is keyboard accessible
- Uses appropriate cursor styles during resize
- Maintains focus management during drag operations
- Respects user's motion preferences

## Browser Support

- Works in all modern browsers
- LocalStorage required for persistence
- Touch support for mobile (though resizing is disabled)
- Graceful degradation when localStorage is unavailable

## Performance Considerations

1. **Event Optimization**: Mouse events are only attached during active resizing
2. **State Persistence**: Width is saved to localStorage only after resize completes
3. **Render Optimization**: Only the width style is updated during resize
4. **Mobile Performance**: Resize functionality is disabled on mobile to improve performance

## Troubleshooting

### Panel not resizing
- Check that the parent container has a defined height
- Ensure no CSS conflicts with cursor styles
- Verify min/max width constraints are reasonable

### Width not persisting
- Check browser localStorage is enabled
- Ensure unique storage keys for multiple panels
- Verify no localStorage quota issues

### Handle not visible
- Check CSS custom properties are defined
- Ensure no z-index conflicts
- Verify border-color variable is set