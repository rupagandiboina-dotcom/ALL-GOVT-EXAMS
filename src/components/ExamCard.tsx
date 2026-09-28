import React from 'react';
import { 
  Users, 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronRight, 
  Bookmark, 
  MapPin, 
  Briefcase
} from 'lucide-react';
import { ExamNotification } from '../types/exam';
import { 
  getStatusBadgeStyle, 
  getCategoryBadgeStyle, 
  formatDeadlineText 
} from '../utils/helpers';

interface ExamCardProps {
  exam: ExamNotification;
  onSelect: (exam: ExamNotification) => void;
  isSaved?: boolean;
  onToggleSave?: (examId: string) => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({
  exam,
  onSelect,
  isSaved = false,
  onToggleSave
}) => {
  const statusStyle = getStatusBadgeStyle(exam.status);
  const categoryStyle = getCategoryBadgeStyle(exam.category);
  const deadline = formatDeadlineText(exam.lastDate, exam.status, exam.applicationStartDate);

  return (
    <article className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-indigo-400/80 dark:hover:border-indigo-500/60 hover:shadow-md transition-all duration-200">
      <div>
        {/* Top bar of card: Category, Location, and Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${categoryStyle}`}>
              {exam.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{exam.state}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Status indicator */}
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border ${statusStyle.bg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
              <span>{statusStyle.label}</span>
            </span>

            {/* Bookmark button */}
            {onToggleSave && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(exam.id);
                }}
                title={isSaved ? 'Remove from Saved Watchlist' : 'Save exam to Watchlist'}
                aria-label={isSaved ? 'Remove from Saved Watchlist' : 'Save exam to Watchlist'}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isSaved
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Title & Organization */}
        <h3 
          onClick={() => onSelect(exam)}
          className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-2 leading-snug mb-1"
        >
          {exam.title}
        </h3>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-4 flex items-center gap-1">
          <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
          <span>{exam.organization}</span>
        </p>

        {/* Vacancies & Qualification Highlight */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
              Total Vacancies
            </span>
            <div className="flex items-center gap-1 text-slate-800 dark:text-slate-200 font-bold text-sm font-mono tabular-nums">
              <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>{exam.vacancies > 0 ? exam.vacancies.toLocaleString('en-IN') : 'To be notified'}</span>
            </div>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
              Min Qualification
            </span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate block">
              {exam.qualificationText.split(' ')[0]} {exam.qualification}
            </span>
          </div>
        </div>

        {/* Important Date Milestones */}
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Application Deadline:</span>
            </span>
            <span className={`font-mono tabular-nums font-semibold flex items-center gap-1.5 ${deadline.urgent ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'}`}>
              <span>{exam.lastDate}</span>
              <span className={`text-[10px] font-sans px-1.5 py-0.2 rounded font-semibold ${
                deadline.urgent 
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300' 
                  : exam.status === 'Upcoming'
                  ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                  : exam.status === 'Closed'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}>
                {deadline.text}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <CalendarIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Exam Schedule:</span>
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300 line-clamp-1 text-right">
              {exam.examDate}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer: View Details CTA */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 truncate max-w-[170px]" title={exam.postsSummary}>
          {exam.postsSummary}
        </span>

        <button
          onClick={() => onSelect(exam)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group-hover:translate-x-0.5 transition-all focus:outline-none focus-visible:underline"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
