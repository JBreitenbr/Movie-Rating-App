import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import 'semantic-ui-css/semantic.min.css'
import {ToastContainer} from 'react-toastify'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
	/*<React.StrictMode>*/
		<QueryClientProvider client={queryClient}>
			<App />
			<ToastContainer toastStyle={{color:"#008080",backgroundColor:"lightgrey"}}/>
		</QueryClientProvider>
	/*</React.StrictMode>*/
)