import { DataTypes } from "sequelize";

export default function VoucherModel(sequelize) {
  return sequelize.define(
    "Voucher",
    {
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      voucherNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      voucherTitle: {
        type: DataTypes.STRING,  // Add Voucher Title field
        allowNull: true,
      },
      generatedDate: {  
        type: DataTypes.DATE,
        allowNull: false,
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      }, 
      qrCodeData: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fontSizeTitle: {
        type: DataTypes.INTEGER,  // Font size for the title
        allowNull: true,
      },
      fontSizeText: {
        type: DataTypes.INTEGER,  // Font size for the text
        allowNull: true,
      },
      voucherWidth: {
        type: DataTypes.INTEGER,  // Voucher width (in mm or other units)
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
}
