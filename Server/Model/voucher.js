import { DataTypes } from "sequelize";

export default function VoucherModel(sequelize) {
  return sequelize.define(
    "Voucher",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      voucherNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
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
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
}
