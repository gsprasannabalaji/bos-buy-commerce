import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";

/**
 * WithLayout is a higher-order component that wraps another component with a Layout and ScrollToTop.
 * 
 * @param {React.Component} Component - The component to be wrapped with Layout.
 * @returns {JSX.Element} - Returns the JSX element for the wrapped component with Layout and ScrollToTop.
 */
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
