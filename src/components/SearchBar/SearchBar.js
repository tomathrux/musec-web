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
    }
  }

  closeClick = () => {
    this.setState({ ...this.state, isSearchOpen : false });
  }

  getSearchSuggestions = (input) => {
    searchSuggestions(input).then((suggestions) => {
      this.setState({...this.state, searchSuggestions: suggestions});
    })
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
              fullWidth
              autoFocus={ true }
              hintText="Search"
              inputStyle={{ color : 'White' }}
              textFieldStyle={{ color : 'White' }}
              hintStyle={{ color : 'White' }}
              underlineFocusStyle={{ borderColor : 'White' }}
              onUpdateInput={ this.getSearchSuggestions }
              onNewRequest={ this.props.search }
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
