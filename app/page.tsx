'use client';

import React from 'react';
import Campaigns from './mailchimp';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const Page: React.FC = () => {
  return (
    <div>
      <Campaigns />
    </div>
  );
};

export default Page;
