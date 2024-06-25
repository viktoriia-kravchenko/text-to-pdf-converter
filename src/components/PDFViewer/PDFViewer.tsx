import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './PDFViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdfData: string;
}

const PDFViewer = ({ pdfData }: PDFViewerProps) => {
  const [maxNumPages, setMaxNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  type SuccessProps = {
    numPages: number;
  };

  const onDocumentLoadSuccess = ({ numPages }: SuccessProps) => {
    setMaxNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <div className="Example__container">
      <div className="Example__container__document">
        <Document
          file={pdfData}
          className=""
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>

        <div>
          <p>
            Page {pageNumber || (maxNumPages ? 1 : '--')} of{' '}
            {maxNumPages || '--'}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= maxNumPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
