import Header from "../header/Header";
import { Head } from "@inertiajs/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/AppStyles";

const Layout = ({children, title, authe}) => {
  return (
    <>
        <ThemeProvider theme={theme}>
          <Head title={title} />
            <header>
                <Header auth={authe}/>
            </header>
            <main>
                    {children}
            </main>
        </ThemeProvider>
    </>
);}

export default Layout;
