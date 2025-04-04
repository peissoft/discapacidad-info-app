
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, UserRound, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-health-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ICF Disability Assessment</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className={cn("hover:text-health-200", currentPath === "/" && "text-health-200 font-medium")}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assessment" className={cn("hover:text-health-200", currentPath.includes("/assessment") && "text-health-200 font-medium")}>
                  Assessment
                </Link>
              </li>
              <li>
                <Link to="/about" className={cn("hover:text-health-200", currentPath === "/about" && "text-health-200 font-medium")}>
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-100 text-gray-600 p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} ICF Disability Assessment App</p>
        </div>
      </footer>
      
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-3 p-2">
          <Link to="/" className={cn("flex flex-col items-center p-2 rounded-md", currentPath === "/" && "text-health-600")}>
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/assessment" className={cn("flex flex-col items-center p-2 rounded-md", currentPath.includes("/assessment") && "text-health-600")}>
            <ClipboardList size={20} />
            <span className="text-xs mt-1">Assessment</span>
          </Link>
          <Link to="/about" className={cn("flex flex-col items-center p-2 rounded-md", currentPath === "/about" && "text-health-600")}>
            <Info size={20} />
            <span className="text-xs mt-1">About</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
