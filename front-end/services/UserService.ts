import { User } from "@/types";

const loginUser = (user: { email: string; password: string }) => {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const getAllUsers = async (token: string): Promise<User[]> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const users: User[] = await response.json();
  return users;
};

const getUserByEmail = async (
  email: string,
  token: string
): Promise<User | null> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/users/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user with email: ${email}`);
  }

  const user: User = await response.json();
  return user;
};

const UserService = {
  loginUser,
  getUserByEmail,
  getAllUsers,
};

export default UserService;
