'use client';


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'node-html-parser';
import { Skeleton } from "@/components/ui/skeleton"

import './page.css';

const apiUrl = 'https://api.synodic.ai';

export default function BlogPost({ params }: { params: { blogId: string } }) {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  const cleanHtmlContent = (htmlContent: string | null): string | null => {
    if (!htmlContent) {
      return null;
    }

    const root = parse(htmlContent);

    root.querySelectorAll('td.mceLayoutContainer').forEach((tag) => {
      if (
        tag.innerText.includes('View email in browser') ||
        tag.innerText.includes('update your preferences') ||
        tag.innerText.includes('unsubscribe')
      ) {
        tag.remove();
      }
    });

    return root.toString();
  };

  useEffect(() => {
    const fetchCampaignHtml = async (campaignId: string) => {
      const url = `${apiUrl}/campaigns/${campaignId}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        const cleanedHtmlContent = cleanHtmlContent(response.data.html);
        setHtmlContent(cleanedHtmlContent || '');
      } else {
        console.error(`Failed to retrieve content for campaign ${campaignId}: ${response.status}, ${response.statusText}`);
        setHtmlContent(null);
      }
    };

    fetchCampaignHtml(params.blogId);
  }, [params.blogId]);

  if (!htmlContent) {
    return <div className="flex flex-col items-center"><Skeleton className="mb-5 h-[100vh] w-[660px]" /></div>;
  }
  return (
    <div className="container mx-auto p-4 ">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
