'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Users,
  Trophy,
  BarChart,
  BookOpen,
  LogOut,
  Menu,
  X,
  Dice1,
  Gamepad2,
  Calendar
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    { href: '/admin/next-game', label: 'Next Game', icon: Calendar },
    { href: '/admin/members', label: 'Membres', icon: Users },
    { href: '/admin/games', label: 'Jeux', icon: Dice1 },
    { href: '/admin/scores', label: 'Scores', icon: Trophy },
    { href: '/admin/anecdotes', label: 'Anecdotes', icon: BookOpen },
    { href: '/admin/olivia', label: 'Citations Olivia', icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 border-b border-slate-800 backdrop-blur">
        <div className="flex items-center justify-between p-3.5">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
              <Gamepad2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">JDS Admin</h1>
              <p className="text-[11px] text-slate-400">Control Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2.5 bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700 text-white transition-colors"
            aria-label={sidebarOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800">
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">JDS Admin</h2>
                <p className="text-slate-400 text-xs">Control Panel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="text-sm font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {sidebarOpen && mounted && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />

            <motion.div
              className="absolute top-0 right-0 bottom-0 w-72 sm:w-80 bg-slate-900 border-l border-slate-800 shadow-2xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">Navigation</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}

                <div className="pt-3 mt-3 border-t border-slate-800">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="h-5 w-5 shrink-0" />
                    <span className="font-medium">Déconnexion</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-16 lg:pt-0 lg:pl-64">
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}