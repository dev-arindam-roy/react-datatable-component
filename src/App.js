import './App.css';
import { ToastContainer } from "react-toastify";
import DataTableComponent from './components/DataTableComponent'
function App() {
  return (
    <div className="App">
      <DataTableComponent />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="onex-toast"
      />
    </div>
  );
}

export default App;
