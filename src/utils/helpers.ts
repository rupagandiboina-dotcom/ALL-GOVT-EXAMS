import { ExamNotification, StudentProfile, MatchResult, QualificationLevel, ExamStatus, DateConfidence } from '../types/exam';

export function getDaysRemaining(dateString: string): number {
  if (!dateString || dateString.toLowerCase().includes('not announced') || dateString.toLowerCase().includes('information not')) {
    return -999;
  }
  const timestamp = Date.parse(dateString);
  if (isNaN(timestamp)) {
    return -999;
  }
  const target = new Date(dateString + 'T23:59:59');
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatDeadlineText(
  dateString: string, 
  status?: ExamStatus, 
  startDate?: string
): { text: string; urgent: boolean; expired: boolean } {
  if (status === 'Closed') {
    return { text: 'Applications Closed', urgent: false, expired: true };
  }

  if (status === 'Upcoming') {
    if (startDate && startDate !== 'Not announced yet') {
      return { text: `Opens ${startDate}`, urgent: false, expired: false };
    }
    return { text: 'To be announced', urgent: false, expired: false };
  }

  if (!dateString || dateString === 'Not announced yet' || isNaN(Date.parse(dateString))) {
    return { text: 'Not announced yet', urgent: false, expired: false };
  }

  const days = getDaysRemaining(dateString);
  if (days < 0) {
    return { text: 'Applications Closed', urgent: false, expired: true };
  }
  if (days === 0) {
    return { text: 'Closes Today!', urgent: true, expired: false };
  }
  if (days === 1) {
    return { text: '1 day left (Tomorrow)', urgent: true, expired: false };
  }
  if (days <= 5) {
    return { text: `${days} days left`, urgent: true, expired: false };
  }
  if (days <= 10) {
    return { text: `${days} days left`, urgent: true, expired: false };
  }
  return { text: `${days} days left`, urgent: false, expired: false };
}

export function getStatusBadgeStyle(status: string) {
  switch (status) {
    case 'Applications Open':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        dot: 'bg-emerald-500',
        label: 'Applications Open'
      };
    case 'Closing Soon':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        dot: 'bg-amber-500 animate-pulse',
        label: 'Closing Soon'
      };
    case 'Upcoming':
      return {
        bg: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
        dot: 'bg-indigo-500',
        label: 'Upcoming'
      };
    case 'Closed':
    default:
      return {
        bg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
        dot: 'bg-slate-400',
        label: 'Closed'
      };
  }
}

export function getDateConfidenceBadgeStyle(confidence: DateConfidence) {
  switch (confidence) {
    case 'Confirmed':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        label: 'Confirmed'
      };
    case 'Tentative':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        label: 'Tentative'
      };
    case 'Not announced yet':
    case 'Information not officially announced':
    default:
      return {
        bg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
        label: confidence
      };
  }
}

export function getCategoryBadgeStyle(category: string) {
  switch (category) {
    case 'SSC':
      return 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800';
    case 'UPSC':
      return 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800';
    case 'Banking':
      return 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800';
    case 'Railways':
      return 'text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800';
    case 'Defence':
      return 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800';
    case 'State PSC':
      return 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800';
    case 'Police':
      return 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800';
    case 'Teaching':
      return 'text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/50 border-cyan-200 dark:border-cyan-800';
    case 'Engineering & Technical':
      return 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800';
    default:
      return 'text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
  }
}

// Qualification rank hierarchy
const QUALIFICATION_RANK: Record<QualificationLevel, number> = {
  '10th': 1,
  '12th': 2,
  'Diploma': 3,
  'Graduate': 4,
  'Engineering': 4,
  'B.Ed': 4,
  'Post Graduate': 5,
  'Medical': 5,
};

