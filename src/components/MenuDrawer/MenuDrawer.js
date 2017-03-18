import React from 'react';
import { List, ListItem, Paper, Subheader } from 'material-ui';
import { ActionHome, AvSubscriptions, ActionHistory, ActionSearch, SocialPerson, ActionThumbUp, AvLibraryMusic } from 'material-ui/svg-icons';

const primaryMenu = [
  <ListItem key={ 0 } primaryText="Home" leftIcon={ <ActionHome /> } />,
  <ListItem key={ 1 } primaryText="Subscriptions"  leftIcon={ <AvSubscriptions /> } />,
  <ListItem key={ 2 } primaryText="History" leftIcon={ <ActionHistory /> } />,
  <ListItem key={ 3 } primaryText="Search" leftIcon={ <ActionSearch /> } />,
]

const secondaryMenu = [
  <ListItem key={ 3 } primaryText="Songs" leftIcon={ <AvLibraryMusic /> } />,
  <ListItem key={ 5 } primaryText="Channels" leftIcon={ <SocialPerson /> }/>,
  <ListItem key={ 6 } primaryText="Liked" leftIcon={ <ActionThumbUp /> }/>,
];

class MenuDrawer extends React.Component {

  constructor(props) {
    super(props);

  }

  static propTypes = {
  };

  render() {
    return (
      <Paper>
        <List>
          { primaryMenu }
          <Subheader>LIBRARY</Subheader>
          { secondaryMenu }
          <Subheader>SUBSCRIPTIONS</Subheader>
        </List>
      </Paper>
    );
  }
}

export default MenuDrawer;
