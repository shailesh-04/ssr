import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const renderPage = (Component, props = {}) => {
  const element = React.createElement(Component, props);
  return ReactDOMServer.renderToStaticMarkup(element);
};

export const sendPage = (res, Component, props = {}) => {
  const html = renderPage(Component, props);
  res.send('<!DOCTYPE html>' + html);
};
