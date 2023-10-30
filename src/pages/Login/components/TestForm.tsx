import { useState } from 'react';

export const TestForm = () => {

    const [login, setLogin] = useState(true);
    const [isResponsive, setIsResponsive] = useState(false);
    //    const [register, setRegister] = useState(false);
    return (
        <div className="content">
            <div className="wrapper">
                <nav className="nav">
                    <div className="nav-logo">
                        <p>LOGO .</p>
                    </div>
                    <div className={isResponsive ? "nav-menu responsive" : "nav-menu"}>
                        <ul>
                            <li><a href="#" className='link active'>Home</a></li>
                            <li><a href="#" className='link'>Blog</a></li>
                            <li><a href="#" className='link'>Services</a></li>
                            <li><a href="#" className='link'>About</a></li>
                        </ul>
                    </div>
                    <div className="nav-button">
                        <button className='btn white-btn' id="loginBtn" onClick={() => setLogin(false)}>Sign In</button>
                        <button className='btn register-btn' id="register" onClick={() => setLogin(true)}>Sign up</button>
                    </div>
                    <div className="nav-menu-btn">
                        <i className="bx bx-menu" onClick={() => setIsResponsive(!isResponsive)}></i>
                    </div>
                </nav>
                <div className="form-box">

                    <div className="login-container" id="login"
                        style={{
                            marginLeft: !login ? '' : '-525px',
                            marginRight: login ? '' : '525px',
                            opacity: login ? '0' : '1',

                        }}
                    >
                        <div className="top">
                            <span>Don't have an Account? <a href="#" onClick={() => setLogin(true)}>Sign Up</a></span>
                            <header>Login</header>
                        </div>
                        <div className="input-box">
                            <input type="text" className='input-field' placeholder='Email' />
                            <i className="bx bx-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input type="password" className='input-field' placeholder='Password' />
                            <i className="bx bx-lock-alt"></i>
                        </div>
                        <div className="input-box">
                            <input type="submit" className='submit' value="Sign In" />
                        </div>
                        <div className="two-col">
                            <div className="one">
                                <input type="checkbox" id='login-check' />
                                <label htmlFor="login-check">Remember Me</label>
                            </div>
                            <div className="two">
                                <label><a href="#">Forgot password?</a></label>
                            </div>
                        </div>
                    </div>

                    <div className="register-container" id="register"
                        style={{
                            marginLeft: login ? '' : '-525px',
                            opacity: !login ? '0' : '1',
                            marginRight: !login ? '' : '525px'
                        }}
                    >
                        <div className="top">
                            <span>Have an Account? <a href="#" onClick={() => setLogin(false)} >Login</a></span>
                            <header>Sign Up</header>
                        </div>
                        <div className="two-forms">
                            <div className="input-box">
                                <input type="text" className='input-field' placeholder='FirstName' />
                                <i className="bx bx-user"></i>
                            </div>
                            <div className="input-box">
                                <input type="text" className='input-field' placeholder='LastName' />
                                <i className="bx bx-user"></i>
                            </div>
                        </div>
                        <div className="input-box">
                            <input type="text" className='input-field' placeholder='Email' />
                            <i className="bx bx-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input type="password" className='input-field' placeholder='Password' />
                            <i className="bx bx-lock-alt"></i>
                        </div>
                        <div className="input-box">
                            <input type="submit" className='submit' value="Register" />
                        </div>
                        <div className="two-col">
                            <div className="one">
                                <input type="checkbox" id='register-check' />
                                <label htmlFor="register-check">Remember Me</label>
                            </div>
                            <div className="two">
                                <label><a href="#">Terms & conditions</a></label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
