import { createRoot } from 'react-dom/client';
import { App, ThemeProvider } from './App';

import './index.css';
import { ErrorBoundary } from './components';

createRoot(document.getElementById('root')).render(
	<ErrorBoundary>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</ErrorBoundary>,
);
