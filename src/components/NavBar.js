import {
  SidebarContent,
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { List } from "react-bootstrap-icons";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { store } from "../store.js";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import StorageIcon from '@material-ui/icons/Storage';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import PaymentIcon from '@material-ui/icons/Payment';

export function NavBar() {
  const storeContext = useContext(store);
  const [toggled, setToggled] = useState(true);
  const { dispatch } = storeContext;
  let history = useHistory();
  const logout = () => {
    dispatch({
      type: "setAuth",
      value: false
    });
    dispatch({
      type: "setUser",
      value: ""
    });
    history.push("/");
  };
  const direct = (path) => {
    console.log("clicked", path);
    setToggled(true);
    history.push(path);
  };
  const toggleSideBar = () => {
    setToggled(!toggled);
  };
  return (
    <div className="h-100 fixed-top clickThrough">
      <Navbar bg="dark" variant="dark" expand="lg" className="clickAble">
        <Navbar.Brand className="d-none d-sm-block" onClick={toggleSideBar}>
          <List />
        </Navbar.Brand>
        <Navbar.Brand>Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto d-sm-block d-md-none">
            <Nav.Link>
              <div onClick={()=>direct("/home")}>
                Home
              </div>
            </Nav.Link>
            <Nav.Link>
              <div onClick={()=>direct("/project")}>
                Project
              </div>
            </Nav.Link>
            <Nav.Link>
              <div onClick={()=>direct("/regex")}>
                Plate Regex
              </div>
            </Nav.Link>
            <Nav.Link>
              <div onClick={()=>direct("/records")}>
                Log Records
              </div>
            </Nav.Link>
            <Nav.Link>
              <div onClick={()=>direct("/parking")}>
                Parking Records
              </div>
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item data-value="/home" onClick={direct}>
                Action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Nav.Link onClick={logout}>Signout</Nav.Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <ProSidebar
        className="clickAble d-none d-sm-block navbar-default navbar-static-top"
        collapsed={toggled}
        //collapsedWidth="px"
      >
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<HomeIcon onClick={()=>direct("/home")}/>}>
              <div onClick={()=>direct("/home")}>
                Home
              </div>
            </MenuItem>
            <MenuItem icon={<InfoIcon onClick={()=>direct("/project")} />}>
              <div onClick={()=>direct("/projet")}>
                Project
              </div>
            </MenuItem>
            <MenuItem icon={<CodeIcon onClick={()=>direct("/regex")} />}>
              <div onClick={()=>direct("/regex")}>
                Plate Regex
              </div>
            </MenuItem>
            <MenuItem icon={<StorageIcon onClick={()=>direct("/records")} />}>
              <div onClick={()=>direct("/records")}>
                Exit/Entry Records
              </div>
            </MenuItem>
            <MenuItem icon={<LocalParkingIcon onClick={()=>direct("/parking")} />}>
              <div onClick={()=>direct("/parking")}>
                Parking Records
              </div>
            </MenuItem>
            <SubMenu title="Access" icon={<PaymentIcon/>}>
              <MenuItem  onClick={()=>direct("/accessRules")} >Access Rules</MenuItem>
              <MenuItem>Tracking</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
}

export default { NavBar };
