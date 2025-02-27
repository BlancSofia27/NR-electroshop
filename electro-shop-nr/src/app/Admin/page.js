// AdminPage.js

import Sidebar from "../../components/Sidebar"; // El componente Sidebar que contiene las opciones

const AdminPage = () => {
  return (
    <div className="flex">
      {/* Sidebar a la izquierda */}
      <Sidebar />
      
      {/* Contenido principal */}
      <div className="flex-1 p-4">
        {/* Aquí se cargará el contenido dependiendo de la opción seleccionada en la Sidebar */}
      </div>
    </div>
  );
};

export default AdminPage;
