import { useEffect, useState } from "react";
import { Workout, User, Type } from "../../types/index";
import Link from "next/link";
import workoutStyles from "../../styles/Workout.module.css";
import TypeService from "@/services/TypeService";

type Props = {
  workouts: Array<Workout>;
  user: User;
};

const WorkoutOverview: React.FC<Props> = ({ workouts }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [typeColorMap, setTypeColorMap] = useState<Record<string, string>>({});

  const groupedWorkouts: { [key: string]: Workout[] } = {};

  workouts.forEach((workout) => {
    const date = new Date(workout.date);
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

    if (!groupedWorkouts[weekday]) {
      groupedWorkouts[weekday] = [];
    }
    groupedWorkouts[weekday].push(workout);
  });

  const typeToColor = () => {
    const color = TypeService.getAllTypes();
  };

  const colors = [
    "#ffe5e5",
    "#e6ffe6",
    "#fffbe6",
    "#e6f0ff",
    "#f3e6ff",
    "#fff0e6",
  ];

  const orderedDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div className={workoutStyles.agendaContainer}>
        {orderedDays.map((day) => (
          <div key={day} className={workoutStyles.workoutRow}>
            <h3 className={workoutStyles.dayTitles}>{day}</h3>
            <div className={workoutStyles.workoutContainer}>
              {groupedWorkouts[day]?.length ? (
                groupedWorkouts[day].map((workout, index) => (
                  <div
                    key={index}
                    className={workoutStyles.workoutSelf}
                    style={{
                      background:
                        typeColorMap[workout.type?.title || ""] || "#ccc",
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
                    <p>By: {workout.user}</p>
                  </div>
                ))
              ) : (
                <p className={workoutStyles.noWorkout}>No workouts</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={workoutStyles.legend}>
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

export default WorkoutOverview;
