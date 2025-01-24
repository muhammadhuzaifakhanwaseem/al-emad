import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 400,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '0px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function NavDropdown({ items, imagePath, title, type }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Split items into rows of 4
    const rows = [];
    for (let i = 0; i < items?.length; i += 4) {
        rows.push(items.slice(i, i + 4));
    }

    return (
        <Link href="#" className='text-decoration-none text-dark ms-2'>
            <span onClick={handleClick}>{title}</span>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <div className="container shadow">
                    <div className="row">
                        {items?.map((item, index) => (
                            <div key={index} className='col-4 p-3 border-end border-bottom shadow shadow-sm'>
                                <Link href={
                                    type === 'brands'
                                        ? `/cheapest-car-rentals/brand/${item?.slug}`
                                        : type === 'types'
                                            ? `/cheapest-car-rentals/category/${item?.slug}`
                                            : '/'
                                } className='d-flex text-decoration-none text-dark align-items-center justify-content-between'>
                                    {item?.image ? (
                                        <Image
                                            className="img-fluid me-2"
                                            src={imagePath + item?.image}
                                            alt={item.name}
                                            width={70}
                                            height={70}
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                            }}
                                        />
                                    ) : (
                                        <Skeleton
                                            className="me-2"
                                            variant="rectangular"
                                            width={70}
                                            height={70}
                                        />
                                    )}
                                    {item?.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                {/* {rows.map((row, rowIndex) => (
                    <Grid container key={rowIndex} spacing={2} style={{ padding: '8px' }}>
                        {row.map((item, index) => (
                            <Grid item xs={3} key={index}>
                                <MenuItem onClick={handleClose} disableRipple>
                                    {item?.image ? (
                                        <Image
                                            className="img-fluid me-2"
                                            src={imagePath + item?.image}
                                            alt={item.name}
                                            width={70}
                                            height={70}
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                            }}
                                        />
                                    ) : (
                                        <Skeleton
                                            className="me-2"
                                            variant="rectangular"
                                            width={70}
                                            height={70}
                                        />
                                    )}
                                    {item?.name}
                                </MenuItem>
                            </Grid>
                        ))}
                    </Grid>
                ))} */}
            </StyledMenu>
        </Link>
    );
}
