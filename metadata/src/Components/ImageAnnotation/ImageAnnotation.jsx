// ImageAnnotation.js

import React, { useState, useRef, useEffect } from "react";
import { fabric } from "fabric";
import "../../App.css";
function ImageAnnotation() {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      selection: false, // Disable default selection behavior
    });
    setCanvas(canvasInstance);
  }, []);

  const handleAddAnnotation = () => {
    if (!canvas) return;

    // Create a rectangle (annotation box)
    const rect = new fabric.Rect({
      left: 50, // Set the x-coordinate
      top: 50, // Set the y-coordinate
      width: 100, // Set the initial width
      height: 80, // Set the initial height
      fill: "transparent",
      stroke: "red",
      strokeWidth: 2,
      cornerColor: "blue", // Color of resize handles
      cornerSize: 10, // Size of resize handles
      lockScalingX: false, // Allow horizontal scaling
      lockScalingY: false, // Allow vertical scaling
      lockRotation: true, // Disable rotation
      hasControls: true, // Show resize handles
      hasBorders: true, // Show border around the box
      selectable: true, // Allow selection
      centeredScaling: true, // Maintain aspect ratio while resizing
    });

    // Make the rectangle draggable
    rect.set("lockMovementX", false);
    rect.set("lockMovementY", false);

    // Add the rectangle to the canvas
    canvas.add(rect);
  };

  return (
    <div className="canva">
      <canvas
        className="canvas-imageAnnotation"
        ref={canvasRef}
        style={{ border: "2px solid green" }}
      />
      <button onClick={handleAddAnnotation}>Add Annotation</button>
    </div>
  );
}

export default ImageAnnotation;
