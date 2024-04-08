import Layout from "./Layout";

const WithLayout = (Component) => {
    return (
        <Layout>
          <Component />
        </Layout>
    );
  };
  
  export default WithLayout;