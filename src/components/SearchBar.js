import React from "react";
import Flex, {FlexChild} from '../styles/Flex';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        searchText: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSearch(this.state.searchText);
  }
  
  handleSearchText(event) {
    this.setState({ searchText: event.target.value });
  }

  render() {
    return (
        <form
          style={{ maxWidth:'900px', width: "70%", margin: 10, padding:'0 10% 0 20%'}}
          title="Search Form"
          onSubmit={this.handleSubmit}
        >
          <Flex responsive style={{ padding: "1rem" } /* top right bottom left, hack to center the text field*/}> 
            <FlexChild style={{ width: "100%" }}>
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
        </form>)
  }
}
export default SearchBar;