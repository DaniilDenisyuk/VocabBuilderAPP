import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import styles from './index.module.scss';

export default function WordPagination({ currentPage, onPageChange, pageCount }) {
  const renderPaginationButtons = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1 || 1);
    const endPage = Math.min(pageCount, currentPage + 1);

    if (currentPage > 2) {
      pages.push(
        <button key="first" onClick={() => onPageChange(1)} className={styles.paginationButton}>
          1
        </button>
      );
    }
    if (currentPage > 3) {
      pages.push(<span key="dots-left">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${styles.paginationButton} ${i - 1 === currentPage ? styles.activePage : ''}`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < pageCount - 2) {
      pages.push(<span key="dots-right">...</span>);
    }
    if (currentPage < pageCount - 1) {
      pages.push(
        <button
          key="last"
          onClick={() => onPageChange(pageCount - 1)}
          className={styles.paginationButton}
        >
          {pageCount}
        </button>
      );
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pageCount) onPageChange(currentPage + 1);
  };

  return (
    <div className={styles.paginationContainer}>
      <>
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={styles.paginationButton}
        >
          <GrPrevious />
        </button>
        {renderPaginationButtons()}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === pageCount - 1}
          className={styles.paginationButton}
        >
          <GrNext />
        </button>
      </>
    </div>
  );
}
