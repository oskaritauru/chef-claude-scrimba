import App from "./src/App"; // Importing the main App component
import { StrictMode } from "react"; // Importing StrictMode from React for highlighting potential problems in the application
import { createRoot } from "react-dom/client"; // Importing createRoot from React DOM for rendering the application

// Creating a root for the React application and rendering it
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Enabling StrictMode to help identify potential issues in the application */}
    <App /> {/* Rendering the App component */}
  </StrictMode>
);
