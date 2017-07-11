import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class AlbumsComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			albums: [],
			songs: []
		};
	}
	
	componentDidMount() {
		axios.get('/api/songs/')
			.then(res => {
				const songs = res.data;
				const albums = {};
				let album = [];
				let albumName = "";
				console.log(songs);
				this.setState({songs});
				songs.map(obj => {
					if ( albumName == "" ) { albumName = obj.album };
					if ( albumName == obj.album ) { album.push(obj) };
					if ( obj.artwork_path ==  "N/A" ) { return  }
					if ( albumName != obj.album ) {
						albums[albumName] = {};
						albums[albumName].name = albumName;
						albums[albumName].artist = album[0].artist;
						albums[albumName].songs = album;	
						if (album[0].artwork_path == "N/A") {
							albums[albumName].art = "/images/not_available.png"; 
						} else { 
								albums[albumName].art = album[0].artwork_path + '.jpg'; 
						}
						albumName = obj.album;
						album = [];
						album.push(obj);
					}
				});

				const albumsArray = $.map(albums, (value, index) => {
					return [value];
				});	
				albumsArray.sort((a,b) => {
					if ( a.artist < b.artist ) { return -1}
					if ( b.artist < a.artist ) { return 1}
					return 0;

					/*const nameA = a.artist.toUpperCase();
					const nameB = b.artist.toUpperCase();
					if (nameA < nameB) { return -1; }
					if (nameB > nameA) { return 1; }
					return 0;
				*/

				});
				console.log(albumsArray.slice(0, 50))
				this.setState({albums: albumsArray.slice(0, 1000)})
			});
		
	}

	render() {
		return (
			<div>
				{this.state.albums.map(album =>
					<div className="img-container" key={album.name}>
						<img className="thumb-img" src={album.art} alt={album.name} />
							<div>	
								<span>{album.name} - {album.artist}</span>
							</div>
					</div>

				)}
			</div>

		);

	}

}

export default AlbumsComponent;

