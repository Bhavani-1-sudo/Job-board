import React, { useState } from 'react';
import { Job } from '../types/job';
import { useJobHub } from '../context/JobContext';
import {
  X,
  Share2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  MapPin,
  Briefcase,
  DollarSign,
  GraduationCap,
  Building2,
  ExternalLink,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  const { toggleSave, setSelectedJobForApply } = useJobHub();
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${job.title} at ${job.company} - ${job.salaryFormatted} (${job.location})`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleApplyClick = () => {
    onClose();
    setSelectedJobForApply(job);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Role Specification
            </span>
            {job.isFeatured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Sparkles className="w-3 h-3" /> Featured Role
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors relative"
              title="Share job"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -bottom-7 right-0 text-[10px] bg-emerald-600 text-white font-medium px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
            <button
              onClick={() => toggleSave(job.id)}
              className={`p-2 rounded-xl transition-colors ${
                job.isSaved
                  ? 'text-blue-400 bg-blue-500/15 hover:bg-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={job.isSaved ? 'Remove bookmark' : 'Bookmark job'}
            >
              {job.isSaved ? (
                <BookmarkCheck className="w-4 h-4 fill-current" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md flex-shrink-0"
              style={{ backgroundColor: job.logoColorHex || '#2563EB' }}
            >
              {job.company.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  {job.company}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">{job.companySize}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {job.title}
              </h1>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                </span>
                <span>•</span>
                <span>{job.applicantsCount} active applicants</span>
                <span>•</span>
                <span>Posted {job.postedAgo}</span>
              </div>
            </div>
          </div>

          {/* 4 Key Highlight Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/50">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                <DollarSign className="w-3.5 h-3.5 text-blue-400" /> Target Salary
              </div>
              <div className="text-sm font-bold text-blue-400 truncate">
                {job.salaryFormatted}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/50">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> Work Setting
              </div>
              <div className="text-sm font-bold text-white capitalize truncate">
                {job.workType} ({job.employmentType})
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/50">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" /> Level
              </div>
              <div className="text-sm font-bold text-white truncate">
                {job.experienceLevel}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/50">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Base Location
              </div>
              <div className="text-sm font-bold text-white truncate">
                {job.location}
              </div>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Required Core Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-blue-300 border border-blue-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Role Overview */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              About the Role
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Key Responsibilities
              </h3>
              <div className="space-y-2.5">
                {job.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Qualifications & Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Qualifications & Experience
              </h3>
              <div className="space-y-2.5">
                {job.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Perks & Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Perks & Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {job.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/40 text-xs text-slate-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Company Info Box */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">About {job.company}</span>
              <span className="text-slate-200 font-semibold">{job.companySize}</span>
            </div>
            {job.companyWebsite && (
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold"
              >
                Visit Company Website <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Sticky Apply Action Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/95 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block">Annual Compensation</span>
            <span className="text-base font-extrabold text-blue-400">
              {job.salaryFormatted}
            </span>
          </div>

          {job.isApplied ? (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-sm font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Application in Pipeline
            </div>
          ) : (
            <button
              onClick={handleApplyClick}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
            >
              <Send className="w-4 h-4" /> Quick Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
