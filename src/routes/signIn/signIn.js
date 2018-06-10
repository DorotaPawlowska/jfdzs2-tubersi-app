import React, { PureComponent, Fragment } from 'react';
import './signIn.css';
import '../signUp/signUp.css';


import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";


class SignIn extends PureComponent {
  render() {
    return (
      <Fragment>
        <Header/>
          <Fragment>
             
              <main>
                <h1 className="page-title">Witaj Tubersie!</h1>
                
                <div className="box-sign-in animated zoomIn">
                  <form action="/dashboard">
                      <h2>Zaloguj się</h2>
                      <input type="text" name="Name" placeholder="Podaj login" required />
                      <input type="password" name="password" placeholder="Podaj hasło"  required />
                      <input className="input-submit" type="submit" value="Zaloguj"/> 
                  </form> 
                </div>
              </main>
              
          </Fragment>
        <Footer/>
      </Fragment>
    );
  }
}


export default SignIn;