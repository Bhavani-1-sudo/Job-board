import React, { useState } from 'react';
import { WorkType, ExperienceLevel, FilterState } from '../types/job';
import { X, RotateCcw, Check } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  filterState: FilterState;
  onClose: () => void;
  onApply: (workType: WorkType, experienceLevel: ExperienceLevel, minSalary: number) => void;
  onReset: () => void;
}

const WORK_TYPES: WorkType[] = ['All Types', 'Remote', 'Hybrid', 'On-site'];
const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'All Levels',
  'Entry Level',
  'Mid-Level',
  'Senior',
  'Lead / Principal',
];

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  filterState,
  onClose,
  onApply,
  onReset,
}) => {
  const [workType, setWorkType] = useState<WorkType>(filterState.workType);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    filterState.experienceLevel
  );
  const [minSalary, setMinSalary] = useState<number>(filterState.minSalary);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(workType, experienceLevel, minSalary);
    onClose();
  };

  const handleReset = () => {
    setWorkType('All Types');
    setExperienceLevel('All Levels');
    setMinSalary(0);
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white">Filter Opportunities</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Refine roles by workplace setting, level, and compensation
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 py-5">
          {/* Work Arrangement */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
              Work Arrangement
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {WORK_TYPES.map((type) => {
                const isSelected = workType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setWorkType(type)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
              Experience Level
            </label>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_LEVELS.map((level) => {
                const isSelected = experienceLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setExperienceLevel(level)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Min Salary Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Minimum Annual Compensation
              </label>
              <span className="text-sm font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-lg border border-blue-500/20">
                {minSalary === 0 ? 'Any Salary' : `$${minSalary / 1000}k+ / year`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="220000"
              step="10000"
              value={minSalary}
              onChange={(e) => setMinSalary(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
              <span>$0</span>
              <span>$80k</span>
              <span>$140k</span>
              <span>$220k+</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-[2] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
          >
            <Check className="w-4 h-4" /> Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
