import React from 'react';
import { Search, X, Filter, RotateCcw } from 'lucide-react';
import { ExamCategory, ExamStatus, QualificationLevel } from '../types/exam';
import { CATEGORIES_LIST, ALL_INDIAN_STATES } from '../data/examsData';

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: ExamCategory | 'All') => void;
  selectedQualification: string;
  setSelectedQualification: (val: QualificationLevel | 'All') => void;
  selectedState: string;
  setSelectedState: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: ExamStatus | 'All') => void;
  sortBy: string;
  setSortBy: (val: 'deadline' | 'vacancies' | 'recent' | 'name') => void;
  totalFilteredCount: number;
  onResetFilters: () => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedQualification,
  setSelectedQualification,
  selectedState,
  setSelectedState,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  totalFilteredCount,
  onResetFilters
}) => {
  const qualifications: { value: QualificationLevel | 'All'; label: string }[] = [
    { value: 'All', label: 'All Qualifications' },
    { value: '10th', label: '10th Pass' },
    { value: '12th', label: '12th Pass' },
    { value: 'Diploma', label: 'Diploma / ITI' },
    { value: 'Graduate', label: 'Any Graduate' },
    { value: 'Engineering', label: 'Engineering (B.Tech)' },
    { value: 'B.Ed', label: 'Teaching (B.Ed / D.El.Ed)' },
    { value: 'Post Graduate', label: 'Post Graduate' },
  ];

  const statuses: { value: ExamStatus | 'All'; label: string }[] = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Applications Open', label: 'Applications Open' },
    { value: 'Closing Soon', label: 'Closing Soon' },
    { value: 'Upcoming', label: 'Upcoming' },
    { value: 'Closed', label: 'Closed' },
  ];

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedCategory !== 'All' || 
    selectedQualification !== 'All' || 
    selectedState !== 'All' || 
    selectedStatus !== 'All';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search exams, organizations, or qualifications (e.g. SSC, UPSC, 12th Pass, Railway)..."
          className="w-full pl-11 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Clear search query"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Category Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ExamCategory | 'All')}
            className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            {CATEGORIES_LIST.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Qualification Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Qualification
          </label>
          <select
            value={selectedQualification}
            onChange={(e) => setSelectedQualification(e.target.value as QualificationLevel | 'All')}
            className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {qualifications.map((q) => (
              <option key={q.value} value={q.value}>{q.label}</option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            State / Region
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All States (Inc. All India)</option>
            {ALL_INDIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Application Status Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Application Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ExamStatus | 'All')}
            className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
          <span className="text-[11px] text-slate-400 font-medium">Active Filters:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <span>Keyword: "{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="hover:text-indigo-900 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <span>Category: {selectedCategory}</span>
              <button onClick={() => setSelectedCategory('All')} className="hover:text-indigo-900 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedQualification !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <span>Qualification: {selectedQualification}</span>
              <button onClick={() => setSelectedQualification('All')} className="hover:text-indigo-900 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedState !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <span>State: {selectedState}</span>
              <button onClick={() => setSelectedState('All')} className="hover:text-indigo-900 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedStatus !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <span>Status: {selectedStatus}</span>
              <button onClick={() => setSelectedStatus('All')} className="hover:text-indigo-900 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Sub-bar: Result Count, Sort selector, Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-indigo-500" />
            <span>Showing <strong className="text-slate-900 dark:text-white font-mono tabular-nums">{totalFilteredCount}</strong> {totalFilteredCount === 1 ? 'Exam' : 'Exams'}</span>
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            <option value="deadline">Earliest Deadline</option>
            <option value="vacancies">Highest Vacancies</option>
            <option value="recent">Recently Added</option>
            <option value="name">Exam Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
