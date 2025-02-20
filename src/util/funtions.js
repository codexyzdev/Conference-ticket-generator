function isValidEmail(email) {
  if (!email.includes('@')) {
      return false
  }

  const parts = email.split('@')
  
  if (parts.length !== 2 || parts[0].trim() === '' || parts[1].trim() === '') {
  return false
  }

  if (!parts[1].includes('.')) {
      return false
  }

  const domainParts = parts[1].split('.');
  if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
      return false
  }

  return true;
}

function isValidGitHubUsername(username) {
  if (username.startsWith('@') && !username.includes(' ')) {
      return true
  }
return false
}

const generateTicketNumber = () => {
  const number = Math.floor(Math.random() * 100000); // Número entre 0 y 99999
  return number.toString().padStart(5, "0");
};


export { isValidEmail, isValidGitHubUsername, generateTicketNumber };