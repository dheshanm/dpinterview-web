import * as React from 'react';

import { VideoCall } from '@mui/icons-material';
import { Save } from '@mui/icons-material';
import { FolderCopy } from '@mui/icons-material';
import { Reviews } from '@mui/icons-material';
import { Addchart } from '@mui/icons-material';
import { DoneAll } from '@mui/icons-material';
import { Transform } from '@mui/icons-material';
import { Analytics } from '@mui/icons-material';

import MuiTimeline from '@/components/mui/MuiTimeline';
import { TimelineEvent } from '@/lib/types/timeline';

const interviewTimelineEvents: TimelineEvent[] = [
    {
        title: 'Interview Conducted',
        description: 'Over Zoom',
        icon: <VideoCall />,
        iconColor: 'primary',
        altText: '2023-05-17',
    },
    {
        title: 'Data Recieved',
        description: 'Aggregation server',
        icon: <Save />,
        iconColor: 'primary',
        altText: '2023-11-07',
        altDescription: '8 months ago',
    },
    {
        title: 'Duplicates Detected',
        description: 'Crawler',
        icon: <FolderCopy />,
        iconColor: 'error',
    },
    {
        title: 'Manual Resolution',
        description: 'Pending',
        icon: <Reviews />,
        iconColor: 'secondary',
    },
    {
        title: 'Metadata Extraction',
        description: 'Pending',
        icon: <Addchart />,
    },
    {
        title: 'Quick QC',
        description: 'Pending',
        icon: <DoneAll />,
    }, 
    {
        title: 'Split Streams',
        description: 'Pending',
        icon: <Transform />,
    },
    {
        title: 'Feature Extraction',
        description: 'Pending',
        icon: <Analytics />,
    }
];

export default function InterviewTimelineDemo() {
    return (
        <MuiTimeline
            events={interviewTimelineEvents}
        />
    );
}
