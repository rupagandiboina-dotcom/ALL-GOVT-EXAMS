import { ExamCategory, ExamNotification } from '../types/exam';

export const CATEGORIES_LIST: { name: ExamCategory; count?: number; icon: string; description: string }[] = [
  { name: 'SSC', icon: 'FileCheck2', description: 'Staff Selection Commission (CHSL, CGL, MTS, GD, CPO)' },
  { name: 'UPSC', icon: 'Landmark', description: 'Union Public Service Commission (CSE, NDA, CDS, ESE)' },
  { name: 'Banking', icon: 'Building2', description: 'IBPS PO/Clerk/RRB, SBI, RBI & Public Sector Banks' },
  { name: 'Railways', icon: 'Train', description: 'Railway Recruitment Boards (RRB NTPC, ALP, Technician)' },
  { name: 'Defence', icon: 'Shield', description: 'NDA & NA, CDS, AFCAT, Indian Army, Navy, Air Force' },
  { name: 'State PSC', icon: 'MapPin', description: 'BPSC, UPPSC, MPSC, APPSC & State Civil Services' },
  { name: 'Police', icon: 'BadgePercent', description: 'Central Armed Police Forces (CAPFs), Delhi Police & State Police' },
  { name: 'Teaching', icon: 'GraduationCap', description: 'CTET, KVS, NVS & Central Teacher Eligibility' },
  { name: 'Engineering & Technical', icon: 'Cpu', description: 'ISRO ICRB, DRDO CEPTAM, Railway Technical & ESE' },
];

