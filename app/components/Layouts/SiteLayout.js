"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Container, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Box, Skeleton, Stack, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import Facebook from "@mui/icons-material/Facebook"
import Twitter from "@mui/icons-material/Twitter"
import Instagram from "@mui/icons-material/Instagram"
import LinkedIn from "@mui/icons-material/LinkedIn"
import { useApi } from "../../context/ApiContext";
import Image from "next/image";
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

const SiteLayout = ({ children }) => {
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorTypes, setAnchorTypes] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("auth")));
  }, []);

  const logout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleCloseTypes = () => {
    setAnchorTypes(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenTypes = (event) => {
    setAnchorTypes(event.currentTarget);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [openBrandDrawer, setOpenBrandDrawer] = React.useState(false);

  const toggleBrandDrawer = (newOpen) => () => {
    setOpenBrandDrawer(newOpen);
  };

  const { getBrands, getTypes } = useApi();

  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  async function loadBrands() {
    const fetchedBrands = await getBrands();
    setBrands(fetchedBrands);
  }
  async function loadTypes() {
    const fetchedTypes = await getTypes();
    setTypes(fetchedTypes);
  }

  useEffect(() => {
    loadBrands();
    loadTypes();
  }, [getBrands, getTypes]);

  const pages = ['Products', 'Pricing', 'Blog'];

  const [brandHover, setBrandHover] = useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    <>
      <AppBar position="sticky" color="default">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#000',
                textDecoration: 'none',
              }}
            >
              Al Emad
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                onClick={handleOpenNavMenu}
                color="#000"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* PAGES */}
              <Link href="/" className={`ms-2 text-decoration-none ${router.pathname === "/" ? "text-primary" : "text-dark"}`}>
                Home
              </Link>
              <Link href="/about-us" className={`ms-2 text-decoration-none ${router.pathname === "/contact" ? "text-primary" : "text-dark"}`}>
                About Us
              </Link>
              <Link href="/contact" className={`ms-2 text-decoration-none ${router.pathname === "/contact" ? "text-primary" : "text-dark"}`}>
                Contact
              </Link>
              <Box
                onMouseEnter={() => setBrandHover(true)}
                onMouseLeave={() => setBrandHover(false)}
                sx={{
                  position: "relative",
                  display: "inline-block",
                  cursor: "pointer",
                }}
              >
                {/* The trigger element */}
                <Box
                  variant="subtitle1"
                  component="div"
                  sx={{ flexGrow: 1, cursor: "pointer" }}
                  className="ms-2"
                >
                  Car Brands
                </Box>
              </Box>
              <div
                variant="subtitle1"
                component="div"
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onMouseEnter={handleOpenTypes} // For hover trigger
                className={`ms-2 ${Boolean(anchorTypes) ? "text-primary" : "text-dark"}`}
              >
                Car Categories
              </div>
              {/* Brands Dropdown */}
              <Box
                onMouseEnter={() => setBrandHover(true)}
                onMouseLeave={() => setBrandHover(false)}
                sx={{
                  position: "relative",
                  display: "inline-block",
                  cursor: "pointer",
                }}
              >
                <Box
                  variant="subtitle1"
                  component="div"
                  sx={{ flexGrow: 1, cursor: "pointer" }}
                  className="ms-2"
                >
                  Car Brands
                </Box>
                {brandHover && (
                  <Menu
                    anchorEl={brandHover}
                    open={Boolean(brandHover)}
                    onClose={handleCloseTypes}
                    MenuListProps={{
                      onMouseLeave: handleCloseTypes,
                    }}
                    PaperProps={{
                      sx: {

                      },
                    }}
                  >
                    <MenuItem disableRipple>
                      <Grid container spacing={2}>
                        {brands?.data?.brands?.map((brand, index) => (
                          // <div key={brand.id}>
                          <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={2}
                          >
                            <Item>
                              {brand.name}
                              {brand?.image ?
                                <Image
                                  src={brands?.data?.base_url + "/" + brands?.data?.image_path + "/" + brand?.image}
                                  alt={brand.name}
                                  width={50}
                                  height={50}
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                  }}
                                /> :
                                <Skeleton variant="rectangular" width={50} height={50} />
                              }
                            </Item>
                          </Stack>
                          // </div>
                        ))}
                      </Grid>
                    </MenuItem>
                  </Menu>
                )}
              </Box>
              {/* Categories Dropdown */}
              <Menu
                anchorEl={anchorTypes}
                open={Boolean(anchorTypes)}
                onClose={handleCloseTypes}
                MenuListProps={{
                  onMouseLeave: handleCloseTypes, // Close on mouse leave
                }}
                PaperProps={{
                  sx: {
                    padding: "10px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <MenuItem disableRipple>
                  <Grid container spacing={2}>
                    {types?.data?.types?.map((type) => (
                      <Grid
                        item
                        xs={3} // 4 items per row
                        key={type.id}
                        sx={{ textAlign: "center" }}
                      >
                        <Image
                          src={types?.data?.base_url + "/" + types?.data?.image_path + "/" + type?.image}
                          alt={type.name}
                          width={80}
                          height={80}
                        />
                        <Typography variant="body2">{type.name}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <div className="d-flex align-items-center gap-2">
                {userData?.token ? (
                  <Typography variant="body2" sx={{ color: "#000" }}>
                    HI! {userData?.user_info?.firstname}
                  </Typography>
                ) : (
                  <>
                    <Link href="/login" className={`text-decoration-none ${router.pathname === "/login" ? "text-info" : "text-white"}`}>
                      Login
                    </Link>
                    <Link href="/register" className={`text-decoration-none ${router.pathname === "/register" ? "text-info" : "text-white"}`}>
                      Register
                    </Link>
                  </>
                )}
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userData?.token ? (
                      <Avatar alt={userData?.user_info?.firstname} src={userData?.token ? `${userData?.image_base_path + userData?.user_info?.image}` : "/static/images/avatar/2.jpg"} />
                    ) : ""}
                  </IconButton>
                </Tooltip>
              </div>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href={'/dashboard/bookings'} className="text-decoration-none" sx={{ textAlign: 'center' }}>Bookings</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href={'/dashboard/profile'} className="text-decoration-none" sx={{ textAlign: 'center' }}>Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography color="error" onClick={logout} className="text-decoration-none" sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer for Navigation */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "250px",
            backgroundColor: "#333",
            color: "white",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 3 }}>
          <Link href="/" className="text-decoration-none text-white" onClick={handleDrawerToggle}>
            Home
          </Link>
          <Link href="/contact" className="text-decoration-none text-white" onClick={handleDrawerToggle}>
            Contact
          </Link>

          {userData?.token ? (
            <>
              <Link href="/dashboard/profile" className="text-decoration-none text-white" onClick={handleDrawerToggle}>
                Profile
              </Link>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', }}>
                <Avatar alt={userData?.user_info?.firstname} src={userData?.user_info?.image} sx={{ width: 30, height: 30 }} />
                <Typography variant="body2" sx={{ color: "white" }}>
                  {userData?.user_info?.firstname} {userData?.user_info?.lastname}
                </Typography>
              </Box>
              <Button fullWidth variant="outlined" color="error" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-decoration-none text-white" onClick={handleDrawerToggle}>
                Login
              </Link>
              <Link href="/register" className="text-decoration-none text-white" onClick={handleDrawerToggle}>
                Register
              </Link>
            </>
          )}
        </Box>
      </Drawer>


      <main>{children}</main>

      {/* Main Content */}

      {/* Sticky Footer */}
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '2rem 0', marginTop: '4rem' }}>
        <Container>
          <Grid container spacing={4}>
            {/* About Section */}
            <Grid item="true" xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>About Us</Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
              </Typography>
            </Grid>

            {/* Quick Links Section */}
            <Grid item="true" xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>Quick Links</Typography>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>
                  <Link href="/" color="inherit" variant="body2">Home</Link>
                </li>
                <li>
                  <Link href="/about" color="inherit" variant="body2">About Us</Link>
                </li>
                <li>
                  <Link href="/services" color="inherit" variant="body2">Services</Link>
                </li>
                <li>
                  <Link href="/contact" color="inherit" variant="body2">Contact</Link>
                </li>
              </ul>
            </Grid>

            {/* Contact Section */}
            <Grid item="true" xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>Contact Us</Typography>
              <Typography variant="body2">
                Email: support@alemad.com
              </Typography>
              <Typography variant="body2">
                Phone: +1 234 567 890
              </Typography>
            </Grid>

            {/* Social Media Section */}
            <Grid item="true" xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>Follow Us</Typography>
              <Box>
                <IconButton color="inherit" href="https://facebook.com" target="_blank">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit" href="https://twitter.com" target="_blank">
                  <Twitter />
                </IconButton>
                <IconButton color="inherit" href="https://instagram.com" target="_blank">
                  <Instagram />
                </IconButton>
                <IconButton color="inherit" href="https://linkedin.com" target="_blank">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          {/* Bottom Section */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2">
              © {new Date().getFullYear()} Alemad. All Rights Reserved.
            </Typography>
          </Box>
        </Container>
      </footer>
    </>
  );
};

export default SiteLayout;
