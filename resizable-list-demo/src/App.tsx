import { useState, useEffect } from 'react';
import { Sun, Moon, User, Calendar, Tag, FileText, Star, Clock } from 'lucide-react';
import { ResizablePanel } from './components/ResizablePanel';
import { LogoHeader } from './components/LogoHeader';
import { NoLogoHeader } from './components/NoLogoHeader';
import { List } from './components/List';
import { ListItem } from './components/ListItem';
import './App.css';

// Sample data types
interface Document {
  id: string;
  title: string;
  type: 'document' | 'report' | 'analysis';
  author: string;
  date: Date;
  tags: string[];
  status: 'draft' | 'review' | 'published';
  rating?: number;
  content: string;
}

// Sample data
const documents: Document[] = [
  {
    id: '1',
    title: 'Q4 2024 Financial Report',
    type: 'report',
    author: 'John Doe',
    date: new Date('2024-12-15'),
    tags: ['finance', 'quarterly'],
    status: 'published',
    rating: 5,
    content: `# Q4 2024 Financial Report

## Executive Summary
This report provides a comprehensive analysis of our financial performance for Q4 2024. Key highlights include:

- **Revenue Growth**: 15% year-over-year increase
- **Operating Margin**: Improved by 3 percentage points
- **Customer Acquisition**: 2,500 new enterprise clients

## Financial Overview
### Revenue Breakdown
- Product Sales: $45M (+12%)
- Service Revenue: $23M (+18%)
- Recurring Revenue: $67M (+20%)

### Key Metrics
- Gross Margin: 72%
- EBITDA: $28M
- Cash Flow: $35M positive

## Strategic Initiatives
1. Expansion into European markets
2. Launch of new product line
3. Investment in AI capabilities`
  },
  {
    id: '2',
    title: 'Technical Architecture Document',
    type: 'document',
    author: 'Jane Smith',
    date: new Date('2024-12-10'),
    tags: ['technical', 'architecture'],
    status: 'review',
    rating: 4,
    content: `# Technical Architecture Document

## System Overview
Our platform is built on a microservices architecture designed for scalability and reliability.

## Core Components
### API Gateway
- Load balancing and routing
- Authentication and authorization
- Rate limiting and throttling

### Service Mesh
- Service discovery
- Circuit breakers
- Distributed tracing

### Data Layer
- PostgreSQL for transactional data
- Redis for caching
- Elasticsearch for search

## Security Architecture
- End-to-end encryption
- Zero-trust network model
- Regular security audits`
  },
  {
    id: '3',
    title: 'Market Analysis Report',
    type: 'analysis',
    author: 'Mike Johnson',
    date: new Date('2024-12-08'),
    tags: ['market', 'competition'],
    status: 'published',
    rating: 5,
    content: `# Market Analysis Report

## Market Overview
The global market for our product category is experiencing rapid growth, driven by digital transformation initiatives.

## Competitive Landscape
### Market Leaders
1. Company A - 35% market share
2. Company B - 28% market share
3. Our Company - 18% market share

## Growth Opportunities
- Emerging markets showing 40% YoY growth
- SMB segment underserved
- Integration opportunities with existing platforms`
  },
  {
    id: '4',
    title: 'User Research Findings',
    type: 'report',
    author: 'Sarah Williams',
    date: new Date('2024-12-05'),
    tags: ['research', 'UX'],
    status: 'draft',
    content: `# User Research Findings

## Research Methodology
- 50 user interviews conducted
- 500 survey responses analyzed
- 10 usability testing sessions

## Key Findings
1. Users want simplified onboarding
2. Mobile experience needs improvement
3. Integration capabilities highly valued

## Recommendations
- Redesign onboarding flow
- Invest in mobile app development
- Expand API capabilities`
  },
  {
    id: '5',
    title: 'Security Audit Report',
    type: 'report',
    author: 'Tom Brown',
    date: new Date('2024-12-01'),
    tags: ['security', 'audit'],
    status: 'published',
    rating: 4,
    content: `# Security Audit Report

## Audit Scope
Comprehensive security assessment of all systems and processes.

## Findings Summary
- **Critical Issues**: 0
- **High Priority**: 2
- **Medium Priority**: 5
- **Low Priority**: 12

## Recommendations
1. Implement multi-factor authentication
2. Update dependency versions
3. Enhance logging and monitoring`
  }
];

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as 'light' | 'dark') || 'dark';
  });

  const [selectedDocumentId, setSelectedDocumentId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
    } else {
      document.body.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const selectedDocument = documents.find(doc => doc.id === selectedDocumentId);

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'published': return 'var(--success)';
      case 'review': return 'var(--warning)';
      case 'draft': return 'var(--text-tertiary)';
    }
  };

  const getTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'report': return <FileText size={16} />;
      case 'document': return <FileText size={16} />;
      case 'analysis': return <FileText size={16} />;
    }
  };

  const renderDocumentItem = (doc: Document) => (
    <ListItem
      key={doc.id}
      id={doc.id}
      selected={selectedDocumentId === doc.id}
      onClick={() => setSelectedDocumentId(doc.id)}
      header={
        <div className="document-header">
          <div className="document-title-row">
            {getTypeIcon(doc.type)}
            <span className="document-title">{doc.title}</span>
          </div>
          <span className="document-status" style={{ color: getStatusColor(doc.status) }}>
            {doc.status}
          </span>
        </div>
      }
    >
      <div className="document-meta">
        <div className="meta-row">
          <User size={14} />
          <span>{doc.author}</span>
        </div>
        <div className="meta-row">
          <Calendar size={14} />
          <span>{doc.date.toLocaleDateString()}</span>
        </div>
        {doc.rating && (
          <div className="meta-row">
            <Star size={14} />
            <span>Rating: {doc.rating}/5</span>
          </div>
        )}
        <div className="document-tags">
          {doc.tags.map(tag => (
            <span key={tag} className="tag">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </ListItem>
  );

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );

  return (
    <div className="app">
      <div className="app-layout">
        <ResizablePanel
          defaultWidth={350}
          minWidth={280}
          maxWidth={500}
          storageKey="document-list-width"
        >
          <div className="sidebar-content">
            <LogoHeader
              logoSrc="/nbg-tech-hub-logo.svg"
              logoAlt="NBG Tech Hub"
              title={<h3>Documents</h3>}
              subtitle={`${documents.length} documents`}
              topRightControls={<ThemeToggle />}
            />
            <div className="list-container">
              <List
                items={documents}
                renderItem={renderDocumentItem}
                keyExtractor={(doc) => doc.id}
                showSearch
                searchPlaceholder="Search documents..."
                searchFields={[
                  (doc) => doc.title,
                  (doc) => doc.author,
                  (doc) => doc.tags.join(' ')
                ]}
                onSearchChange={setSearchTerm}
                sortOptions={[
                  { value: 'date', label: 'Date' },
                  { value: 'title', label: 'Title' },
                  { value: 'status', label: 'Status' }
                ]}
                onSort={(docs, sortBy) => {
                  const sorted = [...docs];
                  switch (sortBy) {
                    case 'date':
                      sorted.sort((a, b) => b.date.getTime() - a.date.getTime());
                      break;
                    case 'title':
                      sorted.sort((a, b) => a.title.localeCompare(b.title));
                      break;
                    case 'status':
                      const statusOrder = { 'published': 0, 'review': 1, 'draft': 2 };
                      sorted.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
                      break;
                  }
                  return sorted;
                }}
                emptyMessage="No documents found"
                emptyDescription={searchTerm ? "Try adjusting your search terms" : "No documents available"}
              />
            </div>
          </div>
        </ResizablePanel>
        
        <div className="main-content">
          <NoLogoHeader
            title={
              selectedDocument 
                ? <h2>{selectedDocument.title}</h2>
                : <h2>Select a Document</h2>
            }
            subtitle={
              selectedDocument && (
                <div className="header-subtitle">
                  <span className="subtitle-item">
                    <User size={14} />
                    {selectedDocument.author}
                  </span>
                  <span className="subtitle-item">
                    <Calendar size={14} />
                    {selectedDocument.date.toLocaleDateString()}
                  </span>
                  <span className="subtitle-item">
                    <Clock size={14} />
                    Last updated: {selectedDocument.date.toLocaleTimeString()}
                  </span>
                </div>
              )
            }
            topRightControls={
              selectedDocument && (
                <div className="header-controls">
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(selectedDocument.status) }}>
                    {selectedDocument.status}
                  </span>
                  {selectedDocument.rating && (
                    <div className="rating">
                      <Star size={16} fill="currentColor" />
                      <span>{selectedDocument.rating}/5</span>
                    </div>
                  )}
                </div>
              )
            }
            heightAdjustment={2}
          />
          
          <div className="content-area">
            {selectedDocument ? (
              <div className="document-content">
                <div className="content-tags">
                  {selectedDocument.tags.map(tag => (
                    <span key={tag} className="content-tag">
                      <Tag size={14} />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="content-body">
                  {selectedDocument.content.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={index}>{line.substring(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={index}>{line.substring(3)}</h2>;
                    } else if (line.startsWith('### ')) {
                      return <h3 key={index}>{line.substring(4)}</h3>;
                    } else if (line.startsWith('- ')) {
                      return <li key={index}>{line.substring(2)}</li>;
                    } else if (line.trim() && !line.startsWith('#')) {
                      return <p key={index}>{line}</p>;
                    }
                    return null;
                  })}
                </div>
              </div>
            ) : (
              <div className="empty-content">
                <FileText size={48} />
                <h3>No Document Selected</h3>
                <p>Select a document from the list to view its content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;