export const ALL_INDIAN_STATES = [
  'All India',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

export const SAMPLE_EXAMS: ExamNotification[] = [
  {
    id: 'ssc-chsl-2026',
    title: 'SSC Combined Higher Secondary (10+2) Level Examination 2026',
    shortName: 'SSC CHSL 2026',
    organization: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    vacancies: 2536,
    vacanciesStatus: 'Tentative',
    examCycle: '2026 Recruitment Cycle',
    applicationStartDate: '2026-09-07',
    lastDate: '2026-10-07',
    lastDateType: 'Confirmed',
    examDate: 'Not announced yet (Tentative Dec 2026 – Jan 2027)',
    examDateSort: '2026-12-15',
    examDateType: 'Tentative',
    status: 'Applications Open',
    state: 'All India',
    salaryPayScale: 'Pay Level 2 (₹19,900 – ₹63,200) for LDC/JSA and Pay Level 4 (₹25,500 – ₹81,100) for DEO',
    qualification: '12th',
    qualificationText: 'Must have passed 12th Standard or equivalent examination from a recognized Board or University',
    degreeBranches: ['12th Pass Science', '12th Pass Commerce', '12th Pass Arts / Humanities', 'Equivalent Board'],
    eligibility: {
      minAge: 18,
      maxAge: 27,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwBD (UR): 10 years, PwBD (OBC): 13 years, PwBD (SC/ST): 15 years, Ex-Servicemen: 3 years',
      nationality: 'Citizen of India',
      details: 'Crucial date for age calculation is officially notified in the advertisement. For DEO Grade A in specific ministries, 12th in Science stream with Mathematics is required.'
    },
    applicationFee: {
      generalOBC: '₹100 (General / OBC / EWS Male candidates)',
      reserved: 'Exempted (Women candidates and SC, ST, PwBD, ESM candidates)',
      mode: 'Online Mode Only (BHIM UPI, Net Banking, Visa, Mastercard, RuPay Cards)'
    },
    importantDates: [
      { label: 'Official Notification Released on ssc.gov.in', date: 'September 7, 2026', dateType: 'Confirmed' },
      { label: 'Online Application Window Opens', date: 'September 7, 2026', dateType: 'Confirmed' },
      { label: 'Last Date for Online Application Submission (23:00 hrs)', date: 'October 7, 2026', isDeadline: true, dateType: 'Confirmed' },
      { label: 'Last Date for Online Fee Payment (23:00 hrs)', date: 'October 8, 2026', dateType: 'Confirmed' },
      { label: 'Window for Application Form Correction', date: 'October 14 – October 16, 2026 (23:00 hrs)', dateType: 'Confirmed' },
      { label: 'Tier-I Computer Based Examination', date: 'Not announced yet (Tentative Dec 2026 – Jan 2027)', isExamDate: true, dateType: 'Tentative' },
      { label: 'Tier-II Written Examination', date: 'Information not officially announced', dateType: 'Not Announced' }
    ],
    selectionProcess: [
      'Tier-I: Computer Based Examination (Objective Multiple Choice - General Intelligence, English, Quant, GA)',
      'Tier-II: Mathematical Abilities, Reasoning, English, GA, Computer Knowledge & Skill/Typing Test',
      'Document Verification conducted by Indenting User Departments'
    ],
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplicationUrl: 'https://ssc.gov.in',
    postsSummary: 'Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), Data Entry Operator (DEO), DEO Grade ‘A’',
    lastVerified: 'September 28, 2026',
    isFeatured: true
  },
  {
    id: 'ssc-cgl-2026',
    title: 'SSC Combined Graduate Level (CGL) Examination 2026',
    shortName: 'SSC CGL 2026',
    organization: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    vacancies: 14582,
    vacanciesStatus: 'Tentative',
    examCycle: '2026 Recruitment Cycle',
    applicationStartDate: '2026-05-21',
    lastDate: '2026-06-25',
    lastDateType: 'Confirmed',
    examDate: 'September 30 – October 30, 2026',
    examDateSort: '2026-09-30',
    examDateType: 'Confirmed',
    status: 'Closed',
    state: 'All India',
    salaryPayScale: 'Pay Level 4 (₹25,500) to Pay Level 8 (₹1,51,100) as per 7th CPC Matrix',
    qualification: 'Graduate',
    qualificationText: 'Bachelor’s Degree in any discipline from a recognized University or equivalent',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech', 'BBA', 'BCA'],
    eligibility: {
      minAge: 18,
      maxAge: 32,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwBD (UR): 10 years, PwBD (OBC): 13 years, PwBD (SC/ST): 15 years, ESM: 3 years',
      nationality: 'Citizen of India',
      details: 'Age criteria varies by post (18-27, 20-30, 18-32 years). Crucial date of eligibility as published in official notification.'
    },
    applicationFee: {
      generalOBC: '₹100 (General / OBC Male candidates)',
      reserved: 'Exempted (Women candidates, SC, ST, PwBD, and ESM candidates)',
      mode: 'Online (BHIM UPI, Net Banking, Visa, Mastercard, RuPay Cards)'
    },
    importantDates: [
      { label: 'Official Notification Issued on ssc.gov.in', date: 'May 21, 2026', dateType: 'Confirmed' },
      { label: 'Application Registration Closes', date: 'June 25, 2026', isDeadline: true, dateType: 'Confirmed' },
      { label: 'Tier-I Computer Based Examination', date: 'September 30 – October 30, 2026', isExamDate: true, dateType: 'Confirmed' },
      { label: 'Tier-II Written Examination', date: 'Not announced yet (Tentative Dec 2026 / Jan 2027)', dateType: 'Tentative' }
    ],
    selectionProcess: [
      'Tier-I: Computer Based Examination (Objective Multiple Choice - Qualifying in nature)',
      'Tier-II: Paper-I (Compulsory for all posts: Math, Reasoning, English, GA, Computer) + Module II (Data Entry Speed Test)',
      'Document Verification conducted directly by Indenting User Departments'
    ],
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplicationUrl: 'https://ssc.gov.in',
    postsSummary: 'Assistant Section Officer (CSS, MEA, IB, Railway), Income Tax Inspector, Central Excise Inspector, Sub-Inspector (CBI, NIA), Auditor, Tax Assistant',
    lastVerified: 'September 28, 2026',
    isFeatured: true
  },
  {
    id: 'upsc-cse-2027',
    title: 'UPSC Civil Services Examination (CSE) 2027',
    shortName: 'UPSC CSE 2027',
    organization: 'Union Public Service Commission (UPSC)',
    category: 'UPSC',
    vacancies: 0,
    vacanciesStatus: 'To be announced',
    examCycle: '2027 Annual Calendar Cycle',
    applicationStartDate: '2027-01-13',
    lastDate: '2027-02-02',
    lastDateType: 'Confirmed',
    examDate: 'May 23, 2027 (Prelims) / August 20, 2027 (Mains)',
    examDateSort: '2027-05-23',
    examDateType: 'Confirmed',
    status: 'Upcoming',
    state: 'All India',
    salaryPayScale: 'Pay Level 10 (₹56,100 initial basic pay with DA, HRA + perks)',
    qualification: 'Graduate',
    qualificationText: 'Bachelor’s degree from any recognized Central/State/Deemed University',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech', 'MBBS', 'LLB'],
    eligibility: {
      minAge: 21,
      maxAge: 32,
      ageRelaxation: 'OBC: 3 years (9 attempts), SC/ST: 5 years (unlimited attempts), PwBD: 10 years',
      nationality: 'Indian Citizen for IAS & IPS; Indian/Nepal/Bhutan for other group services',
      details: 'Candidates appearing in final degree examination can apply provisionally for Prelims via One Time Registration (OTR).'
    },
    applicationFee: {
      generalOBC: '₹100 (Male Gen/OBC/EWS)',
      reserved: 'Exempted (Female, SC, ST, PwBD)',
      mode: 'Online via SBI Net Banking, UPI, Cards, or SBI Branch Challan'
    },
    importantDates: [
      { label: 'UPSC Annual Calendar 2027 Official Release', date: 'May 20, 2026', dateType: 'Confirmed' },
      { label: 'Official CSE Notification & Application Open', date: 'January 13, 2027', dateType: 'Confirmed' },
      { label: 'Last Date for Online Application (OTR)', date: 'February 2, 2027', isDeadline: true, dateType: 'Confirmed' },
      { label: 'Civil Services (Preliminary) Examination 2027', date: 'May 23, 2027', isExamDate: true, dateType: 'Confirmed' },
      { label: 'Civil Services (Main) Examination 2027', date: 'August 20, 2027 (5 Days)', dateType: 'Confirmed' }
    ],
    selectionProcess: [
      'Preliminary Examination (GS Paper I & CSAT Paper II - Qualifying 33%)',
      'Civil Services Mains Written Examination (9 Descriptive Papers - 1750 marks)',
      'Personality Test / Interview at Dholpur House, New Delhi (275 marks)'
    ],
    officialNotificationUrl: 'https://upsc.gov.in',
    officialApplicationUrl: 'https://upsconline.nic.in',
    postsSummary: 'IAS (Indian Administrative Service), IPS (Indian Police Service), IFS (Foreign Service), IRS (Revenue Service) and Group A/B Services',
    lastVerified: 'September 28, 2026',
    isFeatured: true
  },
  {
    id: 'ctet-dec-2026',
    title: 'Central Teacher Eligibility Test (CTET) – December 2026',
    shortName: 'CTET Dec 2026',
    organization: 'Central Board of Secondary Education (CBSE)',
    category: 'Teaching',
    vacancies: 0,
    vacanciesStatus: 'To be announced',
    examCycle: 'December 2026 Examination Cycle',
    applicationStartDate: '2026-09-17',
    lastDate: '2026-10-16',
    lastDateType: 'Confirmed',
    examDate: 'December 14, 2026',
    examDateSort: '2026-12-14',
    examDateType: 'Confirmed',
    status: 'Applications Open',
    state: 'All India',
    salaryPayScale: 'Eligibility Certification benchmark valid for lifetime across KVS, NVS, Central Schools & State schools',
    qualification: 'B.Ed',
    qualificationText: 'Paper I (Primary I-V): Senior Secondary with 50% + 2-yr D.El.Ed / Paper II (Elementary VI-VIII): Graduation + B.Ed or D.El.Ed',
    degreeBranches: ['D.El.Ed', 'B.Ed', 'B.El.Ed', 'Graduation + Education Diploma'],
    eligibility: {
      minAge: 18,
      maxAge: 60,
      ageRelaxation: 'No upper age limit for eligibility certificate',
      nationality: 'Citizen of India',
      details: 'Passing benchmark: 60% marks (55% for SC/ST/OBC/PwD candidates) to obtain CTET Certificate.'
    },
    applicationFee: {
      generalOBC: '₹1,000 (Only Paper I or II) / ₹1,200 (Both Papers)',
      reserved: '₹500 (Only Paper I or II) / ₹600 (Both Papers) for SC/ST/Diff. Abled',
      mode: 'Online Payment Gateway (Debit/Credit, Net Banking)'
    },
    importantDates: [
      { label: 'Official CTET Information Bulletin Released', date: 'September 17, 2026', dateType: 'Confirmed' },
      { label: 'Online Application Window Opens', date: 'September 17, 2026', dateType: 'Confirmed' },
      { label: 'Last Date for Online Submission', date: 'October 16, 2026', isDeadline: true, dateType: 'Confirmed' },
      { label: 'Online Correction Window in Particulars', date: 'October 21 – October 25, 2026', dateType: 'Confirmed' },
      { label: 'CTET Examination Date', date: 'December 14, 2026', isExamDate: true, dateType: 'Confirmed' }
    ],
    selectionProcess: [
      'Paper I for teaching Classes I to V (Child Development, Language I & II, Maths, Environmental Studies)',
      'Paper II for teaching Classes VI to VIII (Child Development, Language I & II, Maths & Science or Social Studies)',
      'Issuance of DigiLocker Digital Marksheet & Lifetime Certificate'
    ],
    officialNotificationUrl: 'https://ctet.nic.in',
    officialApplicationUrl: 'https://ctet.nic.in',
    postsSummary: 'National qualification benchmark for recruitment in KVS, NVS, Army Public Schools, and Central institutions',
    lastVerified: 'September 28, 2026',
    isFeatured: true
  },
  {
    id: 'ibps-po-xiv',
    title: 'IBPS Probationary Officers / Management Trainees (CRP PO/MT-XIV)',
    shortName: 'IBPS PO XIV',
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    category: 'Banking',
    vacancies: 4455,
    vacanciesStatus: 'Confirmed',
    examCycle: '2026-27 Recruitment Cycle',
    applicationStartDate: '2026-08-01',
    lastDate: '2026-08-28',
    lastDateType: 'Confirmed',
    examDate: 'October 4, 2026 (Main Examination)',
    examDateSort: '2026-10-04',
    examDateType: 'Confirmed',
    status: 'Closed',
    state: 'All India',
    salaryPayScale: 'Basic pay ₹36,000 + allowances (Gross starting ~₹57,000 – ₹62,000/month)',
    qualification: 'Graduate',
    qualificationText: 'A Degree (Graduation) in any discipline from a recognized University',
    degreeBranches: ['Any Graduate', 'B.Com', 'BA', 'B.Sc', 'B.Tech', 'BBA'],
    eligibility: {
      minAge: 20,
      maxAge: 30,
      ageRelaxation: 'OBC (Non-Creamy): 3 years, SC/ST: 5 years, PwBD: 10 years, Ex-SM: 5 years',
      nationality: 'Citizen of India',
      details: 'Operating and working knowledge in computer systems is mandatory.'
    },
    applicationFee: {
      generalOBC: '₹850 (Inclusive of GST)',
      reserved: '₹175 for SC/ST/PwBD candidates',
      mode: 'Online Payment Gateway (Debit/Credit Cards, Net Banking, IMPS, UPI)'
    },
    importantDates: [
      { label: 'Official CRP PO/MT-XIV Notification Released', date: 'August 1, 2026', dateType: 'Confirmed' },
      { label: 'Closure of Online Registrations', date: 'August 28, 2026', isDeadline: true, dateType: 'Confirmed' },
      { label: 'Online Preliminary Examination', date: 'August 22 – 23, 2026 (Concluded)', dateType: 'Confirmed' },
      { label: 'Declaration of Prelims Results', date: 'September 23, 2026', dateType: 'Confirmed' },
      { label: 'Online Main Examination', date: 'October 4, 2026', isExamDate: true, dateType: 'Confirmed' },
      { label: 'Common Interview Phase', date: 'November / December 2026', dateType: 'Tentative' }
    ],
    selectionProcess: [
      'Phase I: Online Preliminary Examination (English, Quant, Reasoning - 100 marks)',
      'Phase II: Online Main Examination (Objective 200 marks + Descriptive English Writing 25 marks)',
      'Phase III: Common Interview conducted by Participating Public Sector Banks'
    ],
    officialNotificationUrl: 'https://ibps.in',
    officialApplicationUrl: 'https://ibps.in',
    postsSummary: 'Probationary Officers across Bank of Baroda, Canara Bank, PNB, Union Bank of India, Indian Bank, UCO Bank, Central Bank of India',
    lastVerified: 'September 28, 2026',
    isFeatured: true
  },
  {
    id: 'ibps-clerk-csa-2026',
    title: 'IBPS Clerk / Customer Service Associate (CRP Clerks-XIV)',
    shortName: 'IBPS Clerk 2026',
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    category: 'Banking',
    vacancies: 11403,
    vacanciesStatus: 'Confirmed',
    examCycle: '2026-27 Recruitment Cycle',
    applicationStartDate: '2026-08-01',
    lastDate: '2026-08-28',
    lastDateType: 'Confirmed',
    examDate: 'October 10 & 11, 2026 (Prelims) / December 27, 2026 (Mains)',
    examDateSort: '2026-10-10',
    examDateType: 'Confirmed',
    status: 'Closed',
    state: 'All India',
    salaryPayScale: 'Basic pay ₹19,900 with increments (Gross starting ~₹32,000 – ₹37,000/month)',
    qualification: 'Graduate',
    qualificationText: 'A Degree (Graduation) in any discipline from a recognized University or equivalent',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'BBA', 'B.Tech'],
    eligibility: {
      minAge: 20,
      maxAge: 28,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwBD: 10 years',
      nationality: 'Citizen of India',
      details: 'Proficiency in the Official Language of the State/UT is essential.'
    },
    applicationFee: {
      generalOBC: '₹850',
      reserved: '₹175 for SC/ST/PwBD/ESM candidates',
      mode: 'Online Payment (Debit/Credit/Net Banking/UPI)'
    },
    importantDates: [
      { label: 'Notification Released on ibps.in', date: 'August 1, 2026', dateType: 'Confirmed' },
      { label: 'Registration Closed', date: 'August 28, 2026', isDeadline: true, dateType: 'Confirmed' },
      { label: 'Online Preliminary Examination', date: 'October 10 & 11, 2026', isExamDate: true, dateType: 'Confirmed' },
      { label: 'Online Main Examination', date: 'December 27, 2026', dateType: 'Confirmed' }
    ],
    selectionProcess: [
      'Phase-I: Preliminary Examination (100 marks objective test - 1 hr)',
      'Phase-II: Main Examination (200 marks, 2 hours 40 minutes)',
      'Document Verification and Local Language Proficiency Confirmation'
    ],
    officialNotificationUrl: 'https://ibps.in',
    officialApplicationUrl: 'https://ibps.in',
    postsSummary: 'Clerk / Customer Service Associates across 11 Participating Public Sector Banks throughout India',
    lastVerified: 'September 28, 2026',
    isFeatured: true
  },
  {
    id: 'ibps-rrb-xv-2026',
    title: 'IBPS Regional Rural Banks (CRP RRBs XV) Officers & Office Assistants',
    shortName: 'IBPS RRB XV',
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    category: 'Banking',
    vacancies: 13757,
    vacanciesStatus: 'Confirmed',
    examCycle: '2026-27 Recruitment Cycle',
    applicationStartDate: '2026-08-16',
    lastDate: '2026-09-27',
    lastDateType: 'Confirmed',
    examDate: 'Nov 21 & 22, 2026 (Officer Scale I) / Dec 6, 12, 13, 2026 (Office Assistant)',
    examDateSort: '2026-11-21',
    examDateType: 'Confirmed',
    status: 'Closed',
    state: 'All India',
    salaryPayScale: 'Officer Scale I: Basic ₹36,000 / Office Assistant: Basic ₹19,900 + Dearness & Special Allowances',
    qualification: 'Graduate',
    qualificationText: 'Bachelor’s degree in any discipline from a recognized University with proficiency in local language',
    degreeBranches: ['Any Graduate', 'BA', 'B.Com', 'B.Sc', 'Agriculture', 'B.Tech'],
    eligibility: {
      minAge: 18,
      maxAge: 30,
      ageRelaxation: 'Officer Scale I: 18-30 yrs; Office Assistant: 18-28 yrs. OBC: 3 yrs, SC/ST: 5 yrs, PwBD: 10 yrs',
      nationality: 'Citizen of India',
      details: 'Candidate must possess proficiency in local language of participating Regional Rural Bank.'
    },
    applicationFee: {
      generalOBC: '₹850 for Officer & Office Assistant (per post)',
      reserved: '₹175 for SC/ST/PwBD candidates',
      mode: 'Online Payment Gateway'
    },
    importantDates: [
      { label: 'Official Detailed Notification', date: 'August 16, 2026', dateType: 'Confirmed' },
      { label: 'Extended Application Deadline Closed', date: 'September 27, 2026', isDeadline: true, dateType: 'Confirmed' },
      { label: 'Preliminary Exam: Officer Scale-I (PO)', date: 'November 21 & 22, 2026', isExamDate: true, dateType: 'Confirmed' },
      { label: 'Preliminary Exam: Office Assistant (Clerk)', date: 'December 6, 12, & 13, 2026', isExamDate: true, dateType: 'Confirmed' },
      { label: 'Main Examination: Officer Scale I, II, III', date: 'December 20, 2026', dateType: 'Confirmed' },
      { label: 'Main Examination: Office Assistant', date: 'January 30, 2027', dateType: 'Confirmed' }
    ],
    selectionProcess: [
      'Preliminary Examination (Reasoning & Quantitative Aptitude / Numerical Ability)',
      'Main Examination (Reasoning, Computer Knowledge, GA, English/Hindi, Quant)',
      'Interview (For Officers Scale I, II, and III only; No interview for Office Assistant)'
    ],
    officialNotificationUrl: 'https://ibps.in',
    officialApplicationUrl: 'https://ibps.in',
    postsSummary: 'Officers Scale I, II, III and Office Assistants (Multipurpose) in 43 Regional Rural Banks across India',
    lastVerified: 'September 28, 2026'
  },
  {
    id: 'ssc-mts-havaldar-2026',
    title: 'SSC Multi-Tasking (Non-Technical) Staff & Havaldar Examination 2026',
    shortName: 'SSC MTS & Havaldar',
    organization: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    vacancies: 9583,
    vacanciesStatus: 'Tentative',
    examCycle: '2026 Recruitment Cycle',
    applicationStartDate: '2026-06-27',
    lastDate: '2026-08-03',
    lastDateType: 'Confirmed',
    examDate: 'September 30 – November 14, 2026',
    examDateSort: '2026-09-30',
    examDateType: 'Confirmed',
    status: 'Closed',
    state: 'All India',
    salaryPayScale: 'Pay Level 1 (₹18,000 – ₹56,900) as per 7th CPC Matrix',
    qualification: '10th',
    qualificationText: 'Must have passed Matriculation (10th Class) Examination from a recognized Board',
    degreeBranches: ['10th Pass', 'Any'],
    eligibility: {
      minAge: 18,
      maxAge: 25,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwBD: 10 years, 18-27 years for Havaldar in CBIC & CBN',
      nationality: 'Citizen of India',
      details: 'Physical standard and walking test applicable only for Havaldar in CBIC & CBN.'
    },
    applicationFee: {
      generalOBC: '₹100',
      reserved: 'Exempted (Women, SC, ST, PwBD, ESM)',
      mode: 'Online (UPI, Net Banking, Debit/Credit)'
    },
    importantDates: [
      { label: 'Notification Released on ssc.gov.in', date: 'June 27, 2026', dateType: 'Confirmed' },
      { label: 'Registration Deadline Closed', date: 'August 3, 2026', isDeadline: true, dateType: 'Confirmed' },
      { label: 'Computer Based Examination (CBT)', date: 'September 30 – November 14, 2026', isExamDate: true, dateType: 'Confirmed' }
    ],
    selectionProcess: [
      'Computer Based Examination (Session-I: Numerical & Reasoning | Session-II: General Awareness & English)',
      'Physical Efficiency Test (PET: Walking 1600m in 15 min for Havaldar in CBIC/CBN)',
      'Document Verification'
    ],
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplicationUrl: 'https://ssc.gov.in',
    postsSummary: 'Multi-Tasking Staff (6,144 posts) in Central Govt Ministries and Havaldar (3,439 posts) in CBIC & CBN',
    lastVerified: 'September 28, 2026'
  },
  {
    id: 'ssc-gd-constable-2027',
    title: 'SSC Constable (GD) in Central Armed Police Forces (CAPFs), SSF & Rifleman',
    shortName: 'SSC GD Constable',
    organization: 'Staff Selection Commission (SSC) & MHA',
    category: 'Police',
    vacancies: 39481,
    vacanciesStatus: 'Tentative',
    examCycle: '2026-27 Recruitment Cycle',
    applicationStartDate: 'Not announced yet',
    lastDate: 'Not announced yet',
    lastDateType: 'Not Announced',
    examDate: 'Not announced yet (Tentative January – March 2027)',
    examDateSort: '2027-01-15',
    examDateType: 'Tentative',
    status: 'Upcoming',
    state: 'All India',
    salaryPayScale: 'Pay Level 3 (₹21,700 – ₹69,100 per month as per 7th CPC)',
    qualification: '10th',
    qualificationText: 'Matriculation or 10th Class Examination from a recognized Board/University',
    degreeBranches: ['10th Pass', '12th Pass', 'Any'],
    eligibility: {
      minAge: 18,
      maxAge: 23,
      ageRelaxation: 'SC/ST: 5 years, OBC: 3 years, Ex-Servicemen: 3 years',
      nationality: 'Citizen of India',
      details: 'Physical standard: Height 170 cm (Male), 157 cm (Female). Chest 80 cm unexpanded with 5 cm expansion.'
    },
    applicationFee: {
      generalOBC: '₹100 (General / OBC Male)',
      reserved: 'Exempted (Women candidates, SC, ST, and Ex-Servicemen)',
      mode: 'Online (UPI, Net Banking, Visa, Mastercard, RuPay Cards)'
    },
    importantDates: [
      { label: 'Official SSC Calendar Notification Schedule', date: 'Expected late 2026', dateType: 'Tentative' },
      { label: 'Online Application Window', date: 'Not announced yet', dateType: 'Not Announced' },
      { label: 'Computer Based Exam (CBE)', date: 'Not announced yet (Tentative Jan – Mar 2027)', isExamDate: true, dateType: 'Tentative' }
    ],
    selectionProcess: [
      'Computer Based Examination (CBE) in 13 regional languages + Hindi & English',
      'Physical Standard Test (PST) & Physical Efficiency Test (PET: 5 km race in 24 min for Male; 1.6 km in 8.5 min for Female)',
      'Detailed Medical Examination (DME) & Review Medical Examination (RME)',
      'Document Verification'
    ],
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplicationUrl: 'https://ssc.gov.in',
    postsSummary: 'Constable (GD) in BSF, CISF, CRPF, SSB, ITBP, Assam Rifles, and SSF',
    lastVerified: 'September 28, 2026'
  },
  {
    id: 'upsc-nda-na-1-2027',
    title: 'UPSC National Defence Academy & Naval Academy Examination (I) 2027',
    shortName: 'UPSC NDA & NA (I) 2027',
    organization: 'Union Public Service Commission (UPSC)',
    category: 'Defence',
    vacancies: 0,
    vacanciesStatus: 'To be announced',
    examCycle: '2027 Examination Cycle',
    applicationStartDate: '2026-12-16',
    lastDate: '2027-01-05',
    lastDateType: 'Tentative',
    examDate: 'April 11, 2027',
    examDateSort: '2027-04-11',
    examDateType: 'Confirmed',
    status: 'Upcoming',
    state: 'All India',
    salaryPayScale: 'Cadet stipend ₹56,100 during training; Lieutenant basic pay upon commissioning',
    qualification: '12th',
    qualificationText: '12th Class pass of 10+2 pattern (With Physics, Chemistry, Math for Air Force & Navy wings)',
    degreeBranches: ['12th Pass PCM', '12th Pass Any Stream (Army wing)'],
    eligibility: {
      minAge: 16.5,
      maxAge: 19.5,
      ageRelaxation: 'No category age relaxation applies for NDA cadet commissions',
      nationality: 'Unmarried Indian male and female candidates',
      details: 'Candidates appearing in 12th standard exam are eligible to apply provisionally.'
    },
    applicationFee: {
      generalOBC: '₹100 (Male Gen/OBC)',
      reserved: 'NIL (SC/ST candidates and all female applicants exempted)',
      mode: 'Online Mode or SBI Challan'
    },
    importantDates: [
      { label: 'Official Examination Date Confirmed by UPSC Calendar', date: 'April 11, 2027', dateType: 'Confirmed' },
      { label: 'Notification Release on upsc.gov.in', date: 'December 16, 2026', dateType: 'Tentative' },
      { label: 'Last Date for Online Application (OTR)', date: 'January 5, 2027', isDeadline: true, dateType: 'Tentative' },
      { label: 'NDA & NA (I) Written Examination', date: 'April 11, 2027', isExamDate: true, dateType: 'Confirmed' }
    ],
    selectionProcess: [
      'UPSC Written Examination (Mathematics: 300 marks, General Ability Test: 600 marks)',
      'SSB Interview (5-day psychological, ground tasks, group discussions and personal interview)',
      'Complete Military Medical Board Examination'
    ],
    officialNotificationUrl: 'https://upsc.gov.in',
    officialApplicationUrl: 'https://upsconline.nic.in',
    postsSummary: 'Officer Cadets in Army, Navy, Air Force and Naval Academy 10+2 Cadet Entry',
    lastVerified: 'September 28, 2026'
  },
  {
    id: 'upsc-cds-1-2027',
    title: 'UPSC Combined Defence Services (CDS) Examination (I) 2027',
    shortName: 'UPSC CDS (I) 2027',
    organization: 'Union Public Service Commission (UPSC)',
    category: 'Defence',
    vacancies: 0,
    vacanciesStatus: 'To be announced',
    examCycle: '2027 Examination Cycle',
    applicationStartDate: '2026-12-16',
    lastDate: '2027-01-05',
    lastDateType: 'Tentative',
    examDate: 'April 11, 2027',
    examDateSort: '2027-04-11',
    examDateType: 'Confirmed',
    status: 'Upcoming',
    state: 'All India',
    salaryPayScale: 'Stipend ₹56,100 per month during IMA/OTA/INA training; Pay Level 10 upon commissioning',
    qualification: 'Graduate',
    qualificationText: 'Degree of a recognized University (Degree in Engineering for INA/Air Force Academy)',
    degreeBranches: ['Any Graduate', 'B.Tech / B.E', 'B.Sc with Physics & Math'],
    eligibility: {
      minAge: 19,
      maxAge: 25,
      ageRelaxation: 'Age relaxation governed strictly by military commission guidelines (IMA 19-24, OTA 19-25)',
      nationality: 'Citizen of India',
      details: 'Unmarried males & females (for OTA only) can apply. Final year degree students eligible.'
    },
    applicationFee: {
      generalOBC: '₹200',
      reserved: 'Exempted for Female / SC / ST candidates',
      mode: 'Online via SBI Net Banking, UPI, Cards'
    },
    importantDates: [
      { label: 'Date of Examination Confirmed by UPSC Annual Calendar', date: 'April 11, 2027', dateType: 'Confirmed' },
      { label: 'Notification Publication', date: 'December 16, 2026', dateType: 'Tentative' },
      { label: 'Online Application Deadline', date: 'January 5, 2027', isDeadline: true, dateType: 'Tentative' },
      { label: 'Written Examination', date: 'April 11, 2027', isExamDate: true, dateType: 'Confirmed' }
    ],
    selectionProcess: [
      'Written Examination (English, General Knowledge, Elementary Mathematics)',
      'SSB Interview for Intelligence and Personality Test (Stage I & Stage II)',
      'Medical Examination at Service Selection Board Hospitals'
    ],
    officialNotificationUrl: 'https://upsc.gov.in',
    officialApplicationUrl: 'https://upsconline.nic.in',
    postsSummary: 'Permanent/Short Service Commission in Indian Military Academy (IMA), Naval Academy, Air Force Academy & OTA',
    lastVerified: 'September 28, 2026'
  },
  {
    id: 'bpsc-70th-cce',
    title: 'BPSC 70th Integrated Combined Competitive Examination (CCE)',
    shortName: 'BPSC 70th CCE',
    organization: 'Bihar Public Service Commission (BPSC)',
    category: 'State PSC',
    vacancies: 1957,
    vacanciesStatus: 'Tentative',
    examCycle: '70th CCE Cycle',
    applicationStartDate: '2026-09-20',
    lastDate: '2026-10-18',
    lastDateType: 'Confirmed',
    examDate: 'December 13, 2026',
    examDateSort: '2026-12-13',
    examDateType: 'Tentative',
    status: 'Applications Open',
    state: 'Bihar',
    salaryPayScale: 'Pay Level 7 to Level 9 in 7th Pay Matrix (₹44,900 – ₹1,67,800)',
    qualification: 'Graduate',
    qualificationText: 'Graduation or equivalent degree from a recognized University',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech', 'BBA'],
    eligibility: {
      minAge: 20,
      maxAge: 37,
      ageRelaxation: 'BC/EBC (Male & Female) & General Female: 40 years; SC/ST (Male & Female): 42 years',
      nationality: 'Citizen of India',
      details: 'Negative marking of 1/3rd (0.33) in Preliminary Examination. OTR on onlinebpsc.bihar.gov.in mandatory.'
    },
    applicationFee: {
      generalOBC: '₹600 for General & Candidates of other states',
      reserved: '₹150 for SC/ST of Bihar, Permanent Resident Females of Bihar & PwD',
      mode: 'Online Mode through BPSC Portal'
    },
    importantDates: [
      { label: 'Official 70th CCE Notification Out', date: 'September 20, 2026', dateType: 'Confirmed' },
      { label: 'Online Application Portal Active', date: 'September 20, 2026', dateType: 'Confirmed' },
      { label: 'Closing Date to Apply Online', date: 'October 18, 2026', isDeadline: true, dateType: 'Confirmed' },
      { label: '70th CCE Prelims Examination', date: 'December 13, 2026', isExamDate: true, dateType: 'Tentative' }
    ],
    selectionProcess: [
      'Preliminary Examination (150 Objective Questions, 2 Hours, Negative Marking 1/3rd)',
      'Main Written Examination (General Hindi, GS Paper I, GS Paper II, Essay & Optional)',
      'Personality Interview (120 marks)'
    ],
    officialNotificationUrl: 'https://bpsc.bih.nic.in',
    officialApplicationUrl: 'https://onlinebpsc.bihar.gov.in',
    postsSummary: 'Sub-Divisional Officer (SDO/BAS), Deputy Superintendent of Police (DSP), Assistant Commissioner of State Taxes, Revenue Officer',
    lastVerified: 'September 28, 2026',
    isFeatured: true
  },
  {
    id: 'uppsc-pcs-2026',
    title: 'UPPSC Combined State / Upper Subordinate Services (PCS) Exam 2026',
    shortName: 'UPPSC PCS 2026',
    organization: 'Uttar Pradesh Public Service Commission (UPPSC)',
    category: 'State PSC',
    vacancies: 220,
    vacanciesStatus: 'Tentative',
    examCycle: '2026 Recruitment Cycle',
    applicationStartDate: '2026-01-01',
    lastDate: '2026-02-02',
    lastDateType: 'Confirmed',
    examDate: 'October 27, 2026',
    examDateSort: '2026-10-27',
    examDateType: 'Tentative',
    status: 'Closed',
    state: 'Uttar Pradesh',
    salaryPayScale: 'Pay Level 7 to Level 10 (₹44,900 to ₹1,77,500)',
    qualification: 'Graduate',
    qualificationText: 'Bachelor’s Degree in any discipline from a recognized University',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech', 'LLB'],
    eligibility: {
      minAge: 21,
      maxAge: 40,
      ageRelaxation: 'SC/ST/OBC of Uttar Pradesh: 5 years, Skilled Players: 5 years, PwD of UP: 15 years',
      nationality: 'Citizen of India (Domicile of UP for reservation benefits)',
      details: 'Specific qualifications apply for Deputy Collector, DSP, Sub Registrar, and ARTO posts.'
    },
    applicationFee: {
      generalOBC: '₹125 (Exam fee ₹100 + On-line processing ₹25)',
      reserved: '₹65 for SC/ST of UP, ₹25 for PwD',
      mode: 'Net Banking, Card, UPI, or E-Challan'
    },
    importantDates: [
      { label: 'Official Advertisement Issued', date: 'January 1, 2026', dateType: 'Confirmed' },
      { label: 'Online Application Closed', date: 'February 2, 2026', isDeadline: true, dateType: 'Confirmed' },
      { label: 'PCS Preliminary Examination', date: 'October 27, 2026', isExamDate: true, dateType: 'Tentative' }
    ],
    selectionProcess: [
      'Preliminary Exam (General Studies Paper I & Paper II CSAT - Qualifying 33%)',
      'Main Written Examination (General Hindi, Essay & 6 General Studies Papers)',
      'Personality Test / Viva-Voce (100 marks)'
    ],
    officialNotificationUrl: 'https://uppsc.up.nic.in',
    officialApplicationUrl: 'https://uppsc.up.nic.in',
    postsSummary: 'Deputy Collector (SDM), Deputy Superintendent of Police (DSP), Block Development Officer (BDO), Commercial Tax Officer',
    lastVerified: 'September 28, 2026'
  },
  {
    id: 'ssc-cpo-si-2026',
    title: 'SSC Sub-Inspector in Delhi Police & Central Armed Police Forces (CAPFs) 2026',
    shortName: 'SSC CPO SI 2026',
    organization: 'Staff Selection Commission (SSC)',
    category: 'Police',
    vacancies: 4187,
    vacanciesStatus: 'Tentative',
    examCycle: '2026 Recruitment Cycle',
    applicationStartDate: '2026-03-04',
    lastDate: '2026-03-28',
    lastDateType: 'Confirmed',
    examDate: 'Not announced yet (PST / PET Stage Ongoing)',
    examDateSort: '2026-11-01',
    examDateType: 'Tentative',
    status: 'Closed',
    state: 'Delhi',
    salaryPayScale: 'Pay Level 6 (₹35,400 – ₹1,12,400 per month)',
    qualification: 'Graduate',
    qualificationText: 'Bachelor’s degree from a recognized university or equivalent. Valid Driving License for Delhi Police',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech', 'BBA'],
    eligibility: {
      minAge: 20,
      maxAge: 25,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, Ex-Servicemen: 3 years',
      nationality: 'Citizen of India',
      details: 'Male candidates applying for Delhi Police SI must possess a valid driving license for LMV (Motorcycle & Car).'
    },
    applicationFee: {
      generalOBC: '₹100',
      reserved: 'Exempted for Women candidates and SC, ST, ESM candidates',
      mode: 'BHIM UPI, Net Banking, Debit/Credit Cards'
    },
    importantDates: [
      { label: 'Online Application Started', date: 'March 4, 2026', dateType: 'Confirmed' },
      { label: 'Last Date for Online Application', date: 'March 28, 2026', isDeadline: true, dateType: 'Confirmed' },
      { label: 'Paper-I Computer Based Exam', date: 'June 27 – 29, 2026 (Concluded)', dateType: 'Confirmed' },
      { label: 'Physical Standard & Endurance Test (PST/PET)', date: 'Ongoing (Check ssc.gov.in)', isExamDate: true, dateType: 'Tentative' }
    ],
    selectionProcess: [
      'Paper-I: Computer Based Examination (General Intelligence, Reasoning, GK, Quant, English)',
      'Physical Standard Test (PST) & Physical Endurance Test (PET)',
      'Paper-II: English Language & Comprehension',
      'Detailed Medical Examination (DME)'
    ],
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplicationUrl: 'https://ssc.gov.in',
    postsSummary: 'Sub-Inspector (Executive) in Delhi Police and Sub-Inspector (GD) in BSF, CISF, CRPF, ITBP, SSB',
    lastVerified: 'September 28, 2026'
  },
  {
    id: 'sbi-clerk-2026-27',
    title: 'SBI Junior Associates (Customer Support & Sales) Recruitment',
    shortName: 'SBI Clerk',
    organization: 'State Bank of India (SBI)',
    category: 'Banking',
    vacancies: 0,
    vacanciesStatus: 'To be announced',
    examCycle: '2026-27 Recruitment Cycle',
    applicationStartDate: 'Not announced yet',
    lastDate: 'Not announced yet',
    lastDateType: 'Not Announced',
    examDate: 'Information not officially announced',
    examDateType: 'Information not officially announced',
    status: 'Upcoming',
    state: 'All India',
    salaryPayScale: 'Basic pay ₹19,900 with increments (Gross starting ~₹37,000/month)',
    qualification: 'Graduate',
    qualificationText: 'Graduation in any discipline from a recognized University or equivalent',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'BBA', 'B.Tech'],
    eligibility: {
      minAge: 20,
      maxAge: 28,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwBD: 10 years',
      nationality: 'Citizen of India',
      details: 'Candidates must be proficient in reading, writing and speaking the specified opted local language of the applied state.'
    },
    applicationFee: {
      generalOBC: '₹750 (General / OBC / EWS)',
      reserved: 'NIL (SC / ST / PwBD / ESM candidates)',
      mode: 'Online Payment (Debit/Credit/Net Banking/UPI)'
    },
    importantDates: [
      { label: 'Official Notification on sbi.co.in/careers', date: 'Information not officially announced', dateType: 'Not Announced' },
      { label: 'Online Application Window', date: 'Not announced yet', dateType: 'Not Announced' },
      { label: 'Preliminary Examination', date: 'Not announced yet', isExamDate: true, dateType: 'Not Announced' }
    ],
    selectionProcess: [
      'Phase-I: Preliminary Examination (100 marks objective test - 1 hr)',
      'Phase-II: Main Examination (200 marks, 2 hours 40 minutes)',
      'Test of Specified Opted Local Language (before joining)'
    ],
    officialNotificationUrl: 'https://sbi.co.in/web/careers',
    officialApplicationUrl: 'https://sbi.co.in/web/careers/current-openings',
    postsSummary: 'Junior Associates (Customer Support & Sales) across SBI branches nationwide',
    lastVerified: 'September 28, 2026'
  },
  {
    id: 'isro-icrb-2026',
    title: 'ISRO ICRB Scientist/Engineer ‘SC’ Recruitment (BE/B.Tech)',
    shortName: 'ISRO Scientist ‘SC’',
    organization: 'Indian Space Research Organisation (ISRO / ICRB)',
    category: 'Engineering & Technical',
    vacancies: 0,
    vacanciesStatus: 'To be announced',
    examCycle: '2026-27 Recruitment Cycle',
    applicationStartDate: 'Not announced yet',
    lastDate: 'Not announced yet',
    lastDateType: 'Not Announced',
    examDate: 'Information not officially announced',
    examDateType: 'Information not officially announced',
    status: 'Upcoming',
    state: 'All India',
    salaryPayScale: 'Pay Level 10 (₹56,100 basic + DA, HRA, Transport Allowance ~₹95,000/month)',
    qualification: 'Engineering',
    qualificationText: 'BE/B.Tech or equivalent in Electronics, Mechanical or Computer Science with minimum 65% marks or 6.84 CGPA',
    degreeBranches: ['B.Tech / B.E Electronics', 'B.Tech / B.E Mechanical', 'B.Tech / B.E Computer Science'],
    eligibility: {
      minAge: 21,
      maxAge: 28,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwBD: 10 years',
      nationality: 'Citizen of India',
      details: 'First class throughout graduation with no active backlogs at the time of online application.'
    },
    applicationFee: {
      generalOBC: '₹250 + processing charge',
      reserved: 'Exempted as per ISRO norms',
      mode: 'Online Mode Only'
    },
    importantDates: [
      { label: 'Advt on isro.gov.in', date: 'Information not officially announced', dateType: 'Not Announced' },
      { label: 'Application Window', date: 'Not announced yet', dateType: 'Not Announced' },
      { label: 'Written Test (CBT)', date: 'Not announced yet', isExamDate: true, dateType: 'Not Announced' }
    ],
    selectionProcess: [
      'Written Test (Part A: Discipline Specific 80 marks, Part B: Aptitude 20 marks)',
      'Personal Interview at Bangalore/Ahmedabad/Trivandrum'
    ],
    officialNotificationUrl: 'https://www.isro.gov.in',
    officialApplicationUrl: 'https://www.isro.gov.in/Careers.html',
    postsSummary: 'Scientist / Engineer ‘SC’ in URSC Bangalore, VSSC Trivandrum, SAC Ahmedabad, SDSC Sriharikota',
    lastVerified: 'September 28, 2026'
  },
  {
    id: 'afcat-01-2027',
    title: 'Indian Air Force AFCAT (01/2027) Flying & Ground Duty Branches',
    shortName: 'AFCAT (01/2027)',
    organization: 'Indian Air Force (IAF)',
    category: 'Defence',
    vacancies: 317,
    vacanciesStatus: 'Tentative',
    examCycle: '01/2027 Commission Cycle',
    applicationStartDate: '2026-12-01',
    lastDate: '2026-12-30',
    lastDateType: 'Tentative',
    examDate: 'Not announced yet (Tentative February 2027)',
    examDateSort: '2027-02-20',
    examDateType: 'Tentative',
    status: 'Upcoming',
    state: 'All India',
    salaryPayScale: 'Flight Lieutenant Pay Level 10 (₹56,100 – ₹1,77,500 + Military Service Pay ₹15,500/m)',
    qualification: 'Graduate',
    qualificationText: 'Flying: Min 50% in Maths & Physics in 10+2 + Graduation (min 60%) or BE/B.Tech (min 60%). Ground Duty: Graduate or Post-Grad',
    degreeBranches: ['Any Graduate with PCM', 'B.Tech / B.E', 'B.Com for Accounts', 'MBA/Post Graduate for Admin'],
    eligibility: {
      minAge: 20,
      maxAge: 26,
      ageRelaxation: 'Flying Branch: 20 to 24 yrs (26 yrs with valid CPL). Ground Duty: 20 to 26 yrs',
      nationality: 'Citizen of India (Unmarried Men & Women)',
      details: 'Strict anthropometric and medical fitness standards as prescribed by IAF Medical Board.'
    },
    applicationFee: {
      generalOBC: '₹550 + GST for AFCAT entry',
      reserved: '₹550 for all candidates (No fee for NCC Special Entry)',
      mode: 'Online Gateway (Debit, Credit, Netbanking, UPI)'
    },
    importantDates: [
      { label: 'Official Notification Expected', date: 'Late November / December 2026', dateType: 'Tentative' },
      { label: 'Online Registration Commences', date: 'December 1, 2026', dateType: 'Tentative' },
      { label: 'Application Deadline', date: 'December 30, 2026', isDeadline: true, dateType: 'Tentative' },
      { label: 'AFCAT Online Examination', date: 'Not announced yet (Tentative February 2027)', isExamDate: true, dateType: 'Tentative' }
    ],
    selectionProcess: [
      'Online AFCAT Examination (General Awareness, Verbal Ability, Numerical Ability, Reasoning)',
      'Air Force Selection Board (AFSB) Interview (Stage-I & Stage-II Tests)',
      'Computerised Pilot Selection System (CPSS) for Flying branch',
      'Medical Board at IAF Medical Centres'
    ],
    officialNotificationUrl: 'https://afcat.cdac.in',
    officialApplicationUrl: 'https://afcat.cdac.in',
    postsSummary: 'Commissioned Officers in Flying Branch and Ground Duty (Technical & Non-Technical)',
    lastVerified: 'September 28, 2026'
  },
  {
    id: 'rrb-ntpc-historical',
    title: 'RRB Non-Technical Popular Categories (NTPC) CEN 05/2024 & CEN 06/2024',
    shortName: 'RRB NTPC (CEN 05/2024)',
    organization: 'Railway Recruitment Boards (RRB)',
    category: 'Railways',
    vacancies: 11558,
    vacanciesStatus: 'Confirmed',
    examCycle: 'Historical (CEN 05/2024 & 06/2024 Concluded)',
    isHistorical: true,
    applicationStartDate: '2024-09-14',
    lastDate: '2024-10-20',
    lastDateType: 'Confirmed',
    examDate: 'CBT stages concluded (Final Results Declared)',
    examDateType: 'Confirmed',
    status: 'Closed',
    state: 'All India',
    salaryPayScale: 'Level 2 to Level 6 in 7th CPC (₹19,900 to ₹35,400 basic + allowances)',
    qualification: 'Graduate',
    qualificationText: 'Graduate Posts: Any recognized Bachelor’s Degree. Undergraduate Posts: 12th (+2 Stage) with minimum 50% marks',
    degreeBranches: ['12th Pass', 'Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech'],
    eligibility: {
      minAge: 18,
      maxAge: 33,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwBD: 10 years',
      nationality: 'Citizen of India',
      details: 'Historical exam cycle. For upcoming RRB recruitments, refer to official announcements on rrbapply.gov.in.'
    },
    applicationFee: {
      generalOBC: '₹500 (₹400 refunded after appearing in CBT-1)',
      reserved: '₹250 (Full ₹250 refunded on CBT attendance)',
      mode: 'Online Mode Only'
    },
    importantDates: [
      { label: 'CEN 05/2024 & 06/2024 Notification Release', date: 'September 2024', dateType: 'Confirmed' },
      { label: 'Application Registration Closed', date: 'October 20, 2024', isDeadline: true, dateType: 'Confirmed' },
      { label: '1st Stage CBT (Computer Based Test)', date: 'Concluded in 2025', dateType: 'Confirmed' },
      { label: 'Final Results Declared', date: 'May 2026', dateType: 'Confirmed' }
    ],
    selectionProcess: [
      '1st Stage Computer Based Test (CBT-1) Common for all posts',
      '2nd Stage CBT (CBT-2) separate for Level 2, 3, 5 and 6',
      'Typing Skill Test / CBAT Aptitude Test',
      'Document Verification and Medical Examination'
    ],
    officialNotificationUrl: 'https://rrbapply.gov.in',
    officialApplicationUrl: 'https://rrbapply.gov.in',
    postsSummary: 'Station Master, Goods Train Manager, Chief Commercial Ticket Supervisor, Junior Clerk (Concluded Cycle)',
    lastVerified: 'September 28, 2026'
  }
];
