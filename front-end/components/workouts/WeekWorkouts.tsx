import { useEffect, useState } from "react";
import { Workout, Type } from "@/types";
import TypeService from "@/services/TypeService";
import workoutStyles from "@/styles/Workout.module.css";
import WorkoutCard from "./WorkoutCard";

type Props = { workouts: Workout[] };

const colors = [
  "#ffe5e5",
  "#e6ffe6",
  "#fffbe6",
  "#e6f0ff",
  "#f3e6ff",
  "#fff0e6",
];

const WeekWorkouts: React.FC<Props> = ({ workouts }) => {
  const [typeColorMap, setTypeColorMap] = useState<Record<string, string>>({});
  const [err, setErr] = useState<string | null>(null);

  /* éénmalig: types ophalen → kleur */
  useEffect(() => {
    (async () => {
      try {
        const types: Type[] = await TypeService.getAllTypes();
        const map: Record<string, string> = {};
        types.forEach((t, i) => (map[t.title] = colors[i % colors.length]));
        setTypeColorMap(map);
      } catch (e) {
        console.error(e);
        setErr("Failed to load types");
      }
    })();
  }, []);

  if (err) return <p className="text-red-500">{err}</p>;
  if (!workouts.length)
    return <p className={workoutStyles.noWorkout}>No workouts</p>;

  return (
    <div className={workoutStyles.weekWorkoutsPage}>
      <p className={workoutStyles.sectionTitle}>Workouts This Week</p>

      {/* Scroll alleen hier! */}
      <div className={workoutStyles.scrollArea}>
        <div className={workoutStyles.rowScroll}>
          <div className={workoutStyles.rowScroll}>
            {workouts.map((w) => (
              <WorkoutCard
                key={w.id}
                workout={w}
                bgColor={typeColorMap[w.type?.title || ""] || "#ccc"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Legende onder de scrollende workouts */}
      <div className={workoutStyles.legendGlobal}>
        {Object.entries(typeColorMap).map(([title, col]) => (
          <div key={title} className={workoutStyles.typeColors}>
            <div
              className={workoutStyles.typeTitle}
              style={{ backgroundColor: col }}
            />
            <span style={{ fontSize: "0.9rem" }}>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekWorkouts;
