import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import Config from './config';
import PhotoMap from './Map.js';
//import axios from 'axios';

//import './dist/css/'

class YearSlider extends Component {

    render() {
        return (

            <div className="row">
                <h4>Seleccione el año y región</h4>
                <div className="col-lg-9">
                    <div className="panel slider"></div>
                </div>
                <div className="col-lg-3">
                    <button type="button" className="btn btn-primary">Buscar</button>
                </div>
                <p>&nbsp;</p>
            </div>
        );
    }
}


class MainPhoto extends Component {
    constructor(props) {
        super(props);
        // Manually bind this method to the component instance...
        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(photo){
        this.props.handleNewActive(photo);
    }

    render() {

        return (
            <div className="row">

                <div className="col-lg-8">
                    <div className="mainPhoto" id="mainPhoto">
                        <img key="MainPhotoImg" src={Config.apiBaseUrl+"/images/1200/"+this.props.activePhoto.foto}
                             className="img-responsive mainPhoto" alt={this.props.activePhoto.titulo}></img>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="mainPhotoDescription">
                        <h1 key="MainTitle" id="mainPhotoTitle">{this.props.activePhoto.titulo}</h1>
                        <ul className="photDescription">
                            <li key="MainDesc">{this.props.activePhoto.sector}</li>
                            <li key="MainYear">{this.props.activePhoto.ano}</li>
                        </ul>
                    </div>
                    <PhotoMap
                        photos={this.props.photos}
                        activePhoto={this.props.activePhoto}
                        onNewActive={this.handleClick.bind(this)} //se pasa este métdodo para que sea usado por el mapa para poner el estado
                    />
                    <YearSlider />
                </div>


            </div>
        );
    }
}


class Thumbnail extends Component {

    render() {
        // console.log(this.props)
        return (

            <div key={this.props.photo.idfoto} className="thumbnail">
                <div className="">
                    <a onClick={()=>this.props.onClick()}>
                        <img src={Config.apiBaseUrl+"/images/600/"+this.props.photo.foto} className="thumbnailImage"
                             alt=""></img>
                    </a>


                </div>
            </div>
        );
    }
}

class ThumbnailSet extends Component {

    constructor(props) {
        super(props);
        // Manually bind this method to the component instance...
        this.handleClick = this.handleClick.bind(this);
        this.handleNewPhotos = this.handleNewPhotos.bind(this);
    }
    renderThumbnail(photo) {
        return (<Thumbnail
            key={photo.idfoto}
            photo={photo}
            onClick={() => this.handleClick(photo)
            }
        />);
    }

    handleClick(photo){
        this.props.handleNewActive(photo);
    }
    handleNewPhotos(photos){
        this.props.handleNewPhotos(photos);
    }




