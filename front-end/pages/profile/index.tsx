import type React from "react";

import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import type { User, Workout, Achievement } from "@/types";
import WorkoutService from "@/services/WorkoutService";
import UserService from "@/services/UserService";
import AchievementService from "@/services/AchievementService";
import TodaysWorkouts from "@/components/workouts/todaysWorkouts";
import { Trophy, Calendar, Target, TrendingUp, Dumbbell } from "lucide-react";
import styles from "../../styles/Profile.module.css";
import homestyles from "../../styles/Home.module.css";
import useInterval from "use-interval";
import { mutate } from "swr";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const fetchWorkouts = async () => {
    try {
      const data = await WorkoutService.getAllWorkouts();
      const parsedData = data.map((workout: Workout) => ({
        ...workout,
        date: new Date(workout.date),
      }));
      setWorkouts(parsedData);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    }
  };

  useInterval(() => {
    if (token) {
      mutate(["workouts", token]);
    }
  }, 2000);

  useEffect(() => {
    const loadData = async () => {
      const userData = sessionStorage.getItem("loggedInUser");
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          setToken(parsedData.token);
          const fetchedUser = await UserService.getUserByEmail(parsedData.email, parsedData.token);
          setUser(fetchedUser?.user ?? null);
          const fetchedAchievements = await AchievementService.getAchievementsByUser(parsedData.email, parsedData.token);
          setAchievements(fetchedAchievements);
        } catch {
          console.error("Error parsing session storage data");
        }
      }
      await fetchWorkouts();
      setLoading(false);
    };

    loadData();
  }, []);

  // Calculate workout statistics
 const getWorkoutStats = () => {
  if (!user || workouts.length === 0) {
    console.log("No user or workouts yet");
    return {
      total: 0,
      thisWeek: 0,
    };
  }

  console.log(user.id, workouts[0].id)
  const userWorkouts = workouts.filter((w) => w.user === user.id);
  console.log("Filtered workouts for user:", user.email, userWorkouts);

  const thisWeek = userWorkouts.filter((w) => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return w.date >= weekAgo;
  });

  const workoutTypes = userWorkouts.reduce((acc, workout) => {
    const typeId = typeof workout.type === "string" ? workout.type : "Unknown";
    acc[typeId] = (acc[typeId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log("Workout types count:", workoutTypes);
  const entries = Object.entries(workoutTypes);
  console.log("Entries of workout types:", entries);

  if (entries.length === 0) {
    return {
      total: userWorkouts.length,
      thisWeek: thisWeek.length,
    };
  }

  const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
  console.log("Sorted entries:", sortedEntries);

  // Safe access
  const favoriteType = sortedEntries.length > 0 ? sortedEntries[0][0] : "None";
  console.log("Favorite workout type:", favoriteType);

  return {
    total: userWorkouts.length,
    thisWeek: thisWeek.length,
    // favoriteType,
  };
};


  const getRecentWorkouts = () => {
    return workouts
      .filter((w) => w.user === user?.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const getUserInitials = (user: User) => {

  if (user.firstName?.length && user.lastName?.length) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }

  if (user.name?.length) {
    const names = user.name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    } else {
      return names[0][0].toUpperCase();
    }
  }

  if (user.email?.length) {
    return user.email[0].toUpperCase();
  }

  return "?";
};


  const getUserDisplayName = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.name || user.email;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <main className={styles.mainContainer}>
          <div className={styles.loginCard}>
            <div className={styles.loginCardContent}>
              <p className={styles.loginMessage}>
                Please log in to view your profile.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const stats = getWorkoutStats();
  const recentWorkouts = getRecentWorkouts();

  return (
    <>
      <Head>
        <title>Profile - {getUserDisplayName(user)}</title>
      </Head>
      <div className={homestyles.homePage}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.profileCard}>
            <div className={styles.profileCardContent}>
              <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${getUserDisplayName(
                      user
                    )}`}
                    alt="Profile Avatar"
                    className={styles.avatarImage}
                  />
                  <div className={styles.avatarFallback}>
                    {getUserInitials( user )}
                  </div>
                </div>
                <div className={styles.profileInfo}>
                  <h1 className={styles.profileName}>
                    {getUserDisplayName(user)}
                  </h1>
                  <p className={styles.profileEmail}>{user.email}</p>
                  <span className={styles.roleBadge}>Member</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statCardHeader}>
                <h3 className={styles.statCardTitle}>Total Workouts</h3>
                <Dumbbell className={styles.statIcon} />
              </div>
              <div className={styles.statCardContent}>
                <div className={styles.statNumber}>{stats.total}</div>
                <p className={styles.statDescription}>All time</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCardHeader}>
                <h3 className={styles.statCardTitle}>Deze Week</h3>
                <Calendar className={styles.statIcon} />
              </div>
              <div className={styles.statCardContent}>
                <div className={styles.statNumber}>{stats.thisWeek}</div>
                <p className={styles.statDescription}>Workouts Afgerond</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCardHeader}>
                <h3 className={styles.statCardTitle}>Favoriete type workout</h3>
                <Target className={styles.statIcon} />
              </div>
              <div className={styles.statCardContent}>
                <div className={styles.statNumber}>
                  {/* {workoutTypesMap[stats.favoriteType] || stats.favoriteType} */}
                </div>
                <p className={styles.statDescription}>Het meeste</p>
              </div>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}></h2>
            </div>
            <div className={styles.sectionContent}>
              <TodaysWorkouts workouts={workouts} />
            </div>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <Trophy className={styles.sectionIcon} />
                  Achievements
                </h2>
                <p className={styles.sectionDescription}>
                  Je fitnessmijlpalen en persoonlijke records
                </p>
              </div>
              <div className={styles.sectionContent}>
                {achievements.length > 0 ? (
                  <div className={styles.achievementsList}>
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={styles.achievementItem}
                      >
                        <div className={styles.achievementIcon}>
                          <Trophy className={styles.trophyIcon} />
                        </div>
                        <div className={styles.achievementContent}>
                          <h4 className={styles.achievementTitle}>
                            {achievement.title}
                          </h4>
                          <p className={styles.achievementDescription}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <Trophy className={styles.emptyStateIcon} />
                    <p className={styles.emptyStateText}>No achievements yet</p>
                    <p className={styles.emptyStateSubtext}>
                      Complete workouts to earn your first achievement!
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <TrendingUp className={styles.sectionIcon} />
                  Recente Activiteiten
                </h2>
                <p className={styles.sectionDescription}>
                  Je laatste workout sessies
                </p>
              </div>
              <div className={styles.sectionContent}>
                {recentWorkouts.length > 0 ? (
                  <div className={styles.activityList}>
                    {recentWorkouts.map((workout) => (
                      <div key={workout.id} className={styles.activityItem}>
                        <div className={styles.activityLeft}>
                          <div className={styles.activityDot}></div>
                          <div className={styles.activityInfo}>
                            <h4 className={styles.activityTitle}>
                              {workout.title}
                            </h4>
                            <p className={styles.activityDetails}>
                              {workout.type?.title} •{" "}
                              {workout.exercises?.length || 0} exercises
                            </p>
                          </div>
                        </div>
                        <div className={styles.activityRight}>
                          <p className={styles.activityDate}>
                            {workout.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <Calendar className={styles.emptyStateIcon} />
                    <p className={styles.emptyStateText}>
                      Geen recente workouts
                    </p>
                    <p className={styles.emptyStateSubtext}>
                      Start your fitness journey today!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
