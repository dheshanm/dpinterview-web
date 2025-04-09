import { useEffect, useState } from 'react';

import { Skeleton } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';

import { Empty } from 'antd';

import { toast } from "sonner";

export type InterviewTranscriptProps = {
    interviewName: string;
}

export default function InterviewTranscript(props: InterviewTranscriptProps) {
    const { interviewName } = props;
    const [transcriptData, setTranscriptData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [missing, setMissing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch(`http://localhost:45000/payload=[/mnt/ProNET/Lochness/PHOENIX/PROTECTED/PronetYA/processed/YA03473/interviews/open/transcripts/PronetYA_YA03473_interviewAudioTranscript_open_day0015_session001.txt]`);
            const response = await fetch(`/api/v2/interviews/${interviewName}/transcript`);
            if (!response.ok) {
                // Check for 404
                if (response.status === 404) {
                    toast.message('Uh oh! Transcript file not found.', {
                        description: 'Transcript file not found.',
                    })
                    setMissing(true);
                } else {
                    toast.message('Uh oh! Something went wrong.', {
                        description: 'Request for interview processing data failed.',
                    })
                    throw new Error('Network response was not ok');
                }
                setLoading(false);
                return;
            }

            // Parse / Read as text
            const text = await response.text();
            setTranscriptData(text);
            setLoading(false);
        };

        fetchData();
    }, [interviewName]);

    return (
        <div>
            {/* <Alert severity="info">
                This page is under construction. Please check back later.
            </Alert> */}

            {missing ? (
                <div className='m-32'>
                    <Empty description="No Transcript File Found" />
                </div>
            ) : null}

            {!loading ? (
                <div className="p-4 max-w-full relative">
                    <div className="bg-white rounded-lg shadow-sm p-6 font-light text-gray-800 leading-relaxed">
                        <pre className="whitespace-pre-wrap break-words text-base">{transcriptData}</pre>
                    </div>

                    {transcriptData && (
                        // Scroll to top button
                        <button 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="fixed bottom-6 right-6 bg-slate-600 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg transition-all"
                            aria-label="Scroll to top"
                        >
                            <ExpandLess />
                        </button>
                    )}
                </div>
            ) : (
                <div className="p-4">
                    {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="mb-6">
                            <Skeleton variant="text" width="30%" height={28} className="mb-2" />

                            {Array(2 + Math.floor(Math.random() * 4)).fill(0).map((_, j) => (
                                <Skeleton 
                                    key={j} 
                                    variant="text" 
                                    width={`${70 + Math.random() * 30}%`} 
                                    height={24}
                                    className="my-1"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}