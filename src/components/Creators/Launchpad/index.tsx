'use client';
import { StepItem } from '@/components/common/StepItem';
import { Container } from '@/components/Container';
import {
  ChooseInscriptions,
  DeterminePhases,
  GetStarted,
  informationSchema,
  inscriptionDataSchema,
  phaseDataSchema,
  SubmitInformation,
  SubmitProject,
  TInformationSchema,
  TInscriptionDataSchema,
  TPhaseDataSchema
} from '@/components/Creators';
import { SubmitFailed } from '@/components/Creators/SubmitFailed';
import { Submitted } from '@/components/Creators/Submitted';
import { Submitting } from '@/components/Creators/Submitting';
import Section from '@/components/Section';
import { useForm } from '@tanstack/react-form';
import { valibotValidator } from '@tanstack/valibot-form-adapter';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';

export const launchpadSchema = v.object({
  information: informationSchema,
  inscriptions: inscriptionDataSchema,
  phase: phaseDataSchema
});

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

export interface TPhaseConfig {
  hasWhiteList: boolean;
  title: string;
  hasAddPhase: boolean;
  uuid: string;
  isFinished: boolean;
}

export type TLaunchpadSchema = v.InferInput<typeof launchpadSchema>;

function convertToUnixTimestamp(date: Date, time: string) {
  const [hours, minutes] = time.split(':');
  return date.setHours(Number(hours), Number(minutes)) / 1000;
}

function convertStringAllowListToArray(allowList: string | undefined) {
  return allowList
    ? allowList
        .trim()
        .split('\n')
        .flatMap((line) => line.split(',').map((part) => part.trim()))
        .filter((address) => address)
    : [];
}

export default function Launchpad() {
  const [currentStep, setCurrentStep] = useState<ESteps>(ESteps.START);
  const [submit, setSubmit] = useState<ESubmit>(ESubmit.SUBMIT);

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [phaseConfig, setPhaseConfigData] = useState<TPhaseConfig[]>([
    {
      hasWhiteList: true,
      title: 'Whitelist',
      hasAddPhase: true,
      uuid: uuidv4(),
      isFinished: false
    },
    {
      hasWhiteList: true,
      title: 'Whitelist',
      hasAddPhase: true,
      uuid: uuidv4(),
      isFinished: false
    },
    {
      hasWhiteList: false,
      title: 'Public',
      hasAddPhase: false,
      uuid: uuidv4(),
      isFinished: false
    }
  ]);

  const informationFrom = useForm({
    onSubmit: async ({ value }: { value: TInformationSchema }) => {
      try {
        v.parse(informationSchema, value);
      } catch (error) {
        console.log('Submission error:', error);
      }
    },
    validatorAdapter: valibotValidator()
  });

  const inscriptionFrom = useForm({
    onSubmit: async ({ value }: { value: TInscriptionDataSchema }) => {
      try {
        v.parse(informationSchema, value);
      } catch (error) {
        console.log('Submission error:', error);
      }
    },
    validatorAdapter: valibotValidator()
  });

  const phasesForm = useForm({
    defaultValues: {
      data: [
        { price: 0, allocation: 0, startDate: '', endDate: '', startTime: '', endTime: '', allowList: '' },
        { price: 0, allocation: 0, startDate: '', endDate: '', startTime: '', endTime: '', allowList: '' },
        { price: 0, allocation: 0, startDate: '', endDate: '', startTime: '', endTime: '', allowList: '' }
      ]
    },
    onSubmit: async ({ value }: { value: TPhaseDataSchema }) => {
      try {
        const parsedData = v.parse(phaseDataSchema, value);

        const data = parsedData.data.map((phase) => ({
          price: phase.price,
          allocation: phase.allocation,
          allowList: convertStringAllowListToArray(phase?.allowList),
          startDate: convertToUnixTimestamp(new Date(phase.startDate), phase.startTime),
          endDate: convertToUnixTimestamp(new Date(phase.endDate), phase.endTime)
        }));

        console.log(data);
      } catch (error) {
        console.error('Submission error:', error);
      }
    },
    validatorAdapter: valibotValidator()
  });

  const launchpadFrom = useForm({
    onSubmit: async ({ value }: { value: TLaunchpadSchema }) => {
      try {
        v.parse(informationSchema, value);
      } catch (error) {
        console.log('Submission error:', error);
      }
    },
    validatorAdapter: valibotValidator()
  });

  const renderTitle = () => {
    switch (currentStep) {
      case ESteps.START:
        return '';
      case ESteps.INFORMATION:
        return 'Launch Your Ordinals Collection';
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
        return (
          <SubmitInformation
            setStep={setCurrentStep}
            form={informationFrom}
            bannerPreview={bannerPreview}
            setBannerPreview={setBannerPreview}
            thumbnailPreview={thumbnailPreview}
            setThumbnailPreview={setThumbnailPreview}
          />
        );
      case ESteps.CHOOSE:
        return <ChooseInscriptions setStep={setCurrentStep} form={inscriptionFrom} />;
      case ESteps.DETERMINE:
        return (
          <DeterminePhases
            setStep={setCurrentStep}
            form={phasesForm}
            handleSubmitProject={handleSubmitProject}
            phaseConfig={phaseConfig}
            setPhaseConfigData={setPhaseConfigData}
          />
        );
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

        <div className='mt-8 flex w-full flex-col gap-4 lg:flex-row'>
          <div className='rounded-md bg-ob-grey-light p-4 lg:p-8'>
            <ul className='flex flex-col gap-2'>
              {Object.values(StepConfig).map(({ label }: { label: string }, index: ESteps) => (
                <StepItem key={index} onClick={handleStepClick} label={label} number={index + 1} currentStep={currentStep} />
              ))}
            </ul>
          </div>

          {renderStep()}
        </div>
      </Container>
    </Section>
  );
}
