import React from 'react';
import { Layers, Users, AlertCircle, Calendar } from 'lucide-react';
import { ExamNotification } from '../types/exam';

interface QuickStatsBannerProps {
  exams: ExamNotification[];
  onClosingSoonClick?: () => void;
  onUpcomingClick?: () => void;
}

export const QuickStatsBanner: React.FC<QuickStatsBannerProps> = ({
  exams,
  onClosingSoonClick,
  onUpcomingClick
}) => {
  const activeExams = exams.filter(e => e.status === 'Applications Open' || e.status === 'Closing Soon');
  const closingSoonCount = exams.filter(e => e.status === 'Closing Soon').length;
  const upcomingCount = exams.filter(e => e.status === 'Upcoming').length;
  const totalVacancies = exams.reduce((acc, curr) => acc + curr.vacancies, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6">
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-center gap-3.5 shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
            Active Notifications
          </span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {activeExams.length}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-center gap-3.5 shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
            Total Vacancies Tracked
          </span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {totalVacancies.toLocaleString('en-IN')}+
          </div>
        </div>
      </div>

      <button
        onClick={onClosingSoonClick}
        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors flex items-center gap-3.5 shadow-sm text-left group"
      >
        <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <AlertCircle className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Closing Soon
          </span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {closingSoonCount}
          </div>
        </div>
      </button>

      <button
        onClick={onUpcomingClick}
        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors flex items-center gap-3.5 shadow-sm text-left group"
      >
        <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            Upcoming Releases
          </span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {upcomingCount}
          </div>
        </div>
      </button>
    </div>
  );
};
