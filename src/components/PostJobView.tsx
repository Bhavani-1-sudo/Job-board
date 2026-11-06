import React, { useState } from 'react';
import { useJobHub } from '../context/JobContext';
import { JobCategory, WorkType, ExperienceLevel, EmploymentType } from '../types/job';
import {
  PlusCircle,
  Sparkles,
  Building2,
  DollarSign,
  MapPin,
  CheckCircle2,
  Wand2,
} from 'lucide-react';

interface PostJobViewProps {
  onSuccess: () => void;
}

const CATEGORIES: JobCategory[] = [
  'Engineering',
  'Mobile',
  'Frontend',
  'Backend',
  'AI & Machine Learning',
  'UI/UX Design',
  'Product Management',
  'Data Science',
  'Cloud & DevOps',
];

const WORK_TYPES: WorkType[] = ['Remote', 'Hybrid', 'On-site'];
const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'Entry Level',
  'Mid-Level',
  'Senior',
  'Lead / Principal',
];
const EMPLOYMENT_TYPES: EmploymentType[] = [
  'Full-time',
  'Contract',
  'Part-time',
  'Internship',
];

export const PostJobView: React.FC<PostJobViewProps> = ({ onSuccess }) => {
  const { postJob, setSelectedJobForDetail } = useJobHub();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('Remote');
  const [category, setCategory] = useState<JobCategory>('Mobile');
  const [workType, setWorkType] = useState<WorkType>('Remote');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Senior');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('Full-time');
  const [salaryMin, setSalaryMin] = useState('140000');
  const [salaryMax, setSalaryMax] = useState('185000');
  const [skillsInput, setSkillsInput] = useState('Kotlin, Jetpack Compose, Coroutines');
  const [description, setDescription] = useState(
    'We are looking for a top-tier engineer to build exceptional software that scales to millions of users.'
  );
  const [responsibilitiesInput, setResponsibilitiesInput] = useState(
    'Design and build high-performance user interfaces\nCollaborate closely with product, design, and infrastructure squads\nChampion automated testing and CI/CD best practices'
  );
  const [requirementsInput, setRequirementsInput] = useState(
    '4+ years of relevant industry software experience\nStrong problem solving and architectural thinking\nDeep knowledge of modern software frameworks and paradigms'
  );
  const [benefitsInput, setBenefitsInput] = useState(
    '100% remote flexibility and home setup budget\nTop-tier health, optical, and dental coverage\nGenerous 401(k) matching and annual learning stipend'
  );
  const [companyWebsite, setCompanyWebsite] = useState('https://acme-software.com');
  const [companySize, setCompanySize] = useState('100–250 employees');

  const [isSuccessToast, setIsSuccessToast] = useState(false);

  const handleAutofillDemo = () => {
    setTitle('Senior Kotlin & Multiplatform Engineer');
    setCompany('Starlight Mobile');
    setLocation('Seattle, WA (or Remote)');
    setCategory('Mobile');
    setWorkType('Remote');
    setExperienceLevel('Senior');
    setEmploymentType('Full-time');
    setSalaryMin('155000');
    setSalaryMax('195000');
    setSkillsInput('Kotlin, Kotlin Multiplatform, Compose Multiplatform, Coroutines, Room');
    setDescription(
      'Starlight Mobile is constructing the next era of interconnected mobile and desktop productivity apps. We need an experienced Kotlin architect to spearhead our shared business layer.'
    );
    setResponsibilitiesInput(
      'Architect shared core business logic using Kotlin Multiplatform (KMP)\nBuild delightful cross-platform user interfaces with Compose Multiplatform\nOptimize background data sync, local caching, and offline-first persistence\nMentor intermediate mobile engineers across iOS and Android squads'
    );
    setRequirementsInput(
      '5+ years professional experience building production mobile applications\nPractical experience deploying Kotlin Multiplatform in production\nProficiency with reactive paradigms, Flow, and coroutine structured concurrency\nStrong commitment to clean architecture and testing'
    );
    setBenefitsInput(
      '100% remote work with flexible asynchronous schedule\nFull medical, dental, and vision premium coverage\nAnnual $3,000 conference & continuous learning allowance\nTop of the line MacBook Pro M-series and 4K display stipend'
    );
    setCompanyWebsite('https://starlightmobile.dev');
    setCompanySize('75–150 employees');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;

    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const responsibilities = responsibilitiesInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);
    const requirements = requirementsInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);
    const benefits = benefitsInput
      .split('\n')
      .map((b) => b.trim())
      .filter(Boolean);

    const newJob = postJob({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      category,
      workType,
      experienceLevel,
      employmentType,
      salaryMin: Number(salaryMin) || 120000,
      salaryMax: Number(salaryMax) || 160000,
      skills: skills.length > 0 ? skills : ['Software Engineering'],
      description: description.trim(),
      responsibilities,
      requirements,
      benefits,
      companyWebsite: companyWebsite.trim(),
      companySize: companySize.trim(),
    });

    setIsSuccessToast(true);
    setTimeout(() => {
      setSelectedJobForDetail(newJob);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header & Quick Autofill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <PlusCircle className="w-7 h-7 text-blue-400" />
            <span>Post a Tech Opening</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Publish verified roles to reach high-caliber candidates instantly
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutofillDemo}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 hover:bg-purple-500/25 text-xs font-bold transition-all self-start sm:self-auto"
        >
          <Wand2 className="w-3.5 h-3.5 text-purple-400" />
          <span>Auto-fill Demo Role</span>
        </button>
      </div>

      {isSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-sm">Opening Successfully Published!</h4>
            <p className="text-xs text-emerald-200/90">
              The role is live on JobHub and candidates can apply immediately.
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Details Card */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" /> Basic Opportunity Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Job Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Mobile Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Acme Tech Labs"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as JobCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Work Arrangement
              </label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value as WorkType)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                {WORK_TYPES.map((wt) => (
                  <option key={wt} value={wt}>
                    {wt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. San Francisco, CA or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Employment Type
              </label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                {EMPLOYMENT_TYPES.map((et) => (
                  <option key={et} value={et}>
                    {et}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Compensation */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Annual Salary Range (USD)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold">$</span>
                <input
                  type="number"
                  placeholder="Min (e.g. 130000)"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold">$</span>
                <input
                  type="number"
                  placeholder="Max (e.g. 175000)"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Kotlin, Compose, Coroutines, Architecture"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* In-depth descriptions */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" /> Job Description & Requirements
          </h2>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Role Overview
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Key Responsibilities (one per line)
            </label>
            <textarea
              rows={3}
              value={responsibilitiesInput}
              onChange={(e) => setResponsibilitiesInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Qualifications & Requirements (one per line)
            </label>
            <textarea
              rows={3}
              value={requirementsInput}
              onChange={(e) => setRequirementsInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Perks & Benefits (one per line)
            </label>
            <textarea
              rows={3}
              value={benefitsInput}
              onChange={(e) => setBenefitsInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Company Website
              </label>
              <input
                type="url"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Company Size
              </label>
              <input
                type="text"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!title.trim() || !company.trim()}
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-base shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Publish Job Opening to Board</span>
        </button>
      </form>
    </div>
  );
};
