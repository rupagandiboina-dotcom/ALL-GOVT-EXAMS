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
}

export interface ExamNotification {
  id: string;
  title: string;
  shortName: string;
  organization: string;
  category: ExamCategory;
  vacancies: number;
  applicationStartDate: string; // YYYY-MM-DD
  lastDate: string; // YYYY-MM-DD
  examDate: string; // Human readable, e.g. "Dec 14 – 20, 2026"
  examDateSort?: string; // YYYY-MM-DD
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
