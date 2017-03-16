/**
 * Created by t on 14/03/17.
 */
import React, { PropTypes }from 'react';
import { AutoComplete, IconButton } from 'material-ui';
import { ActionSearch, NavigationClose } from 'material-ui/svg-icons';
import { searchSuggestions } from '../../requests'

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSearchOpen : false,
      searchSuggestions : [],
    }
  }

  static propTypes = {
    search : PropTypes.func.isRequired,
  };

  searchClick = () => {

    let {isSearchOpen} = this.props;

    if (isSearchOpen) {
      this.props.search();
    } else {
      this.setState({ ...this.state, isSearchOpen : true });
      this.refs.searchbox.focus();
    }
  }

  closeClick = () => {
    this.setState({ ...this.state, isSearchOpen : false });
  }

  getSearchSuggestions = (input) => {
    if (input.length > 2) {
      searchSuggestions(input).then((suggestions) => {
        this.setState({...this.state, searchSuggestions: suggestions });
      })
    } else {
      this.setState({ ...this.state, searchSuggestions: [] });
    }
  }

  render() {

    return (
      <div
        style={{ display : 'flex' }}>
        <IconButton
          name="search"
          style={{ top: 12 }}
          iconStyle={{ color : 'White' }}
          onClick={ this.searchClick }>
          <ActionSearch />
        </IconButton>
        <div
          style={{
            WebkitTransition : 'width 0.2s',
            width : this.state.isSearchOpen ? 360 : 0,
            overflowX : 'hidden'
          }}>
          <div
            style={{
              width : 360,
            }}>
            <AutoComplete
              ref="searchbox"
              fullWidth
              autoFocus={ true }
              hintText="Search"
              inputStyle={{ color : 'White' }}
              textFieldStyle={{ color : 'White' }}
              hintStyle={{ color : 'rgb(0, 151, 167)  ' }}
              underlineFocusStyle={{ borderColor : 'rgb(0, 151, 167)' }}
              onUpdateInput={ this.getSearchSuggestions }
              onNewRequest={ this.props.search }
              filter={ () => (true) }
              dataSource={ this.state.searchSuggestions }/>
          </div>
        </div>
        <IconButton
          name="closeSearch"
          style={{ top: 12, display : this.state.isSearchOpen ? 'inline-block' : 'none' }}
          iconStyle={{ color : 'White' }}
          onClick={ this.closeClick }>
          <NavigationClose />
        </IconButton>
      </div>
    );
  }

  }

export default SearchBar;
