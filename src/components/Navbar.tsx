import { Menu, Button} from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
export const Navbar = () => {
  const isLoggedIn=localStorage.getItem("guest_session_id")!==null;
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("guest_session_id");
    navigate("/Movie-Rating-App/auth");
  }
  return (
    <Menu fixed="top" size="huge">
      
<Menu.Item as={Link} to="/Movie-Rating-App" style={{fontSize:"1.2rem"}}>Home</Menu.Item>
      <Menu.Item as={Link} to="/Movie-Rating-App/rated" style={{fontSize:"1.2rem"}}>Rated</Menu.Item>
    <Menu.Menu position="right">
        {isLoggedIn?(<Menu.Item as={Button} style={{fontSize:"1.2rem"}} onClick={handleLogout}>Logout</Menu.Item> ):(
<Menu.Item as={Link} to="/Movie-Rating-App/auth" style={{fontSize:"1.2rem"}}>Auth</Menu.Item>)}</Menu.Menu>
    </Menu>
  )
}