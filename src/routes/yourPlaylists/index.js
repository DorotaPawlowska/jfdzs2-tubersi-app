import React, {PureComponent } from 'react';
import FadeIn from 'react-fade-in';

import Layout from '../../components/layout';

import './style.css';
import './playlist-style.css';

class YourPlaylists extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      popUpAddNewPlayList: false,
      namePlayList: '',
      typePlayList: '',
      descriptionPlayList: '',
      sectionChosenPlayList: false,
      numberChoosePlaylist: null,
    }
    this.addNewPlayList = this.addNewPlayList.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }

  changeViewPopUpAddNewPlayList = () => {
    if(this.props.actuallyUser) {
      this.setState({
        popUpAddNewPlayList: !this.state.popUpAddNewPlayList,
      });
    }
  }

  addNewPlayList () {  
    let namePlayList = this.setNewDataPlaylist();
    let playList;
    if(!this.props.actuallyUser.playList) {
      playList = [
        namePlayList,
      ]
    }
    else {
      playList = this.props.actuallyUser.playList;
      playList.push(namePlayList);
    }
    
    this.props.firebase
      .database()
      .ref('users')
      .child(this.props.actuallyUser.id)
      .child('playList')
      .set(playList);
    this.setState({
      namePlayList: '',
      typePlayList: '',
      descriptionPlayList: '',
    })  
  }

  setNewDataPlaylist() {
    return {
      namePlayList: this.state.namePlayList || 'brak',
      typePlayList: this.state.typePlayList || 'brak',
      descriptionPlayList: this.state.descriptionPlayList || 'brak',
    }
  }

  deletePlayList(numberDelete) {
    let playList = 
      this.props.actuallyUser.playList
        .filter((list, index) => {
          return numberDelete !== index;
        });

    this.props.firebase
      .database()
      .ref('users')
      .child(this.props.actuallyUser.id)
      .child('playList')
      .set(playList);    
  }

  chosenPlayList = () => {
    let actuallyPlaylist;
    if(this.props.actuallyUser) {
      actuallyPlaylist =
        this.props.actuallyUser.playList[
          this.state.numberChoosePlaylist
        ];
    }

    return this.props.actuallyUser 
      ?
      this.props.actuallyUser.playList[
        this.state.numberChoosePlaylist
      ].music ? 
         <div className="section-playlist">
          <div 
            className="section-exit"
          >
            <span 
              className="section-exit-text"
              onClick={() => {
                this.setState({
                  sectionChosenPlayList: false,
                  numberChoosePlaylist: null,
                })
              }}
            >
              Zamknij [
              <span className="content-exit-icon glyphicon glyphicon-remove"/>
              ]
            </span>
            <div className="content-underline">
              <div className="content-underline-line"/>
            </div>  
          </div>
          <div className="section-playlist-main">
              <div className="section-playlist-main-image">
                <img 
                  className="section-playlist-main-image-avatar"
                  alt="avatar-play-list"
                  src={
                    actuallyPlaylist.music[
                      0
                    ]
                    .avatar
                  }
                />
                <div className="section-playlist-main-image-title">
                  {actuallyPlaylist.typePlayList}
                </div>   
              </div>
              <div className="section-playlist-main-description">
                  <p className="section-playlist-main-description-title">
                    PLAYLIST
                  </p>
                  <p className="section-playlist-main-description-nameplaylist">
                    {actuallyPlaylist.namePlayList}
                  </p>
                  <p className="section-playlist-main-description-description">
                    {actuallyPlaylist.descriptionPlayList}
                  </p>
                  <p className="section-playlist-main-description-information">
                    Created by: Eryk . 133 songs, 8 hr 13 min
                  </p>
              </div>
            </div>
            <div className="section-playlist-options">
              <button className="section-playlist-options-play">
                    Graj
              </button>
              <button className="section-playlist-options-upload">
                    Udostępnij
              </button>
              <button className="section-playlist-options-extends" >
                    <span className="glyphicon glyphicon-option-horizontal"/>
              </button>
            </div>
            <div className="section-playlist-underline" />
            <div className="section-playlist-music">
              <div className="section-playlist-music-legend">
                  <div className="section-playlist-music-space" />
                  <div className="section-playlist-music-legend-center">
                    Tytuł:
                  </div>
                  <div className="section-playlist-music-legend-last">
                    Dodano:
                  </div>
              </div>
              <div className="section-playlist-underline-music" />
              {actuallyPlaylist.music.map((music, index) => {
                return  <div 
                          className="section-playlist-music-list" 
                          key={index}
                        >
                          <div className="section-playlist-music-legend">
                            <div className="section-playlist-music-space">
                              <img
                                className="section-playlist-music-avatar"
                                src={music.avatar}
                                alt={index + "avatar-playlist"}
                              />
                            </div>
                            <div className="section-playlist-music-legend-center">
                              {music.title}
                            </div>
                            <div className="section-playlist-music-legend-last">
                              28.08.2019
                            </div>
                          </div>
                          <div className="section-playlist-underline-music" />
                        </div> 
              })}      
            </div>
        </div>
        :
        <div className="section-playlist-empty">
          <div 
          className="section-exit"
          >
            <span 
              className="section-exit-text"
              onClick={() => {
                this.setState({
                  sectionChosenPlayList: false,
                  numberChoosePlaylist: null,
                })
              }}
            >
              Zamknij [
              <span className="content-exit-icon glyphicon glyphicon-remove"/>
              ]
            </span>
            <div className="content-underline">
              <div className="content-underline-line"/>
            </div>  
          </div>
          <p className="section-playlist-empty-text">
            Aktualnie nie masz żadnego utworu
          </p>
          <p className="section-playlist-empty-text">
            Przejdź do wyszukiwarki w zakładce "Szukaj"
          </p>
          <p className="section-playlist-empty-text">
            A następnie dodaj muzykę do odpowiedniej playlisty
          </p>
        </div>
      :
      null;
  }

  render() {
    return (
      <Layout>
        {this.state.sectionChosenPlayList ?
          this.chosenPlayList()
          :
          <div className="content-playlists">
          <div className="content-playlist-title">
            <h1 className="content-playlist-title-text">
              TWOJA PLAYLISTA
            </h1>
            <button 
              className="content-playlists-options-add"
              onClick={this.changeViewPopUpAddNewPlayList}
            >
              <i className="fas fa-plus" />
              Dodaj
            </button>
          </div>
          {this.state.popUpAddNewPlayList ?
            <FadeIn>
                <div 
                  className="content-hide-section"
                  onClick={this.changeViewPopUpAddNewPlayList}
                />
                <div className="content-pop-up">
                  <div 
                    className="content-exit"
                  >
                    <span 
                      className="content-exit-text"
                      onClick={this.changeViewPopUpAddNewPlayList}
                    >
                      Zamknij [
                      <span className="content-exit-icon glyphicon glyphicon-remove"/>
                      ]
                    </span>
                  </div>
                  <div className="content-underline">
                    <div className="content-underline-line"/>
                  </div>  
                    <div className="content-pop-up-title">
                      <p className="content-pop-up-title-text">
                        Dodawanie Nowej Playlisty
                      </p>
                    </div>
                    <div className="content-pop-up-name">
                      Podaj Nazwę :
                    </div>
                    <input
                      className="content-pop-up-input"
                      name="namePlayList"
                      onChange={this.handleChange}
                      value={this.state.namePlayList}
                    />
                    <div className="content-pop-up-name">
                      Podaj Gatunek :
                    </div>
                    <input
                      className="content-pop-up-input"
                      name="typePlayList"
                      onChange={this.handleChange}
                      value={this.state.typePlayList}
                    />
                    <div className="content-pop-up-name">
                      Podaj Opis (opcjonalnie)* :
                    </div>
                    <textarea
                      className="content-pop-up-description"
                      row="2"
                      name="descriptionPlayList"
                      onChange={this.handleChange}
                      value={this.state.descriptionPlayList}
                    />
                    <div>
                      <button
                        className="content-pop-up-submit"
                        onClick={this.addNewPlayList}
                      >
                        Dodaj
                      </button>
                    </div>
                </div>
            </FadeIn>
            :
            null
          }
          {this.props.actuallyUser ?
            this.props.actuallyUser.playList ?
              this.props.actuallyUser.playList.map((list, index) => {
                return (
                      <div 
                        className="col-xs-12 col-md-6"
                        key={index}
                      >
                        <div className="playlists-item animated zoomIn">
                          <img 
                            className="img-responsive"
                            alt={index + 'avatar'}
                            src={
                              list.music ?
                                list.music[0].avatar
                                :
                                null 
                              ||
                              require('../../images/iTunes-playlist-purple.png')
                            }
                            style= {{
                              marginLeft: "auto",
                              marginRight: "auto",
                              marginTop: "50px",
                              height: "250px",
                              with: "250px",
                            }}
                          />
                          <div className="playlists-item-box">
                            <div className="playlists-buttons-hover animated fadeIn">
                              <h6 className="playlists-title">
                                {list.namePlayList}
                              </h6>
                              <button 
                                className="btn btn-default btn-playlists"
                                type="button"
                                onClick={() => {
                                  this.setState({
                                    sectionChosenPlayList: true,
                                    numberChoosePlaylist: index,
                                  })
                                }}
                              >
                                <i className="fab fa-youtube" />
                                Przejdź
                              </button>
                              <button  
                                className="btn btn-default btn-playlists"
                                type="button"
                              >
                                <i className="fas fa-share-alt" />
                                Udostępnij
                              </button>
                              <button 
                                className="btn btn-default btn-playlists"
                                type="button"
                                onClick={() => {this.deletePlayList(index)}}
                              >
                                <i className="fas fa-trash-alt" />
                                Usuń
                              </button>
                            </div>
                          </div>
                        </div>
                    </div>
                )
              })
              :
              <div className="playlist-empty">
                <p className="playlist-empty-text">
                  Aktualnie nie masz żadnej playlisty!
                </p> 
                <p className="playlist-empty-text">
                  Dodaj nową playlistę i wczuj się w rytm muzyki!
                </p>
              </div>
            :
            <div className="playlist-loading">
              <div className="spinner">
                <div className="double-bounce1"/>
                <div className="double-bounce2"/>
              </div>
              <p className="playlist-loading-text">Wczytuje...</p>
            </div>
          }    
        </div>
        }
      </Layout>
    );
  }
}

export default YourPlaylists;