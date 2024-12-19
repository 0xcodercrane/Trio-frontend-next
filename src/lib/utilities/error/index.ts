// The Marketplace API BE defines this as error response, re-defining it here for reference.
interface MarketplaceApiError {
  errors: [{ msg: string }];
}

export const parseMarketplaceApiError = async (response: Response): Promise<string> => {
  const parsedResponse = <MarketplaceApiError>await response.json();
  return parsedResponse.errors.map((errorItem) => errorItem.msg).join('\n');
};
