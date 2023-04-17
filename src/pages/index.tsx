import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Button } from "@mui/material";
import router from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className={styles.main_btn}>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/qrcode_form");
          }}
        >
         Click To QR Code Form
        </Button>
      </div>
    </>
  );
}
