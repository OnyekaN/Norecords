'use strict'
import React from 'react'
import ReacDOM from 'react-dom'

class SearchComponent extends React.Component {

	constructor(props) {

		super(props)

		this.state = {
			show: "",
			search: null,
			sortHidden: "sort-hidden",
			sortIndex: 1,
			sortOption: "Artist",
		}

		this.sortOptions = ["Artist", "Album", "Year"],
		this.handleSearch = this.handleSearch.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
		this.sortAlbums = this.sortAlbums.bind(this);

	}

	componentWillMount() {

		setTimeout(() => {
			this.setState({show: "show"})
		}, 3000);
	}

	handleSearch(e) {

		if ( !e ) {
			this.props.searchHandler("");
			this.setState({search: null});
			return;
		}

		if ( e.key === 'Enter' ) {
			let searchText = e.target.value.toLowerCase();
			this.props.searchHandler(searchText);
			this.setState({search: !!searchText});
		}
	}

	clearSearch() {

		this.handleSearch("");
		this.setState({search: null});
		document.getElementsByClassName("search-input")[0].value = "";
	}

	sortAlbums() {

		let sortIndex = this.state.sortIndex % this.sortOptions.length,
				sortOption = this.sortOptions[sortIndex];

		this.props.sortHandler(sortOption);
		this.setState({sortIndex: sortIndex + 1, sortOption: sortOption, sortHidden: ""});
		setTimeout(() => {
			this.setState({sortHidden: "sort-hidden"})
		}, 3000);

	}

	render() {

		const clearSearchButton = (
													<span className="search-clear" onClick={this.clearSearch}>
														<i className="far fa-times-circle fa-lg"/>
													</span> );

		const searchInfo = (
								<div className="search-info">
									<span className="search-clear"><i className="far fa-times-circle"/></span>
									<span>{this.state.search}</span>
								</div>
							);

		return (
			<div className={"search-sort-container " + this.state.show} key="search-sort-container">

				<div className="sort-container">
					<span className={"sort-options " + this.state.sortHidden}>
						{this.state.sortOption.toUpperCase()}
					</span>
					<a onClick={this.sortAlbums}>
						<span className="sort-icon"><i className="fas fa-bars fa-2x"></i></span></a>
				</div>

				<div className="search-container">
					<span className="search-icon"><i className="fa fa-search"/></span>
					<input className="search-input" type="text"
						placeholder="Search..." onKeyPress={this.handleSearch}/>
				</div>

				{this.state.search ? clearSearchButton : null}


			</div>
		);

	}

}

export default SearchComponent;
