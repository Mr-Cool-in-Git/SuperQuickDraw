import { NextPage } from "next";
import { TrashIcon } from "@heroicons/react/24/solid";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";

const Draw: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<Boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
  }, []);

  const handleMouseDown: MouseEventHandler = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    // отправить запрос на бек
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    // отправить очистку на бек
    if (!canvasRef.current) return;
    contextRef.current?.clearRect(
      0,
      0,
      canvasRef.current?.width,
      canvasRef.current?.height
    );
  };

  const handleMouseMove: MouseEventHandler = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col w-[700px] h-12 items-center justify-center">
        <button className="self-end" onClick={clearCanvas}>
          <TrashIcon height={24} />
        </button>
      </div>
      <canvas
        className="border border-black"
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        height={700}
        width={700}
      ></canvas>
    </div>
  );
};

export default Draw;
