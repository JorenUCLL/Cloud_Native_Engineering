import { useEffect, useState } from "react";
import { Workout, User, Type } from "../../types/index";
import Link from "next/link";
import workoutStyles from "../../styles/HomePage.module.css";
import TypeService from "@/services/TypeService";
import WorkoutCard from "./WorkoutCard";

type Props = {
  workouts: Array<Workout>;
};

const TodaysWorkouts: React.FC<Props> = ({ workouts }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [typeColorMap, setTypeColorMap] = useState<Record<string, string>>({});
  const [todaysWorkouts, setTodaysWorkouts] = useState<Workout[]>([]);

  const colors = [
    "#ffe5e5",
    "#e6ffe6",
    "#fffbe6",
    "#e6f0ff",
    "#f3e6ff",
    "#fff0e6",
  ];

  const getTodaysWeekday = () => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" });
  };

  const filterTodaysWorkouts = () => {
    const today = getTodaysWeekday();
    return workouts.filter((workout) => {
      const workoutDay = new Date(workout.date).toLocaleDateString("en-US", {
        weekday: "long",
      });
      return workoutDay === today;
    });
  };

  useEffect(() => {
    setTodaysWorkouts(filterTodaysWorkouts());

    const fetchTypesAndAssignColors = async () => {
      try {
        const types: Type[] = await TypeService.getAllTypes();
        const newColorMap: Record<string, string> = {};

        types.forEach((type, index) => {
          const color = colors[index % colors.length];
          newColorMap[type.title] = color;
        });

        setTypeColorMap(newColorMap);
      } catch (error) {
        setErrorMessage("Failed to load types.");
        console.error(error);
      }
    };

    fetchTypesAndAssignColors();
  }, [workouts]);

  return (
    <div className={workoutStyles.todaysWorkoutsPage}>
      <p className={workoutStyles.todaysworks}>Today's Workouts</p>

      {todaysWorkouts.length ? (
        <>
          <div className={workoutStyles.scrollArea}>
            <div className={workoutStyles.rowScroll}>
              {todaysWorkouts.map((w) => (
                <WorkoutCard
                  key={w.id}
                  workout={w}
                  bgColor={typeColorMap[w.type?.title || ""] || "#ccc"}
                />
              ))}
            </div>
          </div>

          {/* Legende NA de scrollende workouts */}
          {/* <div className={workoutStyles.legendGlobal}>
            {Object.entries(typeColorMap).map(([title, col]) => (
              <div key={title} className={workoutStyles.typeColors}>
                <div
                  className={workoutStyles.typeTitle}
                  style={{ backgroundColor: col }}
                />
                <span style={{ fontSize: "0.9rem" }}>{title}</span>
              </div>
            ))}
          </div> */}
        </>
      ) : (
        <p className={workoutStyles.noWorkout}>No workouts</p>
      )}
    </div>
  );
};

export default TodaysWorkouts;
