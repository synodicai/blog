'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'node-html-parser';
import readingTime from 'reading-time';
import { useRouter } from 'next/navigation';

const apiUrl = 'https://api.synodic.ai';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Campaign {
  id: string;
  send_time: string;
  settings?: {
    title?: string;
    subject_line?: string;
    preview_text?: string;
  };
  [key: string]: any;
}

const listCampaigns = async (): Promise<Campaign[]> => {
  const url = `${apiUrl}/campaigns`;
  const response = await axios.get(url);

  if (response.status === 200) {
    return response.data.campaigns || [];
  } else {
    console.error(`Failed to list campaigns: ${response.status}, ${response.statusText}`);
    return [];
  }
};

const getCampaignHtml = async (campaignId: string): Promise<string | null> => {
  const url = `${apiUrl}/campaigns/${campaignId}`;
  const response = await axios.get(url);

  if (response.status === 200) {
    return response.data.html || '';
  } else {
    console.error(`Failed to retrieve content for campaign ${campaignId}: ${response.status}, ${response.statusText}`);
    return null;
  }
};

const cleanHtmlContent = (htmlContent: string | null): string | null => {
  if (!htmlContent) {
    return null;
  }

  const root = parse(htmlContent);

  root.querySelectorAll('td.mceLayoutContainer').forEach((tag) => {
    if (tag.innerText.includes('View email in browser') || tag.innerText.includes('update your preferences') || tag.innerText.includes('unsubscribe')) {
      tag.remove();
    }
  });

  return root.toString();
};

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const calculateReadingTime = (htmlContent: string): string => {
  const plainText = parse(htmlContent).innerText;
  const readingStats = readingTime(plainText);
  return `${Math.ceil(readingStats.minutes)} min read`;
};

const MailchimpCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [content, setContent] = useState<{ [key: string]: string | null }>({});
  const [readingTimes, setReadingTimes] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignsList = await listCampaigns();
      setCampaigns(campaignsList);
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    const processCampaigns = async () => {
      const newContent: { [key: string]: string | null } = {};
      const newReadingTimes: { [key: string]: string } = {};

      for (const campaign of campaigns) {
        const htmlContent = await getCampaignHtml(campaign.id);
        const cleanedHtmlContent = cleanHtmlContent(htmlContent);
        newContent[campaign.id] = cleanedHtmlContent;
        if (cleanedHtmlContent) {
          newReadingTimes[campaign.id] = calculateReadingTime(cleanedHtmlContent);
        }
      }

      setContent(newContent);
      setReadingTimes(newReadingTimes);
    };

    if (campaigns.length > 0) {
      processCampaigns();
    }
  }, [campaigns]);

  const filteredCampaigns = campaigns
    .filter(campaign => content[campaign.id])
    .sort((a, b) => new Date(b.send_time).getTime() - new Date(a.send_time).getTime());

  const handleCardClick = (subjectLine: string | undefined, campaignId: string) => {
    if (subjectLine) {
      const formattedSubjectLine = subjectLine.replace(/\s+/g, '_');
      router.push(`/blog/${formattedSubjectLine}?id=${campaignId}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {filteredCampaigns.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div>
          {filteredCampaigns.map((campaign) => (
            <div className="mb-5 cursor-pointer" key={campaign.id} onClick={() => handleCardClick(campaign.settings?.subject_line, campaign.id)}>
              <Card>
                <CardHeader>
                  <CardTitle>{campaign.settings?.subject_line || 'Untitled Campaign'}</CardTitle>
                  <CardDescription>{campaign.settings?.preview_text || 'Untitled Campaign'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Posted {formatDate(campaign.send_time)}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MailchimpCampaigns;
