import { useEffect, useState } from "react";
import { Workout, User, Type } from "@/types/index";
import workoutStyles from "../../styles/Workout.module.css";
import TypeService from "@/services/TypeService";

export type Day = { label: string; iso: string };

type Props = {
  weekDays: Day[];
  workouts: Workout[];
  user: User;
  onAddClick: (isoDate: string | null) => void;
};

const WorkoutOverview: React.FC<Props> = ({
  weekDays,
  workouts,
  onAddClick,
}) => {
  const [typeColorMap, setTypeColorMap] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Groepeer workouts per daglabel
  const groupedWorkouts: Record<string, Workout[]> = {};
  workouts.forEach((workout) => {
    const weekday = new Date(workout.date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    if (!groupedWorkouts[weekday]) groupedWorkouts[weekday] = [];
    groupedWorkouts[weekday].push(workout);
  });

  // Laad types en wijs kleuren toe
  const colors = [
    "#ffe5e5",
    "#e6ffe6",
    "#fffbe6",
    "#e6f0ff",
    "#f3e6ff",
    "#fff0e6",
  ];
  useEffect(() => {
    async function fetchTypes() {
      try {
        const types: Type[] = await TypeService.getAllTypes();
        const map: Record<string, string> = {};
        types.forEach((type, idx) => {
          map[type.title] = colors[idx % colors.length];
        });
        setTypeColorMap(map);
      } catch (error) {
        setErrorMessage("Failed to load types.");
        console.error(error);
      }
    }
    fetchTypes();
  }, []);

  return (
    <>
      <p
        style={{
          textAlign: "center",
          color: "#e57373",
          margin: 0,
          marginTop: "0.5rem",
        }}
      >
        Klik op een dag om een nieuwe workout toe te voegen.
      </p>
      <div className={workoutStyles.agendaContainer}>
        {weekDays.map((day) => (
          <div
            key={day.iso}
            className={workoutStyles.workoutRow}
            onClick={() => onAddClick(day.iso)}
            style={{ cursor: "pointer" }}
          >
            <h3 className={workoutStyles.dayTitles}>{day.label}</h3>
            <div className={workoutStyles.workoutContainer}>
              {groupedWorkouts[day.label]?.length ? (
                groupedWorkouts[day.label].map((workout, idx) => (
                  <div
                    key={idx}
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
                    <p>By: {workout.user?.firstName}</p>
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
        <button
          className={workoutStyles.addButton}
          onClick={() => onAddClick(null)}
        >
          + Add Workout
        </button>
      </div>
    </>
  );
};

export default WorkoutOverview;
