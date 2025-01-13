import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import db from "../Config/dbConnection.js";
import { Op } from "sequelize";

export const findAllVouchers = async (req, res) => {
  try {
    const vouchers = await db.voucher.findAll();
    res.json({ vouchers });
  } catch (error) {
    console.log(error);
  }
};

export const createQrGeneratorController = async (req, res) => {
  try {
    const {
      expiryTime,
      voucherWidth,
      voucherHeight,
      fontSizeTitle,
      fontSizeText,
    } = req.body;

    let currentDate = new Date();
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + parseInt(expiryTime));

    const voucherTitleArray = [
      "Special Offer",
      "Exclusive Deal",
      "Limited Time Discount",
      "Flash Sale",
      "Seasonal Promotion",
      "Buy One Get One Free",
      "Mega Sale",
      "Exclusive Voucher",
    ];

    const randomIndex = Math.floor(Math.random() * voucherTitleArray.length);
    const uniqueNumber = `${Date.now().toString().slice(-5)}${Math.floor(
      10000 + Math.random() * 90000
    )}`;

    await db.voucher.create({
      voucherNumber: uniqueNumber,
      voucherTitle: voucherTitleArray[randomIndex],
      generatedDate: currentDate,
      expiryDate: expireDate,
      qrCodeData: `loclahot:${process.env.PORT}:/api/Qr?id=${uniqueNumber}`,
      fontSizeTitle,
      fontSizeText,
      voucherWidth,
    });
    res.json({
      data: "shaham",
    });
  } catch (error) {
    console.log("Eroror");
  }
};

export const pdfPage = async (req, res, next) => {
  try {
    const voucherId = req.query.voucherIndex;
    const voucher = await db.voucher.findByPk(parseInt(voucherId));

    // Set the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=voucher_${voucher.dataValues.id}.pdf`
    );

    //Qr Image Creation
    const url = `loclahot:${process.env.PORT}:/api/Qr?id=${voucher.dataValues.id}`;
    const qrCodeImage = await QRCode.toDataURL(url);

    console.log(voucher.dataValues, "datas for oBject");

    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF into the response
    doc.pipe(res);

    // Add voucher content to the PDF
    doc
      .fontSize(parseInt(voucher.dataValues.fontSizeTitle))
      .text("Voucher Details", { align: "center" });
    doc.moveDown();
    doc
      .fontSize(parseInt(voucher.dataValues.fontSizeText))
      .text(`Voucher Title: ${voucher.voucherTitle}`);
    doc
      .fontSize(parseInt(voucher.dataValues.fontSizeText))
      .text(
        `Generated Date: ${voucher.dataValues.generatedDate.toString()}`
      );
    doc
      .fontSize(parseInt(voucher.dataValues.fontSizeText))
      .text(
        `Expiry Date: ${voucher.dataValues.expiryDate.toString().split("T")[0]}`
      );
  
    const qrImageBuffer = Buffer.from(qrCodeImage.split(",")[1], "base64");
    doc.image(qrImageBuffer, {
      fit: [200, 200],
      align: "center",
      valign: "center",
    });

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.log(error);
  }
};

export const qrGetData = async (req, res) => {
  try {
   
    const yourId =parseInt(req.query.id);
    const currentDate = new Date();

    const result = await db.voucher.findOne({
      where: {
        id: yourId, // This should now be a valid ID
        expiryDate: {
          [Op.gt]: currentDate, // Ensure expiryDate is greater than current date
        },
      },
    });
    res.json({QrData:result?.dataValues});

  } catch (error) {
    console.log(error);
  }

};
