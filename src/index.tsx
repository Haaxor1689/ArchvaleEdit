import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { register } from 'serviceWorkerRegistration';

import App from './App';

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root')
);

register();
