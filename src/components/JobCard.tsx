import React from 'react';
import { Job } from '../types/job';
import { useJobHub } from '../context/JobContext';
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
  Building2,
  Clock,
} from 'lucide-react';

interface JobCardProps {
  job: Job;
  isCompact?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isCompact = false }) => {
  const { toggleSave, setSelectedJobForDetail } = useJobHub();

  const getWorkTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'remote':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'hybrid':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      default:
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  return (
    <div
      onClick={() => setSelectedJobForDetail(job)}
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-200 cursor-pointer ${
        job.isFeatured
          ? 'bg-gradient-to-b from-slate-800/90 via-slate-800/80 to-slate-900/90 border-blue-500/30 hover:border-blue-400/60 shadow-lg shadow-blue-500/5'
          : 'bg-slate-800/60 hover:bg-slate-800/90 border-slate-700/60 hover:border-slate-600 shadow-sm'
      } ${isCompact ? 'p-4 min-w-[280px] max-w-[320px] flex-shrink-0' : 'p-5 w-full'}`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Company monogram / logo */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-inner flex-shrink-0"
              style={{ backgroundColor: job.logoColorHex || '#2563EB' }}
            >
              {job.company.substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-slate-400 truncate flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-500 inline" />
                  {job.company}
                </span>
                {job.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <Sparkles className="w-2.5 h-2.5" /> Featured
                  </span>
                )}
                {job.isUserCreated && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    New Opening
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 mt-0.5">
                {job.title}
              </h3>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(job.id);
            }}
            className={`p-2 rounded-xl transition-all ${
              job.isSaved
                ? 'text-blue-400 bg-blue-500/15 hover:bg-blue-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
            }`}
            title={job.isSaved ? 'Remove bookmark' : 'Bookmark job'}
          >
            {job.isSaved ? (
              <BookmarkCheck className="w-4 h-4 fill-current" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Badges Row: Location & Work type */}
        <div className="flex items-center gap-2 mt-3 flex-wrap text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600/40">
            <MapPin className="w-3 h-3 text-slate-400" />
            {job.location}
          </span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getWorkTypeColor(
              job.workType
            )}`}
          >
            {job.workType}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-700/40 text-slate-300 border border-slate-700">
            {job.employmentType}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-700/30 text-slate-400">
            {job.experienceLevel}
          </span>
        </div>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/70"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[11px] text-slate-400 self-center pl-1">
              +{job.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer / Compensation & Status */}
      <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-700/50">
        <div>
          <span className="text-xs text-slate-400 block font-medium">Compensation</span>
          <span className="text-sm font-bold text-blue-400">
            {job.salaryFormatted}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {job.isApplied ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Applied
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3 text-slate-500" />
              {job.postedAgo}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
