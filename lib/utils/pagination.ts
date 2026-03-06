/**
 * Pagination utilities for client-side and server-side pagination
 */

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Calculate pagination metadata
 */
export function calculatePagination(
  page: number,
  limit: number,
  total: number
): PaginatedResponse<any>['pagination'] {
  const totalPages = Math.ceil(total / limit);
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

/**
 * Paginate an array of items
 */
export function paginate<T>(
  items: T[],
  page: number,
  limit: number
): PaginatedResponse<T> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    data: paginatedItems,
    pagination: calculatePagination(page, limit, items.length),
  };
}

/**
 * Generate page numbers for pagination UI
 * Returns array of page numbers with ellipsis for large page counts
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | string)[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = currentPage - half;
  let end = currentPage + half;

  // Adjust if at the start
  if (start <= 1) {
    start = 1;
    end = maxVisible;
  }

  // Adjust if at the end
  if (end >= totalPages) {
    end = totalPages;
    start = totalPages - maxVisible + 1;
  }

  const pages: (number | string)[] = [];

  // Add first page
  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push('...');
    }
  }

  // Add middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add last page
  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push('...');
    }
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Default pagination settings
 */
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 12,
};
