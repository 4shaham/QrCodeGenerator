import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import db from "../Config/dbConnection.js";


export const findAllVouchers=async(req,res)=>{
  try {
    const vouchers = await db.voucher.findAll();
    res.json({vouchers})
  } catch (error) {
    console.log(error)
  }
}


export const createQrGeneratorController = async (req, res) => {
  try {

    const { voucherTitile, fontSize, startDate, expireDate } = req.body;
    const uniqueNumber = `${Date.now().toString().slice(-5)}${Math.floor(
      10000 + Math.random() * 90000
    )}`;
    await db.voucher.create({voucherNumber:uniqueNumber,generatedDate:Date.now(),expiryDate:Date.now(),qrCodeData:`loclahot:4005:`});
    res.json({
      data: "sjsj",
    });

  } catch (error) {
    console.log("Eroror");
  }
};

export const pdfPage = async (req, res, next) => {
  try {
    // Mock voucher data
    const vouchers = [
      {
        number: "1234567890",
        generatedDate: "2025-01-10",
        expiryDate: "2025-01-20",
      },
      {
        number: "9876543210",
        generatedDate: "2025-02-01",       
        expiryDate: "2025-02-15",
      },
      {
        number: "5555555555",
        generatedDate: "2025-03-01",
        expiryDate: "2025-03-31",
      },
      {
        number: "9999999999",
        generatedDate: "2025-04-01",
        expiryDate: "2025-04-30",
      },
    ];

    const voucherIndex = parseInt(req.query.voucherIndex, 10);

    if (
      isNaN(voucherIndex) ||
      voucherIndex < 0 ||
      voucherIndex >= vouchers.length
    ) {
      return res.status(400).json({ error: "Invalid voucher index" });
    }

    const voucher = vouchers[voucherIndex];

    // Set the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=voucher_${voucherIndex}.pdf`
    );
    const url = `https://example.com?number=${voucher.number}`;
    const qrCodeImage = await QRCode.toDataURL(url);

    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF into the response
    doc.pipe(res);

    // Add voucher content to the PDF
    doc.fontSize(20).text("Voucher Details", { align: "center" });
    doc.moveDown();
    doc.text(`Voucher Number: ${voucher.number}`);
    doc.text(`Generated Date: ${voucher.generatedDate}`);
    doc.text(`Expiry Date: ${voucher.expiryDate}`);

    const qrImageBuffer = Buffer.from(qrCodeImage.split(",")[1], "base64");
    doc.image(qrImageBuffer, {
      fit: [150, 150],
      align: "center",
      valign: "center",
    });

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.log(error);
  }
};
