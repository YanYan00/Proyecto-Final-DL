import './Posts.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { ItemsContext } from '../../context/ItemsContext';
const Posts = () =>{
    const {id,token,obtenerProductoBD,obtenerPublicacionesBD,posts,agregarPublicacionBD,agregarProductoBD,editarProductoBD,editarPublicacionBD,eliminarProductoBD,eliminarPublicacionBD} = useContext(UserContext);
    const {consultarBD} = useContext(ItemsContext);
    const {categorias} = useContext(ItemsContext);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [postsIds,setPostsIds] = useState({
        publicacionId:null,
        productoId:null
    })
    const [formData,setFormData] = useState({
        nombre:'',
        stock:'',
        titulo:'',
        descripcion:'',
        precio:'',
        idCategoria:'',
    })
    useEffect(() =>{
        if(id && token){
            obtenerPublicacionesBD(id);
        }
    },[id,token]);
    const handleInputChange = (e) =>{
        const {name,value} = e.target;
        setFormData(prevState=>({
            ...prevState,
            [name]:value
        }));
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            if(!formData.titulo||!formData.descripcion||!formData.precio){
                alert("Todos los campos son requeridos");
                return;
            }
            if(isEditing){
                await editarProductoBD(postsIds.productoId,{
                    nombre: formData.nombre,
                    descripcion: formData.descripcion,
                    precio: parseInt(formData.precio),
                    stock: parseInt(formData.stock),
                    idCategoria: parseInt(formData.idCategoria)
                });
                await editarPublicacionBD(postsIds.publicacionId,{
                    titulo: formData.titulo,
                    descripcion: formData.descripcion,
                    precio: parseInt(formData.precio),
                    idCategoria: parseInt(formData.idCategoria)
                })
            }
            else{
                const productoData ={
                    nombre:formData.nombre,
                    descripcion:formData.descripcion,
                    precio: parseInt(formData.precio),
                    stock: parseInt(formData.stock),
                    idCategoria: parseInt(formData.idCategoria)
                };
                const producto = await agregarProductoBD(productoData);

                const publicacionData = {
                    titulo: formData.titulo,
                    descripcion:formData.descripcion,
                    precio:parseInt(formData.precio),
                    idUsuario:id,
                    idCategoria:parseInt(formData.idCategoria),
                    idProducto: producto.idproducto
                }  
                await agregarPublicacionBD(publicacionData) 
            }
            setFormData({
                nombre:'',
                stock:'',
                descripcion:'',
                precio:'',
                idCategoria:'',
                titulo:''
            })
            setIsEditing(false);
            setIsCreating(false);
            setPostsIds({publicacionId:null,productoId:null});
            await obtenerPublicacionesBD(id);
            await consultarBD();
        } catch (error) {
            console.error("Error al crear la publicacion",error);
            alert(`Hubo un error al ${isEditing ? 'actualizar' : 'crear'}  la publicacion`);
        }
    }
    const handleEdit = async (item) =>{
        const producto = await obtenerProductoBD(item.idproducto);
        setPostsIds({
            publicacionId: item.idpublicacion,
            productoId: item.idproducto
        })
        setFormData({
            nombre: producto.nombre,
            stock: producto.stock,
            titulo: item.titulo,
            descripcion: item.descripcion,
            precio: item.precio,
            idCategoria: item.idcategoria
        })
        setIsEditing(true);
    }
    const handleDelete = async (publicacionId,productoId) => {
        const confirmar = window.confirm('¿Estás seguro que quieres eliminar esta publicación')
        if(confirmar){
            try {
                await eliminarPublicacionBD(publicacionId);
                await eliminarProductoBD(productoId);
                await obtenerPublicacionesBD(id);
                await consultarBD();
            } catch (error) {
                alert('Error al eliminar la publicacion');
            }
        }
    }
    const renderPublications = () => (
        <div className='cont-publicaciones'>
            <button onClick={() => setIsCreating(true)} className="w-full mb-4 bg-blue-500 text-white py-2 rounded">Nueva publicación</button>
            <div className="space-y-4">
                {posts.map((item) => (
                    <div key={item.idpublicacion} className="border p-4 rounded">
                        <h4 className="font-bold">{item.titulo}</h4>
                        <p className="text-gray-600">${item.precio.toLocaleString()}</p>
                        <p>{item.descripcion}</p>
                        <button onClick={()=> handleEdit(item)}>Editar</button>
                        <button onClick={()=> handleDelete(item.idpublicacion,item.idproducto)}>X</button>
                    </div>))}
            </div>
        </div>
    )
    const renderForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-2">Título de la Publicación</label>
                <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Nombre del Producto</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Descripción</label>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Precio</label>
                <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Categoría</label>
                <select
                    name="idCategoria"
                    value={formData.idCategoria}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(categoria => (
                        <option 
                            key={categoria.idcategoria} 
                            value={categoria.idcategoria}
                        >
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between">
                <button 
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    {isEditing ? 'Guardar Cambios' : 'Crear Publicación'}
                </button>
                <button 
                    type="button"
                    onClick={() => {setIsEditing(false); setIsCreating(false); 
                        setFormData({
                            nombre: '',
                            stock: '',
                            descripcion: '',
                            precio: '',
                            idCategoria: '',
                            titulo: ''
                        })
                    }}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded">Cancelar
                </button>
            </div>
        </form>
    );
    if (!posts || posts.length === 0) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Mis publicaciones</h3>
                {!isCreating ? (
                    <div>
                        <p className="text-center text-gray-600">No tienes publicaciones aún</p>
                        <button 
                            onClick={() => setIsCreating(true)}
                            className="w-full mt-4 bg-blue-500 text-white py-2 rounded"
                        >
                            Nueva publicación
                        </button>
                    </div>
                ) : (
                    renderForm()
                )}
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Publicacion' : 'Mis publicaciones'}</h3>
            {(isCreating || isEditing) ?
                renderForm() : renderPublications()
            }
        </div>
    );
};

export default Posts;