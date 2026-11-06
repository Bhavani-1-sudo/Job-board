# JobHub — Tech Job Board & Career Pipeline Tracker

A modern, high-polish Tech Job Board and Career Application Pipeline tracker built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Express**.

Ported from [mallapragadavarshini-design/job-board](https://github.com/mallapragadavarshini-design/job-board) with 100% feature fidelity, reactive local storage persistence, responsive Material 3 design tokens, and git synchronization targeting [varshini-9848-hash/Job-board](https://github.com/varshini-9848-hash/Job-board.git).

---

## 🌟 Key Features

### 1. Curated Tech Exploration
- **Live Tech Feed**: Verified opportunities across Mobile (Android/iOS), AI & Machine Learning, Backend, Frontend, Cloud & DevOps, Data Science, and UI/UX Design.
- **Featured Opportunities Carousel**: Promoted high-impact openings with quick status highlights.
- **Instant Multi-Field Search**: Real-time fuzzy filtering across job title, required tech stack chips, company name, and location.

### 2. Multi-Criteria Filtering
- **Category Filter Pills**: Quickly toggle between Engineering, Mobile, AI/ML, Design, Backend, etc.
- **Filter Modal**:
  - Workplace setting: Remote, Hybrid, or On-site.
  - Seniority Level: Entry Level, Mid-Level, Senior, or Lead/Principal.
  - Interactive Target Compensation Slider ($0 to $220k+/yr).

### 3. Interactive Job Details Modal
- Full job specifications, salary ranges, location, and workplace flexibility.
- Daily responsibilities bullet points with checkmarks.
- Qualifications and required technical capabilities.
- Perks and benefits cards.
- Company size and website link.
- 1-click job sharing (copies description to clipboard) and bookmarking.

### 4. 1-Tap Quick Apply Flow
- Interactive application modal pre-filled from candidate profile.
- Customizable cover note to the hiring team.
- Confetti celebration upon submission (`canvas-confetti`).
- Instantly increments applicant count and registers in the Application Pipeline.

### 5. Kanban-Style Application Pipeline Tracker
- **Stage Metrics**: Total Submitted, In Review, Interviewing, Offer Received, and Archived.
- **Interactive Stage Advancer**: Progress applications between recruitment stages with 1 click.
- **Private Notes & Interview Scheduler**: Record recruiter details, interview questions, and scheduled interview dates.
- Delete or archive applications with confirmation.

### 6. Bookmarked Positions
- Save roles for review with persistent local storage.
- Summary metrics displaying total saved and average compensation of saved positions.

### 7. Post a Job (Recruiter / Employer Flow)
- Form allowing employers to publish new vacancies to the board with custom roles, salary ranges, skills tags, and requirements.
- Includes an **"Auto-fill Demo Role"** button for rapid demonstration.

### 8. Candidate Profile & Target Salary Matcher
- Candidate profile with editable bio, contact information, and core skills cloud.
- **Real-Time Market Salary Matcher**: Interactive slider calculating live how many active openings meet or exceed the candidate's compensation target.

---

## 🚀 Pushing to GitHub

The local Git repository is already initialized with branch `main` and remote `origin` configured to:
`https://github.com/varshini-9848-hash/Job-board.git`

### Option 1: In-App 1-Click Push
1. Click the **"Push to GitHub"** button in the top navigation bar.
2. Enter your [GitHub Personal Access Token](https://github.com/settings/tokens/new?scopes=repo) (with `repo` write scope).
3. Click **"Push to GitHub"**.

### Option 2: Terminal / Command Line
Run the following in your terminal:
```bash
git add -A
git commit -m "feat: complete JobHub job board and application tracker"
git branch -M main
git remote set-url origin https://github.com/varshini-9848-hash/Job-board.git
git push -u origin main
```

---

## 🛠 Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend / Dev Server**: Node.js, Express, TSX, Vite
- **Storage**: Reactive LocalStorage state with optimistic updates
