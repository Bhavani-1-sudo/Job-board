/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { JobProvider, useJobHub } from './context/JobContext';
import { Navbar, NavTab } from './components/Navbar';
import { ExploreView } from './components/ExploreView';
import { ApplicationsView } from './components/ApplicationsView';
import { SavedJobsView } from './components/SavedJobsView';
import { PostJobView } from './components/PostJobView';
import { ProfileView } from './components/ProfileView';
import { JobDetailModal } from './components/JobDetailModal';
import { QuickApplyModal } from './components/QuickApplyModal';
import { GitHubPushModal } from './components/GitHubPushModal';

function JobHubMain() {
  const [activeTab, setActiveTab] = useState<NavTab>('explore');
  const {
    selectedJobForDetail,
    setSelectedJobForDetail,
    selectedJobForApply,
    setSelectedJobForApply,
  } = useJobHub();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-20 md:pb-10 selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {activeTab === 'explore' && <ExploreView />}
        {activeTab === 'applications' && (
          <ApplicationsView onNavigateToExplore={() => setActiveTab('explore')} />
        )}
        {activeTab === 'saved' && (
          <SavedJobsView onNavigateToExplore={() => setActiveTab('explore')} />
        )}
        {activeTab === 'post' && (
          <PostJobView onSuccess={() => setActiveTab('explore')} />
        )}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Detail Modal */}
      {selectedJobForDetail && (
        <JobDetailModal
          job={selectedJobForDetail}
          onClose={() => setSelectedJobForDetail(null)}
        />
      )}

      {/* Quick Apply Modal */}
      {selectedJobForApply && (
        <QuickApplyModal
          job={selectedJobForApply}
          onClose={() => setSelectedJobForApply(null)}
        />
      )}

      {/* GitHub Push & Sync Modal */}
      <GitHubPushModal />
    </div>
  );
}

export default function App() {
  return (
    <JobProvider>
      <JobHubMain />
    </JobProvider>
  );
}
