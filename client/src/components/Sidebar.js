import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { FiPieChart, FiSettings, FiMessageSquare, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.medium};
  border-right: ${({ theme }) => theme.border.width.thin} solid ${({ theme }) => theme.colors.border.dark};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.elevated};
`;

const Logo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: ${({ theme }) => theme.border.width.thin} solid ${({ theme }) => theme.colors.border.dark};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LogoIcon = styled.div`
  color: #4f8eff;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  filter: drop-shadow(0 0 5px rgba(79, 142, 255, 0.5));
`;

const LogoText = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: linear-gradient(to right, #4f8eff, #a349ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const NavMenu = styled.nav`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const NavSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-left: ${({ theme }) => theme.spacing.md};
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.border.radius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
    transform: translateX(5px);
    box-shadow: -3px 0 0 ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: -3px 0 0 ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const NavText = styled.span`
  flex: 1;
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.border.radius.md};
`;

const UserSection = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: ${({ theme }) => theme.border.width.thin} solid ${({ theme }) => theme.colors.border.dark};
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.border.radius.full};
  background-color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const UserInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

const UserName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Sidebar = ({ user }) => {
  const location = useLocation();
  
  const mainNavItems = [
    { 
      path: '/dashboard',
      label: 'Tickets Dashboard',
      icon: <FiMessageSquare size={20} />
    },
    { 
      path: '/stats',
      label: 'Stats',
      icon: <FiPieChart size={20} />
    },
    { 
      path: '/site-management',
      label: 'Site Management',
      icon: <FiSettings size={20} />
    },
    { 
      path: '/snippets',
      label: 'Snippets',
      icon: <FiMessageSquare size={20} />
    }
  ];

  const getUserInitials = () => {
    if (!user || !user.username) return '?';
    const names = user.username.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <SidebarContainer>
      <Logo>
        <LogoIcon>
          <FiShield />
        </LogoIcon>
        <LogoText>Sword TL</LogoText>
      </Logo>

      <NavMenu>
        <NavSection>
          <SectionTitle>Main</SectionTitle>
          {mainNavItems.map((item) => (
            <NavItem 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {location.pathname === item.path && (
                <ActiveIndicator layoutId="activeIndicator" />
              )}
              <NavIcon>{item.icon}</NavIcon>
              <NavText>{item.label}</NavText>
            </NavItem>
          ))}
        </NavSection>
      </NavMenu>

      {user && (
        <UserSection>
          <UserAvatar>{getUserInitials()}</UserAvatar>
          <UserInfo>
            <UserName>{user.username}</UserName>
            <UserRole>{user.role?.name || 'Staff'}</UserRole>
          </UserInfo>
        </UserSection>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
