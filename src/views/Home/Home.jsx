return (
  <div className="home-container">
    <div className="main-content">
      <div className="categories-menu">
        {categorias.map((categoria, index) => (
          <button 
            onClick={() => filtrarItems(categoria)} 
            key={index} 
            className={`category-btn ${botonActivo?.nombre === categoria.nombre ? 'active' : ''}`}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>
      <div className="right-content">
        <div className="search-section">
          <input
            type="text"
            placeholder="Buscar productos"
            value={buscador}
            onChange={(e) => setBuscador(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="products-grid">
          {mostrarItems.map((item, index) => (
            <CardItem item={item} key={index} añadirItem={añadirItem} />
          ))}
        </div>
      </div>
    </div>
    <div className="pagination">
      <button 
        onClick={() => setPagina(p => p-1)} 
        disabled={pagina === 1} 
        className="page-btn"
      >
        Anterior
      </button>
      <button 
        onClick={() => setPagina(p => p+1)} 
        disabled={mostrarItems.length < 6} 
        className="page-btn"
      >
        Siguiente
      </button>
    </div>
  </div>
);