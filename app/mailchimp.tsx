'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { parse } from 'node-html-parser';

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

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignsList = await listCampaigns();
      setCampaigns(campaignsList);
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {campaigns.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div>
          {campaigns
            .filter(campaign => campaign.settings?.preview_text)
            .map((campaign) => (
              <div className="mb-5 cursor-pointer" key={campaign.id}>
                <Link href={campaign.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{campaign.settings?.subject_line || 'Untitled Campaign'}</CardTitle>
                      <CardDescription>{campaign.settings?.preview_text || 'Untitled Campaign'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Posted {formatDate(campaign.send_time)}</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MailchimpCampaigns;
