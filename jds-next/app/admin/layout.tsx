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
  Zap,
  Activity
} from 'lucide-react';
import FuturisticBackground from '@/components/admin/FuturisticBackground';
import FuturisticButton from '@/components/admin/FuturisticButton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Ne pas afficher le layout sur la page de login
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home, color: 'from-cyan-500 to-blue-600' },
    { href: '/admin/members', label: 'Membres', icon: Users, color: 'from-purple-500 to-pink-600' },
    { href: '/admin/games', label: 'Jeux', icon: Dice1, color: 'from-green-500 to-emerald-600' },
    { href: '/admin/scores', label: 'Scores', icon: Trophy, color: 'from-yellow-500 to-orange-600' },
    { href: '/admin/anecdotes', label: 'Anecdotes', icon: BookOpen, color: 'from-indigo-500 to-purple-600' },
    { href: '/admin/olivia', label: 'Citations Olivia', icon: BarChart, color: 'from-pink-500 to-rose-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Futuristic Background */}
      <FuturisticBackground />
      
      {/* Animated Background Gradient with Neon Effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
      
      {/* Neon Grid Overlay */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-400/10 to-transparent" />
      </div>
      
      {/* Neon Grid Pattern */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Mobile Header avec menu hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-400/50">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">JDS Admin</h1>
          </div>
          
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 hover:text-cyan-200 transition-all shadow-lg shadow-cyan-400/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: sidebarOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Sidebar Desktop */}
      <motion.div 
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-72 lg:block"
        initial={{ x: -288 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="h-full bg-slate-900/95 backdrop-blur-xl border-r border-cyan-500/30 shadow-2xl shadow-purple-500/20">
          <div className="flex flex-col h-full">
            {/* Header Desktop */}
            <motion.div 
              className="p-6 border-b border-cyan-500/30"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-400/50">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">JDS Admin</h2>
                  <p className="text-cyan-400 text-sm font-medium">Control Panel</p>
                </div>
              </div>
              
              {/* System Status */}
              <div className="flex items-center space-x-2 text-sm">
                <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
                <span className="text-white">System Online</span>
                <span className="text-cyan-400 font-mono">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </motion.div>

            {/* Navigation Desktop */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="group relative block"
                    >
                      <div className={`
                        flex items-center px-4 py-3 rounded-xl transition-all duration-300
                        ${isActive
                          ? `bg-gradient-to-r ${item.color} shadow-lg shadow-${item.color.split('-')[1]}-500/50 text-white`
                          : 'text-white hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:shadow-lg hover:shadow-cyan-500/25'
                        }
                      `}>
                        <Icon className="h-5 w-5 mr-3" />
                        <span className="font-medium">{item.label}</span>
                        
                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-white rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer Desktop */}
            <motion.div 
              className="p-4 border-t border-cyan-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 rounded-xl text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 font-medium"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Déconnexion
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Menu déroulant mobile futuriste */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            
            <motion.div
              className="absolute top-20 left-4 right-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/20 border border-cyan-500/30 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Menu Content */}
              <div className="p-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center px-4 py-4 mx-2 my-1 rounded-xl transition-all duration-200
                          ${isActive
                            ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-${item.color.split('-')[1]}-500/50`
                            : 'text-white hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:shadow-lg hover:shadow-cyan-500/25'
                          }
                        `}
                      >
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center mr-4
                          ${isActive ? 'bg-white/20' : 'bg-cyan-500/20'}
                        `}>
                          <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-lg">{item.label}</span>
                        </div>
                        {isActive && (
                          <motion.div
                            className="w-3 h-3 bg-white rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Logout dans le menu mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: navItems.length * 0.05, duration: 0.2 }}
                  className="mt-2 pt-2 border-t border-cyan-500/30"
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-4 mx-2 rounded-xl text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center mr-4">
                      <LogOut className="h-5 w-5 text-red-400" />
                    </div>
                    <span className="font-semibold text-lg">Déconnexion</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div 
        className="pt-20 lg:pt-0 lg:pl-72 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <main className="p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </motion.div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}