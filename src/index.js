import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';

// Styles
import './index.css';

// Components
import App from './App';

if (process.env.NODE_ENV === 'production') {
	disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>
);
