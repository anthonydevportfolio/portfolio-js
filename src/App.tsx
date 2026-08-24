import { Provider } from 'react-redux';
import './App.css';
import { Background } from './components/background/background';
import { Greeting } from './components/landing/greeting';
import { LandingThemeControl } from './components/landing/themeControl';
import { View } from './components/view/view';
import { store } from './redux/store';
import { ThemeProvider } from './theme';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Background>
                    <LandingThemeControl />
                    <Greeting />
                </Background>
                <View />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
