export type User = {
  id: string;
  _id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  achievements?: Achievement[];
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
};

export type Post = {
  id: string;
  image: {
    path: string;
  };
  boulder: {
    gym: {
      gymName: string;
    };
    grade: string;
  };
};

type Workout = {
  id?: number;
  title?: string;
  date: Date;
  type: Type;
  user?: string;
  exercises?: String[];
};

type Type = {
  id?: number;
  title: string;
};

type Exercise = {
  id?: number;
  name?: string;
  type?: Type;
};

type StatusMessage = {
  message: string;
  type: "error" | "success";
};

export type { Exercise, Type, Workout, StatusMessage };
