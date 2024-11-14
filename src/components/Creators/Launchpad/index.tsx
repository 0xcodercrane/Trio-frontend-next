'use client';
import { useState } from 'react';
import Section from '@/components/Section';
import { Container } from '@/components/Container';
import { GetStarted, SubmitInformation, ChooseInscriptions, DeterminePhases, SubmitProject } from '@/components/Creators';
import { StepItem } from '@/components/common/StepItem';
import { Button } from '@/components/ui/button';
import { Submitting } from '@/components/Creators/Submitting';
import { Submitted } from '@/components/Creators/Submitted';
import { SubmitFailed } from '@/components/Creators/SubmitFailed';

export enum ESteps {
  START = 1,
  INFORMATION = 2,
  CHOOSE = 3,
  DETERMINE = 4,
  SUBMIT = 5
}

export enum ESubmit {
  SUBMIT = 1,
  SUBMITTING = 2,
  SUBMITTED = 3,
  FAILED = 4
}

const StepConfig = {
  [ESteps.START]: {
    label: 'Get Started'
  },
  [ESteps.INFORMATION]: {
    label: 'Submit Information'
  },
  [ESteps.CHOOSE]: {
    label: 'Choose Inscriptions'
  },
  [ESteps.DETERMINE]: {
    label: 'Determine Phase'
  },
  [ESteps.SUBMIT]: {
    label: 'Submit Project'
  }
};
export default function Launchpad() {
  const [currentStep, setCurrentStep] = useState<ESteps>(ESteps.START);
  const [submit, setSubmit] = useState<ESubmit>(ESubmit.SUBMIT);

  const renderTitle = () => {
    switch (currentStep) {
      case ESteps.START:
        return '';
      case ESteps.INFORMATION:
        return 'Launch your Ordinals collection';
      case ESteps.CHOOSE:
        return 'Choose Inscriptions';
      case ESteps.DETERMINE:
        return 'Determine Phase';
      case ESteps.SUBMIT:
        switch (submit) {
          case ESubmit.SUBMIT:
            return 'Submit Project';
          case ESubmit.SUBMITTING:
            return 'Submit Your Collection';
          case ESubmit.SUBMITTED:
            return 'View Collection';
          case ESubmit.FAILED:
            return 'View Collection';
        }
      default:
        <>Unimplemented Step</>;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case ESteps.START:
        return <GetStarted setStep={setCurrentStep} />;
      case ESteps.INFORMATION:
        return <SubmitInformation />;
      case ESteps.CHOOSE:
        return <ChooseInscriptions />;
      case ESteps.DETERMINE:
        return <DeterminePhases />;
      case ESteps.SUBMIT:
        switch (submit) {
          case ESubmit.SUBMIT:
            return <SubmitProject />;
          case ESubmit.SUBMITTING:
            return <Submitting />;
          case ESubmit.SUBMITTED:
            return <Submitted />;
          case ESubmit.FAILED:
            return <SubmitFailed />;
        }
      default:
        <>Unimplemented Step</>;
    }
  };

  const handleSubmitProject = () => {
    setSubmit(ESubmit.SUBMITTING);

    try {
      setTimeout(() => {
        setSubmit(ESubmit.SUBMITTED);
      }, 2000);
    } catch (error) {
      setSubmit(ESubmit.FAILED);
    }
  };

  const handleStepClick = (step: ESteps) => {
    setCurrentStep(step);
  };

  return (
    <Section className='bg-ob-purple-darkest'>
      <Container>
        <h2 className='mt-14 font-sans'>{renderTitle()}</h2>

        <div className='mt-8 flex w-full gap-4'>
          <div className='rounded-md bg-ob-grey-light p-8'>
            <ul className='flex flex-col gap-2'>
              {Object.values(StepConfig).map(({ label }: { label: string }, index: ESteps) => (
                <StepItem key={index} onClick={handleStepClick} label={label} number={index} currentStep={currentStep} />
              ))}
            </ul>
          </div>

          {renderStep()}
        </div>

        {currentStep > ESteps.START && currentStep <= ESteps.SUBMIT && submit === ESubmit.SUBMIT && (
          <div className='mt-8 flex justify-center gap-2'>
            <Button onClick={() => setCurrentStep(currentStep - 1)} variant='secondary' size='lg'>
              Previous
            </Button>
            <Button
              onClick={() => {
                if (currentStep + 1 > ESteps.SUBMIT) {
                  handleSubmitProject();
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
              variant='secondary'
              size='lg'
            >
              Next
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
