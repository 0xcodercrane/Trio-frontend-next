import React, { useMemo } from 'react';
import { ESteps } from '@/types/creators';

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
      onClick={() => {
        onClick(number);
      }}
      className={`group flex min-h-16 min-w-72 cursor-pointer items-center gap-2 rounded-md px-4 py-2 font-sans transition-all duration-200 lg:px-5 ${
        isCurrent ? 'bg-ob-purple text-white' : isCompleted ? 'text-white' : 'text-ob-text-grey'
      }`}
    >
      {isCompleted ? (
        <svg width='30' height='31' viewBox='0 0 30 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect y='0.5' width='30' height='30' rx='15' fill='#33FF81' />
          <path
            d='M13.9231 20C13.6767 20 13.4451 19.904 13.2705 19.7297L9.27045 15.7296C9.09616 15.5552 9 15.3234 9 15.0769C9 14.8303 9.09616 14.5985 9.27045 14.4242C9.44473 14.2498 9.67669 14.1539 9.92309 14.1539C10.1695 14.1539 10.4015 14.2498 10.5757 14.4241L13.9231 17.7715L19.4244 12.2703C19.5987 12.0959 19.8306 12 20.077 12C20.3234 12 20.5554 12.0959 20.7297 12.2702C20.904 12.4446 21.0001 12.6765 21.0001 12.923C21.0001 13.1696 20.904 13.4014 20.7297 13.5757L14.5758 19.7296C14.4012 19.904 14.1695 20 13.9231 20Z'
            fill='black'
          />
        </svg>
      ) : (
        <span
          className={`flex h-[30px] w-[30px] items-center justify-center rounded-full text-sm font-bold ${
            isCurrent ? 'bg-ob-purple-light text-white' : 'bg-ob-purple-light/50 text-ob-text-grey'
          }`}
        >
          {number}
        </span>
      )}

      {label}
    </li>
  );
};
