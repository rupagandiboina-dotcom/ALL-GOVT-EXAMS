import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Filter, 
  LayoutGrid, 
  List, 
  CalendarDays,
  ExternalLink
} from 'lucide-react';
import { ExamNotification, ExamCategory } from '../types/exam';
import { CATEGORIES_LIST } from '../data/examsData';
import { getCategoryBadgeStyle } from '../utils/helpers';

interface ExamCalendarProps {
  exams: ExamNotification[];
  onSelectExam: (exam: ExamNotification) => void;
}

interface CalendarEventItem {
  id: string;
  exam: ExamNotification;
  title: string;
  type: 'deadline' | 'examDate' | 'startDate';
  dateStr: string; // YYYY-MM-DD
  day: number;
  formattedDate: string;
  badgeText: string;
}

export const ExamCalendar: React.FC<ExamCalendarProps> = ({ exams, onSelectExam }) => {
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory | 'All'>('All');
  const [selectedEventType, setSelectedEventType] = useState<'all' | 'deadline' | 'examDate'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  
  // Available months configuration (2026-09 is index 0)
  const availableMonths = [
    { label: 'September 2026', year: 2026, month: 8, key: '2026-09' }, // month is 0-indexed
    { label: 'October 2026', year: 2026, month: 9, key: '2026-10' },
    { label: 'November 2026', year: 2026, month: 10, key: '2026-11' },
    { label: 'December 2026', year: 2026, month: 11, key: '2026-12' },
    { label: 'January 2027', year: 2027, month: 0, key: '2027-01' },
    { label: 'February 2027', year: 2027, month: 1, key: '2027-02' },
    { label: 'March 2027', year: 2027, month: 2, key: '2027-03' },
    { label: 'April 2027', year: 2027, month: 3, key: '2027-04' },
    { label: 'May 2027', year: 2027, month: 4, key: '2027-05' },
  ];

  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // Sep 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const activeMonthConfig = availableMonths[currentMonthIndex];

  // Compile calendar events from all exams
  const allEvents = useMemo(() => {
    const list: CalendarEventItem[] = [];

    exams.forEach(exam => {
      // 1. Application Deadline
      if (exam.lastDate) {
        const d = parseInt(exam.lastDate.split('-')[2], 10);
        list.push({
          id: `${exam.id}-deadline`,
          exam,
          title: `Deadline: ${exam.shortName}`,
          type: 'deadline',
          dateStr: exam.lastDate,
          day: d,
          formattedDate: exam.lastDate,
          badgeText: 'Deadline'
        });
      }

      // 2. Exam Date (if sortable date exists)
      if (exam.examDateSort) {
        const d = parseInt(exam.examDateSort.split('-')[2], 10);
        list.push({
          id: `${exam.id}-exam`,
          exam,
          title: `Exam: ${exam.shortName}`,
          type: 'examDate',
          dateStr: exam.examDateSort,
          day: d,
          formattedDate: exam.examDate,
          badgeText: 'Exam Date'
        });
      }

      // 3. Application Start Date
      if (exam.applicationStartDate) {
        const d = parseInt(exam.applicationStartDate.split('-')[2], 10);
        list.push({
          id: `${exam.id}-start`,
          exam,
          title: `Opens: ${exam.shortName}`,
          type: 'startDate',
          dateStr: exam.applicationStartDate,
          day: d,
          formattedDate: exam.applicationStartDate,
          badgeText: 'Opens'
        });
      }
    });

    return list.sort((a, b) => a.dateStr.localeCompare(b.dateStr));
  }, [exams]);

  // Filter events by category and event type
  const filteredEvents = useMemo(() => {
    return allEvents.filter(ev => {
      const matchCat = selectedCategory === 'All' || ev.exam.category === selectedCategory;
      const matchType = selectedEventType === 'all' || ev.type === selectedEventType;
      return matchCat && matchType;
    });
  }, [allEvents, selectedCategory, selectedEventType]);

  // Current Month's Events
  const currentMonthEvents = useMemo(() => {
    return filteredEvents.filter(e => e.dateStr.startsWith(activeMonthConfig.key));
  }, [filteredEvents, activeMonthConfig.key]);

  // Map of events by day in active month
  const eventsByDay = useMemo(() => {
    const map: Record<number, CalendarEventItem[]> = {};
    currentMonthEvents.forEach(e => {
      if (!map[e.day]) map[e.day] = [];
      map[e.day].push(e);
    });
    return map;
  }, [currentMonthEvents]);

  // Compute calendar days grid
  const calendarGrid = useMemo(() => {
    const firstDayIndex = new Date(activeMonthConfig.year, activeMonthConfig.month, 1).getDay(); // 0 = Sun
    const totalDaysInMonth = new Date(activeMonthConfig.year, activeMonthConfig.month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDaysInMonth; d++) {
      days.push(d);
    }
    return days;
  }, [activeMonthConfig]);

  // Selected Day Events or All month events
  const displayedEvents = useMemo(() => {
    if (selectedDay !== null) {
      return currentMonthEvents.filter(e => e.day === selectedDay);
    }
    return currentMonthEvents;
  }, [selectedDay, currentMonthEvents]);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Calendar Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Interactive Exam Schedule & Deadlines</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            ExamRadar Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track application deadlines, admit card releases, and computer-based test dates in one calendar.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Application Deadline</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Exam Date</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Applications Open</span>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Month Navigator, View Switcher, Category filter */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Month Pager */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => {
              setCurrentMonthIndex(prev => Math.max(0, prev - 1));
              setSelectedDay(null);
            }}
            disabled={currentMonthIndex === 0}
            aria-label="Previous month"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="text-base font-bold text-slate-900 dark:text-white px-2 min-w-[150px] text-center font-mono">
            {activeMonthConfig.label}
          </span>

          <button
            onClick={() => {
              setCurrentMonthIndex(prev => Math.min(availableMonths.length - 1, prev + 1));
              setSelectedDay(null);
            }}
            disabled={currentMonthIndex === availableMonths.length - 1}
            aria-label="Next month"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* View Toggle (Grid vs Timeline) & Filters */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap justify-between sm:justify-end">
          {/* Segmented Grid / Timeline control */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value as any);
              setSelectedDay(null);
            }}
            className="p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            {CATEGORIES_LIST.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>

          {/* Event Type Dropdown */}
          <select
            value={selectedEventType}
            onChange={(e) => {
              setSelectedEventType(e.target.value as any);
              setSelectedDay(null);
            }}
            className="p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Event Types</option>
            <option value="deadline">Only Deadlines</option>
            <option value="examDate">Only Exam Dates</option>
          </select>
        </div>
      </div>

      {/* MONTH GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm overflow-x-auto">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">
              <span className="text-rose-500">Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span className="text-indigo-500">Sat</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {calendarGrid.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="h-16 sm:h-20 bg-slate-50/50 dark:bg-slate-800/20 rounded-xl" />;
                }

                const dayEvents = eventsByDay[day] || [];
                const hasDeadlines = dayEvents.some(e => e.type === 'deadline');
                const hasExams = dayEvents.some(e => e.type === 'examDate');
                const hasStarts = dayEvents.some(e => e.type === 'startDate');
                const isSelected = selectedDay === day;

                return (
                  <button
                    key={`day-${day}`}
                    onClick={() => setSelectedDay(prev => prev === day ? null : day)}
                    className={`h-16 sm:h-20 p-1.5 sm:p-2 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 relative ${
                      isSelected
                        ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50/90 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20 shadow-sm'
                        : dayEvents.length > 0
                        ? 'border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/60 hover:border-indigo-300'
                        : 'border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xs font-bold font-mono ${
                        isSelected 
                          ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' 
                          : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                          {dayEvents.length}
                        </span>
                      )}
                    </div>

                    {/* Indicator dots */}
                    <div className="flex items-center gap-1 mt-auto flex-wrap">
                      {hasDeadlines && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm" title="Application Deadline" />
                      )}
                      {hasExams && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm" title="Exam Date" />
                      )}
                      {hasStarts && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Applications Open" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details of events for selected day or active month */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>
                  {selectedDay !== null 
                    ? `Events on ${activeMonthConfig.label.split(' ')[0]} ${selectedDay}, ${activeMonthConfig.year}` 
                    : `All Scheduled Events in ${activeMonthConfig.label}`}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                  {displayedEvents.length} events
                </span>
              </h3>

              {selectedDay !== null && (
                <button
                  onClick={() => setSelectedDay(null)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Show All {activeMonthConfig.label.split(' ')[0]} Events
                </button>
              )}
            </div>

            {displayedEvents.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
                No events scheduled for this selection. Click another date on the calendar.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {displayedEvents.map((item) => {
                  const categoryBadge = getCategoryBadgeStyle(item.exam.category);

                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectExam(item.exam)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer bg-white dark:bg-slate-900 hover:shadow-md ${
                        item.type === 'deadline'
                          ? 'border-l-4 border-l-amber-500 border-slate-200 dark:border-slate-800 hover:border-amber-400'
                          : item.type === 'examDate'
                          ? 'border-l-4 border-l-indigo-500 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                          : 'border-l-4 border-l-emerald-500 border-slate-200 dark:border-slate-800 hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          item.type === 'deadline'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                            : item.type === 'examDate'
                            ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        }`}>
                          {item.badgeText}
                        </span>

                        <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                          {item.dateStr}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {item.exam.shortName}
                      </h4>
                      
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-3">
                        {item.exam.organization}
                      </p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                        <span className={`px-2 py-0.5 rounded border ${categoryBadge}`}>
                          {item.exam.category}
                        </span>

                        <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                          <span>Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TIMELINE LIST VIEW */}
      {viewMode === 'timeline' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span>Chronological Exam Roadmap ({filteredEvents.length} Events)</span>
          </h2>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredEvents.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectExam(item.exam)}
                className="py-3.5 px-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${
                    item.type === 'deadline'
                      ? 'bg-amber-500 ring-4 ring-amber-100 dark:ring-amber-950'
                      : item.type === 'examDate'
                      ? 'bg-indigo-500 ring-4 ring-indigo-100 dark:ring-indigo-950'
                      : 'bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950'
                  }`} />

                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {item.exam.organization} · {item.exam.category} · {item.exam.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                    {item.dateStr}
                  </span>
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded ${
                    item.type === 'deadline'
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                      : item.type === 'examDate'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  }`}>
                    {item.badgeText}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
