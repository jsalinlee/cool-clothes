import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { CartContext } from "../../context/cart.context";
import { selectCurrentUser } from "../../store/user/user.selector";

import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { isCartOpen } = useContext(CartContext);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    { currentUser ? (
                        <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to='/auth'>SIGN IN</NavLink>
                    ) }
                    <CartIcon />
                </NavLinks>
            </NavigationContainer>
            {isCartOpen && <CartDropdown />}
                <Outlet />
        </Fragment>
    )
}

export default Navigation;