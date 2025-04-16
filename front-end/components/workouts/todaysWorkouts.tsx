import { useEffect, useState } from "react";
import { Workout, User, Type } from "../../types/index";
import Link from "next/link";
import workoutStyles from "../../styles/Workout.module.css";
import TypeService from "@/services/TypeService";

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
    <>
      <div className={workoutStyles.todaysWorkouts}>
        {todaysWorkouts.map((workout) => (
          <div
            key={workout.id}
            className={workoutStyles.workoutSelfHome}
            style={{
              background: typeColorMap[workout.type?.title || ""] || "#ccc",
            }}
          >
            <p>
              <strong>{workout.title}</strong>
            </p>
            <p>
              {new Date(workout.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>{workout.type?.title}</p>
            <p>By: {workout.user?.firstName}</p>
          </div>
        ))}
      </div>
      <div className={workoutStyles.legendHome}>
        {Object.entries(typeColorMap).map(([typeTitle, color], index) => (
          <div key={index} className={workoutStyles.typeColors}>
            <div
              className={workoutStyles.typeTitle}
              style={{
                backgroundColor: color,
              }}
            />
            <span style={{ fontSize: "0.9rem" }}>{typeTitle}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodaysWorkouts;
