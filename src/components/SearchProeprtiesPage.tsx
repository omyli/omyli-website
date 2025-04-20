import { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard.tsx';
import BeatLoader from 'react-spinners/BeatLoader';
import { listAllProperties } from '../api/propertiesApi';
import '../css/buscador.css';

const SearchProeprtiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllProperties = async () => {
      setIsLoading(true);
      const response = await listAllProperties();
      const properties = response.status === 200 ? response.data : [];
      setProperties(properties);
      setIsLoading(false);
    };
    getAllProperties();
  }, []);

  const searchProperties = () => {
    console.log('Buscando:', searchText);
  };

  const _onClickSearchButtonHandler = (e: any) => {
    searchProperties();
  };

  const _onSearchBarChangeHandler = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const _onKeyUpSearchBarHandler = (e: any) => {
    if (e.key === 'Enter') {
      searchProperties();
    }
  };

  return (
    <div className="container properties-search-main-container">
      {/* SEARCH */}
      <div className="search-header-container">
        <h1>Encuentra tu siguiente inversión</h1>
        <div className="search-header_inputs-container">
          <input
            type="text"
            className="search-input"
            value={searchText}
            placeholder="Buscar por ciudad, estado, colonia..."
            onChange={_onSearchBarChangeHandler}
            onKeyUp={_onKeyUpSearchBarHandler}
          />
          <button onClick={_onClickSearchButtonHandler}>
            <span className="search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </button>
        </div>
      </div>
      {/* GRID */}
      <section className="properties-grid-container">
        {isLoading ? (
          <div className="properties-grid-container_loader">
            <BeatLoader size="25px" color="#bfa641" />
            Cargando...
          </div>
        ) : (
          <>
            {properties?.map((property: any) => (
              <PropertyCard
                key={property.id}
                property={property}
                flexGrow={1}
                flexShrink={1}
                flexBasis="350px"
                height="480px"
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default SearchProeprtiesPage;
