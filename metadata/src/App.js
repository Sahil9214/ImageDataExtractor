import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Box, Button, Spinner } from "@chakra-ui/react";
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
  const toast = useToast();

  const fetchMetadata = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://metadata-image-backend.onrender.com/metadata"
      );
      setAllMetadata(response.data);
    } catch (err) {
      console.error("Error fetching metadata:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setMetadata(null);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
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

    const formData = new FormData();
    formData.append("image", file);
    console.log("formData", formData);
    setLoading(true);
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
      console.error("Error:", err);
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
        <h1 className="heading">View MetaData</h1>
        <p className="paragraph">Get All Metadata Info Of Your Files</p>
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
        <Box style={{ width: "20%", margin: "auto" }}>
          <input type="file" onChange={handleImage} />
          <br />
          <br />
        </Box>
        <Box style={{ width: "20%", margin: "auto" }}>
          <Button onClick={handleClick} style={{ width: "100%" }}>
            Add
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box className="loading-indicator">
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box className="metadata-list">
          {allMetadata && (
            <Box>
              <h1>File Name : {allMetadata[allMetadata.length - 1].name}</h1>
              <Box>
                <p>
                  ImageHeight :{" "}
                  {allMetadata[allMetadata.length - 1].tags?.ImageHeight}
                </p>
                <p>
                  ImageWidth :{" "}
                  {allMetadata[allMetadata.length - 1].tags?.ImageWidth}
                </p>
                {allMetadata[allMetadata.length - 1].tags?.Model && (
                  <p>
                    Model : {allMetadata[allMetadata.length - 1].tags?.Model}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.YResolution && (
                  <p>
                    YResolution :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.YResolution}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.XResolution && (
                  <p>
                    XResolution :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.XResolution}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.WhiteBalance && (
                  <p>
                    WhiteBalance :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.WhiteBalance}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags
                  ?.SubSecTimeDigitized && (
                  <p>
                    SubSecTimeDigitized :{" "}
                    {
                      allMetadata[allMetadata.length - 1].tags
                        ?.SubSecTimeDigitized
                    }
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.ExifToolVersion && (
                  <p>
                    ExifToolVersion :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.ExifToolVersion}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.BitDepth && (
                  <p>
                    BitDepth :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.BitDepth}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.Interlace && (
                  <p>
                    Interlace :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.Interlace}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.Megapixels && (
                  <p>
                    Megapixels :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.Megapixels}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.ColorType && (
                  <p>
                    ColorType :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.ColorType}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.MIMEType && (
                  <p>
                    MIMEType :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.MIMEType}
                  </p>
                )}
                <p>
                  FileSize :{" "}
                  {allMetadata[allMetadata.length - 1].tags?.FileSize}
                </p>
                <p>
                  ImageSize :{" "}
                  {allMetadata[allMetadata.length - 1].tags?.ImageSize}
                </p>
                {allMetadata[allMetadata.length - 1].tags?.PixelsPerUnitX && (
                  <p>
                    PixelsPerUnitX :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.PixelsPerUnitX}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.PixelsPerUnitY && (
                  <p>
                    PixelsPerUnitY :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.PixelsPerUnitY}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.Compression && (
                  <p>
                    Compression :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.Compression}
                  </p>
                )}
                <p>
                  lastModifiedDate :{" "}
                  {formatDate(
                    allMetadata[allMetadata.length - 1].lastModifiedDate
                  )}
                </p>
                {allMetadata[allMetadata.length - 1].tags?.ResolutionUnit && (
                  <p>
                    ResolutionUnit :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.ResolutionUnit}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.ProfileMMType && (
                  <p>
                    ProfileMMType :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.ProfileMMType}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.ProfileVersion && (
                  <p>
                    ProfileVersion :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.ProfileVersion}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.DeviceAttributes && (
                  <p>
                    DeviceAttributes :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.DeviceAttributes}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.ProfileCreator && (
                  <p>
                    ProfileCreator :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.ProfileCreator}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags?.ProfileCopyright && (
                  <p>
                    ProfileCopyright :{" "}
                    {allMetadata[allMetadata.length - 1].tags?.ProfileCopyright}
                  </p>
                )}
                {allMetadata[allMetadata.length - 1].tags
                  ?.ProfileDescription && (
                  <p>
                    ProfileDescription :{" "}
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
    </div>
  );
}

export default App;
