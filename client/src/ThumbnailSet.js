import React, {Component} from 'react';
import './ThumbnailSet.css';
import Config from './config';

class Thumbnail extends Component {

    render() {
        // console.log(this.props)
        return (
            <div key={this.props.photo.idfoto} className="thumbnail">
                <div className="">
                    <a onClick={()=>this.props.onClick()}>
                        <img src={Config.apiBaseUrl+"/images/600/"+this.props.photo.foto} className="thumbnailImage"
                             alt="" />
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
        let that = this;
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

export default ThumbnailSet;