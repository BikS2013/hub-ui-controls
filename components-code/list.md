# List and ListItem Components

A powerful set of components for creating searchable, filterable lists with customizable items. Perfect for building conversation lists, task lists, file browsers, or any data display that requires selection and filtering.

## List Component

The List component provides a container with optional search, filtering, and empty state handling.

### Features

- **Search functionality**: Built-in search input with icon
- **Filtering support**: Filter button with active state indicator
- **Empty state**: Customizable empty state display
- **Header slot**: Optional header area for titles or additional controls
- **Selection tracking**: Tracks selected item and provides sample data
- **Flexible rendering**: Generic type support for any data structure
- **Action buttons**: Support for additional action buttons
- **Responsive design**: Adapts to smaller screens
- **Smooth animations**: Staggered item appearance animations

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | - | Array of items to display |
| `renderItem` | `(item: T, index: number) => ReactNode` | - | Function to render each item |
| `keyExtractor` | `(item: T, index: number) => string` | - | Function to extract unique key for each item |
| `header` | `ReactNode` | - | Optional header content |
| `searchable` | `boolean` | `false` | Enable search functionality |
| `searchValue` | `string` | `''` | Current search value |
| `onSearchChange` | `(value: string) => void` | - | Search value change handler |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `searchAction` | `ReactNode \| ((sampleData: T \| null) => ReactNode)` | - | Additional search action button |
| `emptyState` | `ReactNode` | - | Custom empty state content |
| `className` | `string` | `''` | Additional CSS classes |
| `selectedId` | `string \| null` | `null` | Currently selected item ID |
| `getItemId` | `(item: T) => string` | - | Function to get item ID |
| `filterable` | `boolean` | `false` | Enable filter button |
| `hasActiveFilters` | `boolean` | `false` | Show active filter indicator |
| `onFilterClick` | `(sampleData: T \| null) => void` | - | Filter button click handler |
| `onClearFilters` | `() => void` | - | Clear filters handler |
| `filterTooltip` | `string` | `'Open filters'` | Filter button tooltip |
| `additionalActions` | `ReactNode \| ((sampleData: T \| null) => ReactNode)` | - | Additional action buttons |

## ListItem Component

The ListItem component represents an individual item in the list with selection state and customizable content.

### Features

- **Selection state**: Visual feedback for selected items
- **Header/content layout**: Separate header and content areas
- **Hover effects**: Smooth hover transitions
- **Accessibility**: Keyboard navigation and ARIA attributes
- **Theme support**: Adapts to light/dark themes
- **Animation**: Selection pulse effect
- **Focus indicators**: Clear focus states for keyboard users

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier for the item |
| `selected` | `boolean` | `false` | Whether the item is selected |
| `onClick` | `() => void` | - | Click handler |
| `header` | `ReactNode` | - | Optional header content |
| `children` | `ReactNode` | - | Main content of the item |
| `className` | `string` | `''` | Additional CSS classes |

## Usage Examples

### Basic List with Search

```tsx
import { List } from './List';
import { ListItem } from './ListItem';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete project', completed: false },
    { id: '2', title: 'Review code', completed: true },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <List
      items={filteredTasks}
      renderItem={(task) => (
        <ListItem
          id={task.id}
          selected={selectedId === task.id}
          onClick={() => setSelectedId(task.id)}
          header={
            <>
              <span>{task.title}</span>
              <span>{task.completed ? '✓' : '○'}</span>
            </>
          }
        >
          <p>Task ID: {task.id}</p>
        </ListItem>
      )}
      keyExtractor={(task) => task.id}
      searchable={true}
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search tasks..."
      selectedId={selectedId}
      getItemId={(task) => task.id}
    />
  );
}
```

### Advanced List with Filtering

```tsx
import { List } from './List';
import { ListItem } from './ListItem';
import { LogoHeader } from './LogoHeader';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: Date;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([...]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleFilterClick = (sampleUser: User | null) => {
    setShowFilters(true);
  };

  const handleClearFilters = () => {
    setRoleFilter(null);
    setSearchTerm('');
  };

  const header = (
    <LogoHeader
      logoSrc="/logo.svg"
      logoAlt="Company"
      title={<h2>User Management</h2>}
      subtitle={`${filteredUsers.length} users`}
    />
  );

  return (
    <List
      items={filteredUsers}
      renderItem={(user) => (
        <ListItem
          id={user.id}
          selected={selectedId === user.id}
          onClick={() => setSelectedId(user.id)}
          header={
            <>
              <div>
                <strong>{user.name}</strong>
                <span className="role-badge">{user.role}</span>
              </div>
              <span className="last-active">
                {format(user.lastActive, 'MMM d, yyyy')}
              </span>
            </>
          }
        >
          <p>{user.email}</p>
          <p>Last active: {formatDistanceToNow(user.lastActive)} ago</p>
        </ListItem>
      )}
      keyExtractor={(user) => user.id}
      header={header}
      searchable={true}
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search by name or email..."
      filterable={true}
      hasActiveFilters={!!roleFilter}
      onFilterClick={handleFilterClick}
      onClearFilters={handleClearFilters}
      filterTooltip={roleFilter ? `Filtering by role: ${roleFilter}` : 'Open filters'}
      selectedId={selectedId}
      getItemId={(user) => user.id}
      emptyState={
        <div className="empty-users">
          <p>No users found</p>
          <button onClick={handleClearFilters}>Clear filters</button>
        </div>
      }
    />
  );
}
```

