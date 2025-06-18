import { Type, User } from "@/types";

const getAllTypes = async (): Promise<Type[]> => {
  const response = await fetch(
    "https://functioncloudnativegroup25.azurewebsites.net/api" + "/types",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const types: Type[] = await response.json();
  return types;
};

const TypeService = {
  getAllTypes,
};

export default TypeService;
