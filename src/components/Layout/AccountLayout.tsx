import { PropsWithChildren } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

const AccountLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="container-fluid">
            <Header />
            <Sidebar />
            {children}
        </div>
    );
};

export default AccountLayout;
