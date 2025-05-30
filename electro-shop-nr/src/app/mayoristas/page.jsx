"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import SidebarProducts from "../../components/SideBarProducts";

import ProductListM from "@/components/ProductListMay";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Estados iniciales sin valores de searchParams
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [sortOrder, setSortOrder] = useState("asc");

  // Efecto para actualizar los estados una vez que `searchParams` esté disponible
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
    setMinPrice(Number(searchParams.get("minPrice")) || 0);
    setMaxPrice(Number(searchParams.get("maxPrice")) || 1000000);
    setSortOrder(searchParams.get("sortOrder") || "asc");
  }, [searchParams]);

  // Función para actualizar la URL con los filtros
  const updateFilters = (category, min, max, sort) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (min) params.set("minPrice", min);
    if (max) params.set("maxPrice", max);
    params.set("sortOrder", sort);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap mt-32">
      
      <div className="w-full sm:w-1/4 lg:w-1/5 p-4 xs:mt-[40px]">
        <SidebarProducts
          selectedCategory={selectedCategory}
          setCategory={(cat) => {
            setSelectedCategory(cat);
            updateFilters(cat, minPrice, maxPrice, sortOrder);
          }}
          setSortOrder={(sort) => {
            setSortOrder(sort);
            updateFilters(selectedCategory, minPrice, maxPrice, sort);
          }}
          setPriceRange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
            updateFilters(selectedCategory, min, max, sortOrder);
          }}
        />
      </div>
      <div className="w-full sm:w-3/4 lg:w-4/5 p-4">
        <ProductListM />
      </div>
    </div>
  );
};

export default ProductsPage;
