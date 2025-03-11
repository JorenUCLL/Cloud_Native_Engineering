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

  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Language />

        <Link href="/posts" className={styles.link}>
          {t("header.posts")}
        </Link>
        <a className={styles.title}> {t("header.title")}</a>
        <Link href="/profile" className={styles.link}>
          {t("header.profile")}
          {/* <Image
            src="/pictures/pfp.png"
            alt="pfp"
            width={50}
            height={50}
          ></Image> */}
        </Link>
        {isLoggedIn === null ? (
          <p>{t("general.loading")}</p>
        ) : isLoggedIn ? (
          <a href="/login" onClick={handleLogout} className={styles.link}>
            {t("header.logout")}
          </a>
        ) : (
          <Link href="/login" className={styles.link}>
            {t("header.login")}
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
