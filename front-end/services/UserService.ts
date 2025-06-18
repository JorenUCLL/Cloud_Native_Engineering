import { User } from "@/types";

const loginUser = async (user: { email: string; password: string }) => {
  const response = await fetch(
    "https://functioncloudnativegroup25.azurewebsites.net/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
};


const getAllUsers = async (token: string): Promise<User[]> => {
  const response = await fetch(
    "https://functioncloudnativegroup25.azurewebsites.net/api" + "/users",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const users: User[] = await response.json();
  return users;
};

const getUserByEmail = async (
  email: string,
  token: string
): Promise<User | null> => {
  const response = await fetch(
    "https://functioncloudnativegroup25.azurewebsites.net/api" +
      `/users/getUser/${email}`,
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
