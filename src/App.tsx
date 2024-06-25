import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import PDFViewer from './components/PDFViewer/PDFViewer';
import { convertToPDF } from './helpers/helpers';

export const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [pdfData, setPdfData] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (input) {
      convertToPDF(input).then((pdfURL: string) => setPdfData(pdfURL));
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(target.value);
  };

  return (
    <div className="app">
      <h1 className="title">Text to PDF converter</h1>
      <p className="description">
        Enter the text you would like to convert to PDF
      </p>

      <div className="input-zone">
        <form onSubmit={handleSubmit}>
          <div>
            <textarea onChange={handleChange} className="" ref={textareaRef} />

            <div className="bottom-container">
              <button type="submit" disabled={!input.trim()} className="btn">
                Convert to PDF
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="output-zone">
        <h2>Your converted PDF</h2>
        <div>{pdfData && <PDFViewer pdfData={pdfData} />}</div>
      </div>
    </div>
  );
};
