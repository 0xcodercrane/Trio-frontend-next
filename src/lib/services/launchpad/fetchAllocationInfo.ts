/**
 * Fetch allocation information for the user.
 */
export const fetchAllocationInfo = async (id: number, address: string | undefined) => {
  try {
    const response = await fetch(`/api/launchpad/get-allocation/${id}/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (response.ok && data.status !== 'error') {
      return data;
    }

    return { success: false, error: data.error || 'Unknown error occurred' };
  } catch (error: any) {
    return { success: false, error: error.message || 'An unknown error occurred' };
  }
};
