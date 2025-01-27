
// Define the security middleware function
export function securityMiddleware() {
    // Check if token exists in localStorage
    const token = window.localStorage.getItem("token");
    
    // Return true if token exists, false otherwise
    return token !== null;
  }
