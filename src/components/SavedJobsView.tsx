import React from 'react';
import { useJobHub } from '../context/JobContext';
import { JobCard } from './JobCard';
import { Bookmark, Sparkles, DollarSign, Briefcase } from 'lucide-react';

interface SavedJobsViewProps {
  onNavigateToExplore: () => void;
}

export const SavedJobsView: React.FC<SavedJobsViewProps> = ({ onNavigateToExplore }) => {
  const { savedJobs } = useJobHub();

  const avgSalary =
    savedJobs.length > 0
      ? Math.round(
          savedJobs.reduce((acc, j) => acc + (j.salaryMin + j.salaryMax) / 2, 0) /
            savedJobs.length /
            1000
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Title & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Bookmark className="w-7 h-7 text-blue-400 fill-blue-500/20" />
            <span>Bookmarked Positions</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Keep track of promising opportunities and apply when ready
          </p>
        </div>

        {savedJobs.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
              <span className="text-slate-400 block font-medium">Saved Positions</span>
              <span className="text-sm font-bold text-white">{savedJobs.length} roles</span>
            </div>
            {avgSalary > 0 && (
              <div className="px-3.5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs">
                <span className="text-blue-300 block font-medium">Avg Target Salary</span>
                <span className="text-sm font-bold text-blue-400">${avgSalary}k / yr</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {savedJobs.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-slate-700 rounded-3xl bg-slate-800/30">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Saved Jobs Yet</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1.5 mb-6">
            Whenever you find an appealing tech opportunity, click the bookmark icon to save it here for fast access.
          </p>
          <button
            onClick={onNavigateToExplore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
          >
            <Briefcase className="w-4 h-4" /> Browse Verified Openings
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};
