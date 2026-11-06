import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, ApplicationRecord, UserProfile, ApplicationStatus } from '../types/job';
import { INITIAL_JOBS, INITIAL_USER_PROFILE, INITIAL_APPLICATIONS } from '../data/mockJobs';

interface JobContextType {
  jobs: Job[];
  savedJobs: Job[];
  applications: ApplicationRecord[];
  profile: UserProfile;
  toggleSave: (jobId: string) => void;
  applyToJob: (
    jobId: string,
    applicantName: string,
    applicantEmail: string,
    notes?: string
  ) => boolean;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  updateApplicationNotes: (appId: string, notes: string, interviewDate: string) => void;
  deleteApplication: (appId: string) => void;
  postJob: (jobData: Partial<Job>) => Job;
  updateProfile: (newProfile: UserProfile) => void;
  resetToDefaults: () => void;
  selectedJobForDetail: Job | null;
  setSelectedJobForDetail: (job: Job | null) => void;
  selectedJobForApply: Job | null;
  setSelectedJobForApply: (job: Job | null) => void;
  isGitHubModalOpen: boolean;
  setIsGitHubModalOpen: (open: boolean) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const STORAGE_KEYS = {
  JOBS: 'jobhub_jobs_v1',
  SAVED_IDS: 'jobhub_saved_ids_v1',
  APPLICATIONS: 'jobhub_apps_v1',
  PROFILE: 'jobhub_profile_v1',
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED_IDS);
      return stored ? JSON.parse(stored) : ['job_1', 'job_3'];
    } catch {
      return ['job_1', 'job_3'];
    }
  });

  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return stored ? JSON.parse(stored) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return stored ? JSON.parse(stored) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.JOBS);
      if (stored) {
        return JSON.parse(stored);
      }
      return INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [jobs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_IDS, JSON.stringify(savedIds));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [profile]);

  // Derived decorated jobs list
  const decoratedJobs: Job[] = jobs.map((job) => {
    const isSaved = savedIds.includes(job.id);
    const isApplied = applications.some((app) => app.jobId === job.id);
    return {
      ...job,
      isSaved,
      isApplied,
    };
  });

  const savedJobs = decoratedJobs.filter((j) => j.isSaved);

  const toggleSave = (jobId: string) => {
    setSavedIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const applyToJob = (
    jobId: string,
    applicantName: string,
    applicantEmail: string,
    notes?: string
  ): boolean => {
    const targetJob = jobs.find((j) => j.id === jobId);
    if (!targetJob) return false;

    // Check if already applied
    const alreadyApplied = applications.some((app) => app.jobId === jobId);
    if (alreadyApplied) return false;

    const newApp: ApplicationRecord = {
      id: `app_${Date.now()}`,
      jobId: targetJob.id,
      jobTitle: targetJob.title,
      company: targetJob.company,
      appliedDate: 'Just now',
      status: 'Applied',
      applicantName,
      applicantEmail,
      notes: notes || '',
      interviewDate: '',
    };

    setApplications((prev) => [newApp, ...prev]);

    // Increment applicantsCount on the job
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, applicantsCount: (j.applicantsCount || 0) + 1 } : j
      )
    );

    return true;
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status } : app))
    );
  };

  const updateApplicationNotes = (appId: string, notes: string, interviewDate: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, notes, interviewDate } : app
      )
    );
  };

  const deleteApplication = (appId: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
  };

  const postJob = (jobData: Partial<Job>): Job => {
    const minSalary = Number(jobData.salaryMin) || 120000;
    const maxSalary = Number(jobData.salaryMax) || 160000;
    const formatted = `$${Math.round(minSalary / 1000)}k – $${Math.round(
      maxSalary / 1000
    )}k / yr`;

    const colors = ['#2563EB', '#0D9488', '#7C3AED', '#EC4899', '#D97706', '#059669'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const createdJob: Job = {
      id: `job_user_${Date.now()}`,
      title: jobData.title || 'Software Engineer',
      company: jobData.company || 'Tech Innovations Inc',
      location: jobData.location || 'Remote',
      workType: jobData.workType || 'Remote',
      employmentType: jobData.employmentType || 'Full-time',
      salaryMin: minSalary,
      salaryMax: maxSalary,
      salaryFormatted: formatted,
      experienceLevel: jobData.experienceLevel || 'Mid-Level',
      postedAgo: 'Just now',
      category: jobData.category || 'Engineering',
      skills: jobData.skills && jobData.skills.length > 0 ? jobData.skills : ['TypeScript', 'Fullstack'],
      description:
        jobData.description ||
        'Exciting opportunity to join our rapidly scaling engineering team and build mission-critical products.',
      responsibilities:
        jobData.responsibilities && jobData.responsibilities.length > 0
          ? jobData.responsibilities
          : [
              'Build and ship production-ready applications with test coverage',
              'Collaborate with design and product teams on product roadmap',
              'Review peer code and maintain architecture quality',
            ],
      requirements:
        jobData.requirements && jobData.requirements.length > 0
          ? jobData.requirements
          : [
              '3+ years of professional development experience',
              'Strong analytical and problem-solving skills',
              'Experience in agile team environments',
            ],
      benefits:
        jobData.benefits && jobData.benefits.length > 0
          ? jobData.benefits
          : [
              'Flexible working schedule and remote stipend',
              'Health, dental, and optical insurance',
              'Competitive equity compensation',
            ],
      companyWebsite: jobData.companyWebsite || 'https://example.com',
      companySize: jobData.companySize || '50–200 employees',
      logoColorHex: randomColor,
      isFeatured: false,
      isUserCreated: true,
      applicantsCount: 0,
    };

    setJobs((prev) => [createdJob, ...prev]);
    return createdJob;
  };

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const resetToDefaults = () => {
    setJobs(INITIAL_JOBS);
    setSavedIds(['job_1', 'job_3']);
    setApplications(INITIAL_APPLICATIONS);
    setProfile(INITIAL_USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.JOBS);
    localStorage.removeItem(STORAGE_KEYS.SAVED_IDS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  };

  return (
    <JobContext.Provider
      value={{
        jobs: decoratedJobs,
        savedJobs,
        applications,
        profile,
        toggleSave,
        applyToJob,
        updateApplicationStatus,
        updateApplicationNotes,
        deleteApplication,
        postJob,
        updateProfile,
        resetToDefaults,
        selectedJobForDetail,
        setSelectedJobForDetail,
        selectedJobForApply,
        setSelectedJobForApply,
        isGitHubModalOpen,
        setIsGitHubModalOpen,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobHub = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobHub must be used within a JobProvider');
  }
  return context;
};
