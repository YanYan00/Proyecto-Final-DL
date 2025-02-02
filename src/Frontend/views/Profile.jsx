import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return <p className="text-center mt-10">No has iniciado sesión</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Perfil</h2>
      <p><strong>Correo:</strong> {user.email}</p>
      <button className="mt-4 bg-red-500 text-white p-2 rounded w-full"
        onClick={() => { logout(); navigate("/"); }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Profile;
