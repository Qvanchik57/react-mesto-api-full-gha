import React from 'react';
import logo from '../images/header-logo.svg';
import {Link} from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import userEvent from '@testing-library/user-event';

function Header(props) {
    const sign = `${props.headerSign}`;
    const user = React.useContext(CurrentUserContext);

    function handleOutClick() {
      localStorage.removeItem('jwt');
      props.handleLoginOut();
      console.log(props.loggedIn);
    }

    return (
        <header className={props.class}>
          
          <img className="header__logo" alt="Логотип мест" src={logo} />
          <div className='header__profile'>
            {props.loggedIn && <p className='header__email'>{user.email}</p>}
            <Link to={sign} className='header__link' onClick={handleOutClick}>{props.headerLink}</Link>
          </div>
        </header>
    );
}
  
export default Header;
