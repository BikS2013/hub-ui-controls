import React, { useState } from 'react';
import { ResizablePanel } from './components/ResizablePanel';
import './ResizablePanelSamples.css';

export function ResizablePanelSamples() {
  const [currentWidth, setCurrentWidth] = useState(400);
  const [logEntries, setLogEntries] = useState<string[]>([]);

  const handleResize = (width: number) => {
    setCurrentWidth(width);
    const timestamp = new Date().toLocaleTimeString();
    setLogEntries(prev => [`[${timestamp}] Resized to ${width}px`, ...prev.slice(0, 9)]);
  };

  return (
    <div className="resizable-panel-samples">
      <h1>ResizablePanel Component Samples</h1>

      {/* Basic Example */}
      <section className="sample-section">
        <h2>Basic ResizablePanel</h2>
        <div className="sample-container horizontal-layout">
          <ResizablePanel
            defaultWidth={300}
            minWidth={200}
            maxWidth={400}
            storageKey="basic-panel"
          >
            <div className="panel-content">
              <h3>Sidebar Content</h3>
              <p>Drag the right edge to resize this panel.</p>
              <ul>
                <li>Min width: 200px</li>
                <li>Max width: 400px</li>
                <li>Default: 300px</li>
              </ul>
            </div>
          </ResizablePanel>
          <div className="main-content">
            <h3>Main Content Area</h3>
            <p>This area adjusts as the panel resizes.</p>
          </div>
        </div>
      </section>

      {/* Navigation Example */}
      <section className="sample-section">
        <h2>Navigation Panel</h2>
        <div className="sample-container horizontal-layout">
          <ResizablePanel
            defaultWidth={250}
            minWidth={180}
            maxWidth={350}
            storageKey="nav-panel"
          >
            <nav className="nav-panel">
              <h3>Navigation</h3>
              <div className="nav-section">
                <h4>📊 Dashboard</h4>
                <ul>
                  <li>Overview</li>
                  <li>Analytics</li>
                  <li>Reports</li>
                </ul>
              </div>
              <div className="nav-section">
                <h4>👥 Users</h4>
                <ul>
                  <li>All Users</li>
                  <li>Roles</li>
                  <li>Permissions</li>
                </ul>
              </div>
              <div className="nav-section">
                <h4>⚙️ Settings</h4>
                <ul>
                  <li>General</li>
                  <li>Security</li>
                  <li>Integrations</li>
                </ul>
              </div>
            </nav>
          </ResizablePanel>
          <div className="main-content">
            <h3>Dashboard Content</h3>
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h4>Total Users</h4>
                <p className="metric">1,234</p>
              </div>
              <div className="dashboard-card">
                <h4>Active Sessions</h4>
                <p className="metric">89</p>
              </div>
              <div className="dashboard-card">
                <h4>Revenue</h4>
                <p className="metric">$45,678</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* File Explorer Example */}
      <section className="sample-section">
        <h2>File Explorer Panel</h2>
        <div className="sample-container horizontal-layout">
          <ResizablePanel
            defaultWidth={280}
            minWidth={220}
            maxWidth={400}
            storageKey="file-explorer"
          >
            <div className="file-explorer">
              <h3>📁 Project Files</h3>
              <div className="file-tree">
                <div className="folder">
                  <span>📂 src</span>
                  <div className="folder-contents">
                    <div className="folder">
                      <span>📂 components</span>
                      <div className="folder-contents">
                        <div className="file">📄 Button.tsx</div>
                        <div className="file">📄 Modal.tsx</div>
                        <div className="file">📄 Header.tsx</div>
                      </div>
                    </div>
                    <div className="folder">
                      <span>📂 hooks</span>
                      <div className="folder-contents">
                        <div className="file">📄 useAuth.ts</div>
                        <div className="file">📄 useApi.ts</div>
                      </div>
                    </div>
                    <div className="file">📄 App.tsx</div>
                    <div className="file">📄 main.tsx</div>
                  </div>
                </div>
                <div className="folder">
                  <span>📂 public</span>
                  <div className="folder-contents">
                    <div className="file">🖼️ logo.svg</div>
                    <div className="file">📄 index.html</div>
                  </div>
                </div>
                <div className="file">📄 package.json</div>
                <div className="file">📄 tsconfig.json</div>
              </div>
            </div>
          </ResizablePanel>
          <div className="main-content code-editor">
            <h3>Code Editor</h3>
            <div className="editor-tabs">
              <div className="tab active">App.tsx</div>
              <div className="tab">Button.tsx</div>
              <div className="tab">main.tsx</div>
            </div>
            <div className="editor-content">
              <pre><code>{`import React from 'react';
import { Button } from './components/Button';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}

export default App;`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Example with Resize Callback */}
      <section className="sample-section">
        <h2>Interactive Resize Example</h2>
        <div className="sample-container horizontal-layout">
          <ResizablePanel
            defaultWidth={350}
            minWidth={250}
            maxWidth={500}
            onResize={handleResize}
            storageKey="interactive-panel"
          >
            <div className="panel-content interactive">
              <h3>Resizable Panel</h3>
              <div className="width-display">
                <p>Current Width:</p>
                <p className="width-value">{currentWidth}px</p>
              </div>
              <div className="width-bar">
                <div 
                  className="width-fill"
                  style={{ 
                    width: `${((currentWidth - 250) / (500 - 250)) * 100}%` 
                  }}
                />
              </div>
              <p className="hint">Drag the handle to see real-time updates</p>
            </div>
          </ResizablePanel>
          <div className="main-content">
            <h3>Resize Event Log</h3>
            <div className="event-log">
              {logEntries.length === 0 ? (
                <p className="no-events">No resize events yet. Try dragging the panel handle!</p>
              ) : (
                logEntries.map((entry, index) => (
                  <div key={index} className="log-entry">{entry}</div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Chat Application Example */}
      <section className="sample-section">
        <h2>Chat Application Layout</h2>
        <div className="sample-container horizontal-layout chat-layout">
          <ResizablePanel
            defaultWidth={300}
            minWidth={250}
            maxWidth={400}
            storageKey="chat-sidebar"
          >
            <div className="chat-sidebar">
              <h3>Conversations</h3>
              <div className="chat-list">
                <div className="chat-item active">
                  <div className="avatar">JD</div>
                  <div className="chat-info">
                    <h4>John Doe</h4>
                    <p>Hey, how are you?</p>
                  </div>
                  <span className="time">2m</span>
                </div>
                <div className="chat-item">
                  <div className="avatar">AS</div>
                  <div className="chat-info">
                    <h4>Alice Smith</h4>
                    <p>Thanks for the help!</p>
                  </div>
                  <span className="time">1h</span>
                </div>
                <div className="chat-item">
                  <div className="avatar">TM</div>
                  <div className="chat-info">
                    <h4>Team Meeting</h4>
                    <p>Bob: See you at 3pm</p>
                  </div>
                  <span className="time">2h</span>
                </div>
                <div className="chat-item">
                  <div className="avatar">MJ</div>
                  <div className="chat-info">
                    <h4>Mike Johnson</h4>
                    <p>Document shared</p>
                  </div>
                  <span className="time">1d</span>
                </div>
              </div>
            </div>
          </ResizablePanel>
          <div className="main-content chat-content">
            <div className="chat-header">
              <h3>John Doe</h3>
              <span className="status">🟢 Online</span>
            </div>
            <div className="messages">
              <div className="message other">
                <p>Hey! How's the project going?</p>
                <span className="time">10:30 AM</span>
              </div>
              <div className="message me">
                <p>Going great! Just finished the ResizablePanel component.</p>
                <span className="time">10:32 AM</span>
              </div>
              <div className="message other">
                <p>That's awesome! Can't wait to see it in action.</p>
                <span className="time">10:33 AM</span>
              </div>
              <div className="message me">
                <p>You can resize the sidebar to see how it works!</p>
                <span className="time">10:34 AM</span>
              </div>
            </div>
            <div className="chat-input">
              <input type="text" placeholder="Type a message..." />
              <button>Send</button>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Panels Example */}
      <section className="sample-section">
        <h2>Multiple Resizable Panels</h2>
        <div className="sample-container multi-panel-layout">
          <ResizablePanel
            defaultWidth={200}
            minWidth={150}
            maxWidth={300}
            storageKey="multi-left"
          >
            <div className="panel-content">
              <h3>Left Panel</h3>
              <p>Tools & Options</p>
              <div className="tool-list">
                <button className="tool">🖌️ Brush</button>
                <button className="tool">✏️ Pencil</button>
                <button className="tool">🪣 Fill</button>
                <button className="tool">✂️ Select</button>
              </div>
            </div>
          </ResizablePanel>
          
          <div className="center-content">
            <h3>Canvas Area</h3>
            <div className="canvas">
              <p>Main workspace</p>
              <p>Both panels can be resized independently</p>
            </div>
          </div>
          
          <ResizablePanel
            defaultWidth={250}
            minWidth={200}
            maxWidth={350}
            storageKey="multi-right"
          >
            <div className="panel-content">
              <h3>Properties</h3>
              <div className="properties">
                <div className="property-group">
                  <h4>Dimensions</h4>
                  <label>Width: <input type="number" value="800" readOnly /></label>
                  <label>Height: <input type="number" value="600" readOnly /></label>
                </div>
                <div className="property-group">
                  <h4>Colors</h4>
                  <label>Background: <input type="color" value="#ffffff" /></label>
                  <label>Foreground: <input type="color" value="#000000" /></label>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </div>
      </section>
    </div>
  );
}