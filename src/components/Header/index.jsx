import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import styles from './styles.module.scss';

const Header = () => (
  <div className={styles.headerWrp}>
    <Grid textAlign="center">
      <Grid.Column width="1" />
      <Grid.Column width="2" verticalAlign="middle">
        <NavLink
          exact
          activeClassName="active"
          to="/analyze"
          style={{ color: 'blue', fontSize: 16, fontWeight: 'bold' }}
        >
          Analyze
        </NavLink>
      </Grid.Column>
      <Grid.Column width="2" verticalAlign="middle">
        <NavLink
          exact
          to="/all"
          activeClassName="active"
          style={{ color: 'blue', fontSize: 16, fontWeight: 'bold' }}
        >
          Texts
        </NavLink>
      </Grid.Column>
      {/* <Grid.Column verticalAlign="middle" width="2">*/}
      {/*  <NavLink exact to="/top" style={{ color: 'blue', fontSize: 16, fontWeight: 'bold' }}>*/}
      {/*    Top Words*/}
      {/*  </NavLink>*/}
      {/* </Grid.Column>*/}
      <Grid.Column width="11" />
    </Grid>
  </div>
);

export default Header;
