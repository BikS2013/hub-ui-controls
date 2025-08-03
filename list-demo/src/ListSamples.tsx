import { useState } from 'react';
import { List } from './components/List';
import { ListItem } from './components/ListItem';
import { 
  User, Search, Filter, ChevronRight, Star, Calendar, 
  FileText, Folder, Image, Archive, MessageSquare,
  Clock, CheckCircle, Circle, AlertCircle, Tag
} from 'lucide-react';
import { format } from 'date-fns';
import './ListSamples.css';

// Sample data types
interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  tags: string[];
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  lastActive: Date;
  avatar?: string;
}

interface FileData {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modified: Date;
  icon: string;
}

interface Conversation {
  id: string;
  title: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
}

// Sample data
const tasks: Task[] = [
  { id: '1', title: 'Complete project documentation', status: 'in-progress', priority: 'high', dueDate: new Date('2024-12-20'), tags: ['documentation', 'urgent'] },
  { id: '2', title: 'Review pull requests', status: 'pending', priority: 'medium', dueDate: new Date('2024-12-18'), tags: ['code-review'] },
  { id: '3', title: 'Update dependencies', status: 'completed', priority: 'low', dueDate: new Date('2024-12-15'), tags: ['maintenance'] },
  { id: '4', title: 'Implement new feature', status: 'in-progress', priority: 'high', dueDate: new Date('2024-12-22'), tags: ['feature', 'frontend'] },
  { id: '5', title: 'Fix reported bugs', status: 'pending', priority: 'high', dueDate: new Date('2024-12-19'), tags: ['bug-fix', 'urgent'] }
];

const users: UserData[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Developer', department: 'Engineering', lastActive: new Date('2024-12-17T10:30:00') },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Designer', department: 'Design', lastActive: new Date('2024-12-17T09:15:00') },
  { id: '3', name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Manager', department: 'Product', lastActive: new Date('2024-12-16T18:45:00') },
  { id: '4', name: 'Sarah Williams', email: 'sarah.w@example.com', role: 'Developer', department: 'Engineering', lastActive: new Date('2024-12-17T11:00:00') },
  { id: '5', name: 'Tom Brown', email: 'tom.brown@example.com', role: 'QA Engineer', department: 'Quality', lastActive: new Date('2024-12-17T08:30:00') }
];

const files: FileData[] = [
  { id: '1', name: 'Project Report.pdf', type: 'file', size: 2048000, modified: new Date('2024-12-15'), icon: 'pdf' },
  { id: '2', name: 'Documents', type: 'folder', modified: new Date('2024-12-16'), icon: 'folder' },
  { id: '3', name: 'Screenshot.png', type: 'file', size: 512000, modified: new Date('2024-12-17'), icon: 'image' },
  { id: '4', name: 'Archive', type: 'folder', modified: new Date('2024-12-10'), icon: 'archive' },
  { id: '5', name: 'Presentation.pptx', type: 'file', size: 4096000, modified: new Date('2024-12-14'), icon: 'file' }
];

const conversations: Conversation[] = [
  { id: '1', title: 'Project Updates', participants: ['John Doe', 'Jane Smith'], lastMessage: 'The new designs look great!', lastMessageTime: new Date('2024-12-17T10:30:00'), unread: 2 },
  { id: '2', title: 'Team Standup', participants: ['Mike Johnson', 'Sarah Williams', 'Tom Brown'], lastMessage: 'Meeting at 10 AM tomorrow', lastMessageTime: new Date('2024-12-17T09:15:00'), unread: 0 },
  { id: '3', title: 'Bug Reports', participants: ['Tom Brown'], lastMessage: 'Found an issue with the login page', lastMessageTime: new Date('2024-12-16T18:45:00'), unread: 5 },
  { id: '4', title: 'Design Review', participants: ['Jane Smith', 'Mike Johnson'], lastMessage: 'Please review the updated mockups', lastMessageTime: new Date('2024-12-16T15:30:00'), unread: 1 }
];

