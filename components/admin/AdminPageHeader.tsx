'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import FuturisticCard from './FuturisticCard';

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconGradient?: string;
  count?: number;
  countLabel?: string;
  action?: ReactNode;
}

export default function AdminPageHeader({
  title,
  subtitle,
  icon: Icon,
  iconGradient = 'from-cyan-500 to-purple-600',
  count,
  countLabel,
  action,
}: AdminPageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <FuturisticCard className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${iconGradient} rounded-xl flex items-center justify-center shrink-0`}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">
                {title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-300 mt-0.5">
                {subtitle && <span>{subtitle}</span>}
                {typeof count === 'number' && (
                  <span className="text-xs bg-slate-700/60 text-slate-200 px-2 py-0.5 rounded-full">
                    {count} {countLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </FuturisticCard>
    </motion.div>
  );
}
