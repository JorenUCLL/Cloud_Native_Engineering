import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next/types";
import styles from "@/styles/Home.module.css";
import loginStyles from "@/styles/Login.module.css";

import UserLoginForm from "@/components/users/UserLoginForm";

const Login: React.FC = () => {
  const { t } = useTranslation();

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

  return (
    <>
      <Head>
        <title>Log In</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.flexHeader}>
        <Header></Header>
        <main className={loginStyles.loginPage}>
          <section className={loginStyles.loginForn}>
            <UserLoginForm></UserLoginForm>
          </section>
        </main>
      </div>
    </>
  );
};
export default Login;
