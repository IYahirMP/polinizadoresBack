import { Head, Link } from '@inertiajs/react';
import Gallery from './Gallery/Gallery';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/AppStyles';
import Header from '@/header/Header';

export default function Welcome() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <header>
                    <Header/>
                </header>
                <main>
                        <Gallery requestOK={true}/>
                </main>
            </ThemeProvider>
        </>
    );
}
