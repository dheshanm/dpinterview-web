import * as React from 'react';
import Link from 'next/link';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/joy/Typography';

import { TimelineEvent } from '@/lib/types/timeline';

const EMPHASISED_TEXTS = [
    'Pending',
    'In Progress',
    'Completed',
]


export type MuiTimelineProps = {
    events: TimelineEvent[];
};

export default function MuiTimeline(props: MuiTimelineProps) {
    if (!props.events || props.events.length === 0) {
        return (
            <Typography level="body-lg" component="span">
                No events to display
            </Typography>
        );
    }

    for (const event of props.events) {
        if (!event.iconColor) {
            event.iconColor = 'grey';
        }
    }


    const timelineEvents = props.events.map((event, index) => (
        <TimelineItem key={index}>
            {(event.altText || event.altDescription) && (
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                >
                    {event.altText && (
                        <Typography level="body-md" component="span">
                            <strong>{event.altText}</strong>
                        </Typography>
                    )}
                    {event.altDescription && (
                        <Typography>
                            {event.altDescription}
                        </Typography>
                    )}
                </TimelineOppositeContent>
            )}
            <TimelineSeparator>
                {index !== 0 && <TimelineConnector />}
                <TimelineDot color={event.iconColor}>
                    {event.href ? (
                        <Link
                            href={event.href}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {event.icon}
                        </Link>
                    ) : (
                        event.icon
                    )}
                </TimelineDot>
                {index !== props.events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography level="body-md" component="span">
                    <strong>{event.title}</strong>
                </Typography>
                <Typography>
                    {EMPHASISED_TEXTS.includes(event.description)
                        ? <em>{event.description}</em>
                        : event.description}
                </Typography>
            </TimelineContent>
        </TimelineItem>
    ));

    return (
        <Timeline>
            {timelineEvents}
        </Timeline>
    );
}
