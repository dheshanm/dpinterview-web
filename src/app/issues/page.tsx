import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Link from '@mui/material/Link';

export default function Home() {
    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="bg-slate-50 rounded-lg shadow-lg p-8 border-l-4 border-indigo-500">
                <Typography level="h2" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                    Issues
                </Typography>

                <Typography level="body-lg" sx={{ mb: 3, color: 'text.secondary' }}>
                    This section covers various issues raised / detected by the AV QC pipeline.
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <Link href="/issues/multiPart" underline="none" color="inherit">
                        <div className="border border-l-4 border-l-amber-400 rounded-lg p-4 hover:shadow-md transition-shadow bg-amber-50/30">
                            <Typography level="h4" sx={{ mb: 2, color: 'text.secondary' }}>
                                📹 Multi-Part Interviews
                            </Typography>
                            <Typography level="body-md">
                                Mark parts of the interview to process, or ignore.
                            </Typography>
                        </div>
                    </Link>
                    <Link href="/issues/unlabelledAudio" underline="none" color="inherit">
                        <div className="border border-l-4 border-l-teal-400 rounded-lg p-4 hover:shadow-md transition-shadow bg-teal-50/30">
                            <Typography level="h4" sx={{ mb: 2, color: 'text.secondary' }}>
                                🎧 Unlabelled Diarized Audio
                            </Typography>
                            <Typography level="body-md">
                                Label unlabelled audio files with the correct roles, for further downstream processing.
                            </Typography>
                        </div>
                    </Link>
                </div>

                <Typography level="body-md" sx={{ mt: 4, color: 'text.tertiary' }}>
                    This project is under active development. If you need more issues catalogued, please reach out to developers.
                </Typography>
            </div>
        </div >
    );
}
