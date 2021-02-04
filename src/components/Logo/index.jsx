import React from 'react';
import { Header } from 'semantic-ui-react';

import styles from './styles.module.scss';

export const Logo = () => (
  <Header as="h2" color="grey" className={styles.logoWrapper}>
    {/* <Image circular src="http://s1.iconbird.com/ico/2013/8/428/w256h2561377930292cattied.png" />
    {' '} */}
    e-APEPS
  </Header>
);

export default Logo;
