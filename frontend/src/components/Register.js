import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from '../auth';

function Register(props) {

    const [formValue, setFormValue] = React.useState({
        email: '',
        password: ''
    })
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(formValue.password, formValue.email)
            .then((res) => {
                props.isOpen('ok', 'ok');
                navigate('/signin', {replace: true});
            })
            .catch((err) => {
                console.log(err);
                props.isOpen('not', 'not')
            })
    }

    const headerLink = 'Войти';
    React.useEffect(() => {
        props.handleHeaderLink(headerLink);
      }, []
    )

    const headerSign = 'signin';
    React.useEffect(() => {
        props.handleHeaderSign(headerSign);
      }, []
    )


    return (
        <div className={`${props.class} ${props.isOpen ? 'sign_open' : ''}`}>
            <div className="popup__container-sign">
                <h2 className="popup__header-sign">Регистрация</h2>
                <form className="popup__form-sign" onSubmit={handleSubmit}>
                    <input id="email" className="popup__input-text-sign" type="email" name="email" placeholder="Email" required minLength="2" maxLength="40" value={formValue.email || ''} onChange={handleChange} />
                    <span className="popup__input-text-error name-error-sign"></span>
                    <input id="password" className="popup__input-text-sign" type="password" name="password" placeholder="Пароль" required minLength="2" maxLength="200" value={formValue.password || ''} onChange={handleChange} />
                    <span className="popup__input-text-error descrip-error-sign"></span>
                    <button className="popup__button-save-sign" type="submit">Зарегистрироваться</button>
                    <p className='signup__text'>
                        Уже зарегистрированы?
                        <Link to="/signin" className='signin__link'> Войти</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register