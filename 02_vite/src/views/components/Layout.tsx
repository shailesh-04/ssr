import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet={"UTF-8"} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Document</title>
            </head>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    );
}

export default Layout;
