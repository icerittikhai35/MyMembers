import { store } from './src/state/store'
import { Provider } from 'react-redux';
import Navigator from './src/navigation/navigator';


export default function App() {
  return (
    <Provider store={store}>
        <Navigator/>
    </Provider>
  );
}

