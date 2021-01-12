"Use strict"
$(document).ready(() => {
  // Adding csrf token to forms
  const createTokenInput = (form) => {
    const token_elem = document.getElementsByName("csrf-token")[0]
    const token = token_elem.content;
    const token_input = document.createElement("INPUT")
    token_input.type = "hidden";
    token_input.name = "_csrf";
    token_input.value = token;
    form.appendChild(token_input);
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
        createTokenInput(document.getElementsByTagName("FORM")[0])
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
        e.target.style.cursor = "initial";
        e.target.classList.remove("tilt")
        // Making a request to server.js to replace the old parent
        var x = new XMLHttpRequest();
        var data = {
          username:document.getElementsByName("username")[0].content,
          card_name:encodeURI(e.target.textContent),
          parent:e.target.parentNode.parentNode.id,
        };
        x.open("POST","/move-list")
        x.setRequestHeader('Content-type', 'application/json');
        x.send(JSON.stringify(data))
      }
    });
    $("div").disableSelection();
  }
  // Adding a new card
  const addCardBtns = document.getElementsByClassName("add-card");
  var list = {};
  if (addCardBtns){
    for (var i in addCardBtns){
      if (typeof addCardBtns[i] === "object") {
        addCardBtns[i].onclick = (e) => {
          var addCardBtn = e.target
          addCardBtn.style.display = "none";
          var newDiv = document.createElement("div");
          newDiv.id = addCardBtn.parentNode.id;
          list[newDiv.id] = newDiv;
          addCardBtn.parentNode.appendChild(newDiv);
          ReactDOM.render(<CreateCard parent={addCardBtn.parentNode.id}/>,newDiv)
          // Add extra info
          setTimeout(() => {
            createTokenInput(document.getElementsByClassName("add-card-form")[0])
            //parent elem
            createHiddenInput("parent_element", e.target.parentNode.id, document.getElementsByClassName("add-card-form")[0]);
            // username
            const name = document.getElementsByName("username")[0].content;
            createHiddenInput("username", name, document.getElementsByClassName("add-card-form")[0]);
            // Closing the form if "x" is clicked
            for (var t in document.getElementsByClassName("fas fa-times")){
              if (typeof document.getElementsByClassName("fas fa-times")[t] === "object"){
                document.getElementsByClassName("fas fa-times")[t].onclick = (event) => { 
                list[event.target.id].style.display = "none";
                ReactDOM.unmountComponentAtNode(list[event.target.id]);
                document.getElementById(event.target.id.concat("-create")).style.display = "block";
                delete list[event.target.id];
                };
              }
            }
          },10);
        } 
      }
    }
  }
  // When clicking on a card bring up menu for it
  var cards = document.getElementsByClassName("card");
  for(var i in cards){
    if (typeof cards[i] === "object"){
      cards[i].onclick = (e) => {
        document.getElementsByClassName("modal")[0].style.display = "block";
        setTimeout(() => { 
          ReactDOM.render(<CardOverlay name={e.target.textContent}/>, document.getElementsByClassName("modal")[0]);
          document.getElementsByClassName("fas fa-times")[0].onclick = () => {document.getElementsByClassName("modal")[0].style.display = "none"};
          document.getElementById("delete-card-btn").onclick = () => {
            // Making a request to server.js to delete the requested card
            var x = new XMLHttpRequest();
            var data = {
              username: document.getElementsByName("username")[0].content,
              card_name: encodeURI(e.target.textContent),
              parent: e.target.parentNode.parentNode.id,
            };
            x.open("POST", "/delete-card")
            x.setRequestHeader("Content-type", "application/json");
            x.send(JSON.stringify(data));
            setTimeout(() => {
              window.location.reload();
            },100)
          }
        },10);
      }
    }
  };
})