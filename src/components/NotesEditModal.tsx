import React, { useState } from 'react';
import { ApplicationRecord } from '../types/job';
import { X, Calendar, FileText, Check } from 'lucide-react';

interface NotesEditModalProps {
  application: ApplicationRecord;
  onSave: (notes: string, interviewDate: string) => void;
  onClose: () => void;
}

export const NotesEditModal: React.FC<NotesEditModalProps> = ({
  application,
  onSave,
  onClose,
}) => {
  const [notes, setNotes] = useState(application.notes || '');
  const [interviewDate, setInterviewDate] = useState(application.interviewDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(notes.trim(), interviewDate.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">Interview & Private Notes</h2>
            <p className="text-xs text-blue-400 font-semibold mt-0.5">
              {application.jobTitle} • {application.company}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" /> Next Interview Date & Time
            </label>
            <input
              type="text"
              placeholder="e.g. Next Tuesday at 2:00 PM PST"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" /> Private Interview & Recruiter Notes
            </label>
            <textarea
              rows={4}
              placeholder="Questions asked, salary discussions, recruiter contacts, technical topics..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
            >
              <Check className="w-4 h-4" /> Save Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
