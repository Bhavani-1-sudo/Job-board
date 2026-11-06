import React, { useState, useMemo } from 'react';
import { useJobHub } from '../context/JobContext';
import { JobCategory, WorkType, ExperienceLevel, FilterState } from '../types/job';
import { JobCard } from './JobCard';
import { FilterModal } from './FilterModal';
import {
  Search,
  X,
  SlidersHorizontal,
  Briefcase,
  Sparkles,
  TrendingUp,
  MapPin,
  Building,
  RotateCcw,
} from 'lucide-react';

const CATEGORIES: JobCategory[] = [
  'All Roles',
  'Engineering',
  'Mobile',
  'AI & Machine Learning',
  'Frontend',
  'Backend',
  'UI/UX Design',
  'Cloud & DevOps',
  'Data Science',
  'Product Management',
];

export const ExploreView: React.FC = () => {
  const { jobs } = useJobHub();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('All Roles');
  const [selectedWorkType, setSelectedWorkType] = useState<WorkType>('All Types');
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel>('All Levels');
  const [minSalary, setMinSalary] = useState(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Active filters count
  const activeFiltersCount =
    (selectedCategory !== 'All Roles' ? 1 : 0) +
    (selectedWorkType !== 'All Types' ? 1 : 0) +
    (selectedExperience !== 'All Levels' ? 1 : 0) +
    (minSalary > 0 ? 1 : 0);

  const resetAllFilters = () => {
    setQuery('');
    setSelectedCategory('All Roles');
    setSelectedWorkType('All Types');
    setSelectedExperience('All Levels');
    setMinSalary(0);
  };

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search query
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesLocation = job.location.toLowerCase().includes(q);
        const matchesSkills = job.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesLocation && !matchesSkills) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All Roles') {
        if (job.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Work arrangement
      if (selectedWorkType !== 'All Types') {
        if (job.workType.toLowerCase() !== selectedWorkType.toLowerCase()) {
          return false;
        }
      }

      // Experience level
      if (selectedExperience !== 'All Levels') {
        if (job.experienceLevel.toLowerCase() !== selectedExperience.toLowerCase()) {
          return false;
        }
      }

      // Min salary filter
      if (minSalary > 0) {
        if (job.salaryMax < minSalary) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, query, selectedCategory, selectedWorkType, selectedExperience, minSalary]);

  // Featured jobs for carousel (only when in default exploration mode)
  const featuredJobs = useMemo(() => {
    return jobs.filter((j) => j.isFeatured);
  }, [jobs]);

  const showFeaturedCarousel =
    !query &&
    selectedCategory === 'All Roles' &&
    selectedWorkType === 'All Types' &&
    selectedExperience === 'All Levels' &&
    minSalary === 0 &&
    featuredJobs.length > 0;

  const currentFilterState: FilterState = {
    query,
    category: selectedCategory,
    workType: selectedWorkType,
    experienceLevel: selectedExperience,
    minSalary,
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-6 sm:p-10 shadow-2xl border border-blue-500/20">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-xs font-bold border border-white/15 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>EXPLORE VERIFIED TECH CAREERS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Find Your Next High-Impact Engineering Role
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 mt-2 leading-relaxed">
            Curated tech opportunities in Mobile, AI & LLMs, Cloud Infrastructure, Fullstack, and Product Design. Filter by compensation, stack, and remote flexibility.
          </p>

          <div className="flex items-center gap-4 mt-5 text-xs text-blue-200 font-semibold flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              100% Verified Positions
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-300" />
              1-Tap Quick Apply
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-300" />
              Real-time Pipeline Tracker
            </span>
          </div>
        </div>

        {/* Ambient background circles */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Search Bar & Filter Button */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search role title, tech stack (Kotlin, React, Python), company, city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 shadow-sm transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-3.5 p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsFilterModalOpen(true)}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-bold transition-all flex-shrink-0 shadow-sm ${
            activeFiltersCount > 0
              ? 'bg-blue-600 text-white border-blue-500 shadow-blue-500/25'
              : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-blue-600 text-[11px] font-extrabold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Featured Jobs Carousel */}
      {showFeaturedCarousel && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h2 className="text-base font-extrabold text-white">Featured Roles</h2>
            </div>
            <span className="text-xs font-bold text-blue-400">
              {featuredJobs.length} top picks
            </span>
          </div>

          <div className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 scrollbar-thin">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} isCompact />
            ))}
          </div>
        </div>
      )}

      {/* Main Opportunities Feed */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <h2 className="text-lg font-bold text-white">
              {selectedCategory === 'All Roles' ? 'All Opportunities' : selectedCategory}
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'role' : 'roles'} available
          </span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-slate-700 rounded-3xl bg-slate-800/30">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No Matching Jobs Found</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1.5 mb-6">
              We couldn't find any opportunities matching your specific search criteria. Try relaxing your filters or resetting to view all openings.
            </p>
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        filterState={currentFilterState}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(wt, exp, minSal) => {
          setSelectedWorkType(wt);
          setSelectedExperience(exp);
          setMinSalary(minSal);
        }}
        onReset={resetAllFilters}
      />
    </div>
  );
};
