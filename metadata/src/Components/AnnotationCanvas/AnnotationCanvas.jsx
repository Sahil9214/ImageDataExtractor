// src/components/AnnotationCanvas.js
import React, { useRef, useEffect, useState } from "react";

const AnnotationCanvas = ({ image }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context = canvas.getContext("2d");
    setCtx(context);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    ctx.closePath();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      style={{ border: "1px solid black", width: "100%", height: "500px" }}
    />
  );
};

export default AnnotationCanvas;
