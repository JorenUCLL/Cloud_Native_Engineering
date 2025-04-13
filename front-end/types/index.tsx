type User = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  achievements?: Achievement[];
  workouts?: Workout[];
};

type Workout = {
  id?: number;
  title?: string;
  date: Date;
  type: Type;
  user?: User;
};

type Type = {
  id: number;
  title: string;
};

type Achievement = {
  id?: number;
  exercise: Exercise;
  user: User;
  amount: number;
};

type Exercise = {
  id?: number;
  title?: string;
  type?: Type;
};

type StatusMessage = {
  message: string;
  type: "error" | "success";
};

export type { User, Exercise, Achievement, Type, Workout, StatusMessage };
