$(document).ready(() => {
  // Render sign up form
  document.getElementById("sign-up-btn").onclick = () => {
    const modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "block";
    setTimeout(() => { 
      ReactDOM.render(<SignUpForm />, modal);
      document.getElementsByClassName("fas fa-times")[0].onclick = () => {
        modal.style.display = "none";
      }
    }, 10);
  }
  // Render login form
  document.getElementById("sign-in-btn").onclick = () => {
    const modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "block";
    setTimeout(() => {
      ReactDOM.render(<SignInForm />, modal);
      document.getElementsByClassName("fas fa-times")[0].onclick = () => {
        modal.style.display = "none";
      }
    }, 10);
  }
})