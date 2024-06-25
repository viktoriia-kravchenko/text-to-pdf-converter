import { FC } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './PDFViewer.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdfData: string;
}

export const PDFViewer: FC<PDFViewerProps> = ({ pdfData }) => (
  <section className="container">
    <h2 className="header">Your converted PDF</h2>

    <div className="wrapper">
      <div className="document">
        <Document file={pdfData}>
          <Page pageNumber={1} />
        </Document>
      </div>
    </div>
  </section>
);
