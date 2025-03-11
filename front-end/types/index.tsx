type Post = {
  id?: number;
  title: string;
  comment: string;
  date: Date;
  boulder: BoulderProblem;
  image: Image;
  user: User;
};

type Image = {
  id?: number;
  fileName: string;
  path: string;
};

type User = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  achievements?: Achievement[];
  role?: Role;
};

type ClimbingGym = {
  id?: number;
  location: string;
  gymName: string;
};

type Achievement = {
  id?: number;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard" | "extreme";
};

type BoulderProblem = {
  id?: number;
  grade: string;
  gym: ClimbingGym;
};

type StatusMessage = {
  message: string;
  type: "error" | "success";
};

type Role = "user" | "VIP" | "admin";

export type {
  Post,
  User,
  Achievement,
  BoulderProblem,
  ClimbingGym,
  StatusMessage,
  Image,
  Role,
};
