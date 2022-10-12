import { RouteProps } from 'react-router-dom';
import { Dashboard, Login, Users, UserView } from '../pages';

const routes: RouteProps[] = [
    { path: '/', element: <Login /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/users', element: <Users /> },
    { path: '/users/:userId', element: <UserView /> }
];

export default routes;
