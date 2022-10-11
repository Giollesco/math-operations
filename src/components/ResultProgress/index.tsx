import CircularProgress, { circularProgressClasses, CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel( props: CircularProgressProps & { value: number, custom_size?: string }) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress 
                variant="determinate" 
                size={props.custom_size || "10rem"}
                thickness={2}
                color={props.value < 33 ? "error" : props.value < 66 ? "warning" : "success"}
                sx={{ 
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                        strokeOpacity: .5
                    },
                }}
                {...props} 
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: "100%", height: "100%"
                }}
            >
                <Typography
                    variant={props.custom_size === "6rem" ? "subtitle1" : "h5"}
                    component="div"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                >
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

export default function ResultProgress({ progress, custom_size }: { progress: number, custom_size?: string }) {
  return <CircularProgressWithLabel value={progress} custom_size={custom_size} />;
}
