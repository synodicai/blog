'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton";

const apiUrl = 'https://api.synodic.ai';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CustomPagination } from '@/components/pagination';

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
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignsList = await listCampaigns();
      setCampaigns(campaignsList);
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns
    .filter(campaign => campaign.settings?.preview_text)
    .sort((a, b) => new Date(b.send_time).getTime() - new Date(a.send_time).getTime());

  console.log(filteredCampaigns)

  return (
    <div className='min-h-screen'>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
        {
          campaigns.length == 0 ? (
            <>
              {[...Array(6)].map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle><Skeleton className="h-[24px] w-[250px]" /></CardTitle>
                    <CardDescription><Skeleton className="h-[20px] w-[350px]" /></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[24px]" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              {filteredCampaigns
                .slice(currentPage * 6, (currentPage + 1) * 6)
                .map((campaign, index) => (
                  <div className="cursor-pointer" key={campaign.id}>
                    <Link href={`/${campaign.id}`}>
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
            </>
          )
        }
        <CustomPagination pages={Math.ceil(filteredCampaigns.length / 6)} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );


};

export default MailchimpCampaigns;
