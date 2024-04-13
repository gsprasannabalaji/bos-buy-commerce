import AdminLayout from "./AdminLayout";

const AdminWithLayout = (Component) => {
    return (
        <AdminLayout>
          <Component />
        </AdminLayout>
    );
  };
  
  export default AdminWithLayout;