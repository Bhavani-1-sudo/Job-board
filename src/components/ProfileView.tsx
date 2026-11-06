import React, { useState } from 'react';
import { useJobHub } from '../context/JobContext';
import { UserProfile } from '../types/job';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Edit2,
  DollarSign,
  Briefcase,
  Bookmark,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  X,
  Check,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, jobs, applications, savedJobs } = useJobHub();

  const [isEditing, setIsEditing] = useState(false);
  const [expectedSalary, setExpectedSalary] = useState(profile.expectedSalaryMin || 160000);

  // Edit form state
  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [location, setLocation] = useState(profile.location);
  const [bio, setBio] = useState(profile.bio);
  const [skillsStr, setSkillsStr] = useState(profile.skills.join(', '));
  const [portfolioUrl, setPortfolioUrl] = useState(profile.portfolioUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(profile.linkedinUrl);
  const [yearsOfExp, setYearsOfExp] = useState(profile.yearsOfExperience.toString());

  // Count matching jobs where max salary >= expectedSalary
  const matchingJobsCount = jobs.filter((j) => j.salaryMax >= expectedSalary).length;

  const handleSalarySliderChange = (newVal: number) => {
    setExpectedSalary(newVal);
    updateProfile({ ...profile, expectedSalaryMin: newVal });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSkills = skillsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updated: UserProfile = {
      ...profile,
      name: name.trim() || profile.name,
      title: title.trim() || profile.title,
      email: email.trim() || profile.email,
      phone: phone.trim() || profile.phone,
      location: location.trim() || profile.location,
      bio: bio.trim() || profile.bio,
      portfolioUrl: portfolioUrl.trim() || profile.portfolioUrl,
      linkedinUrl: linkedinUrl.trim() || profile.linkedinUrl,
      yearsOfExperience: Number(yearsOfExp) || profile.yearsOfExperience,
      expectedSalaryMin: expectedSalary,
      skills: updatedSkills.length > 0 ? updatedSkills : profile.skills,
    };

    updateProfile(updated);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
              {profile.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {profile.name}
                </h1>
                <span className="p-1 rounded-full bg-blue-500/20 text-blue-400" title="Verified Profile">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <p className="text-base text-blue-400 font-semibold mt-0.5">
                {profile.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.location}</span>
                <span>•</span>
                <span>{profile.yearsOfExperience} Years Experience</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setName(profile.name);
              setTitle(profile.title);
              setEmail(profile.email);
              setPhone(profile.phone);
              setLocation(profile.location);
              setBio(profile.bio);
              setSkillsStr(profile.skills.join(', '));
              setPortfolioUrl(profile.portfolioUrl);
              setLinkedinUrl(profile.linkedinUrl);
              setYearsOfExp(profile.yearsOfExperience.toString());
              setIsEditing(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-white font-bold text-xs border border-slate-600 shadow-sm transition-all"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Bio */}
        <p className="mt-6 text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
          {profile.bio}
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
            <span className="text-2xl font-black text-blue-400 block">
              {applications.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">Applied Roles</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
            <span className="text-2xl font-black text-purple-400 block">
              {savedJobs.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">Saved Bookmarks</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
            <span className="text-2xl font-black text-emerald-400 block">
              ${Math.round(expectedSalary / 1000)}k+
            </span>
            <span className="text-xs text-slate-400 font-medium">Target Comp</span>
          </div>
        </div>
      </div>

      {/* Target Salary Matcher Card */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 sm:p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Target Salary & Market Matcher</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Adjust your minimum compensation goal to see instant matching roles on the board
            </p>
          </div>
          <span className="text-lg font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20 self-start sm:self-auto">
            ${expectedSalary / 1000}k / year
          </span>
        </div>

        <input
          type="range"
          min="80000"
          max="240000"
          step="5000"
          value={expectedSalary}
          onChange={(e) => handleSalarySliderChange(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />

        <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
          <span>$80k / yr</span>
          <span>$160k / yr</span>
          <span>$240k+ / yr</span>
        </div>

        {/* Live matching counter badge */}
        <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-emerald-300">
            <strong className="text-white font-bold">{matchingJobsCount} active openings</strong> on JobHub currently meet or exceed your ${expectedSalary / 1000}k salary goal!
          </span>
        </div>
      </div>

      {/* Skills Cloud & Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Skills */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" /> Verified Core Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-blue-300 border border-slate-700 hover:border-blue-500/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact & Links */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 space-y-3.5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" /> Contact & Portfolios
          </h3>

          <div className="flex items-center gap-3 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
            <Mail className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400">Email:</span>
            <span className="font-semibold text-white truncate">{profile.email}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Phone:</span>
            <span className="font-semibold text-white">{profile.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
            <Globe className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400">Portfolio:</span>
            <a
              href={profile.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-400 hover:underline truncate"
            >
              {profile.portfolioUrl}
            </a>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
            <Linkedin className="w-4 h-4 text-sky-400" />
            <span className="text-slate-400">LinkedIn:</span>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-400 hover:underline truncate"
            >
              {profile.linkedinUrl}
            </a>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">Edit Candidate Profile</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 py-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Professional Headline / Target Role
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={yearsOfExp}
                    onChange={(e) => setYearsOfExp(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Bio / Summary
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={skillsStr}
                  onChange={(e) => setSkillsStr(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
                >
                  <Check className="w-4 h-4" /> Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
