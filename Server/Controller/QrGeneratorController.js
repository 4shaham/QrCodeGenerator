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

    const {expiryTime,voucherWidth,voucherHeight,fontSizeTitle,fontSizeText} = req.body;
    let currentDate=new Date()
    let expireDate=new Date()
    expireDate.setDate(expireDate.getDate()+expiryTime)

    const voucherTitleArray=[
      "Special Offer",
      "Exclusive Deal",
      "Limited Time Discount",
      "Flash Sale",
      "Seasonal Promotion",
      "Buy One Get One Free",
      "Mega Sale",
      "Exclusive Voucher"
    ];
    const randomIndex = Math.floor(Math.random() * voucherTitleArray.length);

    const uniqueNumber = `${Date.now().toString().slice(-5)}${Math.floor(
      10000 + Math.random() * 90000
    )}`;
    await db.voucher.create({voucherNumber:uniqueNumber,voucherTitle:voucherTitleArray[randomIndex],generatedDate:currentDate,expiryDate:expireDate,qrCodeData:`loclahot:${process.env.PORT}:/api/Qr?id=${uniqueNumber}`,fontSizeTitle,fontSizeText,voucherWidth});
    res.json({ 
      data:"shaham",
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

    const voucherId = req.query.voucherIndex
    const voucher =await db.voucher.findByPk(parseInt(voucherId))
  

  

    // Set the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=voucher_${voucher.dataValues.id}.pdf`
    );
    const url = voucher.dataValues.qrCodeData
    const qrCodeImage = await QRCode.toDataURL(url);

    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF into the response
    doc.pipe(res);

    // Add voucher content to the PDF
    doc.fontSize(20).text("Voucher Details", { align: "center" });
    doc.moveDown();
    doc.text(`Voucher Number: ${voucher.number}`);
    doc.text(`Generated Date: ${voucher.dataValues.generatedDate}`);
    doc.text(`Expiry Date: ${voucher.dataValues.expiryDate}`);

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
