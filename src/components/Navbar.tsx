import React from 'react';
import { useJobHub } from '../context/JobContext';
import {
  Compass,
  Briefcase,
  Bookmark,
  PlusCircle,
  User,
  Github,
  Sparkles,
} from 'lucide-react';

export type NavTab = 'explore' | 'applications' | 'saved' | 'post' | 'profile';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const { applications, savedJobs, profile, setIsGitHubModalOpen } = useJobHub();

  const navItems = [
    {
      id: 'explore' as NavTab,
      label: 'Explore',
      icon: Compass,
      badge: 0,
    },
    {
      id: 'applications' as NavTab,
      label: 'Pipeline',
      icon: Briefcase,
      badge: applications.length,
    },
    {
      id: 'saved' as NavTab,
      label: 'Saved',
      icon: Bookmark,
      badge: savedJobs.length,
    },
    {
      id: 'post' as NavTab,
      label: 'Post Role',
      icon: PlusCircle,
      badge: 0,
    },
    {
      id: 'profile' as NavTab,
      label: 'Profile',
      icon: User,
      badge: 0,
    },
  ];

  return (
    <>
      {/* Desktop & Tablet Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => onTabChange('explore')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white font-extrabold flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all">
              <span className="text-sm font-black tracking-tight">JH</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold text-white tracking-tight">
                  JobHub
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Career Tracker
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/60 p-1 rounded-2xl border border-slate-700/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-white text-blue-600'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: GitHub Sync & Candidate Avatar */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shadow-sm transition-all"
              title="Push JobHub to GitHub repository"
            >
              <Github className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Push to GitHub</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            <button
              onClick={() => onTabChange('profile')}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            >
              <span className="text-xs font-semibold text-slate-300 hidden lg:inline">
                {profile.name.split(' ')[0]}
              </span>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center">
                {profile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Matching Android Jetpack Compose NavigationBar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive ? 'text-blue-400 font-bold' : 'text-slate-400 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-blue-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};
