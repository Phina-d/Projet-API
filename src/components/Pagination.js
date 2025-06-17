// src/components/Pagination.js
import React from 'react';
import { Button } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange, darkMode }) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Button
        variant={darkMode ? 'outline-light' : 'outline-dark'}
        className="me-2"
        onClick={() => onPageChange('prev')}
        disabled={currentPage === 1}
      >
        Précédent
      </Button>
      <span className="align-self-center">Page {currentPage} / {totalPages}</span>
      <Button
        variant={darkMode ? 'outline-light' : 'outline-dark'}
        className="ms-2"
        onClick={() => onPageChange('next')}
        disabled={currentPage === totalPages}
      >
        Suivant
      </Button>
    </div>
  );
};

export default Pagination;
