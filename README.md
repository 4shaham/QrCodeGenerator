# QR Voucher System

The **QR Voucher System** is a backend-focused project designed to manage and generate QR codes for vouchers. It uses the **MVC architecture** and integrates a range of technologies including **Node.js**, **Express.js**, and **MSSQL** for the backend, with **EJS** for server-side rendering. Additional features include PDF generation and QR code creation.

---

## Project Stack

### **Backend**
- **Node.js** with Express.js
- **Sequelize** and **Tedious** for ORM and MSSQL interaction
- **EJS** for server-side rendering
- **PDFKit** for generating PDFs
- **QRCode** for generating QR codes

### **Database**
- **MSSQL** with Sequelize ORM

### **Architecture**
- **MVC** (Model-View-Controller) pattern

---

## Getting Started

### Prerequisites
Ensure the following are installed on your local machine:
- **Node.js** (>= 14.x)
- **npm** or **yarn**
- **MSSQL Server** (with a valid setup)
- **Git**

---

### Cloning the Repository

1. Clone this repository to your local machine:

    ```bash
    git clone [https://github.com/yourusername/QR-Voucher-System.git]
    cd QR-Voucher-System
    ```

### Setting Up the Project

1. Install dependencies:

    ```bash
    npm install
    ```

2. Configure environment variables:

    Create a `.env` file in the project root and add the following configurations:

    ```env
    PORT=4005
    HOST='LAPTOP-D34KFEHF'
    SQL_PORT=1433
    USER='kts'
    PASSWORD='123456'
    DB="QrProject"
    DIALECT='mssql'
    ```

3. Start the server:

    ```bash
    npm start
    ```

---

## Features

- **QR Code Generation**  
   Generate QR codes for vouchers using the `qrcode` package.

- **PDF Generation**  
   Create downloadable PDFs with voucher details using the `pdfkit` package.

- **Database Integration**  
   Fully integrated with MSSQL for storing and managing voucher data.

- **Login System**  
   Hardcoded login credentials for accessing the system:  
   - **Username:** `shaham`  
   - **Password:** `123456`

---

## Scripts

- **Start Development Server:**  
    ```bash
    npm start
    ```

---

## Directory Structure

