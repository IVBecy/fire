"Use strict"
// File to manage all the react hooks

// Header (navbar kinda)
const Header = () =>{
  return(
    <div className="container-fluid header">
      <h3><i className="fas fa-fire"></i> Fire</h3>
      <form action="/logout" method="POST"><input type="submit" value="Log out"></input></form>
    </div>
  )
}
// Header with login and signup buttons
const HeaderOutsider = () => {
  return (
    <div className="container-fluid header-outside">
      <h3><i className="fas fa-fire"></i> Fire</h3>
      <button id="sign-up-btn">Sign up</button><button id="sign-in-btn">Sign in</button>
      <div style={{clear:"both"}}></div>
    </div>
  )
}

// Sign up form
const SignUpForm = () => {
  return (
    <div className="container index-forms" id="sign-up-form">
      <form method="POST" action="/signup">
        <i className="fas fa-times"></i>
        <h1>Sign up</h1><br />
        <input type="text" name="username" placeholder="Username" minLength="3" required/><br/>
        <input type="email" name="email" placeholder="E-mail" required/><br />
        <input type="password" name="password" placeholder="Password" minLength="8" required/><br />
        <input type="submit" label="Sign up"/>
      </form>
    </div>
  )
}

// Sign in form
const SignInForm = () => {
  return (
    <div className="container index-forms" id="sign-in-form">
      <form method="POST" action="/signin">
        <i className="fas fa-times"></i>
        <h1>Sign in</h1><br />
        <input type="text" name="username" placeholder="Username" required/><br />
        <input type="password" name="password" placeholder="Password" required/><br />
        <input type="submit" label="Sign in" />
      </form>
    </div>
  )
}

// card creating form
const CreateCard = () => {
  return(
    <form className="add-card-form" method="POST" action="/create-card">
      <input type="text" name="card_name" placeholder="Enter a title for this card..."/><br/>
      <input type="submit" value="Create"/>
    </form>
  )
}
// Overlay for cards
const CardOverlay = (props) => {
  return(
    <div className="container card-overlay">
      <i className="fas fa-times"></i>
      <h1>{props.name}</h1>
      <button id="delete-card-btn">Delete</button>
    </div>
  )
};