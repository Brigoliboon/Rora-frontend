import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const PanZoomCanvas = () => {
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
      // Options to constrain panning to the content
      limitToBounds={true}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>Reset</button>
          </div>
          <TransformComponent>
            {/* Your Canvas or large content here */}
            <div style={{ width: "2000px", height: "2000px", background: "lightgray" }}>
              Large Content Area
            </div>
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
};

export default PanZoomCanvas;
