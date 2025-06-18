import React, { useEffect, useState } from "react";
import styles from "../../styles/WorkoutModal.module.css";
import { Exercise, Type } from "@/types";
import TypeService from "@/services/TypeService";
import ExerciseService from "@/services/ExerciseService";
import UserService from "@/services/UserService";
import { User } from "@/types";
type WorkoutModalProps = {
  onClose: () => void;
  onCreate: (data: {
    title: string;
    date: Date;
    type: { title: string };
    user: string;
    exercises: string[];
  }) => void;
};

const WorkoutModal: React.FC<WorkoutModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [typeTitle, setTypeTitle] = useState("");
  const [exercises, setExercises] = useState<string[]>([]);
  const [exerciseInput, setExerciseInput] = useState("");
  const [allTypes, setAllTypes] = useState<Type[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string>("");

  const [allExercises, setAllExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    

    (async () => {
      try {
        const types = await TypeService.getAllTypes();
        setAllTypes(types);
        const exercises = await ExerciseService.getAllExercises();
        setAllExercises(exercises);
      } catch (err) {}
    })();
  }, []);

  const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setExercises(selected);
  };

  const handleAddExercise = () => {
    if (selectedExercise && !exercises.includes(selectedExercise)) {
      setExercises((prev) => [...prev, selectedExercise]);
      setSelectedExercise("");
    }
  };

  const handleRemoveExercise = (exercise: string) => {
    setExercises((prev) => prev.filter((ex) => ex !== exercise));
  };

  const handleCreate = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      console.error("No user logged in");
      return;
    }
    const loggedInData = JSON.parse(loggedInUser);
    const email = (loggedInData.email);
    const token = (loggedInData.token);
    const user = await UserService.getUserByEmail(
      email, token);

    console.log("User data:", user);

    console.log("Creating workout with data:",
      {
        title,
        date,
        type: { title: typeTitle },
        user: user.user.id,
        exercises,
      }
    );

    onCreate({
      title,
      date: new Date(date),
      type: { title: typeTitle },
      user: user.user.id,
      exercises,  
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create Workout</h2>

        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Type:
            <select
              value={typeTitle}
              onChange={(e) => setTypeTitle(e.target.value)}
              className={styles.select}
            >
              <option value="">Select type</option>
              {allTypes.map((type) => (
                <option key={type.title} value={type.title}>
                  {type.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Exercise:
            <div className={styles.exerciseRow}>
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className={styles.select}
              >
                <option value="">Select exercise</option>
                {allExercises.map((ex) => (
                  <option key={ex.name} value={ex.name}>
                    {ex.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className={styles.addExerciseBtn}
                onClick={handleAddExercise}
                disabled={!selectedExercise}
              >
                Add Exercise
              </button>
            </div>
          </label>
        </div>

        <ul className={styles.exerciseList}>
          {exercises.map((exercise, index) => (
            <li key={index} className={styles.exerciseListItem}>
              {exercise}
              <button
                type="button"
                className={styles.removeExerciseBtn}
                onClick={() => handleRemoveExercise(exercise)}
                aria-label="Remove exercise"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.buttonRow}>
          <button className={styles.createBtn} onClick={handleCreate}>
            Create
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutModal;
