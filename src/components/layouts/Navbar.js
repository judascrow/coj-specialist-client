import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import logo from "../../assets/images/logo.svg";

import AuthContext from "../../context/auth/authContext";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbarMargin: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "10px",
    fontSize: "16px",
  },
  logo: {
    height: "40px",
  },
  userTitle: {
    marginLeft: "50px",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  const authContext = useContext(AuthContext);

  const { logout, user } = authContext;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  let routes = [
    {
      name: "หน้าหลัก",
      link: "/",
      activeIndex: 0,
      role: 1,
    },
    {
      name: "ผู้ใช้งาน",
      link: "/user",
      activeIndex: 1,
      role: 1,
    },
    {
      name: "ผู้เชี่ยวชาญ",
      link: "/specialist",
      activeIndex: 2,
      role: 1,
    },
    {
      name: "คำขอขึ้นทะเบียน",
      link: "/reqforms",
      activeIndex: 3,
      role: 1,
    },
  ];

  if (user?.data?.roleId === 3) {
    routes = [
      {
        name: "หน้าหลัก",
        link: "/",
        activeIndex: 0,
        role: 3,
      },
      {
        name: "คำขอขึ้นทะเบียน",
        link: "/reqform-add",
        activeIndex: 1,
        role: 3,
      },
    ];
  }

  useEffect(() => {
    [...routes].forEach((route) => {
      var pathArray = window.location.pathname.split("/");
      const path = "/" + pathArray[1];
      switch (path) {
        case `${route.link}`:
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [props, routes]);

  const tabs = (
    <Fragment>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes
          .filter((r) => r.role === parseInt(user?.data?.roleId))
          .map((route, index) => (
            <Tab
              key={`${route}${index}`}
              className={classes.tab}
              component={Link}
              to={route.link}
              label={route.name}
              aria-owns={route.ariaOwns}
              aria-haspopup={route.ariaPopup}
              onMouseOver={route.mouseOver}
            />
          ))}
      </Tabs>
    </Fragment>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>ตั้งค่า</MenuItem>
      <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            component={Link}
            to={"/"}
            onClick={() => props.setValue(0)}
          >
            <img alt="company logo" className={classes.logo} src={logo} />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            ระบบผู้เชี่ยวชาญสำนักงานศาลยุติธรรม
          </Typography>
          <div className={classes.grow} />
          {tabs}
          <span className={classes.userTitle}>{user?.data?.username}</span>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
      {renderMenu}
    </div>
  );
}
