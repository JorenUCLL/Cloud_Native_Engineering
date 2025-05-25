import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import profileStyles from "@/styles/Profile.module.css";
import { User, Workout, Achievement } from "@/types";
import WorkoutService from "@/services/WorkoutService";
import UserService from "@/services/UserService";
import AchievementService from "@/services/AchievementService";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");
    if (userData) {
      const parsed = JSON.parse(userData);
      UserService.getUserByEmail(parsed.email, parsed.token).then((u) => {
        setUser(u);
        setAchievements(u && u.achievements ? u.achievements : []);
      });
      WorkoutService.getWorkoutsByUser(parsed.email)
        .then((res) => res.json())
        .then((data) => {
          setWorkouts(
            data.map((w: Workout) => ({
              ...w,
              date: new Date(w.date),
            }))
          );
        });
      AchievementService.getAchievementsByUser(parsed.email, parsed.token)
        .then((data) => setAchievements(data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Filter today's workouts
  const today = new Date();
  const isToday = (date: Date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
  const todaysWorkouts = workouts.filter((w) => isToday(new Date(w.date)));

  if (loading) return <div>Loading...</div>;

  if (!user)
    return (
      <div className={styles.flexHeader}>
        <Header />
        <main className={styles.mainHome}>
          <section className={styles.title}>
            <p>Please log in to view your profile.</p>
          </section>
        </main>
      </div>
    );

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className={styles.flexHeader}>
        <Header />
        <main className={styles.mainHome}>
          <section className={profileStyles.title}>
            <h1>
              {user.firstName} {user.lastName}
            </h1>
          </section>

          <section className={profileStyles.section}>
            <h2>Today's Workouts</h2>
            {todaysWorkouts.length ? (
              <ul>
                {todaysWorkouts.map((w, i) => (
                  <li key={i}>
                    <strong>{w.title}</strong> at{" "}
                    {new Date(w.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    ({w.type?.title})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No workouts today.</p>
            )}
          </section>

          <section className={profileStyles.section}>
            <h2>Achievements</h2>
            {achievements.length ? (
              <ul>
                {achievements.map((a, i) => (
                  <li key={i}>
                    <strong>{a.title}</strong>: {a.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No achievements yet.</p>
            )}
          </section>

          {/* Add more sections here, e.g. stats, recent activity, etc. */}
        </main>
      </div>
    </>
  );
};

export default Profile;
