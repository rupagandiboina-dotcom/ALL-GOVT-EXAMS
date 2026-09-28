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
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { ExamNotification, ExamCategory } from '../types/exam';
import { CATEGORIES_LIST } from '../data/examsData';
import { getCategoryBadgeStyle, getDateConfidenceBadgeStyle } from '../utils/helpers';

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
  isTentative?: boolean;
}

export const ExamCalendar: React.FC<ExamCalendarProps> = ({ exams, onSelectExam }) => {
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory | 'All'>('All');
  const [selectedEventType, setSelectedEventType] = useState<'all' | 'deadline' | 'examDate'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  
  // Available months: 8 months from September 2026 to April 2027
  const availableMonths = useMemo(() => {
    const list = [];
    const baseDate = new Date(2026, 8, 1); // September 2026
    for (let i = 0; i < 8; i++) {
      const d = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, 1);
      const y = d.getFullYear();
      const m = d.getMonth();
      const key = `${y}-${String(m + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
      list.push({ label, year: y, month: m, key });
    }
    return list;
  }, []);

  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const activeMonthConfig = availableMonths[currentMonthIndex] || availableMonths[0];

  // Compile calendar events from all verified exams
  const allEvents = useMemo(() => {
    const list: CalendarEventItem[] = [];

    exams.forEach(exam => {
      // 1. Application Deadline (only if valid YYYY-MM-DD)
      if (exam.lastDate && /^\d{4}-\d{2}-\d{2}$/.test(exam.lastDate)) {
        const parts = exam.lastDate.split('-');
        const d = parseInt(parts[2], 10);
        list.push({
          id: `${exam.id}-deadline`,
          exam,
          title: `Deadline: ${exam.shortName}`,
          type: 'deadline',
          dateStr: exam.lastDate,
          day: d,
          formattedDate: exam.lastDate,
          badgeText: 'Deadline',
          isTentative: exam.lastDateType === 'Tentative'
        });
      }

      // 2. Exam Date (if sortable date exists)
      if (exam.examDateSort && /^\d{4}-\d{2}-\d{2}$/.test(exam.examDateSort)) {
        const parts = exam.examDateSort.split('-');
        const d = parseInt(parts[2], 10);
        list.push({
          id: `${exam.id}-exam`,
          exam,
          title: `Exam: ${exam.shortName}`,
          type: 'examDate',
          dateStr: exam.examDateSort,
          day: d,
          formattedDate: exam.examDate,
          badgeText: exam.examDateType === 'Tentative' ? 'Tentative Exam' : 'Exam Date',
          isTentative: exam.examDateType === 'Tentative'
        });
      }

      // 3. Application Start Date
      if (exam.applicationStartDate && /^\d{4}-\d{2}-\d{2}$/.test(exam.applicationStartDate)) {
        const parts = exam.applicationStartDate.split('-');
        const d = parseInt(parts[2], 10);
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

  // Exams with unannounced dates
  const unannouncedExams = useMemo(() => {
    return exams.filter(exam => {
      const catMatch = selectedCategory === 'All' || exam.category === selectedCategory;
      const hasUnannounced = exam.examDate.toLowerCase().includes('not announced') || exam.examDate.toLowerCase().includes('information not');
      return catMatch && hasUnannounced;
    });
  }, [exams, selectedCategory]);

  // Events belonging to currently viewed month
  const currentMonthEvents = useMemo(() => {
    return filteredEvents.filter(ev => {
      return ev.dateStr.startsWith(activeMonthConfig.key);
    });
  }, [filteredEvents, activeMonthConfig.key]);

  // Map events by day number
  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarEventItem[]>();
    currentMonthEvents.forEach(ev => {
      const existing = map.get(ev.day) || [];
      existing.push(ev);
      map.set(ev.day, existing);
    });
    return map;
  }, [currentMonthEvents]);

  // Days in active month
  const daysInMonth = useMemo(() => {
    const year = activeMonthConfig.year;
    const month = activeMonthConfig.month;
    return new Date(year, month + 1, 0).getDate();
  }, [activeMonthConfig]);

  // Starting day of week for first day of active month (0=Sun, 1=Mon, ...)
  const startDayOfWeek = useMemo(() => {
    const year = activeMonthConfig.year;
    const month = activeMonthConfig.month;
    return new Date(year, month, 1).getDay();
  }, [activeMonthConfig]);

  // Selected day events
  const selectedDayEvents = useMemo(() => {
    if (!selectedDay) return [];
    return eventsByDay.get(selectedDay) || [];
  }, [selectedDay, eventsByDay]);

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(prev => prev - 1);
      setSelectedDay(null);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < availableMonths.length - 1) {
      setCurrentMonthIndex(prev => prev + 1);
      setSelectedDay(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Disclaimer Notice */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>
            <strong>Official Source Verification:</strong> Confirmed dates are taken from official notifications and calendars. Tentative dates are clearly tagged and subject to change by recruiting authorities.
          </span>
        </div>
      </div>

      {/* Control Bar: Filters & View Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pill Selector */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          <button
            onClick={() => setSelectedCategory('All')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                selectedCategory === cat.name
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Event Type & View Mode Toggles */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Event Filter */}
          <select
            value={selectedEventType}
            onChange={(e) => setSelectedEventType(e.target.value as any)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Events</option>
            <option value="deadline">Application Deadlines</option>
            <option value="examDate">Examination Dates</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Month Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Month Grid</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 font-medium transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Timeline List View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* MONTH GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 7-col calendar matrix */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
            {/* Month Navigation Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {activeMonthConfig.label}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                  {currentMonthEvents.length} events
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevMonth}
                  disabled={currentMonthIndex === 0}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  disabled={currentMonthIndex === availableMonths.length - 1}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Day Cells Matrix */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
              {/* Empty leading padding days */}
              {Array.from({ length: startDayOfWeek }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-16 sm:h-20 rounded-lg bg-slate-50/50 dark:bg-slate-800/20" />
              ))}

              {/* Real month days */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const events = eventsByDay.get(dayNum) || [];
                const isSelected = selectedDay === dayNum;
                const hasDeadline = events.some(e => e.type === 'deadline');
                const hasExam = events.some(e => e.type === 'examDate');

                return (
                  <div
                    key={`day-${dayNum}`}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`h-16 sm:h-20 p-1.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-xs'
                        : events.length > 0
                        ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-indigo-300 dark:hover:border-indigo-700'
                        : 'border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold font-mono ${
                        isSelected 
                          ? 'text-indigo-600 dark:text-indigo-400' 
                          : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        {dayNum}
                      </span>
                      {events.length > 0 && (
                        <div className="flex items-center gap-0.5">
                          {hasDeadline && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Application Deadline" />}
                          {hasExam && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" title="Exam Date" />}
                        </div>
                      )}
                    </div>

                    {/* Compact event pill */}
                    <div className="space-y-0.5 overflow-hidden">
                      {events.slice(0, 1).map((ev) => (
                        <div
                          key={ev.id}
                          className={`text-[9px] truncate px-1 py-0.2 rounded font-medium ${
                            ev.type === 'deadline'
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                              : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                          }`}
                        >
                          {ev.exam.shortName}
                        </div>
                      ))}
                      {events.length > 1 && (
                        <span className="text-[9px] text-slate-400 font-mono block text-right">
                          +{events.length - 1} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Application Deadline</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span>Exam Schedule</span>
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Click any day to inspect detailed events
              </span>
            </div>
          </div>

          {/* Right Panel: Selected Day Details or Upcoming Month Highlights */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {selectedDay 
                      ? `Events on ${activeMonthConfig.label.split(' ')[0]} ${selectedDay}, ${activeMonthConfig.year}`
                      : `${activeMonthConfig.label} Milestone Schedule`
                    }
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedDay 
                    ? `${selectedDayEvents.length} scheduled milestone(s) on this date` 
                    : `Showing all events scheduled for ${activeMonthConfig.label}`
                  }
                </p>
              </div>

              {/* Event Cards */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {(selectedDay ? selectedDayEvents : currentMonthEvents).length === 0 ? (
                  <div className="py-10 text-center text-slate-400 text-xs">
                    <CalendarIcon className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <span>No scheduled deadlines or exams for this date</span>
                  </div>
                ) : (
                  (selectedDay ? selectedDayEvents : currentMonthEvents).map((ev) => {
                    const catStyle = getCategoryBadgeStyle(ev.exam.category);
                    return (
                      <div
                        key={ev.id}
                        onClick={() => onSelectExam(ev.exam)}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400/80 hover:shadow-xs transition-all cursor-pointer group bg-slate-50/50 dark:bg-slate-800/30"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${catStyle}`}>
                            {ev.exam.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              ev.type === 'deadline'
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                                : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                            }`}>
                              {ev.badgeText}
                            </span>
                            {ev.isTentative && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                Tentative
                              </span>
                            )}
                          </div>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                          {ev.exam.title}
                        </h4>

                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="font-mono font-medium">{ev.formattedDate}</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:underline flex items-center gap-0.5">
                            <span>Details</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {selectedDay && (
              <button
                onClick={() => setSelectedDay(null)}
                className="mt-4 w-full py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Clear Day Selection
              </button>
            )}
          </div>
        </div>
      )}

      {/* TIMELINE LIST VIEW */}
      {viewMode === 'timeline' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <List className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Comprehensive Examination Chronology ({filteredEvents.length} events)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Sorted chronologically by date. Verified against official notifications.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredEvents.map((ev) => {
              const catStyle = getCategoryBadgeStyle(ev.exam.category);
              return (
                <div
                  key={ev.id}
                  onClick={() => onSelectExam(ev.exam)}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-slate-50/60 dark:hover:bg-slate-800/40 p-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-24 shrink-0 font-mono text-xs font-bold text-slate-900 dark:text-white pt-0.5">
                      {ev.dateStr}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${catStyle}`}>
                          {ev.exam.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          ev.type === 'deadline'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                            : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                        }`}>
                          {ev.badgeText}
                        </span>
                        {ev.isTentative && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                            Tentative
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {ev.exam.title}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-1">
                        {ev.exam.organization} · {ev.exam.postsSummary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center gap-1">
                      <span>View Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Awaited / Tentative Announcements Section */}
      {unannouncedExams.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Recruitments with Dates Awaited / Not Officially Announced Yet
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            In accordance with ExamRadar’s strict accuracy standard, we do not guess or fabricate dates. The following upcoming examinations will have dates updated immediately upon official gazette publication.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {unannouncedExams.map(exam => (
              <div
                key={exam.id}
                onClick={() => onSelectExam(exam)}
                className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>{exam.category}</span>
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Date Awaited</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                  {exam.shortName}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {exam.organization}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
