'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';

import Typography from '@mui/joy/Typography';
import { GridColDef } from '@mui/x-data-grid';
import Link from '@mui/material/Link';

import { InterviewIssue } from '@/app/api/v1/issues/unresolved/multi-part/route';
import MuiDataGrid, { MuiDataGridProps } from '@/components/mui/MuiDataGrid';

export default function Issues() {
    const [dataGridProps, setDataGridProps] = useState<MuiDataGridProps | null>(null);

    const columns: GridColDef[] = React.useMemo(() => [
        {
            field: 'interview_name',
            headerName: 'Interview Name',
            width: 350,
            renderCell: (params) => (
                <Link href={`/interviews/${params.value}`}>{params.value}</Link>
            )
        },
        { field: 'interview_type', headerName: 'Interview Type', width: 150 },
        { field: 'subject_id', headerName: 'Subject ID', width: 150 },
        { field: 'study_id', headerName: 'Study ID', width: 150 },
        { field: 'parts_count', headerName: 'Parts Count', width: 150 },
    ], []);

    useEffect(() => {
        // Fetch data from the API
        fetch('/api/v1/issues/unresolved/multi-part?limit=2000')
            .then((res) => res.json())
            .then((data) => {

                // parse to grid rows
                const gridRows = data.rows.map((interview: InterviewIssue) => ({
                    id: interview.interview_name,
                    interview_name: interview.interview_name,
                    interview_type: interview.interview_type,
                    subject_id: interview.subject_id,
                    study_id: interview.study_id,
                    parts_count: interview.parts_count,
                }));

                const props: MuiDataGridProps = {
                    columns,
                    rows: gridRows,
                    height: 670,
                    pageSizeOptions: [10, 20],
                    selectable: true
                };
                setDataGridProps(props);
            });
    }, [columns]);


    return (
        <div className="container mx-auto p-4">
            <Typography level="h2" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                Interviews with Multiple Parts
            </Typography>
            <div className="mb-4">
                <Typography level="title-md" sx={{ mb: 2, fontWeight: 'medium' }}>
                    Help differentiate interviews with:
                </Typography>
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <div className="flex-shrink-0 bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center">
                            <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>1</Typography>
                        </div>
                        <Typography level="body-md">
                            <strong>Multi-part Interviews</strong> - Interviews that are split into multiple parts. Common with PSYCHS interviews, where interviews could happen over multiple days.
                        </Typography>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-shrink-0 bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center">
                            <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>2</Typography>
                        </div>
                        <Typography level="body-md">
                            <strong>Duplicate Interviews</strong> - Interviews that are duplicates of each other. Probably related to Data Flow and renaming files at the source.
                        </Typography>
                    </div>
                </div>
            </div>

            {!dataGridProps ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-pulse text-center">
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 mx-auto"></div>
                <Typography level="body-sm" color="neutral">Loading interview data...</Typography>
                </div>
            </div>
            ) : dataGridProps.rows.length === 0 ? (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <Typography level="body-md">
                    No interviews with multiple parts found.
                </Typography>
            </div>
            ) : (
            <>
                <Typography level="body-md" sx={{ mb: 2, fontWeight: 'medium', color: 'neutral.600' }}>
                The following {dataGridProps.rows.length} interviews have multiple parts:
                </Typography>
                <div className="mt-4">
                <MuiDataGrid {...dataGridProps} />
                </div>
            </>
            )}
        </div>
    );
}
