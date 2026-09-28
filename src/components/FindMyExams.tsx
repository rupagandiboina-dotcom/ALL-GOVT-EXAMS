import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  ArrowRight,
  Info,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { ExamNotification, StudentProfile, QualificationLevel } from '../types/exam';
import { ALL_INDIAN_STATES } from '../data/examsData';
import { matchStudentToExam } from '../utils/helpers';
import { ExamCard } from './ExamCard';

interface FindMyExamsProps {
  exams: ExamNotification[];
  onSelectExam: (exam: ExamNotification) => void;
  savedExams: string[];
  onToggleSave: (examId: string) => void;
}

export const FindMyExams: React.FC<FindMyExamsProps> = ({
  exams,
  onSelectExam,
  savedExams,
  onToggleSave
}) => {
  const [profile, setProfile] = useState<StudentProfile>({
    age: 22,
    category: 'General',
    qualification: 'Graduate',
    degreeBranch: 'Any Graduate',
    state: 'All India',
    gender: 'All',
    isPwD: false
  });

  const degreeSuggestions: Record<QualificationLevel, string[]> = {
    '10th': ['Matriculation / 10th Standard', '10th with ITI'],
    '12th': ['12th Science (PCM)', '12th Science (PCB)', '12th Commerce', '12th Arts / Humanities'],
    'Diploma': ['Diploma in Mechanical', 'Diploma in Electrical', 'Diploma in Civil', 'Diploma in Electronics/CS', 'ITI Trade Certificate'],
    'Graduate': ['BA', 'B.Sc', 'B.Com', 'BBA', 'BCA', 'LLB', 'Any Graduate'],
    'Engineering': ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech Electrical', 'B.Tech Civil', 'B.Tech Electronics & Comm'],
    'B.Ed': ['B.Ed', 'D.El.Ed (BTC)', 'B.El.Ed', 'M.Ed'],
    'Post Graduate': ['MA', 'M.Sc', 'M.Com', 'MBA', 'MCA', 'M.Tech'],
    'Medical': ['MBBS', 'BDS', 'B.Sc Nursing', 'B.Pharm']
  };

  const handleQualificationChange = (newQual: QualificationLevel) => {
    const defaultBranch = degreeSuggestions[newQual]?.[0] || 'Any';
    setProfile(prev => ({
      ...prev,
      qualification: newQual,
      degreeBranch: defaultBranch
    }));
  };

  const applyPreset = (preset: Partial<StudentProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...preset,
      degreeBranch: preset.qualification ? degreeSuggestions[preset.qualification][0] : prev.degreeBranch
    }));
  };

  const matchResults = useMemo(() => {
    const list = exams.map(exam => matchStudentToExam(profile, exam));
    // Sort by match status first, then score descending, then vacancies descending
    return list.sort((a, b) => {
      if (a.isMatch !== b.isMatch) return a.isMatch ? -1 : 1;
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return b.exam.vacancies - a.exam.vacancies;
    });
  }, [exams, profile]);

  const eligibleMatches = matchResults.filter(r => r.isMatch);
  const potentialMatches = matchResults.filter(r => !r.isMatch && r.matchScore >= 40);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Tool Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold mb-3 border border-indigo-400/30">
            <Compass className="w-4 h-4 text-indigo-300" />
            <span>Interactive Eligibility Matcher</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Find My Eligible Government Exams
          </h1>
          <p className="text-sm text-indigo-100/90 mt-2 leading-relaxed">
            Enter your age, reservation category, qualification, and domicile. ExamRadar calculates your eligibility across minimum age brackets, category age relaxations, and educational qualifications.
          </p>

          {/* Quick Presets */}
          <div className="mt-4 pt-3 border-t border-indigo-700/50 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-indigo-300 font-medium">Quick Presets:</span>
            <button
              onClick={() => applyPreset({ age: 22, category: 'General', qualification: 'Graduate', state: 'All India', isPwD: false })}
              className="px-2.5 py-1 rounded bg-indigo-800/80 hover:bg-indigo-700 text-white font-medium border border-indigo-600/50 transition-colors"
            >
              Graduate 22 (General)
            </button>
            <button
              onClick={() => applyPreset({ age: 24, category: 'OBC', qualification: 'Engineering', state: 'All India', isPwD: false })}
              className="px-2.5 py-1 rounded bg-indigo-800/80 hover:bg-indigo-700 text-white font-medium border border-indigo-600/50 transition-colors"
            >
              B.Tech 24 (OBC)
            </button>
            <button
              onClick={() => applyPreset({ age: 19, category: 'General', qualification: '12th', state: 'All India', isPwD: false })}
              className="px-2.5 py-1 rounded bg-indigo-800/80 hover:bg-indigo-700 text-white font-medium border border-indigo-600/50 transition-colors"
            >
              12th Pass 19 (General)
            </button>
            <button
              onClick={() => applyPreset({ age: 26, category: 'SC', qualification: 'B.Ed', state: 'All India', isPwD: false })}
              className="px-2.5 py-1 rounded bg-indigo-800/80 hover:bg-indigo-700 text-white font-medium border border-indigo-600/50 transition-colors"
            >
              Teaching B.Ed 26 (SC)
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Your Profile & Eligibility Parameters
            </h2>
          </div>

          <button
            onClick={() => setProfile({
              age: 22,
              category: 'General',
              qualification: 'Graduate',
              degreeBranch: 'Any Graduate',
              state: 'All India',
              gender: 'All',
              isPwD: false
            })}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Age Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Current Age (Years)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="16"
                max="65"
                value={profile.age}
                onChange={(e) => setProfile(prev => ({ ...prev, age: Math.max(15, parseInt(e.target.value) || 18) }))}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-mono tabular-nums text-base font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => setProfile(prev => ({ ...prev, age: prev.age + 1 }))}
                  className="px-2.5 py-1 text-xs font-bold rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setProfile(prev => ({ ...prev, age: Math.max(16, prev.age - 1) }))}
                  className="px-2.5 py-1 text-xs font-bold rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                >
                  -
                </button>
              </div>
            </div>
          </div>

          {/* Category / Reservation */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={profile.category}
              onChange={(e) => setProfile(prev => ({ ...prev, category: e.target.value as any }))}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="General">General / UR (Standard age limit)</option>
              <option value="OBC">OBC (+3 Years age relaxation)</option>
              <option value="SC">SC (+5 Years age relaxation)</option>
              <option value="ST">ST (+5 Years age relaxation)</option>
              <option value="EWS">EWS (Economically Weaker Section)</option>
            </select>
          </div>

          {/* Highest Qualification */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Highest Qualification
            </label>
            <select
              value={profile.qualification}
              onChange={(e) => handleQualificationChange(e.target.value as QualificationLevel)}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="10th">10th Standard / Matric</option>
              <option value="12th">12th Standard (+2 Stage)</option>
              <option value="Diploma">Diploma / ITI</option>
              <option value="Graduate">Any Bachelor's Degree (Graduate)</option>
              <option value="Engineering">Engineering (B.Tech / B.E)</option>
              <option value="B.Ed">B.Ed / D.El.Ed (Teaching)</option>
              <option value="Post Graduate">Post Graduate / Master's</option>
            </select>
          </div>

          {/* Domicile State */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              State of Domicile
            </label>
            <select
              value={profile.state}
              onChange={(e) => setProfile(prev => ({ ...prev, state: e.target.value }))}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All India">All India (Open to all states)</option>
              {ALL_INDIAN_STATES.filter(s => s !== 'All India').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Special Concessions (PwD & Gender) */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-2.5 cursor-pointer p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800">
            <input
              type="checkbox"
              checked={profile.isPwD}
              onChange={(e) => setProfile(prev => ({ ...prev, isPwD: e.target.checked }))}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                Person with Disabilities (PwD / Divyangjan)
              </span>
              <span className="text-[11px] text-slate-500">
                Grants +10 years additional upper age relaxation & application fee exemption
              </span>
            </div>
          </label>

          <div className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Gender:
            </span>
            <div className="flex items-center gap-2 text-xs">
              {(['All', 'Male', 'Female'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setProfile(prev => ({ ...prev, gender: g }))}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    profile.gender === g
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            {profile.gender === 'Female' && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold ml-auto">
                Fee exempted in SSC/UPSC
              </span>
            )}
          </div>
        </div>

        {/* Degree stream selector */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Specific Stream / Branch:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(degreeSuggestions[profile.qualification] || []).map((branch) => {
                const isSelected = profile.degreeBranch === branch;
                return (
                  <button
                    key={branch}
                    type="button"
                    onClick={() => setProfile(prev => ({ ...prev, degreeBranch: branch }))}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-medium shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {branch}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 font-mono tabular-nums">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{eligibleMatches.length} Matching Exams Found</span>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-4 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1">
          <p className="font-bold">
            Important Notice Regarding Preliminary Eligibility Matching:
          </p>
          <p className="leading-relaxed text-amber-800/90 dark:text-amber-300/80">
            The results shown here are based on a preliminary programmatic match of basic parameters (Age, Reservation category, and General qualification rank). Specific notifications may have additional criteria such as typing speed certificates, specific subject combinations in 10+2, physical standards (height/chest), medical eyesight norms, and domicile criteria. <strong>Always check and verify the official notification PDF published by the examination authority before applying.</strong>
          </p>
        </div>
      </div>

      {/* Eligible Exams Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Directly Relevant & Eligible Exams ({eligibleMatches.length})</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Exams where your age ({profile.age} yrs), category ({profile.category}{profile.isPwD ? ' + PwD' : ''}), and qualification ({profile.qualification}) meet requirements
            </p>
          </div>
        </div>

        {eligibleMatches.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No direct matches for current parameters
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your age or selecting a different qualification level (such as Graduate or 12th Pass) to see more opportunities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibleMatches.map(({ exam, matchScore, reasons }) => (
              <div 
                key={exam.id} 
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-emerald-500/60 dark:hover:border-emerald-500/40 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono tabular-nums">
                      Match: {matchScore}%
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {exam.category} · {exam.state}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectExam(exam)}
                    className="font-bold text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer line-clamp-2 leading-snug mb-1"
                  >
                    {exam.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    {exam.organization}
                  </p>

                  {/* Why you match */}
                  <div className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-xs space-y-1 mb-3">
                    <span className="font-semibold text-emerald-900 dark:text-emerald-300 block">
                      Why this matches your profile:
                    </span>
                    <ul className="space-y-0.5 text-slate-600 dark:text-slate-300 text-[11px]">
                      {reasons.slice(0, 3).map((r, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-emerald-500 font-bold shrink-0">✓</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs py-2 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Vacancies</span>
                      <span className="font-bold font-mono tabular-nums text-slate-800 dark:text-slate-200">
                        {exam.vacancies > 0 ? `${exam.vacancies.toLocaleString('en-IN')} posts` : 'To be notified'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Last Date</span>
                      <span className="font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                        {exam.lastDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-2">
                  <span className="text-[11px] text-slate-400">
                    Exam: {exam.examDate}
                  </span>
                  <button
                    onClick={() => onSelectExam(exam)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>Check Details & Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Secondary / Other opportunities where age or qualification condition differs */}
      {potentialMatches.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Other Opportunities Requiring Additional Conditions ({potentialMatches.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              These exams are close to your parameters but may require higher age limit concession, different state domicile, or specialized branch degrees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {potentialMatches.slice(0, 4).map(({ exam }) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onSelect={onSelectExam}
                isSaved={savedExams.includes(exam.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
