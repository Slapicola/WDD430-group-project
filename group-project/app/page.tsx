import Image from "next/image";
import { Metadata } from "next";
import ItemCardWrapper from "./ui/homepage/item-cards";
import styles from "@/app/ui/home.module.css";

export const metadata: Metadata = {
  title: "Home Page - Handcrafted Haven",
};

export default function Home() {
  return (
    <main className={styles.body}>
      <div className={styles.header}>
        <h1>Handcrafted Haven</h1>
        <div className={styles.profile}>
          <button className={styles.signOutBtn}>
            <div>Sign Out</div>
          </button>
          <Image
            src="/profile-icon.jpg"
            width={100}
            height={100}
            alt="Profile Icon"
          />
        </div>
      </div>
      {/* This will be a card that is rendered for each item in our database */}
      {/* <div>
        <Image
          src="/image-placeholder.jpg"
          width={300}
          height={100}
          alt="Placeholder Image"
        />
        <p>Description</p>
        <p>Price</p>
      </div> */}
      <div className={styles.itemDisplay}>
        <ItemCardWrapper />
      </div>
    </main>
  );
}
