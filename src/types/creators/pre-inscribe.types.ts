import * as v from 'valibot';

export const PLACEHOLDER = 'XXX';

export enum ESteps {
  START = 1,
  CHOOSE_TYPE = 2,
  INFORMATION = 3,
  INSCRIPTIONS = 4,
  PHASE = 5,
  SUBMIT = 6
}

export enum ESubmit {
  SUBMIT = 1,
  SUBMITTING = 2,
  SUBMITTED = 3,
  FAILED = 4
}

export enum InscriptionDisplayTypes {
  ID_NAME_ATTRIBUTES = 1,
  ID_NAME = 2,
  ID = 3
}

export enum InscriptionInputTypes {
  UPLOAD = 1,
  MANUAL = 2
}

//information form
export const informationFormSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, 'Collection name must be at least 3 characters long.'),
    v.nonEmpty('Collection name is required.')
  ),
  slug: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, 'Collection slug must be at least 1 character long.'),
    v.nonEmpty('Launchpad slug is required.')
  ),
  description: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(20, 'Collection description must be at least 20 characters long.'),
    v.nonEmpty('Collection description is required.')
  ),
  website_link: v.optional(v.pipe(v.string(), v.trim(), v.url('Please provide a valid URL.'))),
  twitter_link: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.url('Please provide a valid URL.'),
      v.startsWith('https://x.com', 'Please provide a valid X handle (e.g., https://x.com/username).')
    )
  ),
  discord_link: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.url('Please provide a valid URL.'),
      v.startsWith('https://discord', 'Please provide a valid Discord link (e.g., https://discord.gg/...).')
    )
  ),
  telegram_link: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.url('Please provide a valid URL.'),
      v.startsWith('https://t.me', 'Please provide a valid Telegram link (e.g., https://t.me/username).')
    )
  ),
  instagram_link: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.url('Please provide a valid URL.'),
      v.startsWith('https://instagram.com', 'Please provide a valid Instagram link (e.g., https://instagram.com/username).')
    )
  ),
  creator_name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, 'Creator name must be at least 3 characters long.'),
    v.nonEmpty('Creator name is required.')
  ),
  creator_email: v.pipe(
    v.string(),
    v.email('Please provide a valid email address.'),
    v.nonEmpty('Creator email is required.')
  ),
  creator_btc_address: v.pipe(v.string(), v.trim(), v.nonEmpty('Creator BTC address is required.')),
  icon: v.nullable(
    v.pipe(
      v.file('A thumbnail image is required.'),
      v.mimeType(['image/jpeg', 'image/png'], 'Thumbnail must be a JPEG or PNG file.'),
      v.maxSize(1024 * 1024, 'Thumbnail must not exceed 1 MB.')
    )
  ),
  banner_image: v.nullable(
    v.pipe(
      v.file('A banner image is required.'),
      v.mimeType(['image/jpeg', 'image/png'], 'Banner must be a JPEG or PNG file.'),
      v.maxSize(1024 * 1024, 'Banner must not exceed 1 MB.')
    )
  )
});

//inscription form
export const inscriptionFormSchema = v.object({
  inscriptions: v.pipe(
    v.array(
      v.object({
        id: v.pipe(v.string(), v.trim()),
        meta: v.optional(
          v.object({
            attributes: v.optional(
              v.array(
                v.object({
                  value: v.pipe(v.string(), v.trim()),
                  trait_type: v.pipe(v.string(), v.trim())
                })
              )
            ),
            name: v.pipe(v.string(), v.trim()),
            high_res_img_url: v.optional(v.pipe(v.pipe(v.string(), v.trim()), v.url()))
          })
        )
      })
    ),
    v.minLength(1, 'Empty inscription array.')
  ),
  inscriptionsString: v.pipe(v.string(), v.nonEmpty('Inscription Data can not be empty.'))
});

//phase form
export const phaseFormSchema = v.object({
  phases: v.pipe(
    v.array(
      v.object({
        name: v.pipe(v.string(), v.trim(), v.nonEmpty('Phase name is required.')),
        price: v.pipe(v.number(), v.minValue(0, 'Price cannot be negative')),
        allocation: v.pipe(v.number(), v.minValue(1, 'Allocation is required and must be at least 1.')),
        startDate: v.pipe(v.string(), v.nonEmpty('Start date is required.')),
        endDate: v.pipe(v.string(), v.nonEmpty('End date is required.')),
        startTime: v.pipe(v.string(), v.nonEmpty('Start time is required.')),
        endTime: v.pipe(v.string(), v.nonEmpty('End time is required.')),
        isPublic: v.boolean(),
        isSameAllocation: v.boolean(),
        allowList: v.optional(v.string(), 'Allow list is optional but must be a valid string if provided.'),
        isFinished: v.boolean(),
        uuid: v.pipe(v.string(), v.uuid('UUID must be a valid universally unique identifier.'))
      })
    ),
    v.minLength(1, 'There should be at least 1 phase.')
  )
});

export type TInformationFormSchema = v.InferInput<typeof informationFormSchema>;

export type TInscriptionFormSchema = v.InferInput<typeof inscriptionFormSchema>;

export type TPhaseFormSchema = v.InferInput<typeof phaseFormSchema>;

export enum EPSBTStatus {
  UNSIGNED = 'unsigned',
  SIGNED = 'signed'
}

export enum ELaunchpadPhaseStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

export interface IPSBT {
  id: number;
  status: EPSBTStatus;
  phase_id: number;
  batch_number: number;
  inscription_count: number;
}

export interface ILaunchpadPhase {
  id: number;
  launchpad_id: number;
  name: string;
  phase_number: number;
  start_date: number;
  end_date: number;
  status: ELaunchpadPhaseStatus;
  total_inscriptions: number;
  remaining_inscriptions: number;
  is_public: boolean;
  price: number;
  psbts: IPSBT[];
}
