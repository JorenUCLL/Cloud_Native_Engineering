import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import WorkoutService, {
  CreateWorkoutPayload,
} from "@/services/WorkoutService";
import TypeService from "@/services/TypeService";
import { Type } from "@/types";
import workoutStyles from "@/styles/Workout.module.css";

interface Props {
  isOpen: boolean;
  initialDate: string | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function WorkoutModal({
  isOpen,
  initialDate,
  onClose,
  onSaved,
}: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [types, setTypes] = useState<Type[]>([]);
  const [typeId, setTypeId] = useState("");

  useEffect(() => {
    if (initialDate) setDate(initialDate);
    TypeService.getAllTypes().then((t) => {
      setTypes(t);
      if (t.length) setTypeId(t[0].id);
    });
  }, [initialDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await WorkoutService.createWorkout({ title, date, time, typeId });
    onSaved();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={workoutStyles.backdrop}>
      <div className={workoutStyles.modal}>
        <h2 className={workoutStyles.title}>Nieuwe workout</h2>
        <form onSubmit={handleSubmit} className={workoutStyles.form}>
          <label className={workoutStyles.label}>
            Titel
            <input
              type="text"
              className={workoutStyles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label className={workoutStyles.label}>
            Datum
            <input
              type="date"
              className={workoutStyles.input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label className={workoutStyles.label}>
            Tijd
            <input
              type="time"
              className={workoutStyles.input}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>

          <label className={workoutStyles.label}>
            Type
            <select
              className={workoutStyles.select}
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
              required
            >
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </label>

          <div className={workoutStyles.buttons}>
            <button
              type="button"
              onClick={onClose}
              className={workoutStyles.buttonCancel}
            >
              Annuleren
            </button>
            <button type="submit" className={workoutStyles.buttonSubmit}>
              Opslaan
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
