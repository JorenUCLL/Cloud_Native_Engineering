import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import UserLoginForm from "@/components/users/UserLoginFrom";
import LoginStyles from "../../styles/Login.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next/types";

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
        <title>{t("login.title")}</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={LoginStyles.loginMain}>
        <section>
          {isLoggedIn === null ? (
            <p>{t("general.loading")}</p>
          ) : isLoggedIn ? (
            <p>{t("login.loggedId")}</p>
          ) : (
            <UserLoginForm />
          )}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Login;
