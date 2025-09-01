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
  Sparkles,
  Gamepad2
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
    { href: '/admin/members', label: 'Membres', icon: Users },
    { href: '/admin/games', label: 'Jeux', icon: Dice1 },
    { href: '/admin/scores', label: 'Scores', icon: Trophy },
    { href: '/admin/anecdotes', label: 'Anecdotes', icon: BookOpen },
    { href: '/admin/olivia', label: 'Citations Olivia', icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      
      {/* Mobile/Tablet Header - Amélioré */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-purple-500/20 backdrop-blur-lg">
        <div className="flex items-center justify-between p-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur-md opacity-50" />
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">JDS ADMIN</h1>
              <p className="text-xs text-slate-400">Control Panel</p>
            </div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="relative p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30 text-white"
          >
            <AnimatePresence mode="wait">
              {sidebarOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
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

      {/* Menu Mobile/Tablet - Amélioré */}
      <AnimatePresence>
        {sidebarOpen && mounted && (
          <motion.div 
            className="lg:hidden fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div 
              className="absolute top-20 left-4 right-4 sm:left-8 sm:right-8 md:left-auto md:right-8 md:w-96 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              {/* Header décoratif */}
              <div className="relative p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-purple-500/30">
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-75" />
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150" />
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
                  <span className="text-sm font-bold text-purple-300 uppercase tracking-wider">Navigation</span>
                </div>
              </div>

              <nav className="p-6 space-y-3">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          relative flex items-center justify-center sm:justify-start px-4 py-4 rounded-xl transition-all duration-300 group
                          ${isActive
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                            : 'text-slate-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:text-white'
                          }
                        `}
                      >
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-20"
                            animate={{ 
                              opacity: [0.2, 0.3, 0.2],
                              scale: [1, 1.02, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        <div className="relative flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-purple-600/30'} transition-all`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold">{item.label}</span>
                            {isActive && (
                              <span className="text-xs opacity-80">Actif</span>
                            )}
                          </div>
                        </div>
                        {!isActive && (
                          <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                          </div>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="pt-4 mt-4 border-t border-slate-700"
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center sm:justify-start w-full px-4 py-4 rounded-xl text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-all">
                        <LogOut className="h-5 w-5" />
                      </div>
                      <span className="font-semibold">Déconnexion</span>
                    </div>
                  </button>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="pt-20 lg:pt-0 lg:pl-64">
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}