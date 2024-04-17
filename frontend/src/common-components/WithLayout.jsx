import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";

const WithLayout = (Component) => {
  return (
    <>
      <Layout>
        <Component />
      </Layout>
      <ScrollToTop />
    </>
  );
};

export default WithLayout;
