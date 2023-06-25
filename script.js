// Signup function
function signup() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (name && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        // Show error message for password mismatch
        const signupMessage = document.getElementById('signup-message');
        signupMessage.textContent = 'Passwords do not match.';
        signupMessage.style.color = 'red';
      } else {
        const accessToken = generateAccessToken();
        const user = {
          name: name,
          email: email,
          password:password,
          accessToken: accessToken
        };
  
        // Save user state to local storage
        localStorage.setItem('user', JSON.stringify(user));
  
        // Show success message
        const signupMessage = document.getElementById('signup-message');
        signupMessage.textContent = 'Signup successful!';
        signupMessage.style.color = 'green';
  
        // Redirect to profile page
        
        window.location.href = 'profile.html';
        setTimeout(displayProfileDetails(),2000)
        
      }
    } else {
      // Show error message for empty fields
      const signupMessage = document.getElementById('signup-message');
      signupMessage.textContent = 'Please fill in all fields.';
      signupMessage.style.color = 'red';
    }
  }
  
  // Generate random 16-byte access token
  function generateAccessToken() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }
  
  // Check if the user is authenticated
  function isAuthenticated() {
    const user = localStorage.getItem('user');
    return user !== null && JSON.parse(user).accessToken;
  }
  
  // Redirect to appropriate page based on authentication status
  function redirectBasedOnAuthentication() {
    if (!isAuthenticated()) {
      // Redirect to signup page if not authenticated
      window.location.href = 'index.html';
    } else {
      // Redirect to profile page if authenticated
      window.location.href = 'profile.html';
      setTimeout(displayProfileDetails(),2000)
    }
  }
  
  // Check authentication status on page load
  window.addEventListener('load', redirectBasedOnAuthentication);
  
  // Logout function
  function logout() {
    // Clear user state from local storage
    // localStorage.removeItem('user');
    localStorage.clear();
  
    // Redirect to signup page
    // window.location.href = 'index.html';
    redirectBasedOnAuthentication()
  }
  
  
  function displayProfileDetails() {
     const profileData = document.getElementById('profile-details');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
       profileData.innerHTML = `<p>Full Name : ${user.name}</p>
       <p>Email : ${user.email}</p>
       <p>Password : ${user.password}</p>`
       
    } else {
     
      redirectBasedOnAuthentication()
    }
  }