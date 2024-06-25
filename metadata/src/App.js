import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Box, Button, Spinner, useColorMode, Input } from "@chakra-ui/react";
import sav from "./sav.png";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

function App() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allMetadata, setAllMetadata] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const toast = useToast();

  const fetchMetadata = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://metadata-image-backend.onrender.com/metadata"
      );
      console.log("Fetching Data", response.data);
      setAllMetadata(response.data);
    } catch (err) {
      console.error("Error fetching metadata:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImage = async (e) => {
    const input = e.target.value;
    console.log(input);
    if (input.startsWith("http://") || input.startsWith("https://")) {
      // try {
      //   const response = await axios.get(input, { responseType: "blob" });

      //   const url = URL.createObjectURL(response.data);
      //   console.log("****url***", url);
      //   setImagePreview(url);
      //   console.log("^^^^^^^^^^^^^^^", response.data);
      //   setFile(response.data);
      // }
      try {
        const response = await fetch(input);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        // console.log(blob);
        // console.log(url);
        // Extract the file name from the URL
        const fileName = input.split("/").pop().split("?")[0];
        // console.log(fileName);
        const file = new File([blob], fileName, { type: blob.type });
        // console.log(file);
        setImagePreview(url);
        setFile(file);
      } catch (error) {
        console.error("Error fetching image from URL:", error);
        toast({
          position: "top",
          title: "Invalid URL.",
          description: "Could not fetch image from URL.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setMetadata(null);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClick = async () => {
    if (!file) {
      toast({
        title: "Please select a file",
        description: "No image added by you",

        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = {};
    console.log("file", file);

    formData["image"] = file;
    setLoading(true);
    console.log("formData", formData);

    try {
      const response = await axios.post(
        "https://metadata-image-backend.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMetadata(response.data);
      await fetchMetadata();
    } catch (err) {
      console.error("Error:", err.response.data);
      toast({
        title: "Error",
        description: `${err.response.data}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="App">
      <Navbar />
      <Box className="main">
        <h1
          className="heading"
          style={{ color: `${colorMode === "light" ? "black" : "white"}` }}
        >
          View MetaData
        </h1>
        <p
          style={{ color: `${colorMode === "light" ? "black" : "white"}` }}
          className="paragraph"
        >
          Get All Metadata Info Of Your Files
        </p>
      </Box>
      <Box className="main-container">
        <Box className="main-inside">
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Selected"
                className="image-save-file"
              />
            </>
          ) : (
            <img src={sav} alt="save-file" className="image-save" />
          )}
          <br />
        </Box>
        <Box
          style={{
            width: "20%",
            margin: "auto",
          }}
        >
          <input type="file" onChange={handleImage} />
          <br />
          <br />

          <span style={{ marginLeft: "50%", fontSize: "22px" }}>Or</span>
          <br />
          <br />

          <Input
            type="url"
            onChange={handleImage}
            placeholder="Enter image URL"
            style={{
              border: "1px solid black",
              borderRadius: "8px",
              padding: "5px",
            }}
          />
          <br />
        </Box>
        <br />
        <Box style={{ width: "20%", margin: "auto" }}>
          <Button onClick={handleClick} style={{ width: "100%" }}>
            Add
          </Button>
        </Box>
      </Box>
      <br />

      {loading ? (
        <Box className="loading-indicator">
          <Spinner size="xl" margin={"auto"} />
        </Box>
      ) : (
        <Box className="metadata-list">
          {allMetadata && (
            <Box className="metadata-list-grid">
              <Box>
                <h1>
                  <strong>File Name : </strong>
                  {allMetadata[allMetadata.length - 1].name}
                </h1>
                <p>
                  <strong>ImageHeight : </strong>
                  {allMetadata[allMetadata.length - 1].tags?.ImageHeight}
                </p>
                <p>
                  <strong>ImageWidth : </strong>
                  {allMetadata[allMetadata.length - 1].tags?.ImageWidth}
                </p>
              </Box>
              <Box>
                {allMetadata[allMetadata.length - 1].tags?.Model && (
                  <p>
                    <strong>Model : </strong>{" "}
                    {allMetadata[allMetadata.length - 1].tags?.Model}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.YResolution && (
                  <p>
                    <strong>YResolution : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.YResolution}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.XResolution && (
                  <p>
                    <strong> XResolution : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.XResolution}
                  </p>
                )}
              </Box>
              <Box>
                {allMetadata[allMetadata.length - 1].tags?.WhiteBalance && (
                  <p>
                    WhiteBalance :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.WhiteBalance}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags
                  ?.SubSecTimeDigitized && (
                  <p>
                    <strong>SubSecTimeDigitized : </strong>
                    {
                      allMetadata[allMetadata.length - 1].tags
                        ?.SubSecTimeDigitized
                    }
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.ExifToolVersion && (
                  <p>
                    <strong>ExifToolVersion :</strong>
                    {"  "}
                    {allMetadata[allMetadata.length - 1].tags?.ExifToolVersion}
                  </p>
                )}
              </Box>
              <Box>
                {allMetadata[allMetadata.length - 1].tags?.BitDepth && (
                  <p>
                    <strong>BitDepth : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.BitDepth}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.Interlace && (
                  <p>
                    <strong>Interlace : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.Interlace}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.Megapixels && (
                  <p>
                    <strong>Megapixels : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.Megapixels}
                  </p>
                )}
              </Box>
              <Box>
                {allMetadata[allMetadata.length - 1].tags?.ColorType && (
                  <p>
                    <strong>ColorType : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.ColorType}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.MIMEType && (
                  <p>
                    <strong>MIMEType : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.MIMEType}
                  </p>
                )}
                <p>
                  <strong>FileSize : </strong>
                  {allMetadata[allMetadata.length - 1].tags?.FileSize}
                </p>
              </Box>
              <Box>
                <p>
                  <strong>ImageSize : </strong>
                  {allMetadata[allMetadata.length - 1].tags?.ImageSize}
                </p>
                {allMetadata[allMetadata.length - 1].tags?.PixelsPerUnitX && (
                  <p>
                    <strong>PixelsPerUnitX : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.PixelsPerUnitX}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.PixelsPerUnitY && (
                  <p>
                    <strong>PixelsPerUnitY : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.PixelsPerUnitY}
                  </p>
                )}
              </Box>
              <Box>
                {allMetadata[allMetadata.length - 1].tags?.Compression && (
                  <p>
                    <strong>Compression : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.Compression}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1]?.lastModifiedDate && (
                  <p>
                    <strong>lastModifiedDate : </strong>
                    {formatDate(
                      allMetadata[allMetadata.length - 1].lastModifiedDate
                    )}
                  </p>
                )}

                {allMetadata[allMetadata.length - 1].tags?.ResolutionUnit && (
                  <p>
                    <strong>ResolutionUnit : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.ResolutionUnit}
                  </p>
                )}
              </Box>
              <Box>
                {allMetadata[allMetadata.length - 1].tags?.ProfileMMType && (
                  <p>
                    <strong>ProfileMMType : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.ProfileMMType}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.ProfileVersion && (
                  <p>
                    <strong>ProfileVersion : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.ProfileVersion}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.DeviceAttributes && (
                  <p>
                    <strong>DeviceAttributes : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.DeviceAttributes}
                  </p>
                )}
              </Box>
              <Box>
                {allMetadata[allMetadata.length - 1].tags?.ProfileCreator && (
                  <p>
                    <strong>ProfileCreator : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.ProfileCreator}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.ProfileCopyright && (
                  <p>
                    <strong>ProfileCopyright : </strong>
                    {allMetadata[allMetadata.length - 1].tags?.ProfileCopyright}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags
                  ?.ProfileDescription && (
                  <p>
                    <strong>ProfileDescription : </strong>
                    {
                      allMetadata[allMetadata.length - 1].tags
                        ?.ProfileDescription
                    }
                  </p>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}
      <Box>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,128L40,117.3C80,107,160,85,240,80C320,75,400,85,480,112C560,139,640,181,720,176C800,171,880,117,960,117.3C1040,117,1120,171,1200,176C1280,181,1360,139,1400,117.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </Box>
    </div>
  );
}

export default App;
