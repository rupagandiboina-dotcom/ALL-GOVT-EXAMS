import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  AlertTriangle, 
  Calendar as CalendarIcon, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  FileText, 
  Share2, 
  Bookmark, 
  MapPin, 
  Info,
  CalendarPlus,
  Printer,
  ShieldCheck,
  Check,
  History,
  AlertCircle,
  Bot
} from 'lucide-react';
import { ExamNotification } from '../types/exam';
import { 
  getStatusBadgeStyle, 
  getCategoryBadgeStyle, 
  formatDeadlineText, 
  generateCalendarEventICS,
  getDateConfidenceBadgeStyle
} from '../utils/helpers';

interface ExamDetailsModalProps {
  exam: ExamNotification | null;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: (examId: string) => void;
  onAskAi?: (query: string) => void;
}

export const ExamDetailsModal: React.FC<ExamDetailsModalProps> = ({
  exam,
  onClose,
  isSaved = false,
  onToggleSave,
  onAskAi
}) => {
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!exam) return null;

  const statusStyle = getStatusBadgeStyle(exam.status);
  const categoryStyle = getCategoryBadgeStyle(exam.category);
  const deadline = formatDeadlineText(exam.lastDate, exam.status, exam.applicationStartDate);
  const examDateConfidence = getDateConfidenceBadgeStyle(exam.examDateType);
  const calendarIcsUrl = generateCalendarEventICS(exam);

  const handleShare = async () => {
    const shareText = `${exam.title} (${exam.organization}) - Last Date: ${exam.lastDate}. Always verify details on official notification via ExamRadar.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: exam.title,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 3000);
      } catch {
        // Fallback
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast Notification */}
        {copiedToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
            <span>Exam summary copied to clipboard!</span>
          </div>
        )}

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 p-4 sm:p-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${categoryStyle}`}>
                {exam.category}
              </span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusStyle.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                <span>{statusStyle.label}</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{exam.state}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Last Verified: {exam.lastVerified}</span>
              </span>
              {exam.isHistorical && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  <History className="w-3 h-3 text-slate-500" />
                  <span>Historical Record</span>
                </span>
              )}
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {exam.title}
            </h2>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{exam.organization}</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-600 dark:text-slate-300">
                Cycle: {exam.examCycle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onAskAi && (
              <button
                onClick={() => {
                  onClose();
                  onAskAi(`Tell me full details about ${exam.title} (${exam.organization}), including eligibility criteria, age limits, syllabus pattern, and application dates.`);
                }}
                title="Ask AI Agent about this exam"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-xs font-semibold transition-colors"
              >
                <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="hidden sm:inline">Ask AI Agent</span>
              </button>
            )}
            {onToggleSave && (
              <button
                onClick={() => onToggleSave(exam.id)}
                title={isSaved ? 'Remove from Saved' : 'Save exam'}
                className={`p-2 rounded-lg border transition-colors ${
                  isSaved
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
            <button
              onClick={handlePrint}
              title="Print / Save Summary"
              className="hidden sm:inline-flex p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              title="Share exam"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Prominent Required Official Source Disclaimer Banner */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1">
              <p className="font-bold text-sm">
                ExamRadar provides information collected from official sources. Always verify important details from the official notification before applying.
              </p>
              <p className="text-amber-800/90 dark:text-amber-300/80 leading-relaxed text-xs">
                ExamRadar is an independent informational discovery platform and is not an official government website. Vacancies, qualifications, age limits, and schedules are governed solely by {exam.organization}. Always verify all critical requirements and deadlines on the official portal before submitting any application or payment.
              </p>
            </div>
          </div>

          {/* Quick Stats Grid with Accuracy Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <span>Total Vacancies</span>
                {exam.vacanciesStatus && (
                  <span className={`text-[9px] px-1 rounded font-medium ${
                    exam.vacanciesStatus === 'Confirmed' 
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                      : exam.vacanciesStatus === 'Tentative'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {exam.vacanciesStatus}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold text-lg font-mono tabular-nums">
                <Users className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{exam.vacancies > 0 ? exam.vacancies.toLocaleString('en-IN') : 'To be notified'}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Min Qualification
              </span>
              <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold text-base">
                <GraduationCap className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="truncate">{exam.qualification}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Age Bracket (UR)
              </span>
              <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold text-base font-mono tabular-nums">
                <span>{exam.eligibility.minAge} – {exam.eligibility.maxAge} yrs</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Application Last Date
              </span>
              <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold text-sm font-mono tabular-nums">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">{deadline.text}</span>
              </div>
            </div>
          </div>

          {/* Posts & Remuneration */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Posts & Pay Scale</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-800 dark:text-slate-100">Key Posts: </strong>
              {exam.postsSummary}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-800 dark:text-slate-100">Pay Scale: </strong>
              {exam.salaryPayScale}
            </p>
          </div>

          {/* Eligibility & Age Relaxation Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Eligibility & Educational Criteria</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Prescribed Qualifications
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {exam.qualificationText}
                </p>
                {exam.degreeBranches && exam.degreeBranches.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">Eligible Disciplines / Streams:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {exam.degreeBranches.map((branch, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-medium">
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Age Limits & Category Relaxations
                </span>
                <p className="text-slate-800 dark:text-slate-200 font-medium">
                  Unreserved / General: <span className="font-mono tabular-nums">{exam.eligibility.minAge} – {exam.eligibility.maxAge} years</span>
                </p>
                <div className="p-2.5 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-indigo-900 dark:text-indigo-300">Relaxations: </strong>
                  {exam.eligibility.ageRelaxation}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {exam.eligibility.details}
                </p>
              </div>
            </div>
          </div>

          {/* Important Dates Timeline - Clearly distinguishing Confirmed vs Tentative vs Not Announced */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Important Dates & Timeline</span>
                </h3>
                <span className="text-xs text-slate-400">
                  (Dates verified from official notification)
                </span>
              </div>
              {exam.lastDate && exam.lastDate !== 'Not announced yet' && (
                <a
                  href={calendarIcsUrl}
                  download={`${exam.shortName.replace(/\s+/g, '_')}_deadline.ics`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Add Deadline (.ics)</span>
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {exam.importantDates.map((item, index) => {
                const confStyle = item.dateType ? getDateConfidenceBadgeStyle(item.dateType) : null;
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border text-xs ${
                      item.isDeadline
                        ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
                        : item.isExamDate
                        ? 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        {item.label}
                      </span>
                      {confStyle && (
                        <span className={`text-[9px] px-1 rounded border font-medium ${confStyle.bg}`}>
                          {confStyle.label}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums text-xs sm:text-sm">
                        {item.date}
                      </span>
                      {item.isDeadline && (
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider shrink-0 ml-1">
                          Deadline
                        </span>
                      )}
                      {item.isExamDate && (
                        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider shrink-0 ml-1">
                          Exam Date
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Fee & Selection Process */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fee Section */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Application Fee</span>
              </h3>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">General / OBC / EWS:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums">{exam.applicationFee.generalOBC}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">SC / ST / PwD / Female:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{exam.applicationFee.reserved}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Payment Modes:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{exam.applicationFee.mode}</span>
                </div>
              </div>
            </div>

            {/* Selection Stages */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Selection Stages</span>
              </h3>
              <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {exam.selectionProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Modal Action Footer with Verified Official Portal Link */}
        <div className="sticky bottom-0 z-10 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Official Recruiting Authority: </span>
            <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{exam.organization}</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={exam.officialNotificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Official Notification</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href={exam.officialApplicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
