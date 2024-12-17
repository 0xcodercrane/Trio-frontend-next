import supabase from '..';

export const getOrdinalAddressFromId = async (id: number) => supabase.from('addresses').select('*').eq('id', id);
