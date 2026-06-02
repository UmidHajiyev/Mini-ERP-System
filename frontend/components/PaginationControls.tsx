import type { PaginationControlsProps } from "@/types/paginationControls";

export default function PaginationControls({totalCount, nextPageUrl, previousPageUrl,
    currentPage, onNext, onPrevious,}: PaginationControlsProps) 
{
  return (
    <div className="pagination-controls">
      <span>Total products: {totalCount}</span>

      <div className="pagination-buttons">
        <button className="secondary-button" onClick={onPrevious} disabled={!previousPageUrl}>
          Previous
        </button>
        <button className="secondary-button">{currentPage}</button>
        <button className="secondary-button" onClick={onNext} disabled={!nextPageUrl}>
          Next
        </button>
      </div>
    </div>
  );
}