import React, { useState } from 'react';
import { ApplicationRecord, ApplicationStatus } from '../types/job';
import { useJobHub } from '../context/JobContext';
import { NotesEditModal } from './NotesEditModal';
import {
  Briefcase,
  Calendar,
  Edit3,
  Trash2,
  ExternalLink,
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface ApplicationsViewProps {
  onNavigateToExplore: () => void;
}

const ALL_STATUSES: ApplicationStatus[] = [
  'Applied',
  'In Review',
  'Interviewing',
  'Offer Received',
  'Archived',
];

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  onNavigateToExplore,
}) => {
  const {
    applications,
    updateApplicationStatus,
    updateApplicationNotes,
    deleteApplication,
    jobs,
    setSelectedJobForDetail,
  } = useJobHub();

  const [statusFilter, setStatusFilter] = useState<'All' | ApplicationStatus>('All');
  const [editingApplication, setEditingApplication] = useState<ApplicationRecord | null>(null);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return {
          badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          metric: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
          dot: 'bg-blue-400',
        };
      case 'In Review':
        return {
          badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          metric: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
          dot: 'bg-amber-400',
        };
      case 'Interviewing':
        return {
          badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          metric: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
          dot: 'bg-purple-400',
        };
      case 'Offer Received':
        return {
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 font-bold',
          metric: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          dot: 'bg-emerald-400',
        };
      case 'Archived':
        return {
          badge: 'bg-slate-700/50 text-slate-400 border-slate-600',
          metric: 'text-slate-400 bg-slate-800 border-slate-700',
          dot: 'bg-slate-400',
        };
    }
  };

  const filteredApps = applications.filter((app) => {
    if (statusFilter === 'All') return true;
    return app.status === statusFilter;
  });

  const countByStatus = (status: ApplicationStatus) =>
    applications.filter((a) => a.status === status).length;

  return (
    <div className="space-y-6">
      {/* Page Title & Intro */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Application Pipeline
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Track interview timelines, active recruiting stages, and private notes
        </p>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div
          onClick={() => setStatusFilter('All')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'All'
              ? 'bg-blue-600/20 border-blue-500 shadow-md shadow-blue-500/10'
              : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
          }`}
        >
          <span className="text-2xl font-black text-white block">
            {applications.length}
          </span>
          <span className="text-xs font-semibold text-slate-300">Total Submitted</span>
        </div>

        <div
          onClick={() => setStatusFilter('In Review')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'In Review'
              ? 'bg-amber-500/20 border-amber-500 shadow-md shadow-amber-500/10'
              : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
          }`}
        >
          <span className="text-2xl font-black text-amber-400 block">
            {countByStatus('In Review')}
          </span>
          <span className="text-xs font-semibold text-slate-300">In Review</span>
        </div>

        <div
          onClick={() => setStatusFilter('Interviewing')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'Interviewing'
              ? 'bg-purple-500/20 border-purple-500 shadow-md shadow-purple-500/10'
              : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
          }`}
        >
          <span className="text-2xl font-black text-purple-400 block">
            {countByStatus('Interviewing')}
          </span>
          <span className="text-xs font-semibold text-slate-300">Interviewing</span>
        </div>

        <div
          onClick={() => setStatusFilter('Offer Received')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'Offer Received'
              ? 'bg-emerald-500/20 border-emerald-500 shadow-md shadow-emerald-500/10'
              : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
          }`}
        >
          <span className="text-2xl font-black text-emerald-400 block">
            {countByStatus('Offer Received')}
          </span>
          <span className="text-xs font-semibold text-slate-300">Offers</span>
        </div>

        <div
          onClick={() => setStatusFilter('Archived')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'Archived'
              ? 'bg-slate-700/40 border-slate-500 shadow-md'
              : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
          }`}
        >
          <span className="text-2xl font-black text-slate-400 block">
            {countByStatus('Archived')}
          </span>
          <span className="text-xs font-semibold text-slate-300">Archived</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['All', ...ALL_STATUSES] as ('All' | ApplicationStatus)[]).map((tab) => {
          const isSelected = statusFilter === tab;
          const count = tab === 'All' ? applications.length : countByStatus(tab);
          return (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700/80 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-700 rounded-3xl bg-slate-800/30">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto mb-3">
            <Briefcase className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No Applications Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-5">
            {statusFilter === 'All'
              ? 'You have not submitted any applications yet. Explore active roles and apply with 1 tap!'
              : `No applications currently in the "${statusFilter}" stage.`}
          </p>
          <button
            onClick={onNavigateToExplore}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
          >
            Explore Open Roles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredApps.map((app) => {
            const colors = getStatusColor(app.status);
            const matchingJob = jobs.find((j) => j.id === app.jobId);

            return (
              <div
                key={app.id}
                className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 hover:border-slate-600 transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        {app.company}
                      </span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        Applied {app.appliedDate}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                      <span>{app.jobTitle}</span>
                      {matchingJob && (
                        <button
                          onClick={() => setSelectedJobForDetail(matchingJob)}
                          className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-semibold"
                          title="View job description"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </h3>
                  </div>

                  {/* Stage Dropdown Selector */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdownId(activeDropdownId === app.id ? null : app.id)
                      }
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border ${colors.badge} hover:brightness-110 transition-all`}
                    >
                      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                      <span>{app.status}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {activeDropdownId === app.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                          Move Stage To:
                        </div>
                        {ALL_STATUSES.map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => {
                              updateApplicationStatus(app.id, st);
                              setActiveDropdownId(null);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-800 transition-colors ${
                              app.status === st
                                ? 'text-blue-400 font-bold bg-blue-500/10'
                                : 'text-slate-300'
                            }`}
                          >
                            <span>{st}</span>
                            {app.status === st && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes & Interview Info Preview */}
                {(app.notes || app.interviewDate) && (
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
                    {app.interviewDate && (
                      <div className="flex items-center gap-2 text-blue-400 font-semibold">
                        <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Interview Scheduled: {app.interviewDate}</span>
                      </div>
                    )}
                    {app.notes && (
                      <p className="text-slate-300 leading-relaxed italic">
                        "{app.notes}"
                      </p>
                    )}
                  </div>
                )}

                {/* Bottom Actions Row */}
                <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-700/40 text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditingApplication(app)}
                      className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      {app.notes || app.interviewDate ? 'Edit Notes / Date' : 'Add Note / Interview'}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Remove application for ${app.jobTitle} from tracker?`)) {
                        deleteApplication(app.id);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors"
                    title="Delete application"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Notes Editing Modal */}
      {editingApplication && (
        <NotesEditModal
          application={editingApplication}
          onSave={(notes, interviewDate) =>
            updateApplicationNotes(editingApplication.id, notes, interviewDate)
          }
          onClose={() => setEditingApplication(null)}
        />
      )}
    </div>
  );
};
