// File to manage all the react hooks

// Header (navbar kinda)
const Header = () =>{
  return(
    <div className="container-fluid header">
      <h3><i className="fas fa-fire"></i> Fire</h3>
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
    <div className="container index-forms" id="sign-up-form" action="signup.js">
      <form method="POST" action="register.js">
        <i className="fas fa-times"></i>
        <h1>Sign up</h1><br />
        <input type="text" name="username" placeholder="Username" minLength="5"/><br/>
        <input type="email" name="email" placeholder="E-mail" /><br />
        <input type="password" name="password" placeholder="Password" minLength="8" /><br />
        <input type="submit" label="Sign up"/>
      </form>
    </div>
  )
}

// Sign in form
const SignInForm = () => {
  return (
    <div className="container index-forms" id="sign-in-form" action="login.js">
      <form id="sign-up-form" method="POST" action="register.js">
        <i className="fas fa-times"></i>
        <h1>Sign in</h1><br />
        <input type="text" name="username" placeholder="Username" /><br />
        <input type="password" name="password" placeholder="Password" /><br />
        <input type="submit" label="Sign in" />
      </form>
    </div>
  )
}