import React from "react";
import {
  DataSearch,
  SingleDropdownList,
  SingleDropdownRange
} from "@appbaseio/reactivesearch";
import axios from "axios";
import Results from "./Results";
import sample from "./sample";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

import Flex, { FlexChild } from "../styles/Flex";

String.prototype.hashCode = function() {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

class SearchFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      data: sample,
      searchText: "",
      dataLoaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = new FormData(event.target);
    console.log(params);
    //  var datar = { key: 'AIzaSyBTdqfxtLNaSAayXLeWif0NVKRItScdrp0',
    //  	q: params.get('q'),
    // cx: params.get('cx')}
    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // });
    var query = params.get("q");
    query = this.state.searchText;
    axios({
      method: "GET",
      url:
        "https://www.googleapis.com/customsearch/v1?key=AIzaSyBTdqfxtLNaSAayXLeWif0NVKRItScdrp0&cx=008518891864161743594:5lv7n5p4qru&q=" +
        query
    })
      // Saves the data to state. Only way to change the state is with setState
      .then(data => {
        this.setState({
          data: data.data,
          dataLoaded: true
        });
        // var event = new Event("search_submitted");
        // window.dispatchEvent(event);
        // console.log(this.state.data);
      })
      // logs an error
      .catch(err => {
        console.log(err);
      });
  }
  handleSearchText(event) {
    this.setState({ searchText: event.target.value });
    console.log(this.state.searchText);
  }
  render() {
    return (
      <div>
        <form
          style={{ width: "100%", margin: 10 }}
          title="Search Form"
          onSubmit={this.handleSubmit}
        >
          <Flex responsive style={{ padding: "1rem" }}>
            <FlexChild style={{ width: "80%" }}>
              <TextField
                id="q"
                style={{ margin: 8 }}
                placeholder="Search"
                fullWidth
                value={this.state.searchText}
                margin="normal"
                variant="outlined"
                onChange={this.handleSearchText}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FlexChild>
            <FlexChild>
              <Button
                type="submit"
                style={{ margin: 8, padding: 15, fill: "#000000" }}
              >
                <SearchIcon color="primary" />
              </Button>
              <input
                type="hidden"
                id="cx"
                name="cx"
                value="008518891864161743594:5lv7n5p4qru"
              />
            </FlexChild>
          </Flex>
        </form>

        <div style={{ padding: "1rem" }}>
          {this.state.data.items.map((d, idx) => {
            return (
              <Results
                key={d.link.hashCode()}
                id={d.link.hashCode()}
                title={d.title}
                data={d}
                user={this.props.user}
                store={this.props.store}
              />
            );
          }, this)}
        </div>
      </div>
    );
  }
}

export default SearchFilters;
