import Sidebar from "../../components/Sidebar";

const AdminLayout = ({ children }) => {
    return (
      <div className="bg-zinc-900 w-full h-full">
        {/* Sidebar a la izquierda */}
        <Sidebar />
        {children}
      </div>
    );
  };
  
  export default AdminLayout;
  