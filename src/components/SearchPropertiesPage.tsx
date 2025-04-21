import { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard.tsx';
import BeatLoader from 'react-spinners/BeatLoader';
import { searchProperties } from '../api/propertiesApi.js';
import emptyState from '../assets/properties-search-empty-state.svg';
import '../css/buscador.css';

const SearchPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      setSearchText(query);
    }
    searchPropertiesHandler(currentPage, query);
  }, []);

  const searchPropertiesHandler = async (page: number, searchText: string | null) => {
    setIsLoading(true);
    const response = await searchProperties({ searchText }, page, 8);
    const properties = response.status === 200 ? response.data.items : [];
    setProperties(properties);
    setTotalPages(response.data.totalPages);
    setCurrentPage(response.data.page);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const _onClickSearchButtonHandler = (e: any) => {
    searchPropertiesHandler(1, searchText);
  };

  const _onSearchBarChangeHandler = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const _onKeyUpSearchBarHandler = (e: any) => {
    if (e.key === 'Enter') {
      searchPropertiesHandler(1, searchText);
    }
  };

  const _pageOnClickHandler = (page: number) => {
    if (page === currentPage) return;
    searchPropertiesHandler(page, searchText);
  };

  const _nextPageOnclickHandler = () => {
    if (currentPage === totalPages) return;
    searchPropertiesHandler(currentPage + 1, searchText);
  };

  const _previusPageOnClickHandler = () => {
    if (currentPage === 1) return;
    searchPropertiesHandler(currentPage - 1, searchText);
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
            disabled={isLoading}
          />
          <button disabled={isLoading} onClick={_onClickSearchButtonHandler}>
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
          <div className="properties-pagination-container">
            {properties.length > 0 ? (
              <>
                <div className="properties-grid-internal-container">
                  {properties?.map((property: any) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      flexGrow={1}
                      flexShrink={1}
                      flexBasis="300px"
                      height="380px"
                    />
                  ))}
                </div>
                <div className="properties-grid-page-container">
                  <button className="page-button" onClick={_previusPageOnClickHandler}>
                    {'<'}
                  </button>
                  {pages.map(page => {
                    let classNameToButton = '';
                    currentPage === page
                      ? (classNameToButton = 'page-button selected-page')
                      : (classNameToButton = 'page-button');

                    return (
                      <button
                        key={page}
                        className={classNameToButton}
                        onClick={() => _pageOnClickHandler(page)}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button className="page-button" onClick={_nextPageOnclickHandler}>
                    {'>'}
                  </button>
                </div>
              </>
            ) : (
              <div className="properties-pagination-empty-container">
                <img src={emptyState.src} />
                <h4>Ooops.. No hay resultados</h4>
                <p>
                  No tenemos inmuebles que conincidan con tu búsqueda. Te recomendamos ajustar tus
                  filtros
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPropertiesPage;
