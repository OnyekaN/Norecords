import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class CollectionComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			albums: [],
			songs: []
		}
	}
	
	componentDidMount() {
		axios.get('/api/sorted_albums/')
			.then(res => {
				const albums = res.data;	
				const albumsArray = $.map(albums, (value, index) => {
					return [value];
				});	
				albumsArray.sort((a,b) => {
					if ( a.artist < b.artist ) { return -1}
					if ( b.artist < a.artist ) { return 1}
					return 0;
				});
				this.setState({albums: albumsArray.slice(0, 1000)})
			});

	}

	render() {
		let left = this.props.sidebar ? "250px" : 0; 
		return (
			<div>
				{this.state.albums.map(obj =>
					<Album				
						key={obj.name}
						album={obj}
						clickHandler={this.props.clickHandler}
					/>
				)}
			</div>
		);
	}

}

const Album = props => {
	const handleClick = () => {
		props.clickHandler(props.album)
	}

	return (	
		<div className="img-container"
		 onClick={handleClick}>
			<img className="thumb-img" src={props.album.art} alt={props.album.name} />
				<div>	
					<span>{props.album.name} - {props.album.artist}</span>
				</div>
		</div>
	)
}

export default CollectionComponent;

