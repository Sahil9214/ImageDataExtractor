
# Image Annotation and Metadata Extraction Web Application

## Overview

This web application allows users to upload images, annotate them with bounding boxes and labels, and extract relevant metadata from the images. It is designed to assist data scientists and machine learning researchers in creating labeled datasets with metadata for training object detection, image classification, or other computer vision models.

## Key Features

### 1. Image Upload
- Users can upload images from their local machine or provide a URL to fetch the image.
- Image upload functionality is implemented using `Multer` for Node.js.

### 2. Image Annotation
- Annotation functionality is provided using LabelImg.
- Install LabelImg using:
  ```sh
  pip3 install labelImg
  ```
  - Ensure you are using Anaconda command prompt:
  ```sh
  conda install -c conda-forge labelimg
  labelimg
  ```
- Users can draw bounding boxes around objects in the image using an interactive canvas.
- Users can enter labels or classifications for the annotated objects.
- Annotations can be deleted or modified.

### 3. Metadata Extraction
- Extract relevant metadata fields from uploaded images using `exifr` (JavaScript).
  - Extracted metadata includes:
    - Image dimensions (width, height)
    - File size
    - Camera make and model
    - Focal length
    - GPS coordinates (if available)
    - Date and time of capture
    - Orientation

### 4. Annotation and Metadata Management
- Store annotations and extracted metadata in a MongoDB database.
- Implement an interface to view and manage all annotated images, their annotations, and associated metadata.
- Provide options to filter, search, and sort annotated images based on various criteria (e.g., label, date, user, metadata fields).

### 5. Export Annotations and Metadata
- Allow users to export the annotated data and associated metadata in a structured format (e.g., JSON, CSV) suitable for use in machine learning model training.

## Workflow

1. The user uploads an image to the web application.
2. The front-end extracts relevant metadata from the uploaded image using `exifr`.
3. The user annotates the image by drawing bounding boxes and providing labels.
4. The front-end sends the image data, annotations, and extracted metadata to the back-end server.
5. The back-end server saves the image data, annotations, and metadata in the MongoDB database.
6. The user can view, manage, and export the annotated images along with their annotations and associated metadata.

## Installation

### Prerequisites

- Node.js
- MongoDB
- Anaconda (for LabelImg)

### Backend Setup

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGODB_URI=<your_mongodb_uri>
   PORT=5000
   ```

4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the `client` directory:
   ```sh
   cd client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the frontend development server:
   ```sh
   npm start
   ```

### LabelImg Setup

1. Install LabelImg:
   ```sh
   pip3 install labelImg
   ```

2. If using Anaconda, install LabelImg via conda-forge:
   ```sh
   conda install -c conda-forge labelimg
   ```

3. Run LabelImg:
   ```sh
   labelimg
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Upload an image using the upload button.
3. Annotate the image by drawing bounding boxes and providing labels.
4. View and manage annotated images and their metadata in the management interface.
5. Export annotations and metadata as needed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
```

This README provides a clear and structured guide for setting up and using your web application, including specific instructions for installing and running LabelImg for annotation.
