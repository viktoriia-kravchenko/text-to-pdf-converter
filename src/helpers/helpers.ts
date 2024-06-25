const BASE_URL = 'http://95.217.134.12:4010';
const ENDPOINT = '/create-pdf';
const API_KEY = '78684310-850d-427a-8432-4a6487f6dbc4';

export const convertToPDF = async (input: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINT}?apiKey=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: input,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }

    const pdfBlob = await response.blob();
    const pdfURL = URL.createObjectURL(pdfBlob);

    return pdfURL;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error while fetching pdf: ${error.message}`);
    } else {
      throw new Error(`Error while fetching pdf: ${String(error)}`);
    }
  }
};
