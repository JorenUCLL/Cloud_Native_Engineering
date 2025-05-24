import React, { useState } from "react";
import styles from "../../styles/WorkoutModal.module.css";

type WorkoutModalProps = {
  onClose: () => void;
  onCreate: (data: {
    title: string;
    date: Date;
    type: { title: string };
    exercises: string[];
  }) => void;
};

const WorkoutModal: React.FC<WorkoutModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [typeTitle, setTypeTitle] = useState("");
  const [exercises, setExercises] = useState<string[]>([]);
  const [exerciseInput, setExerciseInput] = useState("");

  const handleAddExercise = () => {
    if (exerciseInput.trim()) {
      setExercises((prev) => [...prev, exerciseInput.trim()]);
      setExerciseInput("");
    }
  };

  const handleCreate = () => {
    onCreate({
      title,
      date: new Date(date),
      type: { title: typeTitle },
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

        <label>
          Type:
          <input
            type="text"
            value={typeTitle}
            onChange={(e) => setTypeTitle(e.target.value)}
          />
        </label>

        <label>
          Add Exercise:
          <input
            type="text"
            value={exerciseInput}
            onChange={(e) => setExerciseInput(e.target.value)}
          />
          <button
            type="button"
            className={styles.addExerciseBtn}
            onClick={handleAddExercise}
          >
            Add
          </button>
        </label>

        <ul className={styles.exerciseList}>
          {exercises.map((exercise, index) => (
            <li key={index}>{exercise}</li>
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