### List with Custom Actions

```tsx
function FileList() {
  const [files, setFiles] = useState<File[]>([...]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const additionalActions = (selectedFile: File | null) => (
    <>
      <button 
        className="action-btn"
        onClick={() => selectedFile && downloadFile(selectedFile)}
        disabled={!selectedFile}
      >
        <Download size={16} />
      </button>
      <button 
        className="action-btn"
        onClick={() => selectedFile && shareFile(selectedFile)}
        disabled={!selectedFile}
      >
        <Share size={16} />
      </button>
    </>
  );

  return (
    <List
      items={files}
      renderItem={(file) => (
        <ListItem
          id={file.id}
          selected={selectedId === file.id}
          onClick={() => setSelectedId(file.id)}
        >
          <div className="file-info">
            <FileIcon type={file.type} />
            <div>
              <p className="file-name">{file.name}</p>
              <p className="file-size">{formatFileSize(file.size)}</p>
            </div>
          </div>
        </ListItem>
      )}
      keyExtractor={(file) => file.id}
      searchable={true}
      additionalActions={additionalActions}
      selectedId={selectedId}
      getItemId={(file) => file.id}
    />
  );
}
```

## Styling

Both components use CSS custom properties for theming:

```css
:root {
  --bg-primary: #1a2332;
  --bg-secondary: #222d42;
  --bg-tertiary: #2a3752;
  --bg-card: #222d42;
  --text-primary: #FFFFFF;
  --text-secondary: #B8C5D6;
  --text-tertiary: #8B95A7;
  --accent-primary: #5B8BC9;
  --accent-blue: #6FA7E6;
  --accent-red: #FF7B7B;
  --border-color: rgba(91, 139, 201, 0.2);
  --shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
```

### Custom Styling

```css
/* Custom list container */
.my-custom-list .list-container {
  background: #f5f5f5;
  border-radius: 12px;
}

/* Custom list item */
.my-custom-item.list-item {
  background: white;
  border: 2px solid #e0e0e0;
}

.my-custom-item.list-item.selected {
  border-color: #007bff;
  background: #f0f8ff;
}
```

## Common Patterns

### Conversation List
```tsx
<List
  items={conversations}
  renderItem={(conv) => (
    <ListItem
      id={conv.id}
      selected={selectedId === conv.id}
      onClick={() => onSelect(conv.id)}
      header={
        <>
          <span className="conv-id">{conv.id.slice(0, 8)}...</span>
          <span className="timestamp">{format(conv.date, 'MMM d')}</span>
        </>
      }
    >
      <div className="conv-stats">
        <span>Messages: {conv.messageCount}</span>
        <span>Rating: {conv.rating}/10</span>
      </div>
    </ListItem>
  )}
  // ... other props
/>
```

### Task Management
```tsx
<List
  items={tasks}
  renderItem={(task) => (
    <ListItem
      id={task.id}
      selected={selectedId === task.id}
      onClick={() => setSelectedId(task.id)}
      className={task.priority}
    >
      <div className="task-content">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <div className="task-meta">
          <span className="due-date">{format(task.dueDate, 'MMM d')}</span>
          <span className="assignee">{task.assignee}</span>
        </div>
      </div>
    </ListItem>
  )}
  // ... other props
/>
```

## Accessibility

- Full keyboard navigation support
- ARIA attributes for screen readers
- Focus indicators for keyboard users
- Proper role attributes
- Supports reduced motion preferences

## Performance

- Virtualization ready (can be integrated with react-window)
- Staggered animations for smooth appearance
- Optimized re-renders with proper key extraction
- Efficient search filtering

## Best Practices

1. **Always provide unique keys** via `keyExtractor`
2. **Memoize renderItem** for complex items
3. **Use getItemId** when tracking selection
4. **Debounce search** for large lists
5. **Provide meaningful empty states**
6. **Keep ListItem content concise** for better performance
7. **Use semantic HTML** in item content