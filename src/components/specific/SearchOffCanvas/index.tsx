import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DropdownSearch from '../../common/DropdownSearch';

const SearchOffCanvas = () => {
  const [showSearch, setShowSearch] = useState(false);

  const handleShowSearch = () => setShowSearch(true);
  const handleCloseSearch = () => setShowSearch(false);

  return (
    <>
      <Button variant="light" className="search-button-custom" onClick={handleShowSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>

      <Offcanvas
        show={showSearch}
        onHide={handleCloseSearch}
        id="offcanvasSearch"
        aria-labelledby="offcanvasSearchLabel"
        placement="end"
        style={{ backgroundColor: '#0077B5', color: '#fff', width: '414px' }}
        className="mobile-offcanvas"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title id="offcanvasSearchLabel">
            Pesquisa
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DropdownSearch />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SearchOffCanvas;
