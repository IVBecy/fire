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
  // Adding extra data to any form
  const createHiddenInput = (name, value, form) => {
    const parentElem = document.createElement("INPUT")
    parentElem.type = "hidden";
    parentElem.name = name;
    parentElem.value = value;
    form.appendChild(parentElem)
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
  if (document.getElementsByClassName("list")[0]){
    // Make draggable cards
    $(".list").sortable({ revert: true });
    $(".card").draggable({
      connectToSortable: ".list",
      revert: "invalid",
      start: (e) => {
        e.target.style.cursor = "grabbing";
        e.target.classList.add("tilt")
      },
      stop: (e) => {
        console.log(e.target.parentNode)
        e.target.style.cursor = "initial";
        e.target.classList.remove("tilt")
      }
    });
    $("div").disableSelection();
  }
  // Adding a new card
  const addCardBtns = document.getElementsByClassName("add-card");
  if (addCardBtns){
    for (var i in addCardBtns){
      if (typeof addCardBtns[i] === "object") {
        addCardBtns[i].onclick = (e) => {
          console.log(e.target.parentNode.id);
          e.target.style.display = "none";
          const newDiv = document.createElement("div");
          e.target.parentNode.appendChild(newDiv);
          ReactDOM.render(<CreateCard/>,newDiv)
          // Add extra info
          setTimeout(() => {
            createTokenInput()
            //parent elem
            createHiddenInput("parent_element",e.target.parentNode.id,document.getElementsByTagName("form")[0])
            // username
            const name = document.getElementsByName("username")[0].content;
            createHiddenInput("username", name, document.getElementsByTagName("form")[0])
          },10);
        } 
      }
    }
  }
})