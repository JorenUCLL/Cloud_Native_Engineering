import { useEffect, useState } from "react";
import { Workout, User } from "@/types";
import styles from "@/styles/HomePage.module.css";
import UserService from "@/services/UserService";

type Props = {
  workout: Workout;
  bgColor: string;
};

const darkenHex = (hex: string, factor = 0.15) => {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - 255 * factor);
  const g = Math.max(0, ((num >> 8) & 0xff) - 255 * factor);
  const b = Math.max(0, (num & 0xff) - 255 * factor);
  return `rgb(${r}, ${g}, ${b})`;
};

const WorkoutCard: React.FC<Props> = ({ workout, bgColor }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (!loggedInUser || !workout.user) return;

      const token = JSON.parse(loggedInUser).token;

      try {
        const res = await UserService.getUserById(workout.user as string, token);
        console.log("Fetched user:", res.user);
        setUser(res.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [workout.user]);

  const d = new Date(workout.date);
  const weekday = d.toLocaleDateString("nl-BE", { weekday: "long" });
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const headerColor = darkenHex(bgColor);

  return (
    <article className={styles.card} style={{ background: bgColor }}>
      <header className={styles.dayHeader} style={{ background: headerColor }}>
        {weekday}
      </header>

      <div className={styles.cardGrid}>
        <div className={styles.leftCol}>
          <time className={styles.time}>{time}</time>
          <span className={styles.type}>{workout.type?.title}</span>
        </div>

        <div className={styles.rightCol}>
          <h3 className={styles.title}>{workout.title}</h3>
          <p className={styles.by}>By {user?.firstName ?? "Unknown"}</p>
        </div>
      </div>
    </article>
  );
};

export default WorkoutCard;
