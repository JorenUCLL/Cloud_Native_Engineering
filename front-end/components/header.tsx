import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Language from "./languages/languages";
import Image from "next/image";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setIsLoggedIn(!!parsedData.token);
      } catch (error) {
        console.error("Error parsing session storage data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    sessionStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <img
          className={styles.navItem}
          src="/pictures/home_white.png"
          alt="HomeImage"
        />
        <img
          className={styles.navItem}
          src="/pictures/profile_white.png"
          alt="HomeImage"
        />
        <img
          className={styles.navItem}
          src="/pictures/statisstics_white.png"
          alt="HomeImage"
        />

        {isLoggedIn === null ? (
          <p>Loading</p>
        ) : isLoggedIn ? (
          <img
            className={styles.navItem}
            src="/pictures/logout_white.png"
            alt="HomeImage"
          />
        ) : (
          <img
            className={styles.navItem}
            src="/pictures/logout_white.png"
            alt="HomeImage"
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
