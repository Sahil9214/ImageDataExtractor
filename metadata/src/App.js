import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Box, Image, Text, Divider, Input } from "@chakra-ui/react";
import sav from "./sav.png";
function App() {
  return (
    <div className="App">
      <Navbar />

      <Box className="main">
        <h1 className="heading">View MetaData</h1>
        <p className="paragraph">Get All Metadata Info Of Your Files</p>
      </Box>
      <Box className="main-container">
        <Box className="main-inside">
          <img src={sav} alt="save-file" className="image-save" />
          <br />
        </Box>
        <Box style={{ width: "20%", margin: "auto" }}>
          <input type="file" />
        </Box>
      </Box>
    </div>
  );
}

export default App;
