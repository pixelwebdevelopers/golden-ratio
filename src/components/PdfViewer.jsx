import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const calculatedWidth = Math.min(width * 0.95, 1000);

  return (
    <div className="pdf-viewer-container scrolling-view">
      <div className="pdf-document-wrapper">
        <Document 
          file={file} 
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="pdf-loading">Loading Profile...</div>}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="pdf-page-wrapper">
              <Page 
                pageNumber={index + 1} 
                width={calculatedWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading=""
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
