import "./Admin.css";
import Footer from "./component/Footer";
import MainContent from "./component/admin/MainContent";
import Sidebar from "./component/admin/Sidebar";
import Table from "./component/admin/Table";


function Admin() {
    return (<>
    <>
  {/* Hello world */}
  <div id="wrapper">
    <Sidebar />

    {/*<MainContent />*/}

    <Table />
  </div>
  <Footer />
</>

    </>)
}

export default Admin;