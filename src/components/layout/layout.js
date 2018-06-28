import React, { PureComponent, Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Footer from "../footer/footer";
import Header from "../header/header";
import Menu from "../menu/menu";

import Chat from '../../routes/chat/chat';
import Dashborad from '../../routes/dashboard/dashboard';
import Player from '../../routes/player/player';
import Playlist from '../../routes/playlist/playlist';
import Search from '../../routes/search/search';
import YourPlaylists from '../../routes/yourPlaylists/yourPlaylists';

import './layout.css';

class Layout extends PureComponent {
  render() {
    return (
        <BrowserRouter>
        <Fragment>
          <Header/>
          <Menu/>
          <div className="layout">
            <Switch>
              <Route exact path="/dashboard" component={Dashborad} />
              <Route path="/chat" component={Chat} />
              <Route path="/player" component={Player} />
              <Route path="/playlist" component={Playlist} />
              <Route path="/search" component={Search} />
              <Route path="/yourPlaylists" component={YourPlaylists} />
            </Switch>
          </div> 
        <Footer/>
      </Fragment>
      </BrowserRouter>
    );
  }
}

export default Layout;