import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App.jsx';

import API from './models/api.js';
import './main.scss';

console.log(API); // eslint-disable-line no-console
console.log(JSON.stringify(API)); // eslint-disable-line no-console

// async function fireAPIs() {
//     console.log('fireAPIs'); // eslint-disable-line no-console
//     Promise.all([
//         API.test(),
//         API.echo('I am a beast')
//     ]);
// }
console.log('client entry.js'); // eslint-disable-line no-console

// fireAPIs();

const rootDOM: HTMLElement = document.querySelector('#root')!;
const root = createRoot(rootDOM);
root.render(<App />); // eslint-disable-line
