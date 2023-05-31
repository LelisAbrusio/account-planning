/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { enableScreens } from 'react-native-screens';
//import MainApp from './src/MainApp';
import App from './src/App';
import {name as appName} from './app.json';

enableScreens();
AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerComponent(appName, () => MainApp);