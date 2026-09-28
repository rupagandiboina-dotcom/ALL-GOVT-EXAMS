import React from 'react';
import { Radar, AlertCircle, ShieldCheck, Heart } from 'lucide-react';
import { ExamCategory } from '../types/exam';
import { CATEGORIES_LIST } from '../data/examsData';

interface FooterProps {
  onSelectCategory: (category: ExamCategory) => void;
  onNavigate: (tab: 'home' | 'exams' | 'calendar' | 'find-exams') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigate }) => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Radar className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                ExamRadar
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong>All Government Exams. One Place.</strong> A clean, student-first platform unifying central & state government exam notifications, application deadlines, eligibility criteria, and exam calendars.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Free student utility. No registration required.</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Explore Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Latest Notifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('exams')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  All Government Exams
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-exams')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Find My Exams (Eligibility Checker)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Exam Deadlines & Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Exam Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Popular Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES_LIST.slice(0, 8).map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => onSelectCategory(cat.name)}
                  className="text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Official Verification Notice */}
          <div className="space-y-2 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Aspirant Advisory</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Always verify eligibility and dates from the official notification. Candidates must complete all registration and fee submissions exclusively on authorized government portals (.gov.in / .nic.in).
            </p>
          </div>
        </div>

        {/* Prominent Legal & Non-Government Disclaimer Banner (Mandatory) */}
        <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          <p className="font-bold text-slate-900 dark:text-white mb-1">
            Disclaimer & Non-Affiliation Declaration:
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            ExamRadar is an independent informational aggregator built to assist Indian students and job seekers in discovering recruitment opportunities across various sectors. ExamRadar is <strong>NOT</strong> an official government website and is <strong>NOT</strong> associated, affiliated, endorsed, or connected with the Union Public Service Commission (UPSC), Staff Selection Commission (SSC), Railway Recruitment Boards (RRB), Institute of Banking Personnel Selection (IBPS), or any Central/State Public Service Commission or Ministry. All brand names, logos, and trademarks belong to their respective statutory owners.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ExamRadar · All Government Exams. One Place.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted for Indian government exam aspirants</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
