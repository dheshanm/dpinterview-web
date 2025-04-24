"use client"
import * as React from 'react';
import { useEffect, useState } from 'react';

import { VideoCall } from '@mui/icons-material';
import { Save } from '@mui/icons-material';
import { FolderCopy } from '@mui/icons-material';
import { Reviews } from '@mui/icons-material';
import { DoneAll } from '@mui/icons-material';
import { Transform } from '@mui/icons-material';
import { Analytics } from '@mui/icons-material';
import { Rule } from '@mui/icons-material';  // QC
import { PictureAsPdf } from '@mui/icons-material';  // PDF Report
import { Skeleton } from '@mui/material';

import { formatDistanceToNow } from 'date-fns';
import { toast } from "sonner";

import { TimelineEvent } from '@/lib/types/timeline';
import { InterviewProcessingData } from '@/lib/types/interview';

import MuiTimeline from '@/components/mui/MuiTimeline';


export type InterviewTimelineSProps = {
    interviewName: string;
};
export default function InterviewTimelineS(props: InterviewTimelineSProps) {
    const { interviewName } = props;
    const [processingData, setProcessingData] = useState<InterviewProcessingData | null>(null);
    const [interviewTimelineEvents, setInterviewTimelineEvents] = useState<TimelineEvent[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/v2/interviews/${interviewName}/processing`);
            if (!response.ok) {
                toast.message('Uh oh! Something went wrong.', {
                    description: 'Request for interview processing data failed.',
                })
                throw new Error('Network response was not ok');
            }
            const data: InterviewProcessingData = await response.json();
            setProcessingData(data);
        };

        fetchData();
    }, [interviewName]);

    useEffect(() => {
        if (!processingData) {
            return;
        }

        const events: TimelineEvent[] = [];

        // Map the processing data to timeline events
        if (processingData.interview_date) {
            const interviewDate = new Date(processingData.interview_date);
            const interviewEvent: TimelineEvent = {
                title: 'Interview Conducted',
                description: 'Over Zoom',
                icon: <VideoCall />,
                iconColor: 'primary',
                altText: interviewDate.toLocaleDateString(),
                altDescription: formatDistanceToNow(interviewDate, { addSuffix: true }),
            };
            events.push(interviewEvent);
        }

        if (processingData.data_received_date) {
            const dataReceivedDate = new Date(processingData.data_received_date);
            const dataReceivedEvent: TimelineEvent = {
                title: 'Data Received',
                description: 'Aggregation server',
                icon: <Save />,
                iconColor: 'primary',
                altText: dataReceivedDate.toLocaleDateString(),
                altDescription: formatDistanceToNow(dataReceivedDate, { addSuffix: true }),
            };
            events.push(dataReceivedEvent);
        }

        if (processingData.has_duplicates) {
            const duplicatesEvent: TimelineEvent = {
                title: 'Duplicates Detected',
                description: 'Crawler',
                icon: <FolderCopy />,
                iconColor: 'error',
            };
            events.push(duplicatesEvent);

            if (processingData.has_primary) {
                const manualResolutionEvent: TimelineEvent = {
                    title: 'Manual Resolution',
                    description: 'Completed',
                    icon: <Reviews />,
                    iconColor: 'secondary',
                };
                events.push(manualResolutionEvent);
            } else {
                const manualResolutionEvent: TimelineEvent = {
                    title: 'Manual Resolution',
                    description: 'Pending',
                    icon: <Reviews />,
                    iconColor: 'secondary',
                };
                events.push(manualResolutionEvent);
            }
        }

        if (processingData.ffprobe_metadata_extraction_date) {
            const metadataExtractionDate = new Date(processingData.ffprobe_metadata_extraction_date);
            const metadataExtractionEvent: TimelineEvent = {
                title: 'Metadata Extraction',
                description: 'Completed',
                icon: <Save />,
                iconColor: 'primary',
                altText: metadataExtractionDate.toLocaleDateString(),
                altDescription: formatDistanceToNow(metadataExtractionDate, { addSuffix: true }),
            };
            events.push(metadataExtractionEvent);
        } else {
            const metadataExtractionEvent: TimelineEvent = {
                title: 'Metadata Extraction',
                description: 'Pending',
                icon: <Save />,
                iconColor: 'grey',
            };
            events.push(metadataExtractionEvent);
        }

        if (processingData.video_quick_qc !== null) {
            const quickQcData = processingData.video_quick_qc;
            if (quickQcData.timestamp !== null) {
                const quickQcDate = new Date(quickQcData.timestamp);
                const hasBlackBars = quickQcData.has_black_bars;
                const quickQcEvent: TimelineEvent = {
                    title: 'Quick QC',
                    description: hasBlackBars ? 'Black Bars (Zoom Gallery Mode) Detected' : 'No Black Bars (Zoom Gallery Mode) Detected',
                    icon: <DoneAll />,
                    iconColor: hasBlackBars ? 'success' : 'warning',
                    altText: quickQcDate.toLocaleDateString(),
                    altDescription: formatDistanceToNow(quickQcDate, { addSuffix: true }),
                };
                events.push(quickQcEvent);
            }
        } else {
            const quickQcEvent: TimelineEvent = {
                title: 'Quick QC',
                description: 'Pending',
                icon: <DoneAll />,
                iconColor: 'grey',
            };
            events.push(quickQcEvent);
        }

        if (processingData.video_streams !== null) {
            const videoStreamsData = processingData.video_streams;
            if (videoStreamsData.count === 1) {
                const videoStreamEvent: TimelineEvent = {
                    title: 'Split Streams',
                    description: "Skipped",
                    icon: <Transform />,
                    iconColor: 'warning',
                    altText: new Date(videoStreamsData.timestamp).toLocaleDateString(),
                    altDescription: formatDistanceToNow(new Date(videoStreamsData.timestamp), { addSuffix: true }),
                };
                events.push(videoStreamEvent);
            } else {
                const videoStreamEvent: TimelineEvent = {
                    title: 'Split Streams',
                    description: `${videoStreamsData.count} Video Streams`,
                    icon: <Transform />,
                    iconColor: 'primary',
                    altText: new Date(videoStreamsData.timestamp).toLocaleDateString(),
                    altDescription: formatDistanceToNow(new Date(videoStreamsData.timestamp), { addSuffix: true }),
                };
                events.push(videoStreamEvent);
            }
        } else {
            const videoStreamEvent: TimelineEvent = {
                title: 'Split Streams',
                description: 'Pending',
                icon: <Transform />,
                iconColor: 'grey',
            };
            events.push(videoStreamEvent);
        }

        if (processingData.openface !== null) {
            const openfaceData = processingData.openface;
            if (openfaceData.count > 0) {
                const openFaceEvent: TimelineEvent = {
                    title: 'Feature Extraction',
                    description: `${openfaceData.count} OpenFace Runs`,
                    icon: <Analytics />,
                    iconColor: openfaceData.count === 2 ? 'primary' : 'warning',
                    altText: new Date(openfaceData.timestamp).toLocaleDateString(),
                    altDescription: formatDistanceToNow(new Date(openfaceData.timestamp), { addSuffix: true }),
                };
                events.push(openFaceEvent);
            }
        } else {
            const openFaceEvent: TimelineEvent = {
                title: 'Feature Extraction',
                description: 'Pending',
                icon: <Analytics />,
                iconColor: 'grey',
            };
            events.push(openFaceEvent);
        }

        if (processingData.openface_qc !== null) {
            const openfaceQcData = processingData.openface_qc;
            const description = openfaceQcData.passed 
                ? `Passed (${Math.floor(openfaceQcData.successful_frames_percentage)}% frames)` 
                : `Failed (${Math.floor(openfaceQcData.successful_frames_percentage)}% frames)`;
            const openFaceQcEvent: TimelineEvent = {
                title: 'OpenFace QC',
                description: description,
                icon: <Rule />,
                iconColor: openfaceQcData.passed ? 'success' : 'warning',
                altText: new Date(openfaceQcData.timestamp).toLocaleDateString(),
                altDescription: formatDistanceToNow(new Date(openfaceQcData.timestamp), { addSuffix: true }),
            };
            events.push(openFaceQcEvent);
        } else {
            const openFaceQcEvent: TimelineEvent = {
                title: 'OpenFace QC',
                description: 'Pending',
                icon: <Rule />,
                iconColor: 'grey',
            };
            events.push(openFaceQcEvent);
        }

        if (processingData.pdf_report !== null) {
            const pdfReportData = processingData.pdf_report;
            const pdfReportEvent: TimelineEvent = {
                title: 'PDF Report',
                description: 'Generated',
                icon: <PictureAsPdf />,
                iconColor: 'primary',
                altText: new Date(pdfReportData.timestamp).toLocaleDateString(),
                altDescription: formatDistanceToNow(new Date(pdfReportData.timestamp), { addSuffix: true }),
            };
            events.push(pdfReportEvent);
        } else {
            const pdfReportEvent: TimelineEvent = {
                title: 'PDF Report',
                description: 'Pending',
                icon: <PictureAsPdf />,
                iconColor: 'grey',
            };
            events.push(pdfReportEvent);
        }

        setInterviewTimelineEvents(events);
    }, [processingData]);

    return (
        <div className="mt-4">
            {processingData ? (
                <MuiTimeline
                    events={interviewTimelineEvents}
                />
            ) : (
                <Skeleton variant="rectangular" height={500} sx={{ mt: 2 }} />
            )}
        </div>
    );
}

