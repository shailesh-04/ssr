import React from 'react';

export const Layout = ({ title, children, initialData = {} }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{`${title} - Todo SSR App`}</title>
        <link rel="stylesheet" href="/styles/todo.css" />
      </head>
      <body>
        <nav className="navbar">
          <div className="nav-container">
            <h1>Todo SSR App</h1>
            <ul className="nav-menu">
              <li><a href="/" className="nav-link pulse">Home</a></li>
              <li><a href="/todos" className="nav-link pulse">All Todos</a></li>
              <li><a href="/todos/create" className="nav-link pulse">Create Todo</a></li>
            </ul>
          </div>
        </nav>
        
        <main className="container fade-in">
          {children}
        </main>

        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}`
          }}
        />
        <script type="module" src="/dist/main.js"></script>
      </body>
    </html>
  );
};
