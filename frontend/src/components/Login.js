import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from '../auth';

function Login({handleLogin, ...props}) {

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
        if (!formValue.email || !formValue.password){
            return;
        }
        auth.authorize(formValue.password, formValue.email)
            .then((data) => {
                console.log(data)
                if (data.token) {
                    setFormValue({email: '', password: ''});
                    handleLogin();
                    navigate('/', {replace: true});
                }
            })
            .catch((err) => {
                console.log(err);
            })
        
    }

    const headerLink = 'Регистрация';
    React.useEffect(() => {
        props.handleHeaderLink(headerLink);
      }, []
    )

    const headerSign = 'signup';
    React.useEffect(() => {
        props.handleHeaderSign(headerSign);
      }, []
    )

    return (
        <div className={`${props.class} ${props.isOpen ? 'sign_open' : ''}`}>
            <div className="popup__container-sign">
                <h2 className="popup__header-sign">Вход</h2>
                <form className="popup__form-sign" onSubmit={handleSubmit} >
                    <input id="email" className="popup__input-text-sign" type="email" name="email" placeholder="Email" required minLength="2" maxLength="40" value={formValue.email || ''} onChange={handleChange} />
                    <span className="popup__input-text-error name-error"></span>
                    <input id="password" className="popup__input-text-sign" type="password" name="password" placeholder="Пароль" required minLength="2" maxLength="200" value={formValue.password || ''} onChange={handleChange} />
                    <span className="popup__input-text-error descrip-error"></span>
                    <button className="popup__button-save-sign" type="submit">Войти</button>
                </form>               
            </div>
        </div>
    )
}

export default Login