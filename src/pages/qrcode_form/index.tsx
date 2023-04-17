import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import QRCode from "qrcode";
import styles from "@/styles/Home.module.css";
import bwipJs from "bwip-js";

const QrCodeForm = () => {
  const [stockItemName, setStockItemName] = useState("");
  const [stockItemIssueNumber, setStockItemIssueNumber] = useState("");
  const [sku, setSku] = useState("");
  const [stockStorageLocation, setStockStorageLocation] = useState("");
  const [price, setPrice] = useState("");
  const [codeType, setCodeType] = useState("qr-code");
  const [outputFormat, setOutputFormat] = useState("png");
  const [qrCodeImage, setQRCodeImage] = useState("");
  const [stockStorageFacility, setStockStorageFacility] = useState("");
  const [stockStorageZone, setStockStorageZone] = useState("");
  const [stockStorageZoneLocation, setStockStorageZoneLocation] = useState("");
  const [stockItemGrade, setStockItemGrade] = useState("");
  const [barcodeImage, setBarcodeImage] = useState("");
  const [id, setId] = useState("");

  const generateQRCode = async () => {
    if (
      id &&
      stockItemName &&
      stockItemIssueNumber &&
      sku &&
      stockStorageLocation &&
      price &&
      stockStorageFacility &&
      stockStorageZone &&
      stockStorageZoneLocation &&
      stockItemGrade &&
      codeType &&
      outputFormat
    ) {
      if (codeType === "qr-code") {
        const result = await QRCode.toDataURL(
          JSON.stringify({
            id,
            stockItemName,
            stockItemIssueNumber,
            sku,
            stockStorageLocation,
            price,
            stockStorageFacility,
            stockStorageZone,
            stockStorageZoneLocation,
            stockItemGrade,
            codeType,
            outputFormat,
          })
        );
        setQRCodeImage(result);
      } else {
        const result = bwipJs.toCanvas("canvas", {
          bcid: "code128",
          text: id,
          scale: 2,
          height: 10,
          includetext: true,
          textxalign: "center",
        });

        setBarcodeImage(result.toDataURL());
      }
    } else {
      setQRCodeImage("");
      alert("Please fill in all required fields");
    }
  };

  const handleReset = () => {
    setId("");
    setStockItemName("");
    setStockItemIssueNumber("");
    setSku("");
    setStockStorageLocation("");
    setPrice("");
    setStockStorageFacility("");
    setStockStorageZone("");
    setStockStorageZoneLocation("");
    setStockItemGrade("");
    setCodeType("barcode");
    setOutputFormat("png");

    setQRCodeImage("");
    setBarcodeImage("");
  };

  return (
    <>
      <h1 className={styles.title}>Generate Code</h1>
      <form className={styles.main}>
        <div className={styles.txt_main}>
          <TextField
            className={styles.txt_btn}
            label="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <br />

          <TextField
            className={styles.txt_btn}
            label="Stock Item Name"
            value={stockItemName}
            onChange={(e) => setStockItemName(e.target.value)}
          />
          <br />
        </div>
        <br />

        <div className={styles.txt_main}>
          <TextField
            className={styles.txt_btn}
            label="Stock Item Issue Number"
            value={stockItemIssueNumber}
            onChange={(e) => setStockItemIssueNumber(e.target.value)}
          />
          <TextField
            className={styles.txt_btn}
            label="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
          <br />
        </div>
        <br />
        <div className={styles.txt_main}>
          <TextField
            className={styles.txt_btn}
            label="Stock Storage Location"
            value={stockStorageLocation}
            onChange={(e) => setStockStorageLocation(e.target.value)}
          />
          <TextField
            className={styles.txt_btn}
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
        </div>
        <br />
        <div className={styles.txt_main}>
          <TextField
            className={styles.txt_btn}
            label="Stock Storage Facility"
            value={stockStorageFacility}
            onChange={(e) => setStockStorageFacility(e.target.value)}
          />
          <TextField
            className={styles.txt_btn}
            label="Stock Storage Zone"
            value={stockStorageZone}
            onChange={(e) => setStockStorageZone(e.target.value)}
          />
          <br />
        </div>
        <br />
        <div className={styles.txt_main}>
          <TextField
            className={styles.txt_btn}
            label="Stock Storage Zone Location"
            value={stockStorageZoneLocation}
            onChange={(e) => setStockStorageZoneLocation(e.target.value)}
          />
          <TextField
            className={styles.txt_btn}
            label="Stock Item Grade"
            value={stockItemGrade}
            onChange={(e) => setStockItemGrade(e.target.value)}
          />
          <br />
        </div>
        <br />
        <div className={styles.txt_main}>
          <FormControl className={styles.txt_control}>
            <Select
              labelId="output-format-label"
              id="output-format"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
              <MenuItem value="png">PNG</MenuItem>
              <MenuItem value="svg">SVG</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={styles.txt_control}>
            <Select
              labelId="code-type-label"
              id="code-type"
              value={codeType}
              onChange={(e) => setCodeType(e.target.value)}
            >
              <MenuItem value="qr-code">QR Code</MenuItem>
              <MenuItem value="barcode">UPC-A barcode</MenuItem>
            </Select>
          </FormControl>
          <br />
        </div>
        <br />

        <Button
          className={styles.txt_btn}
          variant="contained"
          color="primary"
          onClick={generateQRCode}
        >
          Generate Code
        </Button>
        <br />

        <Button
          className={styles.txt_btn}
          variant="contained"
          color="primary"
          onClick={handleReset}
        >
          Reset QR Code
        </Button>
        {qrCodeImage && <img src={qrCodeImage} alt="QR Code" />}
        {barcodeImage && (
          <img
            id="canvas"
            src={barcodeImage}
            alt="Barcode"
            style={{ marginTop: "20px" }}
          />
        )}
        <canvas style={{ display: "none" }} id="canvas"></canvas>
        <br />
      </form>
    </>
  );
};

export default QrCodeForm;
