"use client";
import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function CustomPagination({ pages, setCurrentPage }: { pages: number, setCurrentPage: (page:number) => void }) {
  const [currentPage, setCurrentPageLocal] = useState(0);

  const CustomPaginationItem = ({ page }: { page: number }) => {
    return (
      <PaginationItem style={{ cursor: "pointer" }}>
        <PaginationLink
          onClick={() => {
            setCurrentPage(page);
            setCurrentPageLocal(page);
          }}
          style={{ cursor: "pointer" }}
          isActive={currentPage === page}
        >
          {page + 1}
        </PaginationLink>
      </PaginationItem>
    );
  };

  if (pages === 0 || pages === 1) {
    return null;
  }

  return (
    <Pagination style={{ cursor: "default", marginTop: "10px" }}>
      <PaginationContent style={{ cursor: "default" }}>
        <PaginationItem style={{ cursor: "pointer" }}>
          {currentPage !== 0 && (
            <PaginationPrevious
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setCurrentPageLocal(currentPage - 1);
              }}
              style={{ cursor: "pointer" }}
            />
          )}
        </PaginationItem>
        {pages < 6 &&
          Array.from({ length: pages }).map((_, index) => (
            <CustomPaginationItem key={index} page={index} />
          ))}
        {pages >= 6 && currentPage < 3 && (
          <>
            <CustomPaginationItem page={0} />
            <CustomPaginationItem page={1} />
            <CustomPaginationItem page={2} />
            <PaginationItem style={{ cursor: "default" }}>
              <PaginationEllipsis />
            </PaginationItem>
            <CustomPaginationItem page={pages - 1} />
          </>
        )}
        {pages >= 6 && currentPage >= 3 && currentPage <= pages - 4 && (
          <>
            <CustomPaginationItem page={0} />
            <PaginationItem style={{ cursor: "default" }}>
              <PaginationEllipsis />
            </PaginationItem>
            <CustomPaginationItem page={currentPage - 1} />
            <CustomPaginationItem page={currentPage} />
            <CustomPaginationItem page={currentPage + 1} />
            <PaginationItem style={{ cursor: "default" }}>
              <PaginationEllipsis />
            </PaginationItem>
            <CustomPaginationItem page={pages - 1} />
          </>
        )}
        {pages >= 6 && currentPage > pages - 4 && (
          <>
            <CustomPaginationItem page={0} />
            <PaginationItem style={{ cursor: "default" }}>
              <PaginationEllipsis />
            </PaginationItem>
            <CustomPaginationItem page={pages - 3} />
            <CustomPaginationItem page={pages - 2} />
            <CustomPaginationItem page={pages - 1} />
          </>
        )}
        <PaginationItem style={{ cursor: "pointer" }}>
          {currentPage !== pages - 1 && (
            <PaginationNext
              onClick={() => {
                setCurrentPage(currentPage + 1);
                setCurrentPageLocal(currentPage + 1);
              }}
              style={{ cursor: "pointer" }}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
