import Header from "../header/Header";
import { Head } from "@inertiajs/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/AppStyles";

const Layout = ({children, title}) => {
  return (
    <>
        <ThemeProvider theme={theme}>
          <Head title={title} />
            <header>
                <Header/>
            </header>
            <main>
                    {children}
            </main>
        </ThemeProvider>
    </>
);}

export default Layout;
