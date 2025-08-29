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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
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

      {/* Mobile Header optimisé avec menu hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <div className="flex items-center justify-between p-3 sm:p-4">
          {/* Logo et titre mobile first */}
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-400/50">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">JDS ADMIN</h1>
              <div className="text-xs text-cyan-400 font-mono hidden sm:block">
                {currentTime.toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </motion.div>
          
          {/* Menu hamburger futuriste */}
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="relative p-2 sm:p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-purple-500/30 hover:text-white transition-all shadow-lg shadow-cyan-400/25 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 rounded-xl"></div>
            
            <motion.div
              animate={{ rotate: sidebarOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {sidebarOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </motion.div>
            
            {/* Badge de notification */}
            {!sidebarOpen && (
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse"></div>
            )}
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
              className="absolute top-16 sm:top-20 left-2 right-2 sm:left-4 sm:right-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/20 border border-cyan-500/30 overflow-hidden max-h-[calc(100vh-8rem)]"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Grille cyberpunk en header */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
              
              {/* Menu Content avec scroll */}
              <div className="p-2 sm:p-3 overflow-y-auto max-h-full">
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
                          flex items-center px-3 py-3 sm:px-4 sm:py-4 mx-1 sm:mx-2 my-1 rounded-lg sm:rounded-xl transition-all duration-200 group relative overflow-hidden
                          ${isActive
                            ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                            : 'text-white hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:shadow-lg hover:shadow-cyan-500/25'
                          }
                        `}
                      >
                        {/* Effet de scan au hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        
                        <div className={`
                          w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mr-3 sm:mr-4 relative
                          ${isActive ? 'bg-white/20' : 'bg-cyan-500/20'}
                        `}>
                          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                          {isActive && (
                            <div className="absolute -inset-1 bg-white/20 rounded-lg blur-sm"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 relative">
                          <span className="font-bold text-base sm:text-lg tracking-wide">
                            {item.label}
                          </span>
                          {isActive && (
                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/50 rounded-full"></div>
                          )}
                        </div>
                        
                        {isActive && (
                          <motion.div
                            className="flex items-center space-x-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
                            <div className="text-xs sm:text-sm opacity-70">ACTIF</div>
                          </motion.div>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Logout dans le menu mobile - style gaming */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: navItems.length * 0.05, duration: 0.2 }}
                  className="mt-3 pt-3 border-t border-gradient-to-r border-cyan-500/30"
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-3 sm:px-4 sm:py-4 mx-1 sm:mx-2 rounded-lg sm:rounded-xl text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500/80 hover:to-pink-600/80 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-200 group relative overflow-hidden"
                  >
                    {/* Effet de scan au hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/20 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-red-500/30 transition-colors">
                      <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-bold text-base sm:text-lg tracking-wide">
                      DÉCONNEXION
                    </span>
                    <div className="ml-auto text-xs opacity-60">🚪</div>
                  </button>
                </motion.div>
                
                {/* Footer du menu avec stats */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 p-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20"
                >
                  <div className="text-center space-y-1">
                    <div className="text-xs text-cyan-400 font-mono">SYSTÈME STATUS</div>
                    <div className="flex justify-center items-center space-x-2 text-xs text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>OPÉRATIONNEL</span>
                      <div className="text-white font-mono">
                        {currentTime.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
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