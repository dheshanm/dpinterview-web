import Typography from '@mui/joy/Typography';
import Alert from '@mui/joy/Alert';
import { Dashboard } from '@mui/icons-material';

export default function Interviews() {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <Alert
            variant="soft"
            color="neutral"
            startDecorator={<Dashboard />}
            sx={{ 
                mb: 2, 
                textAlign: 'center',
                p: 3,
                borderRadius: 4
            }}
            >
            <Typography level="body-md">
                Please use Superset Dashboard to look at the Aggregated Interview data.
            </Typography>
            </Alert>
        </div>
    );
}
