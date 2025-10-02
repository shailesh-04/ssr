import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { performance } from 'perf_hooks';

/**
 * Render React component to static HTML with performance logging
 * @param {React.Component} Component 
 * @param {Object} props 
 * @returns {string} HTML string
 */
export const renderPage = (Component, props = {}) => {
  // Start timing
  const startTime = performance.now();

  // Memory before render
  const memBefore = process.memoryUsage();

  // Render React component
  const element = React.createElement(Component, props);
  const html = ReactDOMServer.renderToStaticMarkup(element);

  // Memory after render
  const memAfter = process.memoryUsage();

  // End timing
  const endTime = performance.now();

  // Log performance
  console.log('---SSR Render Performance---');
  console.log(`Time taken: ${(endTime - startTime).toFixed(2)} ms`);
  console.log('Memory used (Heap Used):', ((memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024).toFixed(2), 'MB');
  console.log('RSS change:', ((memAfter.rss - memBefore.rss) / 1024 / 1024).toFixed(2), 'MB');
  console.log('----------------------------');

  return html;
};

/**
 * Send rendered page via Express response
 * @param {express.Response} res 
 * @param {React.Component} Component 
 * @param {Object} props 
 */
export const sendPage = (res, Component, props = {}) => {
  const html = renderPage(Component, props);
  res.send('<!DOCTYPE html>' + html);
};
