

const Combos = () => {
  // Datos de ejemplo para los combos
  const combos = [
    {
      id: 1,
      title: "Combo 5 Auriculares bluetooth in-ear",
      price: 105000,
      image: "https://acdn-us.mitiendanube.com/stores/215/480/products/captura-de-pantalla-2020-05-09-a-las-19-38-361-23a92b269c0162bd8c15989953224238-240-0.png",
    },
    {
      id: 2,
      title: "Combo 12 Fundas iphone silicona 11/12/13/14",
      price: 55000,
      image: "https://onplay.com.ar/wp-content/uploads/2024/03/FUNDA-SILICONA-IPHONE-colores.png",
    },
    {
      id: 3,
      title: "Combo 5 Auriculares Vinchas",
      price: 120000,
      image: "https://cellplay.com.ar/img/Public/1081-producto-7a546dc7c5d0e3dd3b1ce0eaca-2910.jpeg",
    },
  ];

  return (
    <div className="container justify-center mx-auto py-8 px-4 text-zinc-800 mt-[100px]">
      <h1 className="text-2xl font-semibold mb-6">Nuestros Combos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {combos.map((combo) => (
          <div key={combo.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={combo.image} alt={combo.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{combo.title}</h2>
              <p className="text-lg text-gray-700">{`${combo.price.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Combos;