export function matchStudentToExam(student: StudentProfile, exam: ExamNotification): MatchResult {
  const reasons: string[] = [];
  let score = 0;

  // 1. Calculate age relaxation
  let ageRelaxationYears = 0;
  if (student.category === 'OBC') {
    ageRelaxationYears = 3;
  } else if (student.category === 'SC' || student.category === 'ST') {
    ageRelaxationYears = 5;
  } else if (student.category === 'EWS') {
    ageRelaxationYears = 0; // Standard general age limit per official norms
  }

  // PwD additional relaxation (+10 years)
  if (student.isPwD) {
    ageRelaxationYears += 10;
  }

  // NDA / Defence officer entries have strict fixed age bands per notification
  if (exam.id.includes('nda')) {
    ageRelaxationYears = 0;
  }

  const effectiveMaxAge = exam.eligibility.maxAge + ageRelaxationYears;
  const isAgeValid = student.age >= exam.eligibility.minAge && student.age <= effectiveMaxAge;

  if (isAgeValid) {
    score += 40;
    if (ageRelaxationYears > 0) {
      const breakdown = student.isPwD 
        ? `${student.category} + PwD (Total +${ageRelaxationYears} yrs)` 
        : `${student.category} (+${ageRelaxationYears} yrs)`;
      reasons.push(`Eligible under ${breakdown} relaxation (Max age extended to ${effectiveMaxAge} yrs).`);
    } else {
      reasons.push(`Age ${student.age} is within standard bracket (${exam.eligibility.minAge} – ${exam.eligibility.maxAge} yrs).`);
    }
  } else if (student.age > effectiveMaxAge) {
    reasons.push(`Age ${student.age} exceeds the maximum limit (${effectiveMaxAge} yrs with ${student.category}${student.isPwD ? ' + PwD' : ''} relaxation).`);
  } else {
    reasons.push(`Age ${student.age} is below minimum requirement (${exam.eligibility.minAge} yrs).`);
  }

  // PwD Benefit Note
  if (student.isPwD) {
    reasons.push('PwD (Divyangjan): Eligible for application fee exemption and scribe facilities.');
  }

  // Gender Specific Concession Note
  if (student.gender === 'Female') {
    reasons.push('Women Aspirants: Exempted from application fees in SSC and UPSC examinations.');
  }

  // 2. Qualification & Stream/Branch matching
  const studentRank = QUALIFICATION_RANK[student.qualification] || 0;
  const examRank = QUALIFICATION_RANK[exam.qualification] || 0;

  let isQualValid = false;

  // Specific domain qualification conditions
  if (exam.qualification === 'Engineering') {
    if (
      student.qualification === 'Engineering' || 
      student.degreeBranch.toLowerCase().includes('b.tech') || 
      student.degreeBranch.toLowerCase().includes('engineer')
    ) {
      isQualValid = true;
      score += 40;
      reasons.push(`Matches technical engineering degree requirement (${student.degreeBranch || 'Engineering'}).`);
    } else {
      reasons.push(`Requires Engineering degree (B.Tech/B.E). Current: ${student.qualification}.`);
    }
  } else if (exam.qualification === 'B.Ed') {
    if (
      student.qualification === 'B.Ed' || 
      student.degreeBranch.toLowerCase().includes('b.ed') || 
      student.degreeBranch.toLowerCase().includes('d.el.ed')
    ) {
      isQualValid = true;
      score += 40;
      reasons.push(`Matches teacher training / credentials (${student.degreeBranch || 'B.Ed'}).`);
    } else {
      reasons.push(`Requires Teaching credentials (B.Ed / D.El.Ed). Current: ${student.qualification}.`);
    }
  } else if (exam.qualification === 'Diploma') {
    if (student.qualification === 'Diploma' || studentRank >= 3) {
      isQualValid = true;
      score += 40;
      reasons.push(`Meets Diploma / Technical trade qualification (${student.degreeBranch || 'Diploma'}).`);
    } else {
      reasons.push(`Requires Diploma / ITI. Current: ${student.qualification}.`);
    }
  } else if (studentRank >= examRank) {
    isQualValid = true;
    score += 40;
    if (student.degreeBranch && student.degreeBranch !== 'Any' && student.degreeBranch !== 'Any Graduate') {
      reasons.push(`Holds ${student.qualification} (${student.degreeBranch}), satisfying the minimum ${exam.qualification} level.`);
    } else {
      reasons.push(`Holds ${student.qualification}, which satisfies the minimum ${exam.qualification} criteria.`);
    }
  } else {
    reasons.push(`Requires minimum ${exam.qualification} level. Current: ${student.qualification}.`);
  }

  // 3. State & Domicile matching
  if (student.state === 'All India') {
    if (exam.state === 'All India') {
      score += 20;
      reasons.push('All India open recruitment (all state and UT candidates eligible).');
    } else {
      score += 15;
      reasons.push(`${exam.state} State Commission notification (Open to eligible candidates).`);
    }
  } else {
    if (exam.state === 'All India') {
      score += 20;
      reasons.push(`All India open recruitment — open to ${student.state} candidates.`);
    } else if (exam.state.toLowerCase() === student.state.toLowerCase()) {
      score += 20;
      reasons.push(`Direct state domicile match: Eligible for ${student.state} state reservation.`);
    } else {
      score += 10;
      reasons.push(`State PSC exam for ${exam.state}. Candidates from ${student.state} can apply under General/Unreserved quota.`);
    }
  }

  const isMatch = isAgeValid && isQualValid;

  return {
    exam,
    isMatch,
    matchScore: Math.min(score, 100),
    reasons,
    ageRelaxedMax: effectiveMaxAge
  };
}

export function generateCalendarEventICS(exam: ExamNotification): string {
  const cleanTitle = exam.shortName.replace(/,/g, '');
  const cleanDesc = `Last date to apply for ${exam.title}. Verify official details at ${exam.officialApplicationUrl}`;
  const deadlineStr = exam.lastDate && /^\d{4}-\d{2}-\d{2}$/.test(exam.lastDate) 
    ? exam.lastDate.replace(/-/g, '') 
    : '20261231';

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ExamRadar//All Government Exams//EN',
    'BEGIN:VEVENT',
    `UID:exam-${exam.id}@examradar.in`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;VALUE=DATE:${deadlineStr}`,
    `DTEND;VALUE=DATE:${deadlineStr}`,
    `SUMMARY:Deadline: ${cleanTitle}`,
    `DESCRIPTION:${cleanDesc}`,
    `LOCATION:${exam.state}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;
}
