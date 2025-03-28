import * as React from 'react';

import { VideoCall } from '@mui/icons-material';
import { Save } from '@mui/icons-material';
import { FolderCopy } from '@mui/icons-material';
import { Reviews } from '@mui/icons-material';
import { DoneAll } from '@mui/icons-material';
import { Transform } from '@mui/icons-material';
import { Analytics } from '@mui/icons-material';

import { formatDistanceToNow } from 'date-fns';

import { TimelineEvent } from '@/lib/types/timeline';
import { InterviewProcessingData } from '@/lib/types/interview';

import MuiTimeline from '@/components/mui/MuiTimeline';


export type InterviewTimelineProps = {
    processingData: InterviewProcessingData;
};

export default function InterviewTimeline(props: InterviewTimelineProps) {
    const { processingData } = props;
    const interviewTimelineEvents: TimelineEvent[] = []

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
        interviewTimelineEvents.push(interviewEvent);
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
        interviewTimelineEvents.push(dataReceivedEvent);
    }

    if (processingData.has_duplicates) {
        const duplicatesEvent: TimelineEvent = {
            title: 'Duplicates Detected',
            description: 'Crawler',
            icon: <FolderCopy />,
            iconColor: 'error',
        };
        interviewTimelineEvents.push(duplicatesEvent);

        if (processingData.has_primary) {
            const manualResolutionEvent: TimelineEvent = {
                title: 'Manual Resolution',
                description: 'Completed',
                icon: <Reviews />,
                iconColor: 'secondary',
            };
            interviewTimelineEvents.push(manualResolutionEvent);
        } else {
            const manualResolutionEvent: TimelineEvent = {
                title: 'Manual Resolution',
                description: 'Pending',
                icon: <Reviews />,
                iconColor: 'secondary',
            };
            interviewTimelineEvents.push(manualResolutionEvent);
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
        interviewTimelineEvents.push(metadataExtractionEvent);
    } else {
        const metadataExtractionEvent: TimelineEvent = {
            title: 'Metadata Extraction',
            description: 'Pending',
            icon: <Save />,
            iconColor: 'grey',
        };
        interviewTimelineEvents.push(metadataExtractionEvent);
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
            interviewTimelineEvents.push(quickQcEvent);
        }
    } else {
        const quickQcEvent: TimelineEvent = {
            title: 'Quick QC',
            description: 'Pending',
            icon: <DoneAll />,
            iconColor: 'grey',
        };
        interviewTimelineEvents.push(quickQcEvent);
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
            interviewTimelineEvents.push(videoStreamEvent);
        } else {
            const videoStreamEvent: TimelineEvent = {
                title: 'Split Streams',
                description: `${videoStreamsData.count} Video Streams`,
                icon: <Transform />,
                iconColor: 'primary',
                altText: new Date(videoStreamsData.timestamp).toLocaleDateString(),
                altDescription: formatDistanceToNow(new Date(videoStreamsData.timestamp), { addSuffix: true }),
            };
            interviewTimelineEvents.push(videoStreamEvent);
        }
    } else {
        const videoStreamEvent: TimelineEvent = {
            title: 'Split Streams',
            description: 'Pending',
            icon: <Transform />,
            iconColor: 'grey',
        };
        interviewTimelineEvents.push(videoStreamEvent);
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
            interviewTimelineEvents.push(openFaceEvent);
        }
    } else {
        const openFaceEvent: TimelineEvent = {
            title: 'Feature Extraction',
            description: 'Pending',
            icon: <Analytics />,
            iconColor: 'grey',
        };
        interviewTimelineEvents.push(openFaceEvent);
    }


    return (
        <MuiTimeline
            events={interviewTimelineEvents}
        />
    );
}
