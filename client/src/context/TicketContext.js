import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const TicketContext = createContext();

export const useTickets = () => {
  return useContext(TicketContext);
};

export const TicketProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [openTickets, setOpenTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const [unassignedTickets, setUnassignedTickets] = useState([]);
  const [claimedTickets, setClaimedTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const exampleTicket = {
    id: "TKT-1234",
    title: "Cannot access account settings",
    channelId: "123456789012345678",
    userId: "987654321098765432",
    username: "JohnDoe",
    status: "open",
    priority: "medium",
    assignedStaff: {
      id: "staff-123",
      username: "Support Team",
      avatar: null
    },
    assignedTeam: {
      id: "team-456",
      name: "Technical Support",
      color: "#4f8eff"
    },
    tags: [
      { id: "tag-1", name: "Account Issue", color: "#FF9800" },
      { id: "tag-2", name: "Priority", color: "#F44336" }
    ],
    messages: [
      {
        id: "msg-1",
        content: "Hello, I can't access my account settings page. It keeps giving me an error when I click on the settings tab.",
        userId: "987654321098765432",
        username: "JohnDoe",
        timestamp: new Date(Date.now() - 3600000 * 5),
        type: "user"
      },
      {
        id: "msg-2",
        content: "Hi John, I'm sorry to hear you're having trouble. Could you please tell me what error message you're seeing?",
        userId: "staff-123",
        username: "Support Team",
        timestamp: new Date(Date.now() - 3600000 * 4),
        type: "staff"
      },
      {
        id: "msg-3",
        content: "It says 'Error 403: Access Denied' when I try to open the page.",
        userId: "987654321098765432",
        username: "JohnDoe",
        timestamp: new Date(Date.now() - 3600000 * 3),
        type: "user"
      },
      {
        id: "msg-4",
        content: "Thanks for the information. It looks like there might be a permissions issue with your account. Let me check this for you.",
        userId: "staff-123",
        username: "Support Team",
        timestamp: new Date(Date.now() - 3600000 * 2),
        type: "staff"
      },
      {
        id: "msg-5",
        content: "I've checked your account and found that there was a permission setting that wasn't correctly applied. I've fixed this now, could you please try accessing your settings again and let me know if it works?",
        userId: "staff-123",
        username: "Support Team",
        timestamp: new Date(Date.now() - 3600000),
        type: "staff"
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 5),
    firstResponseTime: 3600000,
    totalResponseTime: 3600000 * 2,
    responseCount: 3
  };

  useEffect(() => {
    if (currentUser) {
      fetchAllTickets();
    } else {
      // Mock demo
      setActiveTicket(exampleTicket);
    }
  }, [currentUser]);

  const fetchAllTickets = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const fetchedTickets = await api.get('/tickets');
      setTickets(fetchedTickets);
      categorizeTickets(fetchedTickets);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
      setError('Failed to fetch tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categorizeTickets = (tickets) => {
    const open = tickets.filter(ticket => ticket.status === 'open');
    const closed = tickets.filter(ticket => ticket.status === 'closed');
    const unassigned = tickets.filter(ticket => ticket.status === 'open' && !ticket.assignedStaff);
    const claimed = tickets.filter(
      ticket => ticket.status === 'open' && 
        ticket.assignedStaff && 
        ticket.assignedStaff.id === currentUser?.id
    );

    setOpenTickets(open);
    setClosedTickets(closed);
    setUnassignedTickets(unassigned);
    setClaimedTickets(claimed);
  };

  const fetchTicket = async (ticketId) => {
    try {
      setLoading(true);
      const fetchedTicket = await api.get(`/tickets/${ticketId}`);
      setActiveTicket(fetchedTicket);
      return fetchedTicket;
    } catch (err) {
      console.error(`Failed to fetch ticket ${ticketId}:`, err);
      setError('Failed to fetch ticket details. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (ticketId, message) => {
    try {
      setLoading(true);
      const updatedTicket = await api.post(`/tickets/${ticketId}/messages`, { content: message });
      setActiveTicket(updatedTicket);
      await fetchAllTickets();
      return updatedTicket;
    } catch (err) {
      console.error(`Failed to send message in ticket ${ticketId}:`, err);
      setError('Failed to send message. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const assignStaff = async (ticketId, staffId) => {
    try {
      setLoading(true);
      const updatedTicket = await api.put(`/tickets/${ticketId}/assign`, { staffId });
      setActiveTicket(updatedTicket);
      await fetchAllTickets();
      return updatedTicket;
    } catch (err) {
      console.error(`Failed to assign staff to ticket ${ticketId}:`, err);
      setError('Failed to assign staff. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const assignTeam = async (ticketId, teamId) => {
    try {
      setLoading(true);
      const updatedTicket = await api.put(`/tickets/${ticketId}/team`, { teamId });
      setActiveTicket(updatedTicket);
      await fetchAllTickets();
      return updatedTicket;
    } catch (err) {
      console.error(`Failed to assign team to ticket ${ticketId}:`, err);
      setError('Failed to assign team. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addTag = async (ticketId, tagId) => {
    try {
      setLoading(true);
      const updatedTicket = await api.put(`/tickets/${ticketId}/tags`, { tagId });
      setActiveTicket(updatedTicket);
      await fetchAllTickets();
      return updatedTicket;
    } catch (err) {
      console.error(`Failed to add tag to ticket ${ticketId}:`, err);
      setError('Failed to add tag. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const setPriority = async (ticketId, priority) => {
    try {
      setLoading(true);
      const updatedTicket = await api.put(`/tickets/${ticketId}/priority`, { priority });
      setActiveTicket(updatedTicket);
      await fetchAllTickets();
      return updatedTicket;
    } catch (err) {
      console.error(`Failed to set priority for ticket ${ticketId}:`, err);
      setError('Failed to set priority. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const closeTicket = async (ticketId) => {
    try {
      setLoading(true);
      const updatedTicket = await api.put(`/tickets/${ticketId}/close`);
      setActiveTicket(updatedTicket);
      await fetchAllTickets();
      return updatedTicket;
    } catch (err) {
      console.error(`Failed to close ticket ${ticketId}:`, err);
      setError('Failed to close ticket. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    tickets,
    openTickets,
    closedTickets,
    unassignedTickets,
    claimedTickets,
    activeTicket,
    loading,
    error,
    fetchAllTickets,
    fetchTicket,
    sendMessage,
    assignStaff,
    assignTeam,
    addTag,
    setPriority,
    closeTicket,
    setActiveTicket
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketContext;
