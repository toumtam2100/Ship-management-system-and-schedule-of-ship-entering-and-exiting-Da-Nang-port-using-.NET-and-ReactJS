import { jsPDF } from 'jspdf';
import beVietnamProRegularFontBase64 from './font-regular';
import beVietnamProBoldFontBase64 from './font-bold';
import { uploadFileToS3 } from './PDFDepart.utils';
import { removeVietnameseDiacritics } from './diacritics.utls';

// Define an interface for submitRegistry's expected shape
interface SubmitRegistry {
  captainName: string;
  ownerName: string;
  shipName: string;
  registerNumber: string;
  grossTonnage: string;
  departureTime: string; // Ensure the date is formatted as a string
  // Add other fields as needed
}

export const generatePDFDepart = async (submitRegistry: SubmitRegistry) => {
  console.log('Data nhan duoc trong PDF', submitRegistry);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  //Extract day, month, year from ISO string of ARRIVAL DAY
  const departDate = new Date(submitRegistry.departureTime);
  const departYear = departDate.getFullYear();
  const departMonth = departDate.getMonth() + 1; // JavaScript months are 0-indexed
  const departDay = departDate.getDate();

  //Get current day of the Form
  const currentDate = new Date();
  const currentDay = currentDate.getDate(); // Get the day of the month (1-31)
  const currentMonth = currentDate.getMonth() + 1; // Get the month (0-11, +1 because getMonth() is zero-indexed)
  const currentYear = currentDate.getFullYear(); // Get the year (four digits)

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageCenterX = pageWidth / 2; // Center of the page

  // Chia đôi page cho group license
  const leftHalfCenterX = pageWidth / 4; // 52.5mm
  let rightHalfCenterX = (3 * pageWidth) / 4; // Initially 157.5mm

  // Đây là nơi để chỉnh vị trí của Group "Cộng hòa xã hội chủ nghĩa việt nam"
  rightHalfCenterX -= 18; // Adjust as needed to shift left

  //Đây là nơi chỉnh vị trí của group "Cục hàng hải Việt Nam"
  const titleYPosition = 20;
  //Khoảng cách giữa các dòng của group "Cục hàng hải Việt Nam"
  const initialYPosition = 80;
  const lineHeight = 3;

  // Chỉnh vị trí của text "Giấy phép vào cảng"
  const gapBeforeLicenseText = 20; // Adjust this so it looks good based on your layout
  const licenseTextYPosition = titleYPosition + lineHeight * 8 + gapBeforeLicenseText;

  // Calculate the left alignment starting position
  const leftMargin = 20; // You can adjust this as needed

  // Increase the line height to provide more space between lines
  const increasedLineHeight = 10;

  // Initialize the Y position for the "Cho phép thuyền trưởng:" line
  let currentYPosition = 80; // You can adjust this as needed

  // Regular font
  doc.addFileToVFS('BeVietnamPro-Regular.ttf', beVietnamProRegularFontBase64);
  doc.addFont('BeVietnamPro-Regular.ttf', 'BeVietnamPro', 'normal');

  // Bold font
  doc.addFileToVFS('BeVietnamPro-Bold.ttf', beVietnamProBoldFontBase64);
  doc.addFont('BeVietnamPro-Bold.ttf', 'BeVietnamPro', 'bold');

  doc.setFontSize(12);

  // Left column text centered in the left half
  doc.setFont('BeVietnamPro', 'bold'); // Set to bold for the title
  doc.text('CỤC HÀNG HẢI VIỆT NAM', leftHalfCenterX, titleYPosition, { align: 'center' });

  doc.setFont('BeVietnamPro', 'normal'); // Set back to normal for other texts
  doc.text('DỊCH VỤ HÀNG HẢI ĐÀ NẴNG', leftHalfCenterX, titleYPosition + lineHeight * 2, { align: 'center' });
  doc.text('------------------', leftHalfCenterX, titleYPosition + lineHeight * 4, { align: 'center' });
  doc.text('Số:............./GP', leftHalfCenterX, titleYPosition + lineHeight * 8, { align: 'center' });

  // Right column text centered in the right half
  doc.setFont('BeVietnamPro', 'bold'); // Set to bold for the right group title as well
  doc.text('CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM', rightHalfCenterX, titleYPosition, { align: 'center' });

  // Normal font for other texts
  doc.setFont('BeVietnamPro', 'normal');
  doc.text('Độc lập- Tự do - Hạnh phúc', rightHalfCenterX, titleYPosition + lineHeight * 2, { align: 'center' });
  doc.text('------------------', rightHalfCenterX, titleYPosition + lineHeight * 4, { align: 'center' });

  doc.setFontSize(18);
  doc.setFont('BeVietnamPro', 'bold'); // You can set the font to bold if that is desired
  doc.text('GIẤY PHÉP RỜI CẢNG', pageCenterX, licenseTextYPosition, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('BeVietnamPro', 'normal');

  const textLines = [
    `Cho phép thuyền trưởng: ${submitRegistry.captainName || ''}`,
    `Chủ tàu cá: ${submitRegistry.ownerName || ''}`,
    `Tên phương tiện: ${submitRegistry.shipName || ''}`,
    `Số đăng ký: ${submitRegistry.registerNumber || ''}`,
    `Trọng tải: ${submitRegistry.grossTonnage || ''} tấn`,
    `Thời gian rời cảng: dự kiến ngày ${departDay} tháng ${departMonth} năm ${departYear}`, // Format the date
    // Add more lines as needed
  ];

  // Add each line of text, incrementing the Y position each time
  textLines.forEach((line) => {
    doc.text(line, leftMargin, currentYPosition);
    currentYPosition += increasedLineHeight; // Increment the Y position for each new line
  });

  // Define right margin and calculate position for the date line
  const rightMargin = 24; // Margin from the right side of the page
  const dateLineXPosition = pageWidth - rightMargin; // Position X for right alignment
  const dateYPosition = currentYPosition + 8; // You can adjust this as necessary

  // Adding the date line with right alignment
  doc.text(`Đà Nẵng, ngày ${currentDay} tháng ${currentMonth} năm ${currentYear}.`, dateLineXPosition, dateYPosition, {
    align: 'right',
  });

  // Set the location for the "XÁC NHẬN" text lines
  const leftTextXPosition = 20; // X position for left-aligned text
  const rightTextXPosition = doc.internal.pageSize.getWidth() - 20; // X position for right-aligned text
  const confirmationsYPosition = currentYPosition + 24; // Y position for confirmations, adjust 30 as needed

  doc.setFontSize(12);
  doc.setFont('BeVietnamPro', 'bold');
  doc.text('XÁC NHẬN CỦA BỘ ĐỘI BIÊN PHÒNG', leftTextXPosition, confirmationsYPosition, { align: 'left' });
  doc.text('XÁC NHẬN CỦA CHI CỤC THỦY SẢN', rightTextXPosition, confirmationsYPosition, { align: 'right' });

  // Replace all white spaces in the ship name with an empty string
  const compressedShipName = removeVietnameseDiacritics(submitRegistry.shipName?.replace(/\s+/g, ''));
  // Construct the filename using the ship name from submitRegistry
  const fileName = `${compressedShipName}-register-${currentYear}-${currentMonth}-${currentDay}.pdf`;

  // Output the PDF as a blob
  const pdfBlob = doc.output('blob');

  // Instead of saving, now upload to S3
  try {
    // Attempt to upload the PDF and get the file key from the response
    const response = await uploadFileToS3(pdfBlob, fileName);
    console.log('Successfully uploaded PDF to S3: ', response);
    // Typically, the file key would be in the response object, e.g., response.key
    const s3FileKey = response.Key;
    return s3FileKey; // Return the file key for further processing
  } catch (error) {
    console.error('Failed to upload PDF to S3:', error);
    // Handle the upload error, possibly by rethrowing it, or returning a sentinel value
    throw error;
  }
};
