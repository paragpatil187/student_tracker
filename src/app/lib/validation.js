// Validate email format
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Validate password strength
  export function validatePassword(password) {
    return password.length >= 6;
  }
  