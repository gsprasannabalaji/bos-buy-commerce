
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children }) => {

    return (
        <>
        <AdminHeader />
        <div>
            {children}
        </div>
        </>
    )
}

export default AdminLayout;