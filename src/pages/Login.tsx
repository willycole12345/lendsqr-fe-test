import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { banner, logo, welcome } from '../images';

const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false),
        navigate = useNavigate(),
        togglePassword = () => setPasswordShown(!passwordShown),
        onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
            e.preventDefault();
            return navigate('/dashboard');
        };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <div className="md-4">
                            <div className="signin_logo">
                                <img src={logo} alt="logo" />
                            </div>
                            <div className="banner">
                                <img src={banner} alt="bannee" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <form onSubmit={onSubmit}>
                            <div className="header_title">
                                <img src={welcome} alt="welcome" />
                                <p> Enter details to login.</p>
                                <div className="input_holder">
                                    <input type="email" placeholder="Email" className="input_style" />
                                </div>
                                <div>
                                    <input type={passwordShown ? 'text' : 'password'} placeholder="Password" className="input_style" />
                                    <span className="eyes" onClick={togglePassword}>
                                        SHOW
                                    </span>
                                </div>
                                <div className="password_forget">
                                    <span className="forget_pass">forget password ?</span>
                                </div>
                                <button type="submit" className="btn btn-success butt-style">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
