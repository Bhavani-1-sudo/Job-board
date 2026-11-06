export type JobCategory =
  | 'All Roles'
  | 'Engineering'
  | 'Mobile'
  | 'Frontend'
  | 'Backend'
  | 'AI & Machine Learning'
  | 'UI/UX Design'
  | 'Product Management'
  | 'Data Science'
  | 'Cloud & DevOps';

export type WorkType = 'All Types' | 'Remote' | 'Hybrid' | 'On-site';

export type ExperienceLevel =
  | 'All Levels'
  | 'Entry Level'
  | 'Mid-Level'
  | 'Senior'
  | 'Lead / Principal';

export type EmploymentType =
  | 'Full-time'
  | 'Contract'
  | 'Part-time'
  | 'Internship';

export type ApplicationStatus =
  | 'Applied'
  | 'In Review'
  | 'Interviewing'
  | 'Offer Received'
  | 'Archived';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  workType: string;
  employmentType: string;
  salaryMin: number;
  salaryMax: number;
  salaryFormatted: string;
  experienceLevel: string;
  postedAgo: string;
  category: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  companyWebsite: string;
  companySize: string;
  logoColorHex: string;
  isFeatured?: boolean;
  isUserCreated?: boolean;
  applicantsCount: number;
  isSaved?: boolean;
  isApplied?: boolean;
}

export interface ApplicationRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: ApplicationStatus;
  applicantName: string;
  applicantEmail: string;
  notes?: string;
  interviewDate?: string;
}

export interface UserProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  portfolioUrl: string;
  linkedinUrl: string;
  yearsOfExperience: number;
  expectedSalaryMin: number;
}

export interface FilterState {
  query: string;
  category: JobCategory;
  workType: WorkType;
  experienceLevel: ExperienceLevel;
  minSalary: number;
}
