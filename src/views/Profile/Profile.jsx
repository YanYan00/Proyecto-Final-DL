import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";


const Profile = () => {
  const {id,token,perfil,obtenerPerfilBD,actualizarPerfilBD} = useContext(UserContext);
  const [isEditing,setIsEditing] = useState(false);
  const [typeEditing,setTypeEditing] = useState("");
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPass:'',
    telefono:'',
    direccion:''
  })

  useEffect(() => {
    if (id && token) {
      obtenerPerfilBD(id);
    }
  }, [id, token]);
  useEffect(()=>{
    if(perfil){
      setFormData({
        nombre:perfil.nombre,
        correo:perfil.correo,
        telefono:perfil.telefono,
        direccion:perfil.direccion,
        password:'',
        confirmPass:''
      });
    }
  },[perfil])

  if (!perfil) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <p className="text-center text-gray-600">Cargando perfil...</p>
      </div>
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (typeEditing === "datos") {
        if (!formData.nombre || !formData.correo || !formData.telefono || !formData.direccion) {
          alert("Todos los campos son requeridos");
          return;
        }
        const datosActualizados = {
          nombre: formData.nombre,
          correo: formData.correo,
          telefono: formData.telefono,
          direccion: formData.direccion,
          tipo: 'datos'
        };
        
        await actualizarPerfilBD(id, datosActualizados);
      } 
      else if (typeEditing === "contraseña") {
        if (!formData.password || !formData.confirmPass) {
          alert("Ambos campos de contraseña son requeridos");
          return;
        }
        if (formData.password !== formData.confirmPass) {
          alert("Las contraseñas no coinciden");
          return;
        }
        const datosPassword = {
          password: formData.password,
          confirmPass: formData.confirmPass,
          tipo: 'password'
        };
        
        await actualizarPerfilBD(id, datosPassword);
      }
      setIsEditing(false);
      setTypeEditing("");
      await obtenerPerfilBD(id);
      
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil: ' + (error.message || 'Inténtelo de nuevo'));
    }
  };
  const handleInputChange =(e) =>{
    const {name,value} =e.target;
    setFormData(prev =>({
      ...prev,
      [name]:value}));
  };
  const handleCancel = () => {
    setFormData({
      nombre: perfil.nombre,
      correo: perfil.correo,
      telefono: perfil.telefono,
      direccion: perfil.direccion,
      password: '',
      confirmPass: ''
    });
    setIsEditing(false);
    setTypeEditing("");
  };
  if (isEditing){
    if(typeEditing==="contraseña"){
      return(
        <div className="form-pw">
          <h2 className="pw-title">Cambiar contraseña</h2>
          <form onSubmit={handleSubmit} className="pw-form">
            <label className="nv-pw">Nueva contraseña</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleInputChange}
              required
            />
            <label className="nv-pw">Confirmar contraseña</label>
            <input 
              type="password"
              name="confirmPass"
              value={formData.confirmPass}
              onChange={handleInputChange}
              required 
            />
            <div className="btn-pw">
              <button type="submit">Guardar Cambios</button>
              <button onClick={handleCancel} type="button">Cancelar</button>
            </div>
          </form>
        </div>
      )
    }
    if (typeEditing === "datos") {
      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombre</label>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Correo</label>
              <input 
                type="email" 
                name="correo" 
                value={formData.correo} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Teléfono</label>
              <input 
                type="tel" 
                name="telefono" 
                value={formData.telefono} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Dirección</label>
              <textarea 
                name="direccion" 
                value={formData.direccion} 
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="flex space-x-2">
              <button 
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Guardar Cambios
              </button>
              <button 
                onClick={handleCancel}
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      );
    }
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
        <div>
          <p className="text-gray-600">Teléfono:</p>
          <p className="font-medium">{perfil.telefono || 'No especificado'}</p>
        </div>
        <div>
          <p className="text-gray-600">Dirección:</p>
          <p className="font-medium">{perfil.direccion || 'No especificada'}</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <button 
            onClick={() => {
              setIsEditing(true);
              setTypeEditing("datos");
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Editar datos
          </button>
          <button 
            onClick={() => {
              setIsEditing(true);
              setTypeEditing("contraseña");
            }}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Cambiar contraseña
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
