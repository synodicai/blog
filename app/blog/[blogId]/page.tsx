'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const apiUrl = 'https://api.synodic.ai';

export default function BlogPost({ params }: { params: { blogId: string } }) {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaignHtml = async (campaignId: string) => {
      const url = `${apiUrl}/campaigns/${campaignId}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setHtmlContent(response.data.html || '');
      } else {
        console.error(`Failed to retrieve content for campaign ${campaignId}: ${response.status}, ${response.statusText}`);
        setHtmlContent(null);
      }
    };

    fetchCampaignHtml(params.blogId);
  }, [params.blogId]);

  if (!htmlContent) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};