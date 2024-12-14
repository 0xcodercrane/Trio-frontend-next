import supabase from '..';

const LAUNCHPAD_QUERY = `
  *
`;

export const getLaunchpadBySlug = async (slug: string) =>
  supabase.from('launchpads').select(LAUNCHPAD_QUERY).eq('slug', slug).limit(1);
