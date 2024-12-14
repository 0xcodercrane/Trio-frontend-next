/**
 * Fetch launchpad stats.
 */
export const fetchLaunchpadStatus = async (id: number | undefined) => {
  try {
    const response = await fetch(`/api/launchpad/get-launch-stats/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
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
