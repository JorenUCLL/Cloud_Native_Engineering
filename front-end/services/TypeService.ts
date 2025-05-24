import { Type, User } from "@/types";

const getAllTypes = async (): Promise<Type[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/types`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.map((item: any) => ({
    id: item._id,
    title: item.title,
  }));
};

const TypeService = {
  getAllTypes,
};

export default TypeService;
