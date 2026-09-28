export type ExamCategory =
  | 'SSC'
  | 'UPSC'
  | 'Banking'
  | 'Railways'
  | 'Defence'
  | 'State PSC'
  | 'Police'
  | 'Teaching'
  | 'Engineering & Technical';

export type ExamStatus =
  | 'Applications Open'
  | 'Closing Soon'
  | 'Upcoming'
  | 'Closed';

export type DateConfidence =
  | 'Confirmed'
  | 'Tentative'
  | 'Not announced yet'
  | 'Not Announced'
  | 'Information not officially announced';

export type QualificationLevel =
  | '10th'
  | '12th'
  | 'Diploma'
  | 'Graduate'
  | 'Post Graduate'
  | 'Engineering'
  | 'B.Ed'
  | 'Medical';

export interface ImportantDate {
  label: string;
  date: string;
  isDeadline?: boolean;
  isExamDate?: boolean;
  dateType?: DateConfidence;
}

export interface ExamNotification {
  id: string;
  title: string;
  shortName: string;
  organization: string;
  category: ExamCategory;
  vacancies: number;
  vacanciesStatus?: 'Confirmed' | 'Tentative' | 'To be announced';
  examCycle: string; // e.g. "2026 Cycle" or "2026-27 Recruitment Cycle"
  isHistorical?: boolean;
  applicationStartDate: string; // YYYY-MM-DD or "Not announced yet"
  lastDate: string; // YYYY-MM-DD or "Not announced yet"
  lastDateType?: 'Confirmed' | 'Tentative' | 'Not Announced';
  examDate: string; // Human readable, e.g. "September 30 – October 30, 2026" or "Not announced yet"
  examDateSort?: string; // YYYY-MM-DD for sorting/calendar (only if officially known or scheduled)
  examDateType: DateConfidence;
  status: ExamStatus;
  state: string; // "All India" or State name
  salaryPayScale: string;
  qualification: QualificationLevel;
  qualificationText: string;
  degreeBranches?: string[];
  eligibility: {
    minAge: number;
    maxAge: number;
    ageRelaxation: string;
    nationality: string;
    details: string;
  };
  applicationFee: {
    generalOBC: string;
    reserved: string;
    mode: string;
  };
  importantDates: ImportantDate[];
  selectionProcess: string[];
  officialNotificationUrl: string;
  officialApplicationUrl: string;
  postsSummary: string;
  lastVerified: string; // e.g. "September 28, 2026"
  isFeatured?: boolean;
}

export interface StudentProfile {
  age: number;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  qualification: QualificationLevel;
  degreeBranch: string;
  state: string;
  gender: 'All' | 'Male' | 'Female';
  isPwD?: boolean;
}

export interface MatchResult {
  exam: ExamNotification;
  isMatch: boolean;
  matchScore: number; // 0 - 100
  reasons: string[];
  ageRelaxedMax: number;
}
