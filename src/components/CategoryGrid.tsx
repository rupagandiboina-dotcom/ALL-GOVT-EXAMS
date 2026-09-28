import React from 'react';
import { 
  Building2, 
  Landmark, 
  Train, 
  Shield, 
  FileCheck2, 
  GraduationCap, 
  Cpu, 
  MapPin, 
  BadgePercent,
  ChevronRight
} from 'lucide-react';
import { ExamCategory, ExamNotification } from '../types/exam';
import { CATEGORIES_LIST } from '../data/examsData';

interface CategoryGridProps {
  exams: ExamNotification[];
  selectedCategory: string;
  onSelectCategory: (category: ExamCategory | 'All') => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  exams,
  selectedCategory,
  onSelectCategory
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'SSC':
        return <FileCheck2 className="w-5 h-5" />;
      case 'UPSC':
        return <Landmark className="w-5 h-5" />;
      case 'Banking':
        return <Building2 className="w-5 h-5" />;
      case 'Railways':
        return <Train className="w-5 h-5" />;
      case 'Defence':
        return <Shield className="w-5 h-5" />;
      case 'State PSC':
        return <MapPin className="w-5 h-5" />;
      case 'Police':
        return <BadgePercent className="w-5 h-5" />;
      case 'Teaching':
        return <GraduationCap className="w-5 h-5" />;
      case 'Engineering & Technical':
        return <Cpu className="w-5 h-5" />;
      default:
        return <FileCheck2 className="w-5 h-5" />;
    }
  };

  const getExamCount = (category: string) => {
    return exams.filter(e => e.category === category).length;
  };

  const getVacanciesCount = (category: string) => {
    const list = exams.filter(e => e.category === category);
    return list.reduce((sum, e) => sum + e.vacancies, 0);
  };

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Browse Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Discover notifications grouped by commission & sector
          </p>
        </div>

        {selectedCategory !== 'All' && (
          <button
            onClick={() => onSelectCategory('All')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Show All Categories
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
        {CATEGORIES_LIST.map((cat) => {
          const count = getExamCount(cat.name);
          const vacancies = getVacanciesCount(cat.name);
          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div className={`p-2.5 rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                }`}>
                  {getCategoryIcon(cat.name)}
                </div>
                <span className="text-[11px] font-mono tabular-nums text-slate-400 font-medium">
                  {count} {count === 1 ? 'Exam' : 'Exams'}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
                <div className="mt-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 font-mono tabular-nums">
                  {vacancies > 0 ? `${vacancies.toLocaleString('en-IN')} Vacancies` : 'Upcoming openings'}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
