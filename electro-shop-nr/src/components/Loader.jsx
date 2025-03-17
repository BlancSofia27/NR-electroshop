import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <img
        src="/loader.gif" // Asegúrate de colocar la ruta correcta al archivo loader.gif
        alt="Loading..."
        className="w-h-24 h-24" // Puedes ajustar el tamaño según necesites
      />
    </div>
  );
};

export default Loader;
