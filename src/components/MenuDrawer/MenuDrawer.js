import React from 'react';
import { AppBar, Drawer, List, ListItem, Subheader } from 'material-ui';
import { ActionHome, AvAlbum, SocialPerson, ToggleStar, AvLibraryMusic } from 'material-ui/svg-icons';

const primaryMenu = [
  <ListItem key={ 0 } primaryText="Songs" leftIcon={ <AvLibraryMusic /> } />,
  <ListItem key={ 1 }primaryText="Albums" leftIcon={ <AvAlbum/> } />,
  <ListItem key={ 2 }primaryText="Artists" leftIcon={ <SocialPerson /> }/>,
  <ListItem key={ 3 }primaryText="Starred" leftIcon={ <ToggleStar /> } />,
];

const playlists = [
  <ListItem primaryText="Supa songz" secondaryText="Kapil chodehang"/>,
  <ListItem primaryText="Grim" secondaryText="Kapil chodehang"/>,
  <ListItem primaryText="Wow lol" secondaryText="Kapil chodehang"/>,
  <ListItem primaryText="fels bod mun" secondaryText="Kapil chodehang"/>,
  <ListItem primaryText="nope nope nope" secondaryText="Kapil chodehang"/>,
  <ListItem primaryText="perhaps not" secondaryText="Kapil chodehang"/>,
]

class MenuDrawer extends React.Component {

  constructor(props) {
    super(props);

  }

  static propTypes = {
    isOpen : React.PropTypes.bool,
    onRequestChange : React.PropTypes.func,
  };

  render() {
    return (
      <Drawer
        open={ this.props.isOpen }
        docked={ false }
        onRequestChange={ this.props.onRequestChange }
        children={
          <div>
            <AppBar
              onLeftIconButtonTouchTap={ this.props.onRequestChange } />
            <List>
              <ListItem primaryText="Home" leftIcon={ <ActionHome /> } />
              <Subheader>Music</Subheader>
              { primaryMenu }
              <Subheader>Playlists</Subheader>
              { playlists }
            </List>
          </div>
        }
        />
    );
  }
}

export default MenuDrawer;
