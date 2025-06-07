import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './utils/contexts/contextList/AuthContext.tsx'
import { RecipeProvider } from './utils/contexts/contextList/RecipeContext.tsx'
import { SideBarProvider } from './utils/contexts/contextList/SideBarContext.tsx'
import {BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <SideBarProvider>
            <App />
          </SideBarProvider>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
