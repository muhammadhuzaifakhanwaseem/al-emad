import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';
import NavDropdown from './NavDropdown';
import ReorderIcon from '@mui/icons-material/Reorder';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export default function SiteDrawer({ types, brands }) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation"
        // onClick={toggleDrawer(false)}
        >
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <Link href="/about-us" className={`ms-2 text-decoration-none text-dark`}>
                            About Us
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <Link href="/cheapest-car-rentals" className={`ms-2 text-decoration-none text-dark`}>
                            Rent a Car
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        {brands &&
                            <NavDropdown type={'brands'} title={'Car Brands'} items={brands?.data?.brands} imagePath={brands?.data?.base_url + "/" + brands?.data?.image_path + "/"} />
                        }
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        {types &&
                            <Accordion className='shadow-none border-0 p-0 m-0'>
                                <AccordionSummary
                                    className='m-0 p-0 border-0 shadow-none ms-2'
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography component="span">Accordion 2</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        {types.map((item) => (
                                            <li>
                                                <Link>{item.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                            // <NavDropdown type={'types'} title={'Car Categories'} items={types?.data?.types} imagePath={types?.data?.base_url + "/" + types?.data?.image_path + "/"} />
                        }
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>

                        <Link href="/contact" className={`ms-2 text-decoration-none text-dark`}>
                            Contact
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><ReorderIcon /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}