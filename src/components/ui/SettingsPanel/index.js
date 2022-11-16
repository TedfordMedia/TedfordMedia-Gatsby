import React, { useState, useEffect } from "react";
import useSceneStore from "/src/useSceneStore";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import "./App.css";
import MyPng from "/static/images/squareA.png";

const BOTTOM_POINT = window.innerHeight - 30;

function SettingsPanel(props) {
  const posLogo = useSpring({ x: 0, y: 0 });
  const posHandle = useSpring({ y: 0 });

  const bindLogo = useDrag((params) => {
    posLogo.x.set(params.offset[0]);
    posLogo.y.set(params.offset[1]);
  });

  return (
    <>
      <animated.div
        id="SettingsOverlayDiv"
        {...bindLogo()}
        style={{
          x: posLogo.x,
          y: posLogo.y,
          touchAction: "none",
          zIndex: 200,
          width: "50%",
          height: "50%",
          position: "fixed",
          top: "25%",
          left: "25%",
        }}
        className="iconxsFloater"
      >
        <div id="setttitle">Settings</div>
        <div id="SettingsOverlayInterior">
          hello inpus here SLIDER
        </div>
      </animated.div>
    </>
  );
}
export default SettingsPanel;
