import { PDFViewer } from "@react-pdf/renderer";

export default function MyPdfViewer({ children }) {
  return (
    <PDFViewer showToolbar={false} style={{ height: "968px", width: "700px" }}>
      {children}
    </PDFViewer>
  );
}
