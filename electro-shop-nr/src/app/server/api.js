import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const TABLE_NAME = "products";
const BUCKET_NAME = "products-images";

// Obtener todos los productos
export const getProducts = async (category = null, sortOrder = "asc", minPrice = 0, maxPrice = Infinity,searchTerm = "") => {
  try {
    const MAX_PRICE_LIMIT = 1000000; // Definir un límite alto para el precio
    const priceLimit = maxPrice === Infinity ? MAX_PRICE_LIMIT : maxPrice;

    let query = supabase.from("products").select("*");

    // Filtrar por categoría
    if (category) query = query.eq("category", category);

    // Filtrar por precio mínimo y máximo
    if (typeof minPrice === "number" && !isNaN(minPrice)) {
      query = query.gte("price", minPrice);
    }
    if (typeof priceLimit === "number" && !isNaN(priceLimit)) {
      query = query.lte("price", priceLimit);
    }

    // Filtrar por nombre (case-insensitive)
    if (searchTerm.trim()) {
      query = query.ilike("name", `%${searchTerm}%`); // 🔹 Ahora usa 'searchTerm'
    }

    // Ordenar por precio
    query = query.order("price", { ascending: sortOrder === "asc" });

    // Ejecutar la consulta
    const { data, error } = await query;
    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};







// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select("*").eq("id", id).single();
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
};

// Crear un nuevo producto con imágenes
export const createProduct = async (product, files) => {
  try {
    // Verificar que al menos haya una imagen válida
    if (!files || files.length === 0 || files.some(file => file === null)) {
      throw new Error("Debes subir al menos una imagen válida.");
    }

    const imageUrls = [];

    // Subir las imágenes a Supabase
    for (const file of files) {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file);

      if (error) throw new Error(`Error al subir la imagen: ${error.message}`);

      const { data:urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);
      console.log(data)
      const publicUrlFinal = urlData.publicUrl;
      imageUrls.push(publicUrlFinal);
    }

    // Si no hay imágenes después de subirlas, no insertar el producto
    if (imageUrls.length === 0) {
      throw new Error("No se pudieron subir las imágenes correctamente.");
    }

    // Insertar el producto con las URLs de las imágenes
    const { data: newProduct, error: insertError } = await supabase.from(TABLE_NAME).insert([{
      name: product.name,
      description: product.description,
      price: product.price,
      old_price: product.old_price ? product.old_price : null, 
      free_shipping: product.free_shipping,
      stock: product.stock,
      category: product.category,
      images: imageUrls, // Guardar las URLs de las imágenes
    }]);

    if (insertError) throw insertError;
    SweetAlert("Publicado", "Producto agregado correctamente", "success");
    return newProduct;
  } catch (error) {
    console.error("Error en createProduct:", error);
    alert("Error al agregar el producto: " + error.message);
    throw error;
  }
};


// Actualizar producto
export const updateProduct = async (id, updatedData, newFiles) => {
  try {
    let imageUrls = updatedData.images || [];

    if (newFiles && newFiles.length > 0) {
      if (imageUrls.length + newFiles.length > 6) throw new Error("Solo puedes tener hasta 6 imágenes por producto.");

      for (const file of newFiles) {
        const fileName = `${id}_${Date.now()}`;
        const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file);

        if (error) throw new Error(`Error al subir la nueva imagen: ${error.message}`);

        const { publicUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);
        imageUrls.push(publicUrl);
      }
    }

    const { error: updateError } = await supabase
      .from(TABLE_NAME)
      .update({ ...updatedData, images: imageUrls })
      .eq("id", id);

    if (updateError) throw updateError;

    SweetAlert("Éxito", "Producto actualizado correctamente", "success");
  } catch (error) {
    console.error("Error en updateProduct:", error);
    SweetAlert("Error", error.message, "error");
    throw error;
  }
};

// Eliminar producto y sus imágenes
export const deleteProduct = async (id, images) => {
  try {
    if (images.length > 0) {
      const paths = images.map((url) => url.split(`${BUCKET_NAME}/`)[1]);
      await supabase.storage.from(BUCKET_NAME).remove(paths);
    }

    const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
    if (error) throw error;

    SweetAlertOptions("¿Eliminar este producto?", "Eliminar", "Volver atras", "Producto eliminado correctamente","sucess", "Producto no eliminado","sucess");
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    SweetAlertError("Ocurrio un Error, pero no te preocupes", error.message, "Enviaselo a el soporte tecnico");
    throw error;
  }
};




export const SweetAlert = (title, text, icon) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "OK",
  });
};

export const SweetAlertOptions = (title, confirmButtonText, denyButtonText, titleConfirm, textConfirm, titleDenied, textDenied) => {
  Swal.fire({
    title: title,
    icon: "warning",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    denyButtonText: denyButtonText
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire(titleConfirm, "", textConfirm);
    } else if (result.isDenied) {
      Swal.fire(titleDenied, "", textDenied);
    }
  });
}

export const SweetAlertError = (title, text, textHref) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    footer: `<a href="#">${textHref}</a>`
  });
}


export const getRandomProductsByCategory = async (category) => {
  try {
    let { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category); // Filtrar por categoría

    if (error) throw error;

    // Barajar aleatoriamente los productos y tomar hasta 5
    const shuffledProducts = data.sort(() => Math.random() - 0.5).slice(0, 5);

    return shuffledProducts;
  } catch (error) {
    console.error("Error al obtener productos aleatorios:", error);
    return [];
  }
};

export const updateDeliveryStatus = async (id, delivered) => {
  try {
    const { error } = await supabase
      .from("purchases")
      .update({ delivered })
      .eq("id", id);

    if (error) throw error;
    console.log("Estado de entrega actualizado correctamente");
    return true;
  } catch (error) {
    console.error("Error al actualizar el estado de entrega:", error);
    return false;
  }
};




