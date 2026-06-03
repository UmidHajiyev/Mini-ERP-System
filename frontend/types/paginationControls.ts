export type PaginationControlsProps = {
  totalCount: number;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  currentPage: number;
  onNext: () => void;
  onPrevious: () => void;
};