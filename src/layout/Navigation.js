import { NavBar, NavItem } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../core/apiCore'
import './Navigation.css'

const isActive = (history, path) => {
  if(history.location.pathname === path){
    return {color: '#ff9900'}
  } else {
    return {color: '#ffffff'}
  }
}

const Navigation = ({history}) => {
    return (
<div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            FarmaciaDsLN
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <NavItem className="nav-item active">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </NavItem>
            </ul>
                
                  {!isAuthenticated () && (
                    <>
                    <ul className="navbar-nav ml-auto">
                      <NavItem className="nav-item active">
                        <Link className="nav-link" to="/signup">
                          Signup
                        </Link>
                      </NavItem>
                      <NavItem className="nav-item active">
                        <Link className="nav-link" to="/signin">
                          Login
                        </Link>
                      </NavItem>
                      </ul>
                    </>
                  )}
                  
                
                  {isAuthenticated () && (
                    <ul className="navbar-nav ml-auto">
                    <>
                      {/* <NavItem className="nav-item active">
                        <Link to="/viesprofile" className="nav-link">Profile</Link>
                      </NavItem> */}
                      <NavItem className="nav-item active">
                        <Link to="/addcategory" className="nav-link">Add category</Link>
                      </NavItem>
                      <NavItem className="nav-item active">
                        <Link to="/addproduct" className="nav-link">Add product</Link>
                      </NavItem>
                      <NavItem className="'nav-item active'">
                        <Link 
                          to="/"
                          onClick={()=>
                            signout(()=>{
                              history.push('/')
                            })} className="nav-link"  >
                              Logout
                            </Link>
                      </NavItem>
                    </>
                    </ul>
                  )}
                
            </div>
        </div>
      </nav>
    </div>
    )
}

export default Navigation
