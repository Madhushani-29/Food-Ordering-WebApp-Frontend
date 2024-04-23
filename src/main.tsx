import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
import { QueryClient, QueryClientProvider } from "react-query";

//query client-central component in the react-query library responsible for managing cache, data fetching, and mutation operations
const queryClient = new QueryClient({
  defaultOptions: {
    //configure default options specifically related to query operations
    queries: {
      //This is a configuration option for queries, 
      //which determines whether to automatically refetch data when the window gains focus. 
      refetchOnWindowFocus: false,
    }
  }
});

//query client provider can use anywhere in the app since it has wrap the full application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <AppRoutes />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
