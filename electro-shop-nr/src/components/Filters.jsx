"use client";

import { useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return <div>Filtrando por categoría: {category}</div>;
};

export default Filter;
