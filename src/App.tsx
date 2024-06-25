import { FC, useState } from 'react';
import { UserInputBlock } from './components/UserInputBlock/UserInputBlock';
import { HistoryBlock } from './components/HistoryBlock/HistoryBlock';
import { PDFViewer } from './components/PDFViewer/PDFViewer';

export const App: FC = () => {
  const [pdfData, setPdfData] = useState<string>('');

  return (
    <div className="p-14">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-8">Text to PDF Converter</h1>

        <UserInputBlock setPdfData={setPdfData} />

        <HistoryBlock setPdfData={setPdfData} />

        {pdfData && <PDFViewer pdfData={pdfData} />}
      </div>
    </div>
  );
};
