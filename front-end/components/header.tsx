import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Language from "./languages/languages";
import Image from "next/image";
import WorkoutModal from "./workouts/createWorkout";
import { Workout } from "@/types";
import WorkoutService from "@/services/WorkoutService";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [workoutName, setWorkoutName] = useState("");

  const handleCreateWorkout = async (data: {
    title: string;
    date: Date;
    type: { title: string };
    exercises: string[];
  }) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      alert("User not logged in");
      return;
    }

    const user = JSON.parse(loggedInUser);

    const workoutData: Workout = {
      title: data.title,
      date: data.date,
      type: { title: data.type.title },
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      exercises: data.exercises,
    };

    try {
      await WorkoutService.createWorkout(workoutData);
      alert("Workout created successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };

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
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="/">
            <img
              className={styles.navItem}
              src="/pictures/home_white.png"
              alt="HomeImage"
            />
          </a>
          <a href="/workouts">
            <img
              className={styles.navItem}
              src="/pictures/dumbbell.png"
              alt="StatsImage"
            />
          </a>
          <a href="/profile">
            <img
              className={styles.navItem}
              src="/pictures/profile_white.png"
              alt="ProfileImage"
            />
          </a>

          <button
            onClick={() => setShowModal(true)}
            className={styles.navButton}
          >
            <img
              className={styles.navItem}
              src="/pictures/create.png"
              alt="CreateWorkout"
            />
          </button>

          <a href="/"></a>
          <a href="/"></a>
          <a href="/"></a>
          <a href="/"></a>
          <a href="/"></a>
          <a href="/"></a>
          {isLoggedIn === null ? (
            <p>Loading</p>
          ) : isLoggedIn ? (
            <a href="/login">
              <img
                className={styles.navItem}
                src="/pictures/logout_white.png"
                alt="LogoutImage"
              />
            </a>
          ) : (
            <a href="/login">
              <img
                className={styles.navItem}
                src="/pictures/logout_white.png"
                alt="LoginImage"
              />
            </a>
          )}
        </nav>
      </header>

      {showModal && (
        <WorkoutModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateWorkout}
        />
      )}
    </>
  );
};

export default Header;
