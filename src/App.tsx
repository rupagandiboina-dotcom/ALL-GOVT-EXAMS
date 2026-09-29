import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Radar, 
  Search, 
  ArrowRight, 
  Clock, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Bell, 
  Bookmark, 
  ChevronRight, 
  AlertTriangle,
  Zap,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Bot
} from 'lucide-react';

import { ExamNotification, ExamCategory, ExamStatus, QualificationLevel } from './types/exam';
import { SAMPLE_EXAMS } from './data/examsData';
import { Navbar } from './components/Navbar';
import { ExamCard } from './components/ExamCard';
import { ExamDetailsModal } from './components/ExamDetailsModal';
import { QuickStatsBanner } from './components/QuickStatsBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { SearchAndFilters } from './components/SearchAndFilters';
import { ExamCalendar } from './components/ExamCalendar';
import { FindMyExams } from './components/FindMyExams';
import { Footer } from './components/Footer';
import { N8nChatModal } from './components/N8nChatModal';
import { N8nChatFloatingTrigger } from './components/N8nChatFloatingTrigger';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'exams' | 'categories' | 'calendar' | 'find-exams' | 'saved'>('home');

  // n8n Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState('');

  // Dark Mode State with LocalStorage - default to true (Dark Mode) as required
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('examradar_darkmode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch {}
    return true;
  });

  // Saved / Bookmarked Exams - strictly based on user saved exams (never create fake exams)
  const [savedExamIds, setSavedExamIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('examradar_saved_exams');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((id: string) => SAMPLE_EXAMS.some(e => e.id === id));
        }
      }
    } catch {}
    return [];
  });

  // Selected Exam for Details Modal
  const [selectedExam, setSelectedExam] = useState<ExamNotification | null>(null);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory | 'All'>('All');
  const [selectedQualification, setSelectedQualification] = useState<QualificationLevel | 'All'>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<ExamStatus | 'All'>('All');
  const [sortBy, setSortBy] = useState<'deadline' | 'vacancies' | 'recent' | 'name'>('deadline');

  // Live Bulletin Ticker Index
  const [tickerIndex, setTickerIndex] = useState(0);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const tickerAlerts = useMemo(() => [
    { text: 'SSC CHSL 2026: 2,536 vacancies — Online application active on ssc.gov.in until October 7, 2026', examId: 'ssc-chsl-2026' },
    { text: 'CTET December 2026: Online registration window active on ctet.nic.in until October 16, 2026', examId: 'ctet-dec-2026' },
    { text: 'BPSC 70th Integrated CCE: 1,957 State Service posts open on onlinebpsc.bihar.gov.in', examId: 'bpsc-70th-cce' },
    { text: 'SSC CGL 2026: Tier-I examination scheduled September 30 – October 30, 2026 on ssc.gov.in', examId: 'ssc-cgl-2026' },
    { text: 'IBPS PO XIV: Main Examination confirmed for October 4, 2026 on ibps.in', examId: 'ibps-po-xiv' },
    { text: 'IBPS Clerk 2026: Preliminary Examination confirmed for October 10 & 11, 2026', examId: 'ibps-clerk-csa-2026' },
    { text: 'UPSC Civil Services (CSE) 2027: Confirmed Prelims date May 23, 2027 per official calendar', examId: 'upsc-cse-2027' }
  ], []);

  // Ticker timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % tickerAlerts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [tickerAlerts.length]);

  // Sync Dark Mode class with <html> and <body>
  useEffect(() => {
    try {
      localStorage.setItem('examradar_darkmode', JSON.stringify(darkMode));
    } catch {}
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body?.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body?.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync Saved Exams
  useEffect(() => {
    localStorage.setItem('examradar_saved_exams', JSON.stringify(savedExamIds));
  }, [savedExamIds]);

  const toggleSaveExam = (id: string) => {
    setSavedExamIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedQualification('All');
    setSelectedState('All');
    setSelectedStatus('All');
    setSortBy('deadline');
  };

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setActiveTab('exams');
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered and Sorted Exams
  const filteredExams = useMemo(() => {
    return SAMPLE_EXAMS.filter(exam => {
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = exam.title.toLowerCase().includes(q);
        const matchOrg = exam.organization.toLowerCase().includes(q);
        const matchShort = exam.shortName.toLowerCase().includes(q);
        const matchPosts = exam.postsSummary.toLowerCase().includes(q);
        const matchQual = exam.qualificationText.toLowerCase().includes(q);
        const matchCat = exam.category.toLowerCase().includes(q);
        if (!matchTitle && !matchOrg && !matchShort && !matchPosts && !matchQual && !matchCat) {
          return false;
        }
      }

      if (selectedCategory !== 'All' && exam.category !== selectedCategory) {
        return false;
      }

      if (selectedQualification !== 'All' && exam.qualification !== selectedQualification) {
        return false;
      }

      if (selectedState !== 'All' && exam.state !== selectedState && exam.state !== 'All India') {
        return false;
      }

      if (selectedStatus !== 'All' && exam.status !== selectedStatus) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'deadline') {
        const dateA = a.lastDate && /^\d{4}-\d{2}-\d{2}$/.test(a.lastDate) ? a.lastDate : '9999-99-99';
        const dateB = b.lastDate && /^\d{4}-\d{2}-\d{2}$/.test(b.lastDate) ? b.lastDate : '9999-99-99';
        return dateA.localeCompare(dateB);
      }
      if (sortBy === 'vacancies') {
        return b.vacancies - a.vacancies;
      }
      if (sortBy === 'recent') {
        const startA = a.applicationStartDate && /^\d{4}-\d{2}-\d{2}$/.test(a.applicationStartDate) ? a.applicationStartDate : '0000-00-00';
        const startB = b.applicationStartDate && /^\d{4}-\d{2}-\d{2}$/.test(b.applicationStartDate) ? b.applicationStartDate : '0000-00-00';
        return startB.localeCompare(startA);
      }
      if (sortBy === 'name') {
        return a.shortName.localeCompare(b.shortName);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedQualification, selectedState, selectedStatus, sortBy]);

  // Sectioned Lists for Homepage (Current active & verified cycles)
  const latestNotifications = useMemo(() => {
    return [...SAMPLE_EXAMS]
      .filter(e => !e.isHistorical && (e.status === 'Applications Open' || e.status === 'Closing Soon'))
      .sort((a, b) => b.applicationStartDate.localeCompare(a.applicationStartDate))
      .slice(0, 6);
  }, []);

  const closingSoonExams = useMemo(() => {
    return [...SAMPLE_EXAMS]
      .filter(e => !e.isHistorical && e.status === 'Closing Soon')
      .sort((a, b) => a.lastDate.localeCompare(b.lastDate));
  }, []);

  const upcomingExams = useMemo(() => {
    return [...SAMPLE_EXAMS]
      .filter(e => !e.isHistorical && e.status === 'Upcoming')
      .sort((a, b) => {
        const dateA = a.applicationStartDate && /^\d{4}-\d{2}-\d{2}$/.test(a.applicationStartDate) ? a.applicationStartDate : '9999-99-99';
        const dateB = b.applicationStartDate && /^\d{4}-\d{2}-\d{2}$/.test(b.applicationStartDate) ? b.applicationStartDate : '9999-99-99';
        return dateA.localeCompare(dateB);
      });
  }, []);

  const savedExamsList = useMemo(() => {
    return SAMPLE_EXAMS.filter(e => savedExamIds.includes(e.id));
  }, [savedExamIds]);

  const handleCategoryCardClick = (cat: ExamCategory | 'All') => {
    setSelectedCategory(cat);
    setActiveTab('exams');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickSearchKeyword = (keyword: string) => {
    setSearchQuery(keyword);
    setActiveTab('exams');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedExamsList.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenChat={() => {
          setIsChatOpen(true);
          setChatInitialQuery('');
        }}
        onSearchClick={() => {
          setActiveTab('exams');
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 100);
        }}
      />

      {/* Live Exam Bulletin Ticker */}
      <aside aria-label="Latest exam updates bulletin" className="bg-slate-900 dark:bg-black text-white text-xs border-b border-slate-800 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <span className="flex items-center gap-1 font-bold text-amber-400 shrink-0 uppercase tracking-wider text-[11px] bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              <Zap className="w-3.5 h-3.5 fill-current animate-bounce" />
              <span>Live Updates</span>
            </span>

            <div 
              key={tickerIndex}
              onClick={() => {
                const targetExam = SAMPLE_EXAMS.find(e => e.id === tickerAlerts[tickerIndex].examId);
                if (targetExam) setSelectedExam(targetExam);
              }}
              className="truncate text-slate-200 hover:text-white cursor-pointer transition-all duration-300 animate-in fade-in slide-in-from-right-3"
            >
              {tickerAlerts[tickerIndex].text}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('calendar')}
            className="text-[11px] text-indigo-300 hover:text-indigo-200 font-semibold underline shrink-0 hidden sm:inline-block"
          >
            Full Calendar →
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Prominent Verification Notice - Present across platform */}
        <div className="mb-6 p-3.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/90 dark:border-indigo-800/60 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs text-indigo-950 dark:text-indigo-200">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <p className="leading-snug">
              <strong>Official Source Guarantee:</strong> ExamRadar provides information collected from official sources. Always verify important details from the official notification before applying.
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0 hidden md:inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Audited & Current</span>
          </span>
        </div>

        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-indigo-700/50">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold mb-4 border border-indigo-400/30">
                  <Radar className="w-3.5 h-3.5 text-indigo-300 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Central & State Government Exam Radar</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                  All Government Exams. <br />
                  <span className="text-indigo-300">One Place.</span>
                </h1>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-indigo-100/90 leading-relaxed max-w-2xl">
                  Say goodbye to checking dozens of separate commission portals. ExamRadar aggregates notifications, eligibility norms, application deadlines, and exam schedules for SSC, UPSC, Banking, Railways, Defence, State PSCs, and Police exams.
                </p>

                {/* Hero Search Box */}
                <div className="mt-6 sm:mt-8 max-w-2xl">
                  <div className="relative flex items-center shadow-lg rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-indigo-300/40">
                    <Search className="w-5 h-5 text-slate-400 absolute left-4" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setActiveTab('exams');
                        }
                      }}
                      placeholder="Search exams, organizations or qualifications (e.g. SSC CHSL, UPSC, Banking, 12th Pass)..."
                      className="w-full pl-12 pr-28 py-3.5 sm:py-4 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 bg-transparent focus:outline-none"
                    />
                    <button
                      onClick={() => setActiveTab('exams')}
                      className="absolute right-2 px-4 py-2 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quick Pill Suggestions */}
                  <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-indigo-200">
                    <span className="text-[11px] text-indigo-300 font-medium">Verified Active:</span>
                    {['SSC CHSL 2026', 'SSC CGL', 'UPSC CSE 2027', 'CTET Dec 2026', 'BPSC 70th', 'IBPS PO'].map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => handleQuickSearchKeyword(keyword)}
                        className="px-2 py-0.5 rounded-md bg-indigo-800/60 hover:bg-indigo-700 border border-indigo-500/40 text-indigo-100 text-[11px] font-medium transition-colors"
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => setActiveTab('find-exams')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-indigo-900 hover:bg-indigo-50 text-xs sm:text-sm font-bold shadow-md transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Find My Eligible Exams</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('calendar')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-800/70 hover:bg-indigo-700 border border-indigo-400/30 text-white text-xs sm:text-sm font-medium transition-colors"
                  >
                    <CalendarIcon className="w-4 h-4 text-indigo-300" />
                    <span>View Exam Calendar</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsChatOpen(true);
                      setChatInitialQuery('');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-95 border border-purple-400/40"
                  >
                    <Bot className="w-4 h-4 text-purple-200" />
                    <span>Ask Exam AI Agent</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Quick Metrics Bar */}
            <QuickStatsBanner
              exams={SAMPLE_EXAMS}
              onClosingSoonClick={() => {
                setSelectedStatus('Closing Soon');
                setActiveTab('exams');
              }}
              onUpcomingClick={() => {
                setSelectedStatus('Upcoming');
                setActiveTab('exams');
              }}
            />

            {/* Applications Closing Soon (Urgent Section) */}
            {closingSoonExams.length > 0 && (
              <section className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-500 text-white">
                      <Clock className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Applications Closing Soon!
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Registration windows ending within days. Do not wait for server overload on last day.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedStatus('Closing Soon');
                      setActiveTab('exams');
                    }}
                    className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>View All ({closingSoonExams.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {closingSoonExams.slice(0, 3).map((exam) => (
                    <ExamCard
                      key={exam.id}
                      exam={exam}
                      onSelect={setSelectedExam}
                      isSaved={savedExamIds.includes(exam.id)}
                      onToggleSave={toggleSaveExam}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Latest Notifications Grid */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Latest Exam Notifications</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Recently announced recruitment drives across Central Ministries and State Commissions
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleResetFilters();
                    setActiveTab('exams');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <span>Explore All Notifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {latestNotifications.map((exam) => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    onSelect={setSelectedExam}
                    isSaved={savedExamIds.includes(exam.id)}
                    onToggleSave={toggleSaveExam}
                  />
                ))}
              </div>
            </section>

            {/* Browse Categories Section */}
            <CategoryGrid
              exams={SAMPLE_EXAMS}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryCardClick}
            />

            {/* Upcoming Exams Section */}
            {upcomingExams.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span>Upcoming Exams & Official Calendar Announcements</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Notifications scheduled per official commission annual calendars.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedStatus('Upcoming');
                      setActiveTab('exams');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>View Upcoming ({upcomingExams.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingExams.slice(0, 3).map((exam) => (
                    <ExamCard
                      key={exam.id}
                      exam={exam}
                      onSelect={setSelectedExam}
                      isSaved={savedExamIds.includes(exam.id)}
                      onToggleSave={toggleSaveExam}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Feature Spotlight: Find My Exams Promo Banner */}
            <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-slate-800">
              <div className="space-y-2 max-w-xl text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center justify-center md:justify-start gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Student Eligibility Assistant</span>
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Not sure which exams you are eligible for?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Enter your age, reservation category, highest degree, and state to filter relevant government exams with automatic age relaxation calculations.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('find-exams');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all shrink-0 flex items-center gap-2 hover:scale-105"
              >
                <span>Check My Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </section>
          </div>
        )}

        {/* VIEW: EXAMS LIST (With live filters & search) */}
        {activeTab === 'exams' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                All Government Exams
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Filter by commission category, educational qualification, domicile state, or application status. All dates audited against official announcements.
              </p>
            </div>

            {/* Search & Filter Controls */}
            <SearchAndFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedQualification={selectedQualification}
              setSelectedQualification={setSelectedQualification}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalFilteredCount={filteredExams.length}
              onResetFilters={handleResetFilters}
              onApplyFilters={() => {
                const el = document.getElementById('exams-results-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Exam Results Grid */}
            {filteredExams.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <AlertTriangle className="w-9 h-9 text-amber-500 mx-auto" />
                <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
                  No matching exams found
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  No examinations matched your selected filters or search keyword. Try clearing search keywords or choosing "All" in category and qualification filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div id="exams-results-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredExams.map((exam) => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    onSelect={setSelectedExam}
                    isSaved={savedExamIds.includes(exam.id)}
                    onToggleSave={toggleSaveExam}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Exam Categories & Commissions
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Explore government career pathways grouped by examination body, sector, and requirements.
              </p>
            </div>

            <CategoryGrid
              exams={SAMPLE_EXAMS}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryCardClick}
            />

            {/* Category Exam Showcase */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedCategory === 'All' ? 'Featured Exam Notifications' : `${selectedCategory} Notifications`}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {selectedCategory === 'All' ? 'Showing verified recruitment drives' : `Active and upcoming ${selectedCategory} notifications`}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('exams')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View All in Exams List →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(selectedCategory === 'All' ? SAMPLE_EXAMS.filter(e => !e.isHistorical).slice(0, 6) : SAMPLE_EXAMS.filter(e => e.category === selectedCategory)).map((exam) => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    onSelect={setSelectedExam}
                    isSaved={savedExamIds.includes(exam.id)}
                    onToggleSave={toggleSaveExam}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: CALENDAR */}
        {activeTab === 'calendar' && (
          <ExamCalendar
            exams={SAMPLE_EXAMS}
            onSelectExam={setSelectedExam}
          />
        )}

        {/* VIEW: FIND MY EXAMS */}
        {activeTab === 'find-exams' && (
          <FindMyExams
            exams={SAMPLE_EXAMS}
            onSelectExam={setSelectedExam}
            savedExams={savedExamIds}
            onToggleSave={toggleSaveExam}
          />
        )}

        {/* VIEW: SAVED / WATCHLIST */}
        {activeTab === 'saved' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-indigo-600 fill-current" />
                  <span>My Target Exam Watchlist</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Exams bookmarked for tracking deadlines and preparation schedules.
                </p>
              </div>

              {savedExamsList.length > 0 && (
                <button
                  onClick={() => setSavedExamIds([])}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold"
                >
                  Clear Watchlist
                </button>
              )}
            </div>

            {savedExamsList.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <Bookmark className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Your watchlist is empty
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the bookmark icon on any exam card to save it here for fast access.
                </p>
                <button
                  onClick={() => setActiveTab('exams')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  Browse Exams Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {savedExamsList.map((exam) => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    onSelect={setSelectedExam}
                    isSaved={true}
                    onToggleSave={toggleSaveExam}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Exam Details Modal */}
      <ExamDetailsModal
        exam={selectedExam}
        onClose={() => setSelectedExam(null)}
        isSaved={selectedExam ? savedExamIds.includes(selectedExam.id) : false}
        onToggleSave={toggleSaveExam}
        onAskAi={(query) => {
          setIsChatOpen(true);
          setChatInitialQuery(query);
        }}
      />

      {/* Floating n8n AI Chat Trigger */}
      <N8nChatFloatingTrigger
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(true)}
      />

      {/* n8n AI Chatbot Modal/Window */}
      <N8nChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuery={chatInitialQuery}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={handleCategoryCardClick}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
}
