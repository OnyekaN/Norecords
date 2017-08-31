import React from 'react';
import ReactDOM from 'react-dom';
import CollectionComponent from './collection.component';
import SidebarComponent from './sidebar.component';

class PlayerComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showSidebar: false
		}

		this.albumClick = this.albumClick.bind(this);
	}

	albumClick(album) {
		if ( album == this.state.album ) {
			this.setState({
				showSidebar: !this.state.showSidebar,
				album: album
			});
		console.log(album);
		}
		else { 
			this.setState({
				showSidebar: true,
				album: album
			});	
		}
	}

	render() {
		let album = this.state.album;
		const sidebar = ( <SidebarComponent album={album}/> );
		return (
			<div>
				{this.state.showSidebar ? sidebar : null} 
				<div id="spacer"></div>
				<div id="collection">
					<CollectionComponent clickHandler={this.albumClick} sidebar={this.state.showSidebar} />
				</div>
			</div>
		);
	}

}

export default PlayerComponent;
