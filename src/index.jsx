import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';

import Home from './scenes/Home';

import './styles/reset.scss';
import 'semantic-ui-css/semantic.min.css';
import './styles/common.scss';
import 'moment/locale/uk';

moment.locale('uk');

const target = document.getElementById('root');
render(<Home />, target);
