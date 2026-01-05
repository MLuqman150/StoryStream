import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {children}
    </div>
  );
};


MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;