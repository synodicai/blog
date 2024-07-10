'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";

const apiUrl = 'https://api.synodic.ai';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const MailchimpCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignsList = await listCampaigns();
      setCampaigns(campaignsList);
    };

    fetchCampaigns();
  }, []);

  const handleCardClick = (campaignId: string) => {
    router.push(`/blog/${campaignId}`);
  };

  const filteredCampaigns = campaigns
    .filter(campaign => campaign.settings?.preview_text)
    .sort((a, b) => new Date(b.send_time).getTime() - new Date(a.send_time).getTime());

  return (
    <div className="flex flex-col items-center">
      {campaigns.length === 0 ? (
        <div>
          {[...Array(5)].map((_, index) => (
            <div className='mb-5' key={index}>
              <Card>
                <CardHeader>
                  <CardTitle><Skeleton className="h-[24px] w-[750px]" /></CardTitle>
                  <CardDescription><Skeleton className="h-[20px]" /></CardDescription>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[24px]" />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {filteredCampaigns.map((campaign) => (
            <div className="mb-5 cursor-pointer m-3" key={campaign.id} onClick={() => handleCardClick(campaign.id)}>
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
