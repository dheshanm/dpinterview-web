export type TimelineEvent = {
    title: string;
    description: string;
    icon: React.ReactNode;
    iconColor?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'grey';
    altText?: string;
    altDescription?: string;
}