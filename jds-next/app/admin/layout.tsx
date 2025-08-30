'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  Trophy, 
  BarChart, 
  BookOpen, 
  LogOut, 
  Menu,
  X,
  Dice1
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Ne pas afficher le layout sur la page de login
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/members', label: 'Membres', icon: Users },
    { href: '/admin/games', label: 'Jeux', icon: Dice1 },
    { href: '/admin/scores', label: 'Scores', icon: Trophy },
    { href: '/admin/anecdotes', label: 'Anecdotes', icon: BookOpen },
    { href: '/admin/olivia', label: 'Citations Olivia', icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      
      {/* Mobile Header - Simplifié */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-white">JDS Admin</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-white"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Desktop - Simplifié */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-slate-800 border-r border-slate-700">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">JDS Admin</h2>
            <p className="text-slate-400 text-sm">Control Panel</p>
          </div>

          <nav className="flex-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 mb-2 rounded-lg
                    ${isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-red-400 hover:bg-slate-700"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile - Simplifié */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setSidebarOpen(false)} 
          />
          
          <div className="absolute top-16 left-0 right-0 bg-slate-800 border-b border-slate-700">
            <nav className="p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center px-4 py-3 mb-2 rounded-lg
                      ${isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 mt-4 rounded-lg text-red-400 hover:bg-slate-700 border-t border-slate-600 pt-6"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Déconnexion
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="pt-16 lg:pt-0 lg:pl-64">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}