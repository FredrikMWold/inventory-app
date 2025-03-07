import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaceIcon from '@mui/icons-material/Place';
import SearchIcon from '@mui/icons-material/Search';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownItem, HamburgerContainer } from './styles';

type Props = {
    setHamburgerIsOpen: (hamburgerOpen: boolean) => void;
};

export const HamburgerMenu = ({ setHamburgerIsOpen }: Props) => {
    const [adminDropdownIsOpen, setAdminDropdownIsOpen] = useState(false);
    const navigate = useNavigate();
    const hamburgerLink = (location: string) => {
        navigate(location);
    };

    const menuItems = [
        { location: 'search', icon: <SearchIcon fontSize="large" />, text: 'Find parts' },
        { location: 'add-part', icon: <AddIcon fontSize="large" />, text: 'Add part' },
        { location: 'makelist', icon: <ListAltIcon fontSize="large" />, text: 'Make lists' },
        {
            location: 'admin',
            icon: <AdminPanelSettingsIcon fontSize="large" />,
            text: 'Admin',
            dropdownItems: [
                {
                    location: 'admin/categories',
                    icon: <CategoryIcon fontSize="large" />,
                    text: 'Categories',
                },
                {
                    location: 'admin/vendors',
                    icon: <BusinessIcon fontSize="large" />,
                    text: 'Vendors',
                },
                {
                    location: 'admin/locations',
                    icon: <PlaceIcon fontSize="large" />,
                    text: 'Locations',
                },
            ],
        },
    ];

    return (
        <HamburgerContainer>
            <List>
                {menuItems.map((item) => (
                    <React.Fragment key={item.location}>
                        <ListItem>
                            <ListItemButton
                                onClick={() => {
                                    if (item.location === 'admin') {
                                        setAdminDropdownIsOpen(!adminDropdownIsOpen);
                                    } else {
                                        hamburgerLink(item.location);
                                        setHamburgerIsOpen(false);
                                    }
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>

                        {item.location === 'admin' && adminDropdownIsOpen && item.dropdownItems && (
                            <div style={{ width: '100%' }}>
                                <List style={{ padding: 0 }}>
                                    {item.dropdownItems.map((dropdownItem) => (
                                        <DropdownItem key={dropdownItem.location}>
                                            <ListItemButton
                                                onClick={() => {
                                                    hamburgerLink(dropdownItem.location);
                                                    setHamburgerIsOpen(false);
                                                    setAdminDropdownIsOpen(false);
                                                }}
                                            >
                                                <ListItemIcon>{dropdownItem.icon}</ListItemIcon>
                                                <ListItemText primary={dropdownItem.text} />
                                            </ListItemButton>
                                        </DropdownItem>
                                    ))}
                                </List>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </HamburgerContainer>
    );
};
