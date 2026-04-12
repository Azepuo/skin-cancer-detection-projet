import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportAnalysisPDF = async (
  elementId: string = "analysis-report",
  filename: string = "analysis-report.pdf",
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true, // Important for external images
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190; // A4 is 210mm wide, 10mm margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(filename);
  } catch (error) {
    console.error("PDF Export Error:", error);
  }
};
