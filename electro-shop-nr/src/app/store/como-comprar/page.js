const ComoComprar = () => {
    return (
      <div className="flex xl:flex-row xs:mx-4 lg:flex-row md:flex-row flex-col mx-6 py-8 justify-center  px-4 mt-[100px]">
        <div className="text-lg text-gray-700 space-y-4 p-5">
        <h1 className="text-2xl font-semibold text-blue-600 mb-6">¿Cómo Comprar?</h1>
          <h2 className="font-semibold">Opciones de Envío:</h2>
          <ul className="space-y-2">
            <li>A CABA y PBA: $7000 de costo de envío.</li>
            <li>Retiro por local: Sin costo adicional.</li>
          </ul>
          </div>
          <div className="text-lg text-gray-700 space-y-4 w-full p-5">
          <h1 className="text-2xl font-semibold text-blue-600 mb-6">Minimo de compra:</h1>
          <h2 className="font-semibold">Pasos para Comprar:</h2>
          <ul className="space-y-2">
            <li>Compra mínima en el local 3 unidades mismo artículo ( excluyendo fundas y vidrios para celular  ) 
            </li>
            <li>Fundas y vidrios para celular mínimo en el local $30.000
            </li>
            <li>Envíos al interior mínimo de compra $80.000.</li>
          </ul>
        </div>

      </div>
    );
  };
  
  export default ComoComprar;
  