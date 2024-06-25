import { FC, useEffect, useState } from 'react';
import { IHistoryItem } from '../../types/types';
import { HistoryItem } from '../HistoryItem/HistoryItem';
import { convertBase64StringToBlobURL, getHistoryFromStorage } from '../../utils/helpers';

interface HistoryBlockProps {
  setPdfData: React.Dispatch<React.SetStateAction<string>>;
}

export const HistoryBlock: FC<HistoryBlockProps> = ({ setPdfData }) => {
  const [historyItems, setHistoryItems] = useState<IHistoryItem[]>(
    getHistoryFromStorage,
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setHistoryItems(getHistoryFromStorage());
    };

    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, []);

  const handleClick = (url: string) => {
    const pdfURL = convertBase64StringToBlobURL(url);

    setPdfData(pdfURL);
  };

  return (
    <section className="w-full mb-10 flex flex-col items-center">
      <h3 className="font-semibold text-lg mb-3">
        {`Your converting history${historyItems.length < 1 ? ' will be here' : ''}`}
      </h3>

      <ul className="w-3/4 max-w-sm space-y-1 text-gray-900 list-none">
        {historyItems.map((item: IHistoryItem, index: number) => (
          <HistoryItem item={item} key={index} handleClick={handleClick} />
        ))}
      </ul>
    </section>
  );
};
