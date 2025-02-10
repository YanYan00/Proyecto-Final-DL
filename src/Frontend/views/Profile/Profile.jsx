import { useContext, useEffect } from "react";
import { ItemsContext } from "../../context/ItemsContext";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const {perfil,obtenerPerfilBD} = useContext(ItemsContext);
  const {id,token} = useContext(UserContext);

  useEffect(() => {
    if (id && token) {
      obtenerPerfilBD(id);
    }
  }, [id, token]);
  if (!perfil) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <p className="text-center text-gray-600">Cargando perfil...</p>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
            <div className="space-y-4">
                <div>
                    <p className="text-gray-600">Nombre:</p>
                    <p className="font-medium">{perfil.nombre}</p>
                </div>
                <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-medium">{perfil.correo}</p>
                </div>
            </div>
        </div>
  );
};

export default Profile;
