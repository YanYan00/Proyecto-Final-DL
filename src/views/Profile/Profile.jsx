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
    confirmPass:''
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
        correo:perfil.correo
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
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      if(typeEditing === "datos"){
        if(!formData.nombre || !formData.correo){
          alert("Todos los campos son requeridos");
          return;
        }}
      else if(typeEditing === "contraseña"){
        if(!formData.password || !formData.confirmPass){
          alert("La contraseña es requerida");
          return;
        }
        if(formData.password !== formData.confirmPass) {
          alert("Las contraseñas no coinciden");
          return;
        }   
      }
      await actualizarPerfilBD(id,formData);
      setIsEditing(false);
      setTypeEditing("");
      setFormData({
        nombre:perfil.nombre,
        correo: perfil.correo,
        password:'',
        confirmPass:''
      })
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      console.error('Error al actualizar peril:',error);
      alert('Error al actualizar el perfil');
    }
  }
  const handleInputChange =(e) =>{
    const {name,value} =e.target;
    setFormData(prev =>({
      ...prev,
      [name]:value}));
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
            />
            <label className="nv-pw">Confirmar contraseña</label>
            <input 
              type="password"
              name="confirmPass"
              value={formData.confirmPass}
              onChange={handleInputChange} 
            />
            <div className="btn-pw">
              <button type="submit">Guardar Cambios</button>
              <button onClick={()=>{
                setIsEditing(false);
                setTypeEditing("");
              }} type="button">Cancelar</button>
            </div>
          </form>
        </div>
      )
    }
    if(typeEditing==="datos"){
      return(
        <div className="form-dt">
          <h2>Editar Perfil</h2>
          <form onSubmit={handleSubmit}>
            <label className="lbl-name">Nombre</label>
            <input 
              type="text" 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleInputChange}
            />
            <label className="lbl-name">Correo</label>
            <input 
              type="email" 
              name="correo" 
              value={formData.correo} 
              onChange={handleInputChange}
            />
            <div className="btn-dt">
              <button type="submit">Guardar Cambios</button>
              <button onClick={() =>{
                setIsEditing(false);
                setTypeEditing("");
              }} type="button">Cancelar</button>
            </div>
          </form>
          
        </div>
      )
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
                <div className="botonesCambio">
                  <button onClick={() => {
                    setIsEditing(true);
                    setTypeEditing("datos")}}>Editar perfil</button>
                  <button onClick={() => {
                    setIsEditing(true);
                    setTypeEditing("contraseña")}}>Cambiar contraseña</button>
                </div>
                
            </div>
        </div>
  );
};

export default Profile;
