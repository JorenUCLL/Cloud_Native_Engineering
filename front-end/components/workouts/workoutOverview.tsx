import { useState } from "react";
import { Workout, User } from "../../types/index";
import Link from "next/link";

type Props = {
  workouts: Array<Workout>;
};

const WorkoutOverview: React.FC<Props> = ({ workouts }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!Array.isArray(workouts)) {
    return <p>No workouts found or data is malformed.</p>;
  }

  console.log("Rendering workouts:", workouts);

  return (
    <>
      {workouts.map((workout, index) => (
        <div>
          <p>{workout.title}</p>
          <p>{workout.type?.title}</p>
          <p>{workout.user?.firstName}</p>
        </div>
      ))}
    </>
  );
};

export default WorkoutOverview;