    render() {
        var that = this;
        let rows=[];
        this.props.photos.map(function (pic){
            rows.push(that.renderThumbnail(pic));
            //console.log(photo);
            return rows;
        });


        return (
            <div className="thumbnailList">
                {rows}
            </div>
        );
    }
}


class App extends Component {
    constructor(props) {
        super(props);
        //var as = [{"idfoto":"1","foto":"001-Playa-Naranjo-a-Volcan-Orosi-aerea-1988.jpg","titulo":"Playa Naranjo a Volc\u00e1n Oros\u00ed a\u00e9rea","sector":"(Izquierda) Volc\u00e1n Cacao (derecha) Cerro el Hacha (Izquierda)Argelia Centro Abajo","latitud":"10.7715072632","longitud":"-85.6607894897","ano":"1988"},{"idfoto":"2","foto":"002-Carbonal-1988.jpg","titulo":"Carbonal","sector":"(parte mas sur del sector Santa Rosa)","latitud":"10.7591123581","longitud":"-85.6585159302","ano":"1988"},{"idfoto":"3","foto":"003-Camino-a-playa-naranjo-1988.jpg","titulo":"Camino a playa Naranjo","sector":"Sector Oeste, Sector Santa Rosa","latitud":"10.8067502975","longitud":"-85.6481475830","ano":"1988"},{"idfoto":"4","foto":"004-Camino-a-playa-naranjo-1988.jpg","titulo":"Camino a playa Naranjo","sector":"Sector Oeste, Sector Santa Rosa","latitud":"10.8048954010","longitud":"-85.6473770142","ano":"1988"},{"idfoto":"5","foto":"005-Camino-a-playa-naranjo-1988.jpg","titulo":"Camino a playa Naranjo","sector":"Sector Este, Sector Santa Rosa, Quebrada Costa Rica en Centro","latitud":"10.8283739090","longitud":"-85.6363906860","ano":"1988"},{"idfoto":"6","foto":"006-Rio-Calera-1988.jpg","titulo":"R\u00edo Calera","sector":"Camino a playa Naranjo arriba. Sector Santa Rosa","latitud":"10.8370571136","longitud":"-85.6427764893","ano":"1988"},{"idfoto":"7","foto":"007-Area-Administrativa-Santa-Rosa-1988.jpg","titulo":"\u00c1rea Administrativa Santa Rosa","sector":"Corral de piedra sector Santa Rosa","latitud":"10.8392705917","longitud":"-85.6177902222","ano":"1988"},{"idfoto":"8","foto":"008-Area-Administrativa-Bosque-San-Emilio-1988.jpg","titulo":"\u00c1rea Administrativa Bosque San Emilio","sector":"A la izquierda sector Santa Rosa","latitud":"10.8207654953","longitud":"-85.5497131348","ano":"1988"},{"idfoto":"9","foto":"009-area-oeste-bosque-san-emilio-norte-sector-santa-rosa-1988.jpg","titulo":"\u00c1rea oeste bosque san Emilio norte sector santa rosa","sector":"Sector oeste bosque San Emilio y norte \u00e1rea administrativa Santa Rosa","latitud":"10.8209552765","longitud":"-85.5481262207","ano":"1988"},{"idfoto":"10","foto":"010-Oeste-Bosque-san-emilio-hacia-arriba-sector-santa-rosa-1988.jpg","titulo":"Oeste Bosque san Emilio hacia arriba sector santa rosa","sector":"Sector Santa Rosa","latitud":"10.8216934204","longitud":"-85.5476913452","ano":"1988"}];
        const as = [{"idfoto":"1","foto":"001-Playa-Naranjo-a-Volcan-Orosi-aerea-1988.jpg","titulo":"Playa Naranjo a Volc\u00e1n Oros\u00ed a\u00e9rea","sector":"(Izquierda) Volc\u00e1n Cacao (derecha) Cerro el Hacha (Izquierda)Argelia Centro Abajo","latitud":"10.7715072632","longitud":"-85.6607894897","ano":"1988"},{"idfoto":"2","foto":"002-Carbonal-1988.jpg","titulo":"Carbonal","sector":"(parte mas sur del sector Santa Rosa)","latitud":"10.7591123581","longitud":"-85.6585159302","ano":"1988"},{"idfoto":"3","foto":"003-Camino-a-playa-naranjo-1988.jpg","titulo":"Camino a playa Naranjo","sector":"Sector Oeste, Sector Santa Rosa","latitud":"10.8067502975","longitud":"-85.6481475830","ano":"1988"},];
        // console.log(as);


        this.state = {
            photos: as,
            activePhoto: as[0],
        }
        this.loadPhotos = this.loadPhotos.bind(this);
        this.handleNewPhotos= this.handleNewPhotos.bind(this);
        this.handleNewActive=this.handleNewActive.bind(this);
        this.componentDidMount=this.componentDidMount.bind(this);

    }

    handleNewActive(activePhoto){
        this.setState({activePhoto});
    }

    handleNewPhotos(photos){
        this.setState({photos});
    }

    componentDidMount() {
        console.log(this.state);
        fetch(Config.apiBaseUrl+"/fotos/")
            .then(photos => photos.json())
            .then(photos => {
                this.setState({photos:photos,activePhoto:photos[0]});
            });
    }


    loadPhotos(){


    }

    render() {
        return (
            <div className="App container">
                <ThumbnailSet
                    photos={this.state.photos}
                    handleNewPhotos={this.handleNewPhotos.bind(this)}
                    activePhoto={this.state.activePhoto}
                    handleNewActive={this.handleNewActive.bind(this)}
                />
                <MainPhoto
                    activePhoto={this.state.activePhoto}
                    photos={this.state.photos}
                    handleNewActive={this.handleNewActive.bind(this)}
                />
            </div>
        );
    }
}


export default App;
