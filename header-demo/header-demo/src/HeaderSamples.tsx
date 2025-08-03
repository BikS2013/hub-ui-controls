import React from 'react';
import { LogoHeader } from './components/LogoHeader';
import { NoLogoHeader } from './components/NoLogoHeader';
import './HeaderSamples.css';

export function HeaderSamples() {
  return (
    <div className="header-samples">
      <h1>Header Component Samples</h1>
      
      {/* LogoHeader Examples */}
      <section className="sample-section">
        <h2>LogoHeader Examples</h2>
        
        {/* Basic LogoHeader */}
        <div className="sample-container">
          <h3>Basic LogoHeader with Logo</h3>
          <LogoHeader
            logoSrc="https://via.placeholder.com/150x50/007bff/ffffff?text=LOGO"
            logoAlt="Sample Logo"
            logoHeight={50}
            title={<h1>Application Dashboard</h1>}
            subtitle={<span>Welcome back, User!</span>}
          />
        </div>

        {/* LogoHeader with Controls */}
        <div className="sample-container">
          <h3>LogoHeader with Full Controls</h3>
          <LogoHeader
            logoSrc="https://via.placeholder.com/150x50/28a745/ffffff?text=BRAND"
            logoAlt="Brand Logo"
            logoHeight={45}
            onLogoClick={() => alert('Logo clicked!')}
            title={<h1>Analytics Platform</h1>}
            subtitle={
              <div style={{ display: 'flex', gap: '20px' }}>
                <span>Last sync: 2 mins ago</span>
                <span>•</span>
                <span>Status: Active</span>
              </div>
            }
            topRightControls={
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="header-button">
                  <span>🔔</span>
                </button>
                <button className="header-button">
                  <span>⚙️</span>
                </button>
              </div>
            }
            bottomRightControls={
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="header-button primary">Export</button>
                <select className="header-select">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>All time</option>
                </select>
              </div>
            }
          />
        </div>

        {/* Minimal LogoHeader */}
        <div className="sample-container">
          <h3>Minimal LogoHeader</h3>
          <LogoHeader
            logoSrc="https://via.placeholder.com/100x40/6c757d/ffffff?text=MIN"
            logoHeight={40}
            title={<h2>Simple Header</h2>}
            minHeight={80}
          />
        </div>
      </section>

      {/* NoLogoHeader Examples */}
      <section className="sample-section">
        <h2>NoLogoHeader Examples</h2>
        
        {/* Basic NoLogoHeader */}
        <div className="sample-container">
          <h3>Basic NoLogoHeader</h3>
          <NoLogoHeader
            title={<h2>Section Title</h2>}
            subtitle={<span>This is a section without a logo</span>}
          />
        </div>

        {/* NoLogoHeader with Controls */}
        <div className="sample-container">
          <h3>NoLogoHeader with Full Controls</h3>
          <NoLogoHeader
            title={<h2>Data Management</h2>}
            subtitle={
              <div className="stats-info">
                <span>Total Records: 1,234</span>
                <span>•</span>
                <span>Active: 956</span>
                <span>•</span>
                <span>Archived: 278</span>
              </div>
            }
            topRightControls={
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="search" 
                  placeholder="Search..." 
                  className="header-search"
                />
                <button className="header-button">
                  <span>🔍</span>
                </button>
              </div>
            }
            bottomRightControls={
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  View:
                </label>
                <select className="header-select">
                  <option>Grid</option>
                  <option>List</option>
                  <option>Cards</option>
                </select>
                <button className="header-button">Filter</button>
                <button className="header-button primary">+ New</button>
              </div>
            }
          />
        </div>

        {/* Modal-style NoLogoHeader */}
        <div className="sample-container">
          <h3>Modal-style NoLogoHeader</h3>
          <NoLogoHeader
            title={<h3>User Settings</h3>}
            topRightControls={
              <button className="header-button close">
                <span>✕</span>
              </button>
            }
            minHeight={60}
            className="modal-header"
          />
        </div>

        {/* Analytics Dashboard Style */}
        <div className="sample-container">
          <h3>Analytics Dashboard Style</h3>
          <NoLogoHeader
            title={<h2>Performance Metrics</h2>}
            subtitle={
              <div className="date-range">
                <span>Date Range: </span>
                <select className="header-select inline">
                  <option>Today</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Custom Range</option>
                </select>
              </div>
            }
            bottomRightControls={
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                  Auto-refresh:
                </span>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
                <button className="header-button">
                  <span>📊</span> Export
                </button>
              </div>
            }
            heightAdjustment={2}
          />
        </div>
      </section>

      {/* Combined Example */}
      <section className="sample-section">
        <h2>Combined Layout Example</h2>
        <div className="sample-container">
          <h3>Main App with Logo + Section without Logo</h3>
          <LogoHeader
            logoSrc="https://via.placeholder.com/120x40/dc3545/ffffff?text=APP"
            logoHeight={40}
            title={<h1>My Application</h1>}
            topRightControls={
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>John Doe</span>
                <button className="header-button">Logout</button>
              </div>
            }
            className="main-header"
          />
          <div style={{ marginTop: '20px' }}>
            <NoLogoHeader
              title={<h2>Dashboard Section</h2>}
              subtitle={<span>Overview of your recent activity</span>}
              bottomRightControls={
                <button className="header-button primary">View All</button>
              }
              className="section-header"
            />
          </div>
        </div>
      </section>
    </div>
  );
}