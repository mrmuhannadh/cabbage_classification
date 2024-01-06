import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar/navbar";
import MyForm from "./Components/Form/Form";

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-5">
            <MyForm/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
