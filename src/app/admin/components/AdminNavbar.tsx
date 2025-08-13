"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '@/app/contexts/AdminAuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut, 
  Settings 
} from 'lucide-react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #667eea;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  
  ${props => props.$isActive 
    ? `
      background: #667eea;
      color: white;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    `
    : `
      color: #6b7280;
      &:hover {
        background: #f3f4f6;
        color: #374151;
      }
    `
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #374151;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.75rem;
  background: #dc2626;
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #b91c1c;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const MobileNavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  
  ${props => props.$isActive 
    ? `
      background: #667eea;
      color: white;
    `
    : `
      color: #6b7280;
      &:hover {
        background: #f3f4f6;
        color: #374151;
      }
    `
  }
`;

const AdminNavbar: React.FC = () => {
  const pathname = usePathname();
  const { admin, logout } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/media', label: 'Media', icon: FileText },
  ];

  return (
    <NavContainer>
      <NavContent>
        <Logo>CFA Admin</Logo>
        
        <NavLinks>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                href={item.href}
                $isActive={pathname === item.href}
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}
        </NavLinks>

        <UserInfo>
          <UserName>{admin?.username}</UserName>
          <LogoutButton onClick={logout}>
            <LogOut size={16} />
            Logout
          </LogoutButton>
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Settings size={20} />
          </MobileMenuButton>
        </UserInfo>
      </NavContent>

      <MobileMenu isOpen={mobileMenuOpen}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <MobileNavLink
              key={item.href}
              href={item.href}
              $isActive={pathname === item.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon size={20} />
              {item.label}
            </MobileNavLink>
          );
        })}
      </MobileMenu>
    </NavContainer>
  );
};

export default AdminNavbar;