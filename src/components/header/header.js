
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import Logo from '../../images/logo_wektor.svg';
import { connect } from 'react-redux'; 

class Header extends Component {
    render() {
        return (
            <nav className="navbar">
                <a onClick={this.props.handleClick} className="toggle-menu" >
                    <i className="fas fa-bars"></i>
                </a>
                <Link to ="/" className="brand-name">
                    <img src={Logo} alt="logo" className="logo-img"/>       
                    Tubersi
                </Link>           
                <button className="btn btn-default navbar-btn"   
                        onClick={this.props.changeStatus}
                >
                    <i className="fas fa-sign-out-alt"></i> 
                    Wyloguj 
                </button>
            </nav>
            
        );
    }
}

const mapStateToProps = status => {
    return {
        status,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        changeStatus: () => dispatch({ type: 'OFFLINE'}),
    };
  };
  
  export default connect (mapStateToProps,mapDispatchToProps)(Header);
