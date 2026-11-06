import React, { useState } from 'react';
import { useJobHub } from '../context/JobContext';
import {
  GitBranch,
  Github,
  X,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  ShieldCheck,
  UploadCloud,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const GitHubPushModal: React.FC = () => {
  const { isGitHubModalOpen, setIsGitHubModalOpen } = useJobHub();

  const [copied, setCopied] = useState(false);
  const [gitToken, setGitToken] = useState('');
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  if (!isGitHubModalOpen) return null;

  const targetRepo = 'https://github.com/varshini-9848-hash/Job-board.git';

  const terminalCommands = `# 1. Ensure git is configured
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 2. Stage and commit all JobHub source files
git add .
git commit -m "feat: complete JobHub job board application and pipeline"

# 3. Ensure branch is main and remote is set
git branch -M main
git remote set-url origin https://github.com/varshini-9848-hash/Job-board.git

# 4. Push code to GitHub (use Personal Access Token when prompted for password)
git push -u origin main`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(terminalCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePushWithToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gitToken.trim()) return;

    setIsPushing(true);
    setPushStatus({ type: 'idle' });

    try {
      const response = await fetch('/api/git-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoUrl: targetRepo,
          token: gitToken.trim(),
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setPushStatus({
          type: 'success',
          message: data.message || 'Successfully pushed JobHub codebase to repository!',
        });
      } else {
        setPushStatus({
          type: 'error',
          message: data.error || 'Push failed. Please verify your token permissions (repo scope).',
        });
      }
    } catch {
      // In case server route is not handling or dev environment standalone
      setPushStatus({
        type: 'error',
        message:
          'Direct HTTP push endpoint unavailable in client-only mode. Use the one-click copyable terminal command below with your token.',
      });
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  GitHub Repository Sync
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ready to Push
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Push JobHub into GitHub
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsGitHubModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Destination Box */}
        <div className="my-5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Target GitHub Repository:</span>
            <span className="text-sm font-mono font-bold text-blue-300 break-all select-all">
              {targetRepo}
            </span>
          </div>
          <a
            href="https://github.com/varshini-9848-hash/Job-board"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-white font-semibold flex-shrink-0 transition-colors"
          >
            Open in GitHub <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Status feedback if any */}
        {pushStatus.type === 'success' && (
          <div className="mb-4 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-semibold">{pushStatus.message}</span>
          </div>
        )}

        {pushStatus.type === 'error' && (
          <div className="mb-4 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <span className="text-xs font-semibold">{pushStatus.message}</span>
          </div>
        )}

        {/* Option A: Direct Push with GitHub Token */}
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Option 1: 1-Click Push with GitHub Personal Access Token
              </h3>
            </div>
            <a
              href="https://github.com/settings/tokens/new?scopes=repo&description=JobHub+Push"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 font-semibold"
            >
              Generate Token <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <form onSubmit={handlePushWithToken} className="flex gap-2">
            <input
              type="password"
              placeholder="Paste GitHub Personal Access Token (ghp_...)"
              value={gitToken}
              onChange={(e) => setGitToken(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isPushing || !gitToken.trim()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/25 transition-all flex-shrink-0"
            >
              {isPushing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Pushing...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Push to GitHub</span>
                </>
              )}
            </button>
          </form>
          <p className="text-[11px] text-slate-400">
            Requires standard <code className="text-blue-300">repo</code> write scope.
          </p>
        </div>

        {/* Option B: Copy Terminal Commands */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Option 2: Terminal / Command Line Push
            </span>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Commands</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed select-all">
            {terminalCommands}
          </pre>
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Repository origin configured in local git tree
          </span>
          <button
            onClick={() => setIsGitHubModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
