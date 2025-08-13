"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  
  // Check if current path is an admin route
  const isAdminRoute = pathname.startsWith('/admin');
  
  // For admin routes, only render children (no regular navbar/footer)
  if (isAdminRoute) {
    return <>{children}</>;
  }
  
  // For regular routes, render with navbar and footer
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ConditionalLayout;