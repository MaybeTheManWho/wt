import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TicketList from '../components/TicketList';
import TicketView from '../components/TicketView';
import TopNav from '../components/TopNav';
import { useTickets } from '../context/TicketContext';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
`;

const ListContainer = styled(motion.div)`
  width: 400px;
  height: 100%;
  overflow: hidden;
`;

const ViewContainer = styled(motion.div)`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

// --- UI ENHANCEMENTS ---

const StatsCard = styled(motion.div)`
  background: linear-gradient(145deg, ${({ theme }) => theme.colors.background.medium}, ${({ theme }) => theme.colors.background.dark});
  border-radius: ${({ theme }) => theme.border.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${({ color }) => color || '#4f8eff'};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }
`;

const TicketItem = styled(motion.div)`
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${({ priority, theme }) => {
      switch (priority) {
        case 'urgent': return theme.colors.priority.urgent;
        case 'medium': return theme.colors.priority.medium;
        case 'low': return theme.colors.priority.low;
        default: return theme.colors.priority.low;
      }
    }};
  }
  
  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const LoadingSkeleton = styled.div`
  width: 100%;
  height: ${props => props.height || '20px'};
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.background.light} 25%, 
    ${({ theme }) => theme.colors.background.medium} 50%, 
    ${({ theme }) => theme.colors.background.light} 75%);
  background-size: 200% 100%;
  border-radius: ${({ theme }) => theme.border.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// --- COMPONENT LOGIC ---

const Dashboard = () => {
  const { 
    openTickets, 
    closedTickets, 
    unassignedTickets, 
    claimedTickets,
    activeTicket,
    loading,
    fetchTicket,
    sendMessage,
    assignStaff,
    assignTeam,
    addTag,
    setPriority,
    closeTicket,
    setActiveTicket,
    fetchAllTickets
  } = useTickets();
  
  const [currentTab, setCurrentTab] = useState('open');
  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [staff, setStaff] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tags, setTags] = useState([]);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetchAllTickets();
    setStaff([
      { id: '1', username: 'John Doe', role: { color: '#4B0082' } },
      { id: '2', username: 'Jane Smith', role: { color: '#2196F3' } },
      { id: '3', username: 'Alex Johnson', role: { color: '#4CAF50' } },
    ]);
    setTeams([
      { id: '1', name: 'Support Team', color: '#4B0082', members: [
        { id: '1', username: 'John Doe' },
        { id: '2', username: 'Jane Smith' },
      ]},
      { id: '2', name: 'Technical Team', color: '#2196F3', members: [
        { id: '3', username: 'Alex Johnson' },
      ]},
    ]);
    setTags([
      { id: '1', name: 'Bug', color: '#F44336' },
      { id: '2', name: 'Feature Request', color: '#4CAF50' },
      { id: '3', name: 'Question', color: '#2196F3' },
    ]);
    setSnippets([
      { id: '1', name: 'Greeting', content: 'Hello! Thank you for contacting support. How can I help you today?' },
      { id: '2', name: 'Closing', content: 'Is there anything else I can help you with? If not, I\'ll close this ticket. Feel free to create a new one if you have more questions in the future.' },
      { id: '3', name: 'Bug Report', content: 'I understand you\'re experiencing an issue. Could you please provide the following information:\n\n1. Steps to reproduce\n2. Expected behavior\n3. Actual behavior\n4. Screenshots (if applicable)\n\nThis will help us investigate the problem more effectively.' },
    ]);
  }, []);

  useEffect(() => {
    if (currentTicketId) {
      fetchTicket(currentTicketId);
    }
  }, [currentTicketId]);

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    setCurrentTicketId(null);
    setActiveTicket(null);
  };

  const handleTicketSelect = (ticketId) => {
    setCurrentTicketId(ticketId);
  };

  const handleSendMessage = (message) => {
    if (currentTicketId) sendMessage(currentTicketId, message);
  };

  const handleAssignStaff = (staffId) => {
    if (currentTicketId) assignStaff(currentTicketId, staffId);
  };

  const handleAssignTeam = (teamId) => {
    if (currentTicketId) assignTeam(currentTicketId, teamId);
  };

  const handleAddTag = (tagId) => {
    if (currentTicketId) addTag(currentTicketId, tagId);
  };

  const handleChangePriority = (priority) => {
    if (currentTicketId) setPriority(currentTicketId, priority);
  };

  const handleCloseTicket = () => {
    if (currentTicketId) closeTicket(currentTicketId);
  };

  const getCurrentTickets = () => {
    switch (currentTab) {
      case 'open': return openTickets;
      case 'closed': return closedTickets;
      case 'unassigned': return unassignedTickets;
      case 'claimed': return claimedTickets;
      default: return [];
    }
  };

  const tabCounts = {
    open: openTickets.length,
    closed: closedTickets.length,
    unassigned: unassignedTickets.length,
    claimed: claimedTickets.length
  };

  const tabs = [
    { id: 'open', label: 'Open Tickets', count: tabCounts.open },
    { id: 'closed', label: 'Closed Tickets', count: tabCounts.closed },
    { id: 'unassigned', label: 'Unassigned Tickets', count: tabCounts.unassigned },
    { id: 'claimed', label: 'Claimed Tickets', count: tabCounts.claimed },
  ];

  return (
    <DashboardContainer>
      <TopNav 
        title="Ticket Dashboard"
        tabs={tabs}
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
      <ContentContainer>
        <ListContainer
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TicketList
            tickets={getCurrentTickets()}
            activeTicketId={currentTicketId}
            onTicketSelect={handleTicketSelect}
            title={tabs.find(tab => tab.id === currentTab)?.label || 'Tickets'}
            emptyTitle={`No ${currentTab} tickets found`}
            emptyMessage={`There are currently no ${currentTab} tickets to display.`}
          />
        </ListContainer>
        <ViewContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <TicketView
            ticket={activeTicket}
            onSendMessage={handleSendMessage}
            onAssignStaff={handleAssignStaff}
            onAssignTeam={handleAssignTeam}
            onAddTag={handleAddTag}
            onChangePriority={handleChangePriority}
            onCloseTicket={handleCloseTicket}
            snippets={snippets}
            staff={staff}
            teams={teams}
            tags={tags}
          />
        </ViewContainer>
      </ContentContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
