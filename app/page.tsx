import Link from 'next/link';

import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// import { CustomPagination } from '@/components/ui/custom-pagination';

async function getData() {
    const response = await fetch("https://api.synodic.ai/campaigns", { cache: 'force-cache' });
    const data = await response.json();
    const campaigns = data.campaigns
        .filter((campaign: any) => campaign.settings?.preview_text)
        .sort((a: any, b: any) => new Date(b.send_time).getTime() - new Date(a.send_time).getTime());
    return campaigns;
}

export default async function Page() {
    const campaigns = await getData();

    return (
        <div className='min-h-screen'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
                {
                    campaigns.length === 0 ? (
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
                            {campaigns.length > 0 && campaigns.map((campaign: any, index: number) => (
                                <div className="cursor-pointer" key={campaign.id}>
                                    <Link href={`/${campaign.id}`}>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>{campaign.settings?.subject_line || 'Untitled Campaign'}</CardTitle>
                                                <CardDescription>{campaign.settings?.preview_text || 'Untitled Campaign'}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                        </>
                    )
                }
            </div>
        </div>
    );
}



// const [currentPage, setCurrentPage] = useState(0);

/*
const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};
*/


/*
                                ?.slice(currentPage * 6, (currentPage + 1) * 6)
                                    <CardContent>
                                        <p>Posted {formatDate(campaign.send_time)}</p>
                                    </CardContent>
<CustomPagination pages={Math.ceil((campaigns?.length || 0) / 6)} setCurrentPage={setCurrentPage} />
*/