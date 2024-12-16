'use client';
import { AuthContext } from '@/app/providers/AuthContext';
import { StepItem } from '@/components/common/StepItem';
import { Container } from '@/components/Container';
import { ChooseInscriptions, DeterminePhases, GetStarted, SubmitInformation, SubmitProject } from '@/components/Creators';
import { SubmitFailed } from '@/components/Creators/SubmitFailed';
import { Submitted } from '@/components/Creators/Submitted';
import { Submitting } from '@/components/Creators/Submitting';
import Section from '@/components/Section';
import { convertStringAllowListToArray } from '@/lib/utilities/convertStringAllowListToArray';
import { convertToUnixTimestamp } from '@/lib/utilities/convertToUnixTimestamp';
import { uploadImageAndGetURL } from '@/lib/utilities/uploadImageAndGetURL';
import { IWallet } from '@/types';
import {
  ESteps,
  ESubmit,
  informationFormSchema,
  inscriptionFormSchema,
  InscriptionInputTypes,
  phaseFormSchema,
  TInformationFormSchema,
  TInscriptionFormSchema,
  TPhaseFormSchema
} from '@/types/creators';
import { useForm } from '@tanstack/react-form';
import { valibotValidator } from '@tanstack/valibot-form-adapter';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';
import { ChooseLaunchType } from '../ChooseLaunchType';
import { auth } from '@/lib/firebase';
import { stringToLaunchpadSlug } from '@/lib/utilities/launchpad';

const StepConfig = {
  [ESteps.START]: {
    label: 'Get Started'
  },
  [ESteps.CHOOSE_TYPE]: {
    label: 'Choose Launch Type'
  },
  [ESteps.INFORMATION]: {
    label: 'Submit Information'
  },
  [ESteps.INSCRIPTIONS]: {
    label: 'Choose Inscriptions'
  },
  [ESteps.PHASE]: {
    label: 'Determine Phase'
  },
  [ESteps.SUBMIT]: {
    label: 'Submit Project'
  }
};

const informationDefaultValues = {
  name: '',
  slug: '',
  description: '',
  creator_name: '',
  creator_btc_address: '',
  creator_email: '',
  icon: null,
  banner_image: null
};

const phasesDefaultValues = {
  phases: [
    {
      name: 'Whitelist Sale',
      price: NaN,
      allocation: 1,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      isPublic: false,
      isSameAllocation: true,
      isFinished: false,
      allowList: '',
      uuid: uuidv4()
    },
    {
      name: 'Whitelist Sale',
      price: NaN,
      allocation: 1,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      isPublic: false,
      isSameAllocation: true,
      isFinished: false,
      allowList: '',
      uuid: uuidv4()
    },
    {
      name: 'Public Sale',
      price: NaN,
      allocation: 1,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      isPublic: true,
      isSameAllocation: true,
      isFinished: false,
      uuid: uuidv4()
    }
  ]
};

const prepareRequestBody = async (
  meta: TInformationFormSchema,
  data: TInscriptionFormSchema['inscriptions'],
  phases: TPhaseFormSchema['phases'],
  wallet: IWallet | null
) => {
  const collectionSlug = stringToLaunchpadSlug(meta.name);
  const launchpadSlug = stringToLaunchpadSlug(meta.slug);
  const storagePath = `/launchpad/${auth?.currentUser?.uid}/${collectionSlug}/`;
  const iconImgUrl = meta?.icon ? await uploadImageAndGetURL(meta?.icon, storagePath) : '';
  const bannerImgUrl = meta?.banner_image ? await uploadImageAndGetURL(meta?.banner_image, storagePath) : '';

  if (!meta?.website_link) delete meta.website_link;
  if (!meta?.discord_link) delete meta.discord_link;
  if (!meta?.telegram_link) delete meta.telegram_link;
  if (!meta?.instagram_link) delete meta.instagram_link;
  if (!meta?.twitter_link) delete meta.twitter_link;

  const metaWithOptionalIcon = {
    ...meta,
    banner_image: bannerImgUrl,
    slug: launchpadSlug,
    ...(iconImgUrl && { icon: iconImgUrl })
  };

  const phasesData = phases.map((phase) => {
    const basePhase = {
      name: phase.name,
      price: Number(phase.price),
      startDate: convertToUnixTimestamp(new Date(phase.startDate), phase.startTime),
      endDate: convertToUnixTimestamp(new Date(phase.endDate), phase.endTime),
      isPublic: phase.isPublic
    };

    if (!phase.isPublic) {
      return {
        ...basePhase,
        allowList: convertStringAllowListToArray(phase.allowList, Number(phase.allocation), phase.isSameAllocation)
      };
    }
    return basePhase;
  });

  return {
    makerPaymentAddress: wallet?.paymentAddress,
    makerPaymentPublicKey: wallet?.paymentPublicKey,
    makerOrdinalPublicKey: wallet?.ordinalsPublicKey,
    makerOrdinalAddress: wallet?.ordinalsAddress,
    meta: metaWithOptionalIcon,
    data,
    slug: collectionSlug,
    phases: phasesData
  };
};

const preparePhaseParse = (phases: TPhaseFormSchema['phases']) => {
  return phases.map((p) => ({
    name: p.name,
    price: Number(p.price),
    allocation: Number(p.allocation),
    startDate: p.startDate,
    endDate: p.endDate,
    startTime: p.startTime,
    endTime: p.endTime,
    isPublic: p.isPublic,
    isSameAllocation: p.isSameAllocation,
    isFinished: p.isFinished,
    allowList: p.allowList,
    uuid: p.uuid
  }));
};

