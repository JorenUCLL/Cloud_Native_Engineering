import { User } from "@/types";

const loginUser = (user: { email: string; password: string }) => {
  return fetch(
    "https://functioncloudnativegroup25.azurewebsites.net/api" + "/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
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
): Promise<{ user: User }> => {
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

  const result = await response.json(); // This is: { user: User }
  return result;
};

const getUserById = async (
  id: string,
  token: string
): Promise<{ user: User }> => {
  const response = await fetch(
    `https://functioncloudnativegroup25.azurewebsites.net/api/users/getUserById/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID: ${id}`);
  }
  const result = await response.json(); // This is: { user: User }
  return result;
};


const UserService = {
  loginUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
};

export default UserService;
