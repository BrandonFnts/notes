import { Outlet } from 'react-router-dom';
import { NavigationHandler } from './NavigationHandler';

export const Root = () => {
    return (
        <>
            <NavigationHandler />
            <Outlet />
        </>
    );
};