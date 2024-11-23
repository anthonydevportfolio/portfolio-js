import { Provider } from 'react-redux';
import './App.css';
import { Background } from './components/background/background';
import { Greeting } from './components/landing/greeting';
import { View } from './components/view/view';
import { store } from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <Background>
                <Greeting />
                <View />
            </Background>
        </Provider>
    );
}

export default App;
