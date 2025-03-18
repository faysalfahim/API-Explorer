import Footer from "../common/footer";
import Navbar from "../common/navbar";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="m-auto">{children}</div>
      <Footer />
    </>
  );
};

export default AppLayout;
