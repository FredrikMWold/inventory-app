import { useMsal } from '@azure/msal-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, Menu, MenuItem } from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useWindowDimensions } from '../../hooks';
import { NavigationLink } from './NavigationLink/NavigationLink';

import { HamburgerMenu } from './HamburgerMenu/HamburgerMenu';
import { StyledLinkDiv } from './NavigationLink/styles';
import {
    BackButton,
    CompactHeaderWrap,
    HeaderWrap,
    LogOutWrapper,
    MenuAdmin,
    MenuAdminLink,
    TopBarContainer,
} from './styles';

export const TopBar = () => {
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

    const { listId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [returnButton, setReturnButton] = useState(false);

    const handleBack = () => {
        if (location.pathname === '/add-part/checks') {
            navigate('/add-part/batch');
        } else if (location.pathname === '/add-part/upload') {
            navigate('/add-part/checks');
        } else if (location.pathname === '/add-part/add-form') {
            navigate('/add-part/upload');
        } else if (location.pathname === `/makelist/${listId}`) {
            navigate('/makelist');
        } else if (location.pathname === '/add-part/batch') {
            navigate('/add-part');
        } else {
            navigate(-1);
        }
    };

    const handleSearchIconClick = () => {
        navigate('/search', {
            state: { resetInputField: true },
        });
    };

    useEffect(() => {
        const excludedRoutes = [
            '/',
            '/search',
            '/add-part',
            '/makelist',

            '/admin/categories',
            '/admin/vendors',
            '/admin/locations',
        ];
        setReturnButton(!excludedRoutes.includes(location.pathname));
    }, [location.pathname]);
    const { width } = useWindowDimensions();

    const adminLinks = (location: string) => {
        navigate(location);
    };
    const { instance } = useMsal();
    const handleSignOut = () => {
        navigate('/');
        instance.logoutPopup().catch((e) => {
            console.error(e);
        });
    };

    return (
        <div>
            <TopBarContainer>
                {returnButton ? (
                    <BackButton onClick={handleBack}>
                        <ArrowBackIcon fontSize="large" onClick={handleBack} />
                    </BackButton>
                ) : (
                    <img
                        alt="logo"
                        src={'/WP 1.svg'}
                        onClick={handleSearchIconClick}
                        width="40"
                        style={{ cursor: 'pointer' }}
                    />
                )}
                {width > 800 ? (
                    <HeaderWrap>
                        <NavigationLink to="search">Find parts</NavigationLink>
                        <NavigationLink to="add-part">Add part</NavigationLink>
                        <NavigationLink to="makelist">Make list</NavigationLink>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <>
                                    <MenuAdmin
                                        $isopen={popupState.isOpen.toString()}
                                        {...bindTrigger(popupState)}
                                    >
                                        <StyledLinkDiv>Admin</StyledLinkDiv>
                                    </MenuAdmin>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}>
                                            <MenuAdminLink
                                                onClick={() => {
                                                    adminLinks('admin/categories');
                                                }}
                                            >
                                                Categories
                                            </MenuAdminLink>
                                        </MenuItem>
                                        <MenuItem onClick={popupState.close}>
                                            <MenuAdminLink
                                                onClick={() => {
                                                    adminLinks('admin/vendors');
                                                }}
                                            >
                                                Vendors
                                            </MenuAdminLink>
                                        </MenuItem>
                                        <MenuItem onClick={popupState.close}>
                                            <MenuAdminLink
                                                onClick={() => {
                                                    adminLinks('admin/locations');
                                                }}
                                            >
                                                Locations
                                            </MenuAdminLink>
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}
                        </PopupState>
                        <LogOutWrapper
                            onClick={() => {
                                handleSignOut();
                            }}
                        >
                            <StyledLinkDiv>Log out</StyledLinkDiv>
                        </LogOutWrapper>
                    </HeaderWrap>
                ) : (
                    <CompactHeaderWrap>
                        <Button
                            style={{
                                color: 'black',
                                padding: 0,
                                minWidth: 0,
                            }}
                            onClick={() => setHamburgerIsOpen(true)}
                        >
                            <MenuIcon sx={{ fontSize: 40 }} />
                        </Button>

                        <Drawer
                            anchor="right"
                            open={hamburgerIsOpen}
                            onClose={() => setHamburgerIsOpen(false)}
                        >
                            <HamburgerMenu setHamburgerIsOpen={setHamburgerIsOpen} />
                        </Drawer>
                    </CompactHeaderWrap>
                )}
            </TopBarContainer>
            <Outlet />
        </div>
    );
};

export default TopBar;
