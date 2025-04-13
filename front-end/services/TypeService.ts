import { Type, User } from "@/types";

const getAllTypes = async (): Promise<Type[]> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/types", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const types: Type[] = await response.json();
  return types;
};

const TypeService = {
  getAllTypes,
};

export default TypeService;
