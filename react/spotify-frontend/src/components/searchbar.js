//create a searchbar component
//import react
import React from 'react';


//create a class component
class SearchBar extends React.Component {
    //create a constructor
    constructor(props) {
        //call super
        super(props);
        //create a state
        this.state = {
            term: ''
        };
        //bind the method
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }
    //create a search method
    search() {
        //call the onSearch method
        this.props.onSearch(this.state.term);
    }
    //create a handleTermChange method
    handleTermChange(event) {
        //set the state
        this.setState({term: event.target.value});
    }
    //render the component
    render() {
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}

//export the component
export default SearchBar;
