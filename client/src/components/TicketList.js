import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { FiChevronRight, FiAlertCircle, FiClock, FiCheckCircle } from 'react-icons/fi';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.medium};
  border-radius: ${({ theme }) => theme.border.radius.lg};
  overflow: hidden;
  height: 100%;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: ${({ theme }) => theme.border.width.thin} solid ${({ theme }) => theme.colors.border.dark};
`;

const HeaderTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const TicketCount = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const FilterControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.primary};
  border: ${({ theme }) => theme.border.width.thin} solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;

const TicketsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  height: 100%;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.disabled};
`;

const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const EmptyMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TicketItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: ${({ theme }) => theme.border.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transition.fast};
  border: ${({ theme }) => theme.border.width.thin} solid ${({ theme }) => theme.colors.border.medium};
  
  ${({ isActive, theme }) => isActive && css`
    border-color: ${theme.colors.accent};
    background-color: ${theme.colors.background.medium};
  `}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const TicketHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: ${({ theme }) => theme.border.width.thin} solid ${({ theme }) => theme.colors.border.medium};
`;

const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TicketTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
`;

const TicketID = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const TicketMeta = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TimeAgo = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const TicketTags = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.border.radius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background-color: ${({ color, theme }) => color || theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PriorityTag = styled(Tag)`
  background-color: ${({ priority, theme }) => {
    switch (priority) {
      case 'urgent': return theme.colors.priority.urgent;
      case 'medium': return theme.colors.priority.medium;
      case 'low': return theme.colors.priority.low;
      default: return theme.colors.background.light;
    }
  }};
`;

const TicketDetails = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const TicketBody = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TicketFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StaffInfo = styled.div`
  display: flex;
  align-items: center;
`;

const StaffAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.border.radius.full};
  background-color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const StaffName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ViewButton = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

// Get time ago string
const getTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}d ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo ago`;
};

// Get staff initials
const getStaffInitials = (name) => {
  if (!name) return '?';
  
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

const TicketList = ({
  tickets = [],
  activeTicketId,
  onTicketSelect,
  title = 'Tickets',
  emptyTitle = 'No tickets found',
  emptyMessage = 'There are currently no tickets to display.',
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Filter tickets by search query
  const filteredTickets = React.useMemo(() => {
    if (!searchQuery.trim()) return tickets;
    
    const query = searchQuery.toLowerCase().trim();
    return tickets.filter(ticket => 
      ticket.title.toLowerCase().includes(query) || 
      ticket.id.toLowerCase().includes(query) ||
      ticket.opener.username.toLowerCase().includes(query)
    );
  }, [tickets, searchQuery]);
  
  return (
    <ListContainer>
      <ListHeader>
        <div>
          <HeaderTitle>
            {title}
            <TicketCount>({filteredTickets.length})</TicketCount>
          </HeaderTitle>
        </div>
        
        <FilterControls>
          <SearchInput
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FilterControls>
      </ListHeader>
      
      <TicketsList>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              isActive={activeTicketId === ticket.id}
              onClick={() => onTicketSelect(ticket.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TicketHeader>
                <TicketInfo>
                  <TicketTitle>
                    {ticket.title}
                    <TicketID>#{ticket.id}</TicketID>
                  </TicketTitle>
                  <TicketMeta>
                    <TimeAgo>
                      <FiClock size={14} />
                      {getTimeAgo(ticket.createdAt)}
                    </TimeAgo>
                    {ticket.status === 'open' ? (
                      <span>• Open</span>
                    ) : (
                      <span>• Closed</span>
                    )}
                  </TicketMeta>
                </TicketInfo>
                
                <TicketTags>
                  {ticket.priority && (
                    <PriorityTag priority={ticket.priority}>
                      {ticket.priority === 'urgent' && <FiAlertCircle size={12} style={{ marginRight: '4px' }} />}
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </PriorityTag>
                  )}
                  
                  {ticket.tags && ticket.tags.map((tag) => (
                    <Tag key={tag.id} color={tag.color}>
                      {tag.name}
                    </Tag>
                  ))}
                </TicketTags>
              </TicketHeader>
              
              <TicketDetails>
                <TicketBody>{ticket.lastMessage || 'No messages yet'}</TicketBody>
                
                <TicketFooter>
                  {ticket.assignedStaff ? (
                    <StaffInfo>
                      <StaffAvatar>
                        {getStaffInitials(ticket.assignedStaff.username)}
                      </StaffAvatar>
                      <StaffName>Assigned to {ticket.assignedStaff.username}</StaffName>
                    </StaffInfo>
                  ) : (
                    <StaffName>Unassigned</StaffName>
                  )}
                  
                  <ViewButton>
                    View <FiChevronRight size={16} style={{ marginLeft: '4px' }} />
                  </ViewButton>
                </TicketFooter>
              </TicketDetails>
            </TicketItem>
          ))
        ) : (
          <EmptyState>
            <EmptyIcon>
              {title.includes('Closed') ? <FiCheckCircle /> : <FiMessageSquare />}
            </EmptyIcon>
            <EmptyTitle>{emptyTitle}</EmptyTitle>
            <EmptyMessage>{emptyMessage}</EmptyMessage>
          </EmptyState>
        )}
      </TicketsList>
    </ListContainer>
  );
};

export default TicketList;