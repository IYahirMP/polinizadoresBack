import ApplicationLogo from '@/Components/ApplicationLogo';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from '@inertiajs/react';
import { Typography } from '@mui/material';

export default function GuestLayout({ children, titulo }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div className="m-5">
                <Link href="/" className="place-content-center">
                    <AdbIcon sx={{ color: 'black', width:'100px', height:'100px' }}/>
                </Link>
            </div>
        
            <Typography variant='h4'>{titulo}</Typography>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
