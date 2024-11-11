import { ESteps } from '@/components/Creators';
import React, { useMemo } from 'react';

export const StepItem: React.FC<{
  label: string;
  number: ESteps;
  currentStep: ESteps;
  onClick: (step: ESteps) => void;
}> = ({ label, number, currentStep, onClick }) => {
  const isCurrent = useMemo(() => currentStep === number, [currentStep, number]);
  const isCompleted = useMemo(() => currentStep > number, [currentStep, number]);

  return (
    <li
      onClick={() => onClick(number)}
      className={`group flex min-h-16 min-w-72 cursor-pointer items-center gap-2 rounded-md px-5 py-2 font-sans transition-all duration-200 hover:bg-[#353535] hover:text-white ${
        isCurrent ? 'bg-[#353535] text-white' : isCompleted ? 'text-white' : 'text-ob-text-grey'
      }`}
    >
      <span
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-full text-sm font-bold ${
          isCurrent || isCompleted
            ? 'bg-grey-light text-white'
            : 'group-hover:bg-grey-light bg-ob-grey-lighter/30 text-ob-text-grey group-hover:text-white'
        }`}
      >
        {number}
      </span>
      {label}
    </li>
  );
};
