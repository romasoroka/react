import { ReactNode } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import { SidebarProvider, useSidebarContext } from '../../context/SidebarContext';

interface LayoutProps {
  children: ReactNode;
  userName?: string;
  isAdmin?: boolean;
}

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  const { isCollapsed } = useSidebarContext();

  return (
    <div
      className={`flex-1 ${
        isCollapsed ? 'ml-16' : 'ml-64'
      } md:ml-0 transition-all duration-300 ease-in-out`}
    >
      <Header userName="Роман" isAdmin={true} />
      <main
  className={`pt-16 p-4 bg-gray-100 dark:bg-gray-900 min-h-screen transition-all duration-300 ease-in-out ${
    isCollapsed ? '' : 'ml-60'
  }`}
>
        {children}
      </main>
    </div>
  );
};

const Layout = ({ children, userName = 'Роман', isAdmin = true }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen dark:bg-gray-900 dark:text-gray-100">
        <Sidebar userName={userName} isAdmin={isAdmin} />
        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </SidebarProvider>
  );
};

export default Layout;