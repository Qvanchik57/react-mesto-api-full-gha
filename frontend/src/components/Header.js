import logo from '../images/header-logo.svg';
import {Link} from 'react-router-dom';

function Header(props) {
    const sign = `${props.headerSign}`;

    function handleOutClick() {
      localStorage.removeItem('jwt');
      props.handleLoginOut();
      console.log(props.loggedIn);
    }

    return (
        <header className={props.class}>
          
          <img className="header__logo" alt="Логотип мест" src={logo} />
          <div className='header__profile'>
            {props.loggedIn && <p className='header__email'>{props.headerEmail}</p>}
            <Link to={sign} className='header__link' onClick={handleOutClick}>{props.headerLink}</Link>
          </div>
        </header>
    );
}
  
export default Header;