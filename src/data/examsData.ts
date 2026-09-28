import { ExamCategory, ExamNotification } from '../types/exam';

export const CATEGORIES_LIST: { name: ExamCategory; count?: number; icon: string; description: string }[] = [
  { name: 'SSC', icon: 'FileCheck2', description: 'Combined Graduate & Higher Secondary Exams' },
  { name: 'UPSC', icon: 'Landmark', description: 'Civil Services, NDA, CDS & Engineering' },
  { name: 'Banking', icon: 'Building2', description: 'IBPS, SBI, RBI, NABARD & RRBs' },
  { name: 'Railways', icon: 'Train', description: 'RRB NTPC, ALP, Group D & Technicians' },
  { name: 'Defence', icon: 'Shield', description: 'Army, Navy, Air Force, AFCAT & Coast Guard' },
  { name: 'State PSC', icon: 'MapPin', description: 'UPPSC, BPSC, MPSC, KPSC & State Services' },
  { name: 'Police', icon: 'BadgePercent', description: 'State Police, SI, Constables & Paramilitary' },
  { name: 'Teaching', icon: 'GraduationCap', description: 'CTET, KVS, NVS, UGC-NET & State TET' },
  { name: 'Engineering & Technical', icon: 'Cpu', description: 'ISRO, DRDO, BARC, GATE PSU & ESE' },
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
    id: 'ssc-cgl-2026',
    title: 'SSC Combined Graduate Level (CGL) Examination 2026',
    shortName: 'SSC CGL 2026',
    organization: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    vacancies: 17727,
    applicationStartDate: '2026-09-01',
    lastDate: '2026-10-05',
    examDate: 'December 10 – 22, 2026',
    examDateSort: '2026-12-10',
    status: 'Closing Soon',
    state: 'All India',
    salaryPayScale: 'Pay Level 4 to 8 (₹25,500 – ₹1,51,100 per month)',
    qualification: 'Graduate',
    qualificationText: 'Bachelor’s Degree in any discipline from a recognized University',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech', 'BBA', 'BCA'],
    eligibility: {
      minAge: 18,
      maxAge: 32,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwD: 10 years, Ex-Servicemen: 3 years',
      nationality: 'Citizen of India, Subject of Nepal/Bhutan',
      details: 'Must hold a recognized Bachelor’s degree on or before the crucial date. Final year students with results declared by deadline are eligible.'
    },
    applicationFee: {
      generalOBC: '₹100',
      reserved: 'Exempted (NIL for SC / ST / PwD / Female candidates)',
      mode: 'Online (BHIM UPI, Net Banking, Debit/Credit Cards)'
    },
    importantDates: [
      { label: 'Notification Release', date: 'September 1, 2026' },
      { label: 'Online Application Opens', date: 'September 1, 2026' },
      { label: 'Last Date to Apply', date: 'October 5, 2026', isDeadline: true },
      { label: 'Last Date for Online Fee', date: 'October 6, 2026' },
      { label: 'Application Correction Window', date: 'October 10 – 12, 2026' },
      { label: 'Tier-I Computer Based Exam', date: 'December 10 – 22, 2026', isExamDate: true },
      { label: 'Tier-II Exam Date', date: 'February 2027' }
    ],
    selectionProcess: [
      'Tier-I: Computer Based Examination (Objective Multiple Choice - Qualifying)',
      'Tier-II: Paper-I (Compulsory for all posts) + Module II (Data Entry Speed Test)',
      'Document Verification & Medical Fitness Verification by Indenting User Departments'
    ],
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplicationUrl: 'https://ssc.gov.in/login',
    postsSummary: 'Assistant Section Officer (CSS, IB, MEA), Inspector of Central Excise, Income Tax Inspector, Sub-Inspector (CBI, NIA), Auditor, Tax Assistant',
    isFeatured: true
  },
  {
    id: 'upsc-cse-2026',
    title: 'UPSC Civil Services (Preliminary) Examination 2026',
    shortName: 'UPSC CSE 2026',
    organization: 'Union Public Service Commission (UPSC)',
    category: 'UPSC',
    vacancies: 1056,
    applicationStartDate: '2026-09-15',
    lastDate: '2026-10-18',
    examDate: 'May 24, 2027',
    examDateSort: '2027-05-24',
    status: 'Applications Open',
    state: 'All India',
    salaryPayScale: 'Pay Level 10 (₹56,100 initial basic pay with DA, HRA + perks)',
    qualification: 'Graduate',
    qualificationText: 'Bachelor’s degree from any recognized Central/State/Deemed University',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech', 'MBBS', 'LLB'],
    eligibility: {
      minAge: 21,
      maxAge: 32,
      ageRelaxation: 'OBC: 3 years (9 attempts), SC/ST: 5 years (unlimited attempts), PwD: 10 years',
      nationality: 'Indian Citizen for IAS & IPS; Indian/Nepal/Bhutan for other group services',
      details: 'Candidates appearing in final degree examination can apply provisionally for Prelims.'
    },
    applicationFee: {
      generalOBC: '₹100 (Male Gen/OBC/EWS)',
      reserved: 'Exempted (Female, SC, ST, PwD)',
      mode: 'Online via SBI Net Banking, UPI, Cards, or SBI Branch Challan'
    },
    importantDates: [
      { label: 'Notification Issued', date: 'September 15, 2026' },
      { label: 'Application Start Date', date: 'September 15, 2026' },
      { label: 'Registration Last Date', date: 'October 18, 2026', isDeadline: true },
      { label: 'OTR Correction Window', date: 'October 19 – 25, 2026' },
      { label: 'Prelims Admit Card', date: 'May 5, 2027' },
      { label: 'Civil Services Prelims Exam', date: 'May 24, 2027', isExamDate: true },
      { label: 'CSE Mains Examination', date: 'September 2027' }
    ],
    selectionProcess: [
      'Preliminary Examination (GS Paper I & CSAT Paper II - Qualifying 33%)',
      'Civil Services Mains Written Examination (9 Descriptive Papers)',
      'Personality Test / Interview at Dholpur House, New Delhi'
    ],
    officialNotificationUrl: 'https://upsc.gov.in',
    officialApplicationUrl: 'https://upsconline.nic.in',
    postsSummary: 'IAS (Indian Administrative Service), IPS (Indian Police Service), IFS (Foreign Service), IRS (Revenue Service) and Group A/B Services',
    isFeatured: true
  },
  {
    id: 'ibps-po-xiv-2026',
    title: 'IBPS Probationary Officers / Management Trainees (CRP PO/MT-XIV)',
    shortName: 'IBPS PO XIV',
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    category: 'Banking',
    vacancies: 4455,
    applicationStartDate: '2026-08-25',
    lastDate: '2026-10-02',
    examDate: 'October 19 & 20, 2026',
    examDateSort: '2026-10-19',
    status: 'Closing Soon',
    state: 'All India',
    salaryPayScale: 'Basic pay ₹36,000 + allowances (Gross ~₹57,000 – ₹62,000/month)',
    qualification: 'Graduate',
    qualificationText: 'A Degree (Graduation) in any discipline from a recognized University',
    degreeBranches: ['Any Graduate', 'B.Com', 'BA', 'B.Sc', 'B.Tech', 'BBA'],
    eligibility: {
      minAge: 20,
      maxAge: 30,
      ageRelaxation: 'OBC (Non-Creamy): 3 years, SC/ST: 5 years, PwD: 10 years',
      nationality: 'Citizen of India',
      details: 'Operating and working knowledge in computer systems is mandatory (Certificate/Diploma or studied Computer/IT in High School/College).'
    },
    applicationFee: {
      generalOBC: '₹850 (Inclusive of GST)',
      reserved: '₹175 for SC/ST/PwBD candidates',
      mode: 'Online Payment Gateway (Debit/Credit, Internet Banking, IMPS, Cash Cards)'
    },
    importantDates: [
      { label: 'Online Registration Opens', date: 'August 25, 2026' },
      { label: 'Closure of Registrations', date: 'October 2, 2026', isDeadline: true },
      { label: 'Online Preliminary Exam', date: 'October 19 & 20, 2026', isExamDate: true },
      { label: 'Declaration of Prelims Result', date: 'November 2026' },
      { label: 'Online Main Examination', date: 'November 30, 2026' },
      { label: 'Provisional Allotment', date: 'April 2027' }
    ],
    selectionProcess: [
      'Phase I: Online Preliminary Examination (English, Quant, Reasoning - 100 marks)',
      'Phase II: Online Main Examination (Objective + Descriptive English Writing)',
      'Phase III: Common Interview conducted by Participating Public Sector Banks'
    ],
    officialNotificationUrl: 'https://ibps.in',
    officialApplicationUrl: 'https://ibps.in/crp-po-mt-xiv',
    postsSummary: 'Probationary Officers across Bank of Baroda, Canara Bank, PNB, Union Bank, Indian Bank, etc.',
    isFeatured: true
  },
  {
    id: 'sbi-clerk-2026',
    title: 'SBI Junior Associates (Customer Support & Sales) Recruitment 2026',
    shortName: 'SBI Clerk 2026',
    organization: 'State Bank of India (SBI)',
    category: 'Banking',
    vacancies: 8283,
    applicationStartDate: '2026-09-20',
    lastDate: '2026-10-25',
    examDate: 'January 2027',
    examDateSort: '2027-01-10',
    status: 'Applications Open',
    state: 'All India',
    salaryPayScale: 'Basic pay ₹19,900 with increments (Gross starting ~₹37,000/month)',
    qualification: 'Graduate',
    qualificationText: 'Graduation in any discipline from a recognized University or equivalent',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'BBA', 'B.Tech'],
    eligibility: {
      minAge: 20,
      maxAge: 28,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwD (Gen/EWS): 10 years, PwD (SC/ST): 15 years',
      nationality: 'Citizen of India',
      details: 'Candidates must be proficient in the specified opted local language of the applied state.'
    },
    applicationFee: {
      generalOBC: '₹750 (General / OBC / EWS)',
      reserved: 'NIL (SC / ST / PwBD / ESM / DESM candidates)',
      mode: 'Online Payment (Debit/Credit/Net Banking/UPI)'
    },
    importantDates: [
      { label: 'Notification Out', date: 'September 18, 2026' },
      { label: 'Online Application Window', date: 'September 20 – October 25, 2026' },
      { label: 'Last Date to Apply', date: 'October 25, 2026', isDeadline: true },
      { label: 'Preliminary Exam', date: 'January 2027', isExamDate: true },
      { label: 'Main Examination', date: 'March 2027' }
    ],
    selectionProcess: [
      'Phase-I: Preliminary Examination (100 marks objective test - 1 hr)',
      'Phase-II: Main Examination (200 marks, 2 hours 40 minutes)',
      'Test of Specified Opted Local Language (before joining)'
    ],
    officialNotificationUrl: 'https://sbi.co.in/careers',
    officialApplicationUrl: 'https://sbi.co.in/web/careers/current-openings',
    postsSummary: 'Junior Associates (Customer Support & Sales) across SBI branches across all Indian States',
    isFeatured: true
  },
  {
    id: 'rrb-ntpc-2026',
    title: 'RRB Non-Technical Popular Categories (NTPC) Graduate & Undergraduate Posts',
    shortName: 'RRB NTPC 2026',
    organization: 'Railway Recruitment Boards (RRB)',
    category: 'Railways',
    vacancies: 11558,
    applicationStartDate: '2026-09-14',
    lastDate: '2026-10-20',
    examDate: 'December 2026 – January 2027',
    examDateSort: '2026-12-15',
    status: 'Applications Open',
    state: 'All India',
    salaryPayScale: 'Level 2 to Level 6 (₹19,900 to ₹35,400 basic + Railway perks)',
    qualification: 'Graduate',
    qualificationText: 'Graduate posts: Any Degree. Undergraduate posts: 12th (+2 Stage) pass with 50% marks',
    degreeBranches: ['12th Pass', 'Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech'],
    eligibility: {
      minAge: 18,
      maxAge: 33,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwBD: 10 years, 3 years general Covid age concession included',
      nationality: 'Citizen of India',
      details: 'Physical standards & visual acuity (A-2, A-3, B-2) mandatory according to post specifications.'
    },
    applicationFee: {
      generalOBC: '₹500 (₹400 refunded after appearing in 1st Stage CBT)',
      reserved: '₹250 for SC/ST/Ex-SM/PwBD/Female/EBC (Full ₹250 refunded upon CBT attendance)',
      mode: 'Internet Banking, Debit/Credit Card, UPI'
    },
    importantDates: [
      { label: 'Application Start Date', date: 'September 14, 2026' },
      { label: 'Closing Date of Online Submissions', date: 'October 20, 2026', isDeadline: true },
      { label: 'Fee Payment Deadline', date: 'October 21, 2026' },
      { label: 'Application Modification Window', date: 'October 22 – 31, 2026' },
      { label: '1st Stage CBT Exam', date: 'December 2026 – January 2027', isExamDate: true }
    ],
    selectionProcess: [
      '1st Stage Computer Based Test (CBT-1) Common for all posts',
      '2nd Stage CBT (CBT-2) separate for each 7th CPC level',
      'Typing Skill Test / Computer Based Aptitude Test (CBAT) for Traffic Assistant & Station Master',
      'Document Verification & Medical Examination'
    ],
    officialNotificationUrl: 'https://rrbcdg.gov.in',
    officialApplicationUrl: 'https://rrbapply.gov.in',
    postsSummary: 'Station Master, Goods Train Manager, Chief Commercial cum Ticket Supervisor, Junior Clerk cum Typist, Accounts Clerk',
    isFeatured: true
  },
  {
    id: 'rrb-alp-2026',
    title: 'RRB Assistant Loco Pilot (ALP) CEN 01/2026 Recruitment',
    shortName: 'RRB ALP 2026',
    organization: 'Railway Recruitment Boards (RRB)',
    category: 'Engineering & Technical',
    vacancies: 18799,
    applicationStartDate: '2026-08-10',
    lastDate: '2026-09-30',
    examDate: 'November 25 – 29, 2026',
    examDateSort: '2026-11-25',
    status: 'Closing Soon',
    state: 'All India',
    salaryPayScale: 'Level 2 in 7th CPC (Basic ₹19,900 + Running Allowance & Railway Benefits)',
    qualification: 'Diploma',
    qualificationText: 'Matriculation / 10th plus ITI from recognized NCVT/SCVT or 3-year Diploma/Degree in Mechanical, Electrical, Electronics or Auto Engineering',
    degreeBranches: ['ITI', 'Diploma in Mechanical', 'Diploma in Electrical', 'Diploma in Electronics', 'B.Tech / B.E'],
    eligibility: {
      minAge: 18,
      maxAge: 33,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, Ex-Servicemen: up to 8 years',
      nationality: 'Citizen of India',
      details: 'Strict Medical Standard A-1 required: Distance Vision 6/6, 6/6 without glasses, fogging test passing, normal colour vision.'
    },
    applicationFee: {
      generalOBC: '₹500 (₹400 refundable after CBT-1 attendance)',
      reserved: '₹250 (Full ₹250 refundable for SC/ST/Ex-SM/Female/Transgender/Minority/EBC)',
      mode: 'Online Mode Only (UPI, Netbanking, Cards)'
    },
    importantDates: [
      { label: 'Application Started', date: 'August 10, 2026' },
      { label: 'Online Application Last Date', date: 'September 30, 2026', isDeadline: true },
      { label: 'CBT 1 Exam Window', date: 'November 25 – 29, 2026', isExamDate: true },
      { label: 'CBT 2 Exam Window', date: 'January 2027' },
      { label: 'CBAT (Aptitude Test)', date: 'March 2027' }
    ],
    selectionProcess: [
      'CBT 1 (Screening Test - 75 questions in 60 minutes)',
      'CBT 2 (Part A: 100 questions, Part B: Trade Syllabus 75 questions)',
      'Computer-Based Aptitude Test (CBAT) - No negative marking',
      'Document Verification and A-1 Medical Standard Test'
    ],
    officialNotificationUrl: 'https://rrbcdg.gov.in',
    officialApplicationUrl: 'https://rrbapply.gov.in',
    postsSummary: 'Assistant Loco Pilot in Indian Railways across all Zonal Divisions (Northern, Western, Southern, Eastern, Central)',
    isFeatured: true
  },
  {
    id: 'ssc-gd-constable-2026',
    title: 'SSC Constable (GD) in Central Armed Police Forces (CAPFs), SSF & Rifleman',
    shortName: 'SSC GD Constable 2026',
    organization: 'Staff Selection Commission (SSC) & MHA',
    category: 'Police',
    vacancies: 39481,
    applicationStartDate: '2026-09-05',
    lastDate: '2026-10-14',
    examDate: 'January – February 2027',
    examDateSort: '2027-01-20',
    status: 'Applications Open',
    state: 'All India',
    salaryPayScale: 'Pay Level 3 (₹21,700 – ₹69,100 per month)',
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
      generalOBC: '₹100',
      reserved: 'Exempted (Women candidates, SC, ST, and Ex-Servicemen)',
      mode: 'Online (UPI, Net Banking, Visa, Mastercard, RuPay Cards)'
    },
    importantDates: [
      { label: 'Notification Date', date: 'September 5, 2026' },
      { label: 'Registration Open', date: 'September 5, 2026' },
      { label: 'Online Application Ends', date: 'October 14, 2026', isDeadline: true },
      { label: 'Correction Window', date: 'October 18 – 20, 2026' },
      { label: 'Computer Based Exam (CBE)', date: 'January – February 2027', isExamDate: true }
    ],
    selectionProcess: [
      'Computer Based Examination (CBE) in 13 regional languages + Hindi & English',
      'Physical Standard Test (PST) & Physical Efficiency Test (PET: 5 km in 24 min)',
      'Detailed Medical Examination (DME) and Review Medical Examination (RME)',
      'Document Verification'
    ],
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplicationUrl: 'https://ssc.gov.in',
    postsSummary: 'Constable (GD) in BSF, CISF, CRPF, SSB, ITBP, AR, and SSF',
    isFeatured: true
  },
  {
    id: 'ssc-chsl-2026',
    title: 'SSC Combined Higher Secondary (10+2) Level Examination 2026',
    shortName: 'SSC CHSL 2026',
    organization: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    vacancies: 3712,
    applicationStartDate: '2026-08-01',
    lastDate: '2026-09-15',
    examDate: 'November 18 – 28, 2026',
    examDateSort: '2026-11-18',
    status: 'Closed',
    state: 'All India',
    salaryPayScale: 'Pay Level 2 (₹19,900 – ₹63,200) & Pay Level 4 (₹25,500 – ₹81,100)',
    qualification: '12th',
    qualificationText: 'Must have passed 12th Standard or equivalent exam from a recognized Board',
    degreeBranches: ['12th Pass Science', '12th Pass Arts', '12th Pass Commerce'],
    eligibility: {
      minAge: 18,
      maxAge: 27,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwD: 10 years',
      nationality: 'Citizen of India',
      details: 'For Data Entry Operator (DEO) in CAG/Ministries: 12th Standard in Science stream with Mathematics.'
    },
    applicationFee: {
      generalOBC: '₹100',
      reserved: 'Exempted (Women, SC, ST, PwD, ESM)',
      mode: 'Online (UPI, Net Banking, Cards)'
    },
    importantDates: [
      { label: 'Notification Released', date: 'August 1, 2026' },
      { label: 'Registration Closed', date: 'September 15, 2026', isDeadline: true },
      { label: 'Tier-I Exam Dates', date: 'November 18 – 28, 2026', isExamDate: true },
      { label: 'Tier-II Exam Date', date: 'February 2027' }
    ],
    selectionProcess: [
      'Tier-I (Computer Based Examination - Objective)',
      'Tier-II (Session I: Mathematical, Reasoning, English, General Awareness + Session II: Skill/Typing Test)',
      'Document Verification'
    ],
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplicationUrl: 'https://ssc.gov.in',
    postsSummary: 'Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO)'
  },
  {
    id: 'upsc-nda-na-2026',
    title: 'National Defence Academy & Naval Academy Examination (I) 2026',
    shortName: 'UPSC NDA & NA 2026',
    organization: 'Union Public Service Commission (UPSC)',
    category: 'Defence',
    vacancies: 400,
    applicationStartDate: '2026-10-01',
    lastDate: '2026-11-05',
    examDate: 'April 18, 2027',
    examDateSort: '2027-04-18',
    status: 'Upcoming',
    state: 'All India',
    salaryPayScale: 'Cadet stipend ₹56,100 during training; Lieutenant basic pay on commissioning',
    qualification: '12th',
    qualificationText: '12th Class pass of the 10+2 pattern (With Physics, Chem, Math for Air Force & Navy)',
    degreeBranches: ['12th Pass PCM', '12th Pass Any Stream (Army wing)'],
    eligibility: {
      minAge: 16.5,
      maxAge: 19.5,
      ageRelaxation: 'No category age relaxation applies for NDA cadets',
      nationality: 'Unmarried Indian male and female candidates',
      details: 'Candidates appearing in 12th standard exam are eligible to apply provisionally.'
    },
    applicationFee: {
      generalOBC: '₹100 (Male Gen/OBC)',
      reserved: 'NIL (SC/ST candidates and all female applicants exempted)',
      mode: 'Online Mode or SBI Challan'
    },
    importantDates: [
      { label: 'Official Notification Date', date: 'October 1, 2026' },
      { label: 'Online Registration Window', date: 'October 1 – November 5, 2026' },
      { label: 'Application Deadline', date: 'November 5, 2026', isDeadline: true },
      { label: 'Written Examination', date: 'April 18, 2027', isExamDate: true },
      { label: 'SSB Interviews', date: 'July – September 2027' }
    ],
    selectionProcess: [
      'UPSC Written Examination (Mathematics: 300 marks, GAT: 600 marks)',
      'SSB Interview (5-day psychological, ground tasks, group discussions and personal interview)',
      'Complete Military Medical Board Examination'
    ],
    officialNotificationUrl: 'https://upsc.gov.in',
    officialApplicationUrl: 'https://upsconline.nic.in',
    postsSummary: 'Officer Cadets in Army (208), Navy (42), Air Force (120) and Naval Academy 10+2 Cadet Entry (30)'
  },
  {
    id: 'upsc-cds-ii-2026',
    title: 'Combined Defence Services (CDS) Examination (II) 2026',
    shortName: 'UPSC CDS II 2026',
    organization: 'Union Public Service Commission (UPSC)',
    category: 'Defence',
    vacancies: 459,
    applicationStartDate: '2026-08-20',
    lastDate: '2026-09-29',
    examDate: 'November 8, 2026',
    examDateSort: '2026-11-08',
    status: 'Closing Soon',
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
      { label: 'Notification Released', date: 'August 20, 2026' },
      { label: 'Last Date to Apply', date: 'September 29, 2026', isDeadline: true },
      { label: 'E-Admit Card Out', date: 'October 25, 2026' },
      { label: 'Written Examination', date: 'November 8, 2026', isExamDate: true },
      { label: 'SSB Interview Call Letters', date: 'January 2027' }
    ],
    selectionProcess: [
      'Written Examination (English, General Knowledge, Elementary Mathematics)',
      'SSB Interview for Intelligence and Personality Test (Stage I & Stage II)',
      'Medical Examination at Service Selection Board Hospitals'
    ],
    officialNotificationUrl: 'https://upsc.gov.in',
    officialApplicationUrl: 'https://upsconline.nic.in',
    postsSummary: 'Permanent/Short Service Commission in Indian Military Academy (IMA), Naval Academy, Air Force Academy & OTA'
  },
  {
    id: 'ctet-dec-2026',
    title: 'Central Teacher Eligibility Test (CTET) December 2026',
    shortName: 'CTET Dec 2026',
    organization: 'Central Board of Secondary Education (CBSE)',
    category: 'Teaching',
    vacancies: 120000,
    applicationStartDate: '2026-09-10',
    lastDate: '2026-10-16',
    examDate: 'December 14, 2026',
    examDateSort: '2026-12-14',
    status: 'Applications Open',
    state: 'All India',
    salaryPayScale: 'Eligibility Certificate valid for lifetime across KVS, NVS, Central Schools & State schools',
    qualification: 'B.Ed',
    qualificationText: 'Paper I (Primary): Senior Secondary + 2-yr D.El.Ed / Paper II (Elementary): Graduation + B.Ed or D.El.Ed',
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
      { label: 'Online Application Begins', date: 'September 10, 2026' },
      { label: 'Last Date for Registration', date: 'October 16, 2026', isDeadline: true },
      { label: 'Fee Verification Last Date', date: 'October 17, 2026' },
      { label: 'Correction in Particulars', date: 'October 21 – 25, 2026' },
      { label: 'Date of Examination', date: 'December 14, 2026', isExamDate: true }
    ],
    selectionProcess: [
      'Paper I for teaching Classes I to V (Child Development, Language I & II, Maths, Environmental Studies)',
      'Paper II for teaching Classes VI to VIII (Child Development, Language I & II, Maths & Science or Social Studies)',
      'Issuance of DigiLocker Digital Marksheet & Lifetime Certificate'
    ],
    officialNotificationUrl: 'https://ctet.nic.in',
    officialApplicationUrl: 'https://ctet.nic.in',
    postsSummary: 'National qualification benchmark for recruitment in KVS, NVS, Army Public Schools, and CBSE-affiliated institutions'
  },
  {
    id: 'kvs-teaching-2026',
    title: 'KVS PGT, TGT & PRT Direct Recruitment Examination 2026',
    shortName: 'KVS Recruitment 2026',
    organization: 'Kendriya Vidyalaya Sangathan (KVS)',
    category: 'Teaching',
    vacancies: 6414,
    applicationStartDate: '2026-10-15',
    lastDate: '2026-11-20',
    examDate: 'February 2027',
    examDateSort: '2027-02-15',
    status: 'Upcoming',
    state: 'All India',
    salaryPayScale: 'PRT: Level 6 (₹35,400), TGT: Level 7 (₹44,900), PGT: Level 8 (₹47,600) + allowances',
    qualification: 'B.Ed',
    qualificationText: 'PRT: 12th + D.El.Ed + CTET Paper I. TGT: Bachelor Degree + B.Ed + CTET Paper II. PGT: Master Degree + B.Ed',
    degreeBranches: ['B.Ed', 'Post Graduate in Subject', 'D.El.Ed', 'Master of Science/Arts'],
    eligibility: {
      minAge: 18,
      maxAge: 40,
      ageRelaxation: 'Women (all categories) up to 10 years relaxation for Teaching posts, SC/ST: 5 years, OBC: 3 years',
      nationality: 'Citizen of India',
      details: 'Competence to teach through Hindi & English medium is essential.'
    },
    applicationFee: {
      generalOBC: '₹1,500 (PGT/TGT/PRT)',
      reserved: 'NIL for SC / ST / PwD / Ex-Servicemen',
      mode: 'Online Mode Only'
    },
    importantDates: [
      { label: 'Detailed Advertisement', date: 'October 15, 2026' },
      { label: 'Application Window Opens', date: 'October 15, 2026' },
      { label: 'Closing Date to Apply', date: 'November 20, 2026', isDeadline: true },
      { label: 'Computer Based Test', date: 'February 2027', isExamDate: true }
    ],
    selectionProcess: [
      'Computer Based Test (CBT - 180 questions)',
      'Professional Competency Test (Demo Teaching: 30 marks & Interview: 30 marks)',
      'Final Merit List (70:30 weightage between CBT and Demo/Interview)'
    ],
    officialNotificationUrl: 'https://kvsangathan.nic.in',
    officialApplicationUrl: 'https://kvsangathan.nic.in/employment-notice',
    postsSummary: 'Post Graduate Teachers (PGT), Trained Graduate Teachers (TGT), and Primary Teachers (PRT) in Kendriya Vidyalayas'
  },
  {
    id: 'uppsc-pcs-2026',
    title: 'UPPSC Combined State / Upper Subordinate Services (PCS) Exam 2026',
    shortName: 'UPPSC PCS 2026',
    organization: 'Uttar Pradesh Public Service Commission (UPPSC)',
    category: 'State PSC',
    vacancies: 220,
    applicationStartDate: '2026-09-08',
    lastDate: '2026-10-09',
    examDate: 'December 22, 2026',
    examDateSort: '2026-12-22',
    status: 'Applications Open',
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
      { label: 'Notification Released', date: 'September 8, 2026' },
      { label: 'Online Application Begins', date: 'September 8, 2026' },
      { label: 'Last Date for Online Fee', date: 'October 6, 2026' },
      { label: 'Last Date for Online Form', date: 'October 9, 2026', isDeadline: true },
      { label: 'PCS Preliminary Examination', date: 'December 22, 2026', isExamDate: true }
    ],
    selectionProcess: [
      'Preliminary Exam (General Studies Paper I & Paper II CSAT)',
      'Main Written Examination (General Hindi, Essay & 6 General Studies Papers)',
      'Personality Test / Viva-Voce (100 marks)'
    ],
    officialNotificationUrl: 'https://uppsc.up.nic.in',
    officialApplicationUrl: 'https://uppsc.up.nic.in',
    postsSummary: 'Deputy Collector (SDM), Deputy Superintendent of Police (DSP), Block Development Officer (BDO), Commercial Tax Officer',
    isFeatured: true
  },
  {
    id: 'bpsc-70th-cce-2026',
    title: 'BPSC 70th Integrated Combined (Preliminary) Competitive Examination',
    shortName: 'BPSC 70th CCE',
    organization: 'Bihar Public Service Commission (BPSC)',
    category: 'State PSC',
    vacancies: 1957,
    applicationStartDate: '2026-09-02',
    lastDate: '2026-10-18',
    examDate: 'December 13, 2026',
    examDateSort: '2026-12-13',
    status: 'Applications Open',
    state: 'Bihar',
    salaryPayScale: 'Pay Level 7 to Level 9 in 7th Pay Matrix (₹44,900 – ₹1,67,800)',
    qualification: 'Graduate',
    qualificationText: 'Graduation or equivalent degree from a recognized University',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech', 'BBA'],
    eligibility: {
      minAge: 20,
      maxAge: 37,
      ageRelaxation: 'BC/EBC (Male & Female) & Gen Female: 40 years; SC/ST (Male & Female): 42 years',
      nationality: 'Citizen of India',
      details: 'Negative marking of 1/3rd (0.33) in the Preliminary Examination.'
    },
    applicationFee: {
      generalOBC: '₹600 for General & Candidates of other states',
      reserved: '₹150 for SC/ST of Bihar, Permanent Resident Females of Bihar & PwD',
      mode: 'Online Mode through BPSC Portal'
    },
    importantDates: [
      { label: 'Official Notification Out', date: 'September 2, 2026' },
      { label: 'Application Link Active', date: 'September 2, 2026' },
      { label: 'Closing Date to Apply', date: 'October 18, 2026', isDeadline: true },
      { label: '70th CCE Prelims Exam', date: 'December 13, 2026', isExamDate: true },
      { label: 'Mains Written Exam', date: 'April 2027' }
    ],
    selectionProcess: [
      'Preliminary Examination (150 Objective Questions, 2 Hours, Negative Marking 1/3rd)',
      'Main Written Examination (General Hindi, GS Paper I, GS Paper II, Essay & Optional)',
      'Interview (120 marks)'
    ],
    officialNotificationUrl: 'https://bpsc.bih.nic.in',
    officialApplicationUrl: 'https://onlinebpsc.bihar.gov.in',
    postsSummary: 'Sub-Divisional Officer (SDO), DSP, District Commandant, Assistant Commissioner of State Taxes, Revenue Officer'
  },
  {
    id: 'mpsc-state-services-2026',
    title: 'MPSC Maharashtra State Services (Rajyaseva) Examination 2026',
    shortName: 'MPSC Rajyaseva 2026',
    organization: 'Maharashtra Public Service Commission (MPSC)',
    category: 'State PSC',
    vacancies: 524,
    applicationStartDate: '2026-08-15',
    lastDate: '2026-09-25',
    examDate: 'December 1, 2026',
    examDateSort: '2026-12-01',
    status: 'Closed',
    state: 'Maharashtra',
    salaryPayScale: 'Group A: S-20 (₹56,100 – ₹1,77,500), Group B: S-15 (₹41,800 – ₹1,32,300)',
    qualification: 'Graduate',
    qualificationText: 'Degree in any discipline from a recognized statutory University; Marathi knowledge compulsory',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech'],
    eligibility: {
      minAge: 19,
      maxAge: 38,
      ageRelaxation: 'Reserved Categories: 43 years, PwD: 45 years',
      nationality: 'Citizen of India with Maharashtra domicile for reservations',
      details: 'Descriptive Mains pattern in alignment with UPSC Civil Services Examination.'
    },
    applicationFee: {
      generalOBC: '₹394 (Open category)',
      reserved: '₹294 (Backward classes / EWS / Orphan)',
      mode: 'Online Payment Gateway'
    },
    importantDates: [
      { label: 'Notification Published', date: 'August 15, 2026' },
      { label: 'Registration Deadline', date: 'September 25, 2026', isDeadline: true },
      { label: 'State Services Prelims', date: 'December 1, 2026', isExamDate: true },
      { label: 'Mains Examination', date: 'May 2027' }
    ],
    selectionProcess: [
      'Preliminary Examination (Paper 1 GS & Paper 2 CSAT - Qualifying)',
      'Mains Written Examination (Conventional descriptive papers - 1750 marks)',
      'Personality Interview (275 marks)'
    ],
    officialNotificationUrl: 'https://mpsc.gov.in',
    officialApplicationUrl: 'https://mpsconline.gov.in',
    postsSummary: 'Deputy Collector, Deputy SP, Assistant Commissioner of Sales Tax, Deputy Registrar of Cooperative Societies'
  },
  {
    id: 'isro-scientist-2026',
    title: 'ISRO ICRB Scientist/Engineer ‘SC’ Recruitment (BE/B.Tech)',
    shortName: 'ISRO Scientist ‘SC’',
    organization: 'Indian Space Research Organisation (ISRO / ICRB)',
    category: 'Engineering & Technical',
    vacancies: 340,
    applicationStartDate: '2026-09-12',
    lastDate: '2026-10-15',
    examDate: 'December 7, 2026',
    examDateSort: '2026-12-07',
    status: 'Applications Open',
    state: 'All India',
    salaryPayScale: 'Level 10 (₹56,100 basic + DA, HRA, Transport Allowance ~₹95,000/month)',
    qualification: 'Engineering',
    qualificationText: 'BE/B.Tech or equivalent in Electronics, Mechanical or Computer Science with min 65% marks or 6.84 CGPA',
    degreeBranches: ['B.Tech / B.E Electronics', 'B.Tech / B.E Mechanical', 'B.Tech / B.E Computer Science'],
    eligibility: {
      minAge: 21,
      maxAge: 28,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwBD: 10 years',
      nationality: 'Citizen of India',
      details: 'First class throughout graduation with no backlog at the time of online application.'
    },
    applicationFee: {
      generalOBC: '₹250 (Non-refundable application fee) + ₹750 processing (refunded on exam attendance)',
      reserved: 'Exempted from fee, ₹750 processing fee refunded fully on appearing in CBT',
      mode: 'Internet Banking, UPI, Cards via SBI e-Pay'
    },
    importantDates: [
      { label: 'Opening of Online Submissions', date: 'September 12, 2026' },
      { label: 'Closing Date to Apply', date: 'October 15, 2026', isDeadline: true },
      { label: 'Written Test (CBT)', date: 'December 7, 2026', isExamDate: true },
      { label: 'Interview Rounds at ISRO HQ', date: 'February 2027' }
    ],
    selectionProcess: [
      'Written Test (Part A: Discipline Specific 80 marks, Part B: Aptitude 20 marks)',
      'Personal Interview at Bangalore/Ahmedabad/Trivandrum (Minimum 50% qualifying in interview)'
    ],
    officialNotificationUrl: 'https://isro.gov.in',
    officialApplicationUrl: 'https://apps.isac.gov.in',
    postsSummary: 'Scientist / Engineer ‘SC’ in URSC Bangalore, VSSC Trivandrum, SAC Ahmedabad, SDSC Sriharikota',
    isFeatured: true
  },
  {
    id: 'drdo-ceptam-11-2026',
    title: 'DRDO CEPTAM-11 Senior Technical Assistant-B (STA-B) & Technician-A',
    shortName: 'DRDO CEPTAM-11',
    organization: 'Defence Research & Development Organisation (DRDO)',
    category: 'Engineering & Technical',
    vacancies: 1900,
    applicationStartDate: '2026-10-05',
    lastDate: '2026-11-10',
    examDate: 'January 2027',
    examDateSort: '2027-01-15',
    status: 'Upcoming',
    state: 'All India',
    salaryPayScale: 'STA-B: Pay Level 6 (₹35,400 – ₹1,12,400); Tech-A: Pay Level 2 (₹19,900 – ₹63,200)',
    qualification: 'Diploma',
    qualificationText: 'STA-B: 3-year Diploma in Engineering or B.Sc in relevant subject. Tech-A: 10th pass + ITI certificate',
    degreeBranches: ['Diploma in Engineering', 'B.Sc Physics/Chem/Maths', 'ITI', 'B.Tech'],
    eligibility: {
      minAge: 18,
      maxAge: 28,
      ageRelaxation: 'SC/ST: 5 years, OBC-NCL: 3 years, PwBD: 10 years, ESM as per govt rules',
      nationality: 'Citizen of India',
      details: 'All qualifications must be from AICTE/UGC recognized universities before closing date.'
    },
    applicationFee: {
      generalOBC: '₹100',
      reserved: 'All Women and SC/ST/PwBD/ESM candidates exempted',
      mode: 'Online Mode Only'
    },
    importantDates: [
      { label: 'Advt Release in Employment News', date: 'October 5, 2026' },
      { label: 'Application Window Opens', date: 'October 5, 2026' },
      { label: 'Online Application Ends', date: 'November 10, 2026', isDeadline: true },
      { label: 'Tier-I CBT Examination', date: 'January 2027', isExamDate: true }
    ],
    selectionProcess: [
      'Tier-I CBT (Screening test for STA-B / Provisional selection for Tech-A)',
      'Tier-II CBT (Subject specific selection test for STA-B / Trade test for Tech-A)',
      'Document Verification'
    ],
    officialNotificationUrl: 'https://drdo.gov.in',
    officialApplicationUrl: 'https://ceptam11.com',
    postsSummary: 'Senior Technical Assistant-B across Electrical, Mechanical, CS, Civil, Chemistry and Tech-A trades'
  },
  {
    id: 'ssc-delhi-police-si-2026',
    title: 'SSC Sub-Inspector in Delhi Police & Central Armed Police Forces (CAPFs)',
    shortName: 'SSC CPO SI 2026',
    organization: 'Staff Selection Commission (SSC)',
    category: 'Police',
    vacancies: 4187,
    applicationStartDate: '2026-08-28',
    lastDate: '2026-10-04',
    examDate: 'November 15 – 17, 2026',
    examDateSort: '2026-11-15',
    status: 'Closing Soon',
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
      { label: 'Online Application Started', date: 'August 28, 2026' },
      { label: 'Last Date for Online Application', date: 'October 4, 2026', isDeadline: true },
      { label: 'Online Fee Payment Deadline', date: 'October 5, 2026' },
      { label: 'Paper-I Computer Based Exam', date: 'November 15 – 17, 2026', isExamDate: true },
      { label: 'PST / PET Dates', date: 'January 2027' },
      { label: 'Paper-II Exam', date: 'March 2027' }
    ],
    selectionProcess: [
      'Paper-I: Computer Based Examination (General Intelligence, Reasoning, GK, Quant, English)',
      'Physical Standard Test (PST) & Physical Endurance Test (PET)',
      'Paper-II: English Language & Comprehension',
      'Detailed Medical Examination (DME)'
    ],
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplicationUrl: 'https://ssc.gov.in',
    postsSummary: 'Sub-Inspector (Executive) in Delhi Police and Sub-Inspector (GD) in BSF, CISF, CRPF, ITBP, SSB'
  },
  {
    id: 'raj-police-constable-2026',
    title: 'Rajasthan Police Constable & RAC / MBC Recruitment 2026',
    shortName: 'Raj Police Constable',
    organization: 'Rajasthan Police Recruitment Board',
    category: 'Police',
    vacancies: 3578,
    applicationStartDate: '2026-09-01',
    lastDate: '2026-10-10',
    examDate: 'December 2026',
    examDateSort: '2026-12-05',
    status: 'Applications Open',
    state: 'Rajasthan',
    salaryPayScale: 'Pay Matrix Level 5 (Fixed remuneration ₹14,600 during 2 years probation)',
    qualification: '12th',
    qualificationText: 'Senior Secondary (12th Class) or equivalent from a recognized board + Valid CET 10+2 score',
    degreeBranches: ['12th Pass Arts', '12th Pass Science', '12th Pass Commerce'],
    eligibility: {
      minAge: 18,
      maxAge: 24,
      ageRelaxation: 'SC/ST/OBC/MBC/EWS & All Female candidates of Rajasthan: 5 years, Female SC/ST: 10 years',
      nationality: 'Citizen of India / Domicile of Rajasthan',
      details: 'Candidates must possess valid score in Rajasthan CET (Senior Secondary Level).'
    },
    applicationFee: {
      generalOBC: '₹600 for General / OBC (Creamy layer)',
      reserved: '₹400 for SC/ST/OBC (NCL)/EWS of Rajasthan',
      mode: 'Online SSO Portal Payment'
    },
    importantDates: [
      { label: 'Advertisement Release', date: 'September 1, 2026' },
      { label: 'Application Online Starts', date: 'September 1, 2026' },
      { label: 'Last Date for Online Application', date: 'October 10, 2026', isDeadline: true },
      { label: 'Physical Efficiency Test (PET/PST)', date: 'November 2026' },
      { label: 'Computer Based Test (CBT)', date: 'December 2026', isExamDate: true }
    ],
    selectionProcess: [
      'Physical Efficiency Test (PET) & Physical Standard Test (PST)',
      'Computer Based Test (CBT - 150 questions, 150 marks)',
      'Proficiency Test (for Drivers, Band, Mounted police)'
    ],
    officialNotificationUrl: 'https://police.rajasthan.gov.in',
    officialApplicationUrl: 'https://sso.rajasthan.gov.in',
    postsSummary: 'Constable General Duty, Constable Driver, Constable Telecom, and Band in Rajasthan Police'
  },
  {
    id: 'afcat-01-2026',
    title: 'Indian Air Force AFCAT 01/2026 Flying & Ground Duty (Technical/Non-Tech)',
    shortName: 'AFCAT 01/2026',
    organization: 'Indian Air Force (IAF)',
    category: 'Defence',
    vacancies: 317,
    applicationStartDate: '2026-10-20',
    lastDate: '2026-11-25',
    examDate: 'February 20 – 22, 2027',
    examDateSort: '2027-02-20',
    status: 'Upcoming',
    state: 'All India',
    salaryPayScale: 'Flight Lieutenant Pay Level 10 (₹56,100 – ₹1,77,500 + Military Service Pay ₹15,500/m)',
    qualification: 'Graduate',
    qualificationText: 'Flying Branch: Min 50% in Maths & Physics in 10+2 + Graduation (min 60%) or BE/B.Tech (min 60%). Ground Duty: Graduate or Post-Grad',
    degreeBranches: ['Any Graduate with PCM', 'B.Tech / B.E', 'B.Com for Accounts', 'MBA/Post Graduate for Admin'],
    eligibility: {
      minAge: 20,
      maxAge: 26,
      ageRelaxation: 'Flying Branch: 20 to 24 yrs (26 yrs with valid Commercial Pilot License). Ground Duty: 20 to 26 yrs',
      nationality: 'Citizen of India (Unmarried Men & Women)',
      details: 'Strict anthropometric and medical fitness standards as prescribed by IAF Medical Board.'
    },
    applicationFee: {
      generalOBC: '₹550 + GST for AFCAT entry',
      reserved: '₹550 for all candidates (No fee for NCC Special Entry)',
      mode: 'Online Gateway (Debit, Credit, Netbanking, UPI)'
    },
    importantDates: [
      { label: 'Notification Publication', date: 'October 18, 2026' },
      { label: 'Online Registration Commences', date: 'October 20, 2026' },
      { label: 'Application Deadline', date: 'November 25, 2026', isDeadline: true },
      { label: 'AFCAT Online Examination', date: 'February 20 – 22, 2027', isExamDate: true },
      { label: 'Air Force Selection Board (AFSB) Calls', date: 'April – July 2027' }
    ],
    selectionProcess: [
      'Online AFCAT Examination (General Awareness, Verbal Ability, Numerical Ability, Reasoning)',
      'AFSB Interview (Stage-I Officer Intelligence Rating & PPDT, Stage-II Psychological, Group Tests & Interview)',
      'Computerised Pilot Selection System (CPSS) for Flying branch',
      'Medical Board at IAM Bangalore or AFCME New Delhi'
    ],
    officialNotificationUrl: 'https://afcat.cdac.in',
    officialApplicationUrl: 'https://afcat.cdac.in',
    postsSummary: 'Commissioned Officers in Flying Branch and Ground Duty (Technical: Aero Electronics/Mechanical; Non-Technical: Admin, Logistics, Accounts, Education)'
  },
  {
    id: 'upsc-ese-2026',
    title: 'UPSC Engineering Services Examination (ESE / IES) 2026',
    shortName: 'UPSC ESE 2026',
    organization: 'Union Public Service Commission (UPSC)',
    category: 'Engineering & Technical',
    vacancies: 232,
    applicationStartDate: '2026-09-18',
    lastDate: '2026-10-22',
    examDate: 'February 14, 2027',
    examDateSort: '2027-02-14',
    status: 'Applications Open',
    state: 'All India',
    salaryPayScale: 'Group A Gazetted Executive Officers (Pay Level 10, ₹56,100 + allowances)',
    qualification: 'Engineering',
    qualificationText: 'Degree in Engineering (Civil, Mechanical, Electrical, or Electronics & Telecom) from a recognized University',
    degreeBranches: ['B.Tech / B.E Civil', 'B.Tech / B.E Mechanical', 'B.Tech / B.E Electrical', 'B.Tech / B.E Electronics'],
    eligibility: {
      minAge: 21,
      maxAge: 30,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwD: 10 years, Ex-Servicemen: 5 years',
      nationality: 'Citizen of India',
      details: 'Candidates appearing in final engineering exams can apply provisionally.'
    },
    applicationFee: {
      generalOBC: '₹200 (General / OBC Male candidates)',
      reserved: 'Exempted (Female / SC / ST / PwBD candidates)',
      mode: 'Online Mode or SBI Challan'
    },
    importantDates: [
      { label: 'Notification Issued', date: 'September 18, 2026' },
      { label: 'Registration Open', date: 'September 18, 2026' },
      { label: 'Application Last Date', date: 'October 22, 2026', isDeadline: true },
      { label: 'Correction Window', date: 'October 23 – 29, 2026' },
      { label: 'ESE Preliminary Exam', date: 'February 14, 2027', isExamDate: true },
      { label: 'ESE Mains Exam', date: 'June 2027' }
    ],
    selectionProcess: [
      'Stage-I: ESE Preliminary Examination (Objective: Paper-I GS & Engg Aptitude + Paper-II Engineering Discipline)',
      'Stage-II: ESE Main Examination (Conventional descriptive engineering papers - 600 marks)',
      'Stage-III: Personality Test / Interview (200 marks)'
    ],
    officialNotificationUrl: 'https://upsc.gov.in',
    officialApplicationUrl: 'https://upsconline.nic.in',
    postsSummary: 'Indian Railway Service of Engineers, Central Power Engineering Service, Indian Defence Service of Engineers, CWES'
  },
  {
    id: 'ssc-mts-2026',
    title: 'SSC Multi-Tasking (Non-Technical) Staff & Havaldar Examination 2026',
    shortName: 'SSC MTS 2026',
    organization: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    vacancies: 9583,
    applicationStartDate: '2026-07-20',
    lastDate: '2026-08-31',
    examDate: 'September 30 – November 14, 2026',
    examDateSort: '2026-09-30',
    status: 'Closed',
    state: 'All India',
    salaryPayScale: 'Pay Level 1 (₹18,000 – ₹56,900) as per 7th CPC Matrix',
    qualification: '10th',
    qualificationText: 'Must have passed Matriculation (10th Class) Examination from a recognized Board',
    degreeBranches: ['10th Pass', 'Any'],
    eligibility: {
      minAge: 18,
      maxAge: 25,
      ageRelaxation: 'OBC: 3 years, SC/ST: 5 years, PwD: 10 years, 18-27 years for Havaldar posts',
      nationality: 'Citizen of India',
      details: 'Physical standard and walking test applicable only for Havaldar in CBIC & CBN.'
    },
    applicationFee: {
      generalOBC: '₹100',
      reserved: 'Exempted (Women, SC, ST, PwBD, ESM)',
      mode: 'Online (UPI, Net Banking, Debit/Credit)'
    },
    importantDates: [
      { label: 'Notification Released', date: 'July 20, 2026' },
      { label: 'Registration Deadline', date: 'August 31, 2026', isDeadline: true },
      { label: 'CBT Exam Window', date: 'September 30 – November 14, 2026', isExamDate: true }
    ],
    selectionProcess: [
      'Computer Based Examination (Session-I: Numerical & Mathematical, Reasoning | Session-II: General Awareness & English)',
      'Physical Efficiency Test (PET: Walking 1600m in 15 min for Havaldar)',
      'Document Verification'
    ],
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplicationUrl: 'https://ssc.gov.in',
    postsSummary: 'Multi-Tasking Staff in Central Govt Ministries, Departments, and Havaldar in CBIC & CBN'
  },
  {
    id: 'appsc-group1-2026',
    title: 'APPSC Group-I Services Recruitment Notification 2026',
    shortName: 'APPSC Group-I 2026',
    organization: 'Andhra Pradesh Public Service Commission (APPSC)',
    category: 'State PSC',
    vacancies: 89,
    applicationStartDate: '2026-09-10',
    lastDate: '2026-10-12',
    examDate: 'December 20, 2026',
    examDateSort: '2026-12-20',
    status: 'Applications Open',
    state: 'Andhra Pradesh',
    salaryPayScale: 'Scale of Pay ₹54,060 – ₹1,40,520 (RPS 2022)',
    qualification: 'Graduate',
    qualificationText: 'Must hold a Bachelor’s Degree of any University in India established or incorporated by or under a Central Act',
    degreeBranches: ['Any Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech'],
    eligibility: {
      minAge: 18,
      maxAge: 42,
      ageRelaxation: 'SC/ST/BCs/EWS of AP: 5 years, PwD: 10 years, AP State Govt Employees: up to 5 years',
      nationality: 'Citizen of India',
      details: 'For DSP posts: Min height 167.6 cm (Men), 152.5 cm (Women) and 86.3 cm chest.'
    },
    applicationFee: {
      generalOBC: '₹250 (Application Processing) + ₹120 (Examination Fee)',
      reserved: 'Exempted from Exam fee (₹120) for SC, ST, BC, PwD, Ex-SM of AP',
      mode: 'Online Payment Gateway'
    },
    importantDates: [
      { label: 'Notification Issued', date: 'September 10, 2026' },
      { label: 'Online Application Open', date: 'September 10, 2026' },
      { label: 'Last Date to Apply', date: 'October 12, 2026', isDeadline: true },
      { label: 'Screening Test (Prelims)', date: 'December 20, 2026', isExamDate: true }
    ],
    selectionProcess: [
      'Screening Test (Objective Type: Paper-I General Studies, Paper-II General Aptitude)',
      'Written Main Examination (Conventional Type: Telugu, English, Paper I-V)',
      'Oral Test (Interview / Personality Test)'
    ],
    officialNotificationUrl: 'https://psc.ap.gov.in',
    officialApplicationUrl: 'https://psc.ap.gov.in',
    postsSummary: 'Deputy Collectors, Assistant Commissioner of State Taxes, DSP (Civil), District Fire Officer, RTO'
  }
];
