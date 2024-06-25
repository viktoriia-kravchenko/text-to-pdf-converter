import { FC } from 'react';
import { IHistoryItem } from '../../types/types';

interface HistoryItemProps {
  item: IHistoryItem;
  handleClick: (url: string) => void;
}

export const HistoryItem: FC<HistoryItemProps> = ({ item, handleClick }) => (
  <li className="w-full">
    <button
      onClick={() => handleClick(item.urlKey)}
      className={`
        w-full bg-white hover:bg-gray-100
        font-normal text-sm py-2 px-4 rounded text-left
      `}
    >
      {item.title}
    </button>
  </li>
);
