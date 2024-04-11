import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from "./assets/GlobalStyle";
import { ToastContainer } from 'react-toastify';
import App from './App.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import BetPage from './pages/BetPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

const baseUrl = import.meta.env.VITE_PATH;

const routes = [
	{
		path: "",
		element: <App />,
		children: [
			{
				path: 'register',
				element: <SignUpPage />
			},
			{
				path: 'login',
				element: <SignInPage />
			},
			{
				path: 'bets',
				element: <BetPage />
			},
		]
	}, {
		basename: baseUrl
	}
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<AuthProvider>
			<ToastContainer />
			<GlobalStyle />
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);