// Helper functions
const formatFileSize = (bytes?: number) => {
  if (!bytes) return '';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const getStatusIcon = (status: Task['status']) => {
  switch (status) {
    case 'completed': return <CheckCircle size={16} className="status-icon completed" />;
    case 'in-progress': return <Circle size={16} className="status-icon in-progress" />;
    case 'pending': return <AlertCircle size={16} className="status-icon pending" />;
  }
};

const getFileIcon = (icon: string) => {
  switch (icon) {
    case 'folder': return <Folder size={20} />;
    case 'image': return <Image size={20} />;
    case 'archive': return <Archive size={20} />;
    default: return <FileText size={20} />;
  }
};

export function ListSamples() {
  const [selectedTab, setSelectedTab] = useState('basic');
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [selectedConversationId, setSelectedConversationId] = useState<string>('');

  const tabs = [
    { id: 'basic', label: 'Basic List' },
    { id: 'tasks', label: 'Task List' },
    { id: 'users', label: 'User Management' },
    { id: 'files', label: 'File Browser' },
    { id: 'chat', label: 'Conversations' },
    { id: 'empty', label: 'Empty States' }
  ];

  return (
    <div className="list-samples">
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${selectedTab === tab.id ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="sample-content">
        {selectedTab === 'basic' && (
          <div className="sample-section">
            <h3>Basic List with Search</h3>
            <p>Simple list with search functionality and item selection.</p>
            
            <List
              items={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']}
              renderItem={(item) => (
                <ListItem
                  id={item}
                  selected={selectedUserId === item}
                  onClick={() => setSelectedUserId(item)}
                >
                  <div className="simple-item">
                    <span>{item}</span>
                    <ChevronRight size={16} />
                  </div>
                </ListItem>
              )}
              keyExtractor={(item) => item}
              showSearch
              searchPlaceholder="Search fruits..."
              searchFields={[(item) => item]}
            />
          </div>
        )}

        {selectedTab === 'tasks' && (
          <div className="sample-section">
            <h3>Task List with Multi-Select</h3>
            <p>Task management with status indicators, priority levels, and multi-selection.</p>
            
            <List
              items={tasks}
              renderItem={(task) => (
                <ListItem
                  id={task.id}
                  selected={selectedTaskIds.includes(task.id)}
                  onClick={() => {
                    setSelectedTaskIds(prev => 
                      prev.includes(task.id) 
                        ? prev.filter(id => id !== task.id)
                        : [...prev, task.id]
                    );
                  }}
                  header={
                    <div className="task-header">
                      <div className="task-title-row">
                        {getStatusIcon(task.status)}
                        <span className="task-title">{task.title}</span>
                      </div>
                      <span className={`priority ${task.priority}`}>
                        {task.priority}
                      </span>
                    </div>
                  }
                >
                  <div className="task-details">
                    <div className="task-meta">
                      <Calendar size={14} />
                      <span>Due: {format(task.dueDate, 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="task-tags">
                      {task.tags.map(tag => (
                        <span key={tag} className="tag">
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </ListItem>
              )}
              keyExtractor={(task) => task.id}
              showSearch
              searchPlaceholder="Search tasks..."
              searchFields={[
                (task) => task.title,
                (task) => task.tags.join(' ')
              ]}
              showFilter
              filterOptions={[
                { value: 'all', label: 'All Tasks' },
                { value: 'pending', label: 'Pending' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' }
              ]}
              onFilter={(tasks, filter) => {
                if (filter === 'all') return tasks;
                return tasks.filter(task => task.status === filter);
              }}
              headerContent={
                selectedTaskIds.length > 0 && (
                  <div className="selection-info">
                    {selectedTaskIds.length} task{selectedTaskIds.length > 1 ? 's' : ''} selected
                  </div>
                )
              }
            />
          </div>
        )}

        {selectedTab === 'users' && (
          <div className="sample-section">
            <h3>User Management List</h3>
            <p>User directory with department filtering and detailed information.</p>
            
            <List
              items={users}
              renderItem={(user) => (
                <ListItem
                  id={user.id}
                  selected={selectedUserId === user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  header={
                    <div className="user-header">
                      <div className="user-info">
                        <div className="user-avatar">
                          <User size={20} />
                        </div>
                        <div>
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                      <div className="user-role">{user.role}</div>
                    </div>
                  }
                >
                  <div className="user-details">
                    <span className="department">{user.department}</span>
                    <span className="last-active">
                      <Clock size={14} />
                      Last active: {format(user.lastActive, 'MMM dd, HH:mm')}
                    </span>
                  </div>
                </ListItem>
              )}
              keyExtractor={(user) => user.id}
              showSearch
              searchPlaceholder="Search users..."
              searchFields={[
                (user) => user.name,
                (user) => user.email,
                (user) => user.role
              ]}
              showFilter
              filterOptions={[
                { value: 'all', label: 'All Departments' },
                { value: 'Engineering', label: 'Engineering' },
                { value: 'Design', label: 'Design' },
                { value: 'Product', label: 'Product' },
                { value: 'Quality', label: 'Quality' }
              ]}
              onFilter={(users, filter) => {
                if (filter === 'all') return users;
                return users.filter(user => user.department === filter);
              }}
            />
          </div>
        )}

        {selectedTab === 'files' && (
          <div className="sample-section">
            <h3>File Browser List</h3>
            <p>File and folder listing with size information and icons.</p>
            
            <List
              items={files}
              renderItem={(file) => (
                <ListItem
                  id={file.id}
                  selected={selectedFileId === file.id}
                  onClick={() => setSelectedFileId(file.id)}
                >
                  <div className="file-item">
                    <div className="file-info">
                      {getFileIcon(file.icon)}
                      <span className="file-name">{file.name}</span>
                    </div>
                    <div className="file-meta">
                      {file.size && <span className="file-size">{formatFileSize(file.size)}</span>}
                      <span className="file-modified">{format(file.modified, 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </ListItem>
              )}
              keyExtractor={(file) => file.id}
              showSearch
              searchPlaceholder="Search files..."
              searchFields={[(file) => file.name]}
              sortOptions={[
                { value: 'name', label: 'Name' },
                { value: 'modified', label: 'Modified' },
                { value: 'size', label: 'Size' }
              ]}
              onSort={(files, sortBy) => {
                const sorted = [...files];
                switch (sortBy) {
                  case 'name':
                    sorted.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                  case 'modified':
                    sorted.sort((a, b) => b.modified.getTime() - a.modified.getTime());
                    break;
                  case 'size':
                    sorted.sort((a, b) => (b.size || 0) - (a.size || 0));
                    break;
                }
                return sorted;
              }}
            />
          </div>
        )}

        {selectedTab === 'chat' && (
          <div className="sample-section">
            <h3>Conversation List</h3>
            <p>Chat interface with unread indicators and last message preview.</p>
            
            <List
              items={conversations}
              renderItem={(conversation) => (
                <ListItem
                  id={conversation.id}
                  selected={selectedConversationId === conversation.id}
                  onClick={() => setSelectedConversationId(conversation.id)}
                  header={
                    <div className="conversation-header">
                      <div className="conversation-title">
                        <MessageSquare size={16} />
                        <span>{conversation.title}</span>
                        {conversation.unread > 0 && (
                          <span className="unread-badge">{conversation.unread}</span>
                        )}
                      </div>
                      <span className="conversation-time">
                        {format(conversation.lastMessageTime, 'HH:mm')}
                      </span>
                    </div>
                  }
                >
                  <div className="conversation-details">
                    <div className="conversation-participants">
                      {conversation.participants.join(', ')}
                    </div>
                    <div className="conversation-preview">
                      {conversation.lastMessage}
                    </div>
                  </div>
                </ListItem>
              )}
              keyExtractor={(conversation) => conversation.id}
              showSearch
              searchPlaceholder="Search conversations..."
              searchFields={[
                (conversation) => conversation.title,
                (conversation) => conversation.participants.join(' '),
                (conversation) => conversation.lastMessage
              ]}
            />
          </div>
        )}

        {selectedTab === 'empty' && (
          <div className="sample-section">
            <h3>Empty State Examples</h3>
            <p>Different empty state configurations with custom messages and icons.</p>
            
            <div className="empty-examples">
              <div className="empty-example">
                <h4>No Search Results</h4>
                <List
                  items={[]}
                  renderItem={() => <div />}
                  keyExtractor={() => ''}
                  showSearch
                  searchPlaceholder="Try searching..."
                  emptyIcon={<Search size={48} />}
                  emptyMessage="No results found"
                  emptyDescription="Try adjusting your search terms"
                />
              </div>

              <div className="empty-example">
                <h4>No Data Yet</h4>
                <List
                  items={[]}
                  renderItem={() => <div />}
                  keyExtractor={() => ''}
                  emptyIcon={<Star size={48} />}
                  emptyMessage="No items yet"
                  emptyDescription="Start by adding your first item"
                />
              </div>

              <div className="empty-example">
                <h4>Filtered Results Empty</h4>
                <List
                  items={[]}
                  renderItem={() => <div />}
                  keyExtractor={() => ''}
                  showFilter
                  filterOptions={[
                    { value: 'all', label: 'All' },
                    { value: 'active', label: 'Active' }
                  ]}
                  emptyIcon={<Filter size={48} />}
                  emptyMessage="No items match your filter"
                  emptyDescription="Try selecting a different filter option"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}