export default function Launchpad() {
  const { wallet, isAuthenticated } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState<ESteps>(ESteps.START);
  const [submit, setSubmit] = useState<ESubmit>(ESubmit.SUBMIT);

  const [bannerPreview, setBannerPreview] = useState<string | null | undefined>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null | undefined>(null);

  const [uploadTab, setUploadTab] = useState<InscriptionInputTypes>(InscriptionInputTypes.UPLOAD);

  const [launchpadId, setLaunchpadId] = useState<string>('');

  const informationForm = useForm({
    defaultValues: {
      ...informationDefaultValues,
      creator_btc_address: wallet?.ordinalsAddress && isAuthenticated ? wallet?.ordinalsAddress : ''
    },
    onSubmit: async ({ value }: { value: TInformationFormSchema }) => {
      try {
        v.parse(informationFormSchema, value);
        setCurrentStep(ESteps.INSCRIPTIONS);
      } catch (error: any) {
        if (error?.message) {
          toast.error(error?.message);
        } else {
          toast.error(error.toString());
        }
      }
    },
    validatorAdapter: valibotValidator()
  });

  const inscriptionForm = useForm({
    onSubmit: async ({ value }: { value: TInscriptionFormSchema }) => {
      try {
        v.parse(inscriptionFormSchema, value);
        setCurrentStep(ESteps.PHASE);
      } catch (error: any) {
        if (error?.message) {
          toast.error(error?.message);
        } else {
          toast.error(error.toString());
        }
      }
    },
    validatorAdapter: valibotValidator()
  });

  const phasesForm = useForm({
    defaultValues: phasesDefaultValues,
    onSubmit: async ({ value }: { value: TPhaseFormSchema }) => {
      try {
        const phases = preparePhaseParse(value.phases);
        v.parse(phaseFormSchema, { phases });
        await handleSubmit();
      } catch (error: any) {
        if (error?.message) {
          toast.error(error?.message);
        } else {
          toast.error(error.toString());
        }
      }
    },
    validatorAdapter: valibotValidator()
  });

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast.error('Please connect wallet.');
      return;
    }

    if (!wallet) {
      toast.error('Wallet is not configured correctly.');
      return;
    }

    try {
      const phases = preparePhaseParse(phasesForm.state.values.phases);

      const parsedMeta = v.parse(informationFormSchema, informationForm.state.values);
      const parsedData = v.parse(inscriptionFormSchema.entries.inscriptions, inscriptionForm.state.values.inscriptions);
      const parsedPhase = v.parse(phaseFormSchema.entries.phases, phases);
      const launchpadData = await prepareRequestBody(parsedMeta, parsedData, parsedPhase, wallet);

      const response = await fetch('/api/launchpad/create', {
        method: 'POST',
        body: JSON.stringify({ launchpadData })
      });

      if (!response.ok) {
        const resJson = await response.json();
        throw new Error(resJson?.error || 'Failed to create a launchpad.');
      }

      const res = await response.json();

      if (res?.launchpadId) {
        setLaunchpadId(res?.launchpadId);
        setCurrentStep(ESteps.SUBMIT);
      }
    } catch (error) {
      toast.error(`Submission error:, ${error}`);
    }
  };

  const renderTitle = () => {
    switch (currentStep) {
      case ESteps.START:
        return '';
      case ESteps.INFORMATION:
        return 'Launch Your Ordinals Collection';
      case ESteps.INSCRIPTIONS:
        return 'Choose Inscriptions';
      case ESteps.PHASE:
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

  const handleStepClick = (step: ESteps) => {
    setCurrentStep(step);
  };

  const handleLaunch = () => {
    setSubmit(ESubmit.SUBMITTING);

    try {
      setTimeout(() => {
        setSubmit(ESubmit.SUBMITTED);
      }, 3000);
    } catch (error) {
      setSubmit(ESubmit.FAILED);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case ESteps.START:
        return <GetStarted setStep={setCurrentStep} />;
      case ESteps.CHOOSE_TYPE:
        return <ChooseLaunchType setStep={setCurrentStep} />;
      case ESteps.INFORMATION:
        return (
          <SubmitInformation
            setStep={setCurrentStep}
            form={informationForm}
            bannerPreview={bannerPreview}
            setBannerPreview={setBannerPreview}
            thumbnailPreview={thumbnailPreview}
            setThumbnailPreview={setThumbnailPreview}
          />
        );
      case ESteps.INSCRIPTIONS:
        return (
          <ChooseInscriptions
            setStep={setCurrentStep}
            form={inscriptionForm}
            uploadTab={uploadTab}
            setUploadTab={setUploadTab}
          />
        );
      case ESteps.PHASE:
        return <DeterminePhases setStep={setCurrentStep} form={phasesForm} />;
      case ESteps.SUBMIT:
        switch (submit) {
          case ESubmit.SUBMIT:
            return <SubmitProject launchpadId={launchpadId} setStep={setCurrentStep} launch={handleLaunch} />;
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

  return (
    <Section className='bg-ob-purple-darkest'>
      <Container>
        <h2 className='mt-14 font-sans'>{renderTitle()}</h2>
        <div className='mt-8 flex w-full flex-col gap-4 lg:flex-row'>
          <div className='rounded-md bg-ob-purple-dark p-4 lg:p-8'>
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
