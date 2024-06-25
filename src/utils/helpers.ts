import { API_KEY, BASE_URL, ENDPOINT } from '../constants/constants';

export const getHistoryFromStorage = () => {
  return JSON.parse(localStorage.getItem('convertingHistory') || '[]');
};

interface IAddToStorage {
  base64String: string;
  inputSlice: string;
}

const addToStorage = ({ base64String, inputSlice }: IAddToStorage) => {
  const convertedItems = getHistoryFromStorage();

  const convertedItem = {
    urlKey: base64String,
    title: inputSlice,
  };

  convertedItems.push(convertedItem);

  localStorage.setItem('convertingHistory', JSON.stringify(convertedItems));

  const event = new CustomEvent('localStorageChange');

  window.dispatchEvent(event);
};

const sliceInput = (input: string) => {
  return input.length > 50 ? `${input.slice(0, 50)}...` : input;
};

export const convertBase64StringToBlobURL = (base64String: string) => {
  const byteCharacters = atob(base64String.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });

  return URL.createObjectURL(blob);
};

interface IConvertBlobURLToBase64String {
  pdfBlob: Blob;
  input: string;
}

const savePdfToStorage = async ({
  pdfBlob,
  input,
}: IConvertBlobURLToBase64String) => {
  const reader = new FileReader();

  reader.readAsDataURL(pdfBlob);

  return new Promise<string>((resolve, reject) => {
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const inputSlice = sliceInput(input);

      addToStorage({ base64String, inputSlice });

      resolve(base64String);
    };

    reader.onerror = reject;
  });
};

export const convertTextToPdf = async (input: string): Promise<string> => {
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

    savePdfToStorage({ pdfBlob, input });

    return pdfURL;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error while fetching pdf: ${error.message}`);
    } else {
      throw new Error(`Error while fetching pdf: ${String(error)}`);
    }
  }
};
