import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './constants/routes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((_, i) => (
                    <Route key={i} {..._} />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
