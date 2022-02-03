
import React from 'react';

export default function Pagination({goToNextPage, goToPrevPage, currentPageNum, totalPageNum}) {
  return <div className="container">
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {goToPrevPage && <li className="page-item"><a className="page-link" href="#" onClick={goToPrevPage} id='previous'>Previous</a></li>}
        page {Math.ceil(currentPageNum/10)} of {totalPageNum}
        {goToNextPage && <li className="page-item"><a className="page-link" href="#" onClick={goToNextPage} id='next'>Next</a></li>}
      </ul>
    </nav>      
  </div>;
}
