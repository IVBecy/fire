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