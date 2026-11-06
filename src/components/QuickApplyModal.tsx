import React, { useState } from 'react';
import { Job } from '../types/job';
import { useJobHub } from '../context/JobContext';
import { X, Send, Sparkles, User, Mail, Phone, Globe, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickApplyModalProps {
  job: Job;
  onClose: () => void;
}

export const QuickApplyModal: React.FC<QuickApplyModalProps> = ({ job, onClose }) => {
  const { profile, applyToJob } = useJobHub();

  const [applicantName, setApplicantName] = useState(profile.name);
  const [applicantEmail, setApplicantEmail] = useState(profile.email);
  const [applicantPhone, setApplicantPhone] = useState(profile.phone);
  const [portfolioUrl, setPortfolioUrl] = useState(profile.portfolioUrl);
  const [coverNote, setCoverNote] = useState(
    `Hi ${job.company} Team,\n\nI am thrilled to apply for the ${job.title} role. With my background in ${job.skills.slice(0, 3).join(', ')}, I am excited to bring my experience to your engineering organization and contribute immediately.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const success = applyToJob(job.id, applicantName.trim(), applicantEmail.trim(), coverNote.trim());
      setIsSubmitting(false);
      if (success) {
        setIsSuccess(true);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore if canvas not supported
        }
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {isSuccess ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
            <p className="text-sm text-slate-300 max-w-sm mb-4">
              Your application for <span className="font-semibold text-blue-400">{job.title}</span> at {job.company} has been added to your career tracker.
            </p>
            <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
              Moving to Application Pipeline...
            </span>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-inner"
                  style={{ backgroundColor: job.logoColorHex || '#2563EB' }}
                >
                  {job.company.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      1-Tap Quick Apply
                    </span>
                    <Sparkles className="w-3 h-3 text-blue-400" />
                  </div>
                  <h2 className="text-lg font-bold text-white line-clamp-1">{job.title}</h2>
                  <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Pre-filled Banner */}
            <div className="my-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs">
              <span className="text-blue-300">
                Pre-filled from your profile: <strong className="text-white">{profile.name}</strong>
              </span>
              <span className="text-[11px] text-blue-400 font-semibold underline">
                Editable below
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400" /> Portfolio / LinkedIn
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" /> Note to Hiring Team
                </label>
                <textarea
                  rows={4}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !applicantName || !applicantEmail}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application Now'}
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Auto-registers into your Application Pipeline with real-time status updates.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
