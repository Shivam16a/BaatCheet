import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './context/authContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <StrictMode>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{ fontSize: "1.2rem" }}
      />
    </StrictMode>,
  </AuthContextProvider>
)
