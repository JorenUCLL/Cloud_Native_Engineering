import Header from "@/components/header";
import UserProfile  from "@/components/users/UserProfile";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

const Profile: React.FC = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className={styles.flexHeader}>
        <Header />
        <main className={styles.mainHome}>
          <section className={styles.title}>
            <p>Profile Page</p>
          </section>
          <section className={styles.mainContent}>
            {user ? <UserProfile user={user} /> : <p>Please log in</p>}
          </section>
        </main>
      </div>
    </>
  );
};

export default Profile;
