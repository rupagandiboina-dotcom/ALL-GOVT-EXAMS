import React from 'react';
import { Search, X, Filter, RotateCcw, Check, Sparkles } from 'lucide-react';
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
  onApplyFilters?: () => void;
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
  onResetFilters,
  onApplyFilters
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

  const handleFormSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (onApplyFilters) {
      onApplyFilters();
    }
  };

  return (
    <form 
      onSubmit={handleFormSubmit}
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4"
    >
      {/* Search Input with Prominent Search / Apply Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFormSubmit(e);
              }
            }}
            placeholder="Search exams, commissions, or qualifications (e.g. SSC, UPSC, 12th Pass, Railway)..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Clear Visible Search / Apply Filters button */}
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Search className="w-4 h-4" />
          <span>Search / Apply Filters</span>
        </button>
      </div>

      {/* Filter Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Category Filter */}
        <div>
          <label htmlFor="filter-category" className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            id="filter-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ExamCategory | 'All')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFormSubmit(e);
              }
            }}
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
          <label htmlFor="filter-qualification" className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Qualification
          </label>
          <select
            id="filter-qualification"
            value={selectedQualification}
            onChange={(e) => setSelectedQualification(e.target.value as QualificationLevel | 'All')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFormSubmit(e);
              }
            }}
            className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {qualifications.map((q) => (
              <option key={q.value} value={q.value}>{q.label}</option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div>
          <label htmlFor="filter-state" className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            State / Region
          </label>
          <select
            id="filter-state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFormSubmit(e);
              }
            }}
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
          <label htmlFor="filter-status" className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Application Status
          </label>
          <select
            id="filter-status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ExamStatus | 'All')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFormSubmit(e);
              }
            }}
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
              <button type="button" onClick={() => setSearchQuery('')} className="hover:text-indigo-900 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <span>Category: {selectedCategory}</span>
              <button type="button" onClick={() => setSelectedCategory('All')} className="hover:text-indigo-900 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedQualification !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <span>Qualification: {selectedQualification}</span>
              <button type="button" onClick={() => setSelectedQualification('All')} className="hover:text-indigo-900 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedState !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <span>State: {selectedState}</span>
              <button type="button" onClick={() => setSelectedState('All')} className="hover:text-indigo-900 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedStatus !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <span>Status: {selectedStatus}</span>
              <button type="button" onClick={() => setSelectedStatus('All')} className="hover:text-indigo-900 dark:hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Sub-bar: Result Count, Sort selector, Reset & Enter Tip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-indigo-500" />
            <span>Showing <strong className="text-slate-900 dark:text-white font-mono tabular-nums">{totalFilteredCount}</strong> {totalFilteredCount === 1 ? 'Exam' : 'Exams'}</span>
          </span>

          <span className="text-[11px] text-slate-400 hidden md:inline-block">
            (Press <kbd className="px-1 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-semibold text-slate-700 dark:text-slate-300">Enter</kbd> to apply)
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="sm:hidden w-full py-2 px-3 text-xs font-bold rounded-lg bg-indigo-600 text-white flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Filters</span>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="sort-by-select" className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium">
              Sort by:
            </label>
            <select
              id="sort-by-select"
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
    </form>
  );
};

