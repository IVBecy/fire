$(document).ready(() => {
  // Adding csrf token to forms
  const createTokenInput = () => {
    const token_elem = document.getElementsByName("csrf-token")[0]
    const token = token_elem.content;
    const token_input = document.createElement("INPUT")
    token_input.type = "hidden";
    token_input.name = "_csrf";
    token_input.value = token;
    document.getElementsByTagName("form")[0].appendChild(token_input);
  }
  // Render sign up form
  if (document.getElementById("sign-up-btn")) {
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
  }
  // Render login form
  if (document.getElementById("sign-in-btn")){
    document.getElementById("sign-in-btn").onclick = () => {
      const modal = document.getElementsByClassName("modal")[0];
      modal.style.display = "block";
      setTimeout(() => {
        ReactDOM.render(<SignInForm />, modal);
        // Add csrf token to the form
        createTokenInput()
        //closing the form
        document.getElementsByClassName("fas fa-times")[0].onclick = () => {
          modal.style.display = "none";
        }
      }, 10);
    }
  }
})