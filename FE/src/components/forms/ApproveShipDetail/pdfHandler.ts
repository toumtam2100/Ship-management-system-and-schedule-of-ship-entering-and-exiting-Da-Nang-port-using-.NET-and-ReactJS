import { retrievePdfFromS3 } from './pdfRetriever'; // assuming retrievePdfFromS3 is exported from this module

export const openPdf = async (attachmentKey: string | null) => {
  if (attachmentKey) {
    try {
      const pdfUrl = await retrievePdfFromS3(attachmentKey);
      if (pdfUrl) {
        const newWindow = window.open('', '_blank');
        if (newWindow) newWindow.location.href = pdfUrl;
      }
    } catch (error) {
      console.error('Error retrieving or opening the PDF:', error);
    }
  }
};

export const getFileNameFromKey = (key: string) => {
  const parts = key.split('/');
  return parts.pop();
};

export const handleDownloadPdf = async (attachmentKey: string | null) => {
  if (attachmentKey) {
    try {
      const pdfUrl = await retrievePdfFromS3(attachmentKey);
      if (pdfUrl) {
        const keyFileName = getFileNameFromKey(attachmentKey);
        const pdfName = keyFileName || 'download.pdf'; // Use key as file name, or a generic name if key is not suitable
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = pdfName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pdfUrl); // Free up object URL
      }
    } catch (error) {
      console.error('Error during PDF retrieval for download:', error);
    }
  }
};
