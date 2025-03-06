import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import './Profile.css'


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
      <div className="profile-charge">
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
            <div className="new-data">
              <span><label className="nv-pw">Nueva contraseña: </label></span>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange}
                required
              />  
            </div>
            <div className="new-data">
              <span><label className="nv-pw">Confirmar contraseña: </label></span>
              <input 
                type="password"
                name="confirmPass"
                value={formData.confirmPass}
                onChange={handleInputChange}
                required 
              />
            </div>
            
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
        <div className="form-data">
          <h2 className="pf-title">Editar Perfil</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="new-data">
              <span><label className="block text-gray-700">Nombre: </label></span>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleInputChange}
                className="input-edit"
                required
              />
            </div>
            <div className="new-data">
              <span><label className="block text-gray-700">Correo: </label></span>
              <input 
                type="email" 
                name="correo" 
                value={formData.correo} 
                onChange={handleInputChange}
                className="input-edit"
                required
              />
            </div>
            <div className="new-data">
              <span><label className="block text-gray-700">Teléfono: </label></span>
              <input 
                type="tel" 
                name="telefono" 
                value={formData.telefono} 
                onChange={handleInputChange}
                className="input-edit"
                required
              />
            </div>
            <div className="new-data">
              <span><label className="block text-gray-700">Dirección: </label></span>
              <textarea 
                name="direccion" 
                value={formData.direccion} 
                onChange={handleInputChange}
                className="input-edit"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="flex space-x-2">
              <button 
                type="submit"
                className="btn-edit"
              >
                Guardar Cambios
              </button>
              <button 
                onClick={handleCancel}
                type="button"
                className="btn-edit"
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
    <div className="profile-user">
      <h2 className="profile-title">Perfil de Usuario</h2>
      <div className="space-y-4">
        <div className="info-profile">
          <span><p className="text-gray-600">Nombre:</p></span>  
          <p className="font-medium">{perfil.nombre}</p>
        </div>
        <div className="info-profile">
          <span><p className="text-gray-600">Email:</p></span>  
          <p className="font-medium">{perfil.correo}</p>
        </div>
        <div className="info-profile">
          <span><p className="text-gray-600">Teléfono:</p></span>
          <p className="font-medium">{perfil.telefono || 'No especificado'}</p>
        </div>
        <div className="info-profile">
          <span><p className="text-gray-600">Dirección:</p></span>
          <p className="font-medium">{perfil.direccion || 'No especificada'}</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <button 
            onClick={() => {
              setIsEditing(true);
              setTypeEditing("datos");
            }}
            className="btn-edit"
          >
            Editar datos
          </button>
          <button 
            onClick={() => {
              setIsEditing(true);
              setTypeEditing("contraseña");
            }}
            className="btn-edit"
          >
            Cambiar contraseña
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
