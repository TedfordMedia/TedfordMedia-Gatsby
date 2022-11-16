import React, { useState, useEffect } from "react";
import useSceneStore from "/src/useSceneStore";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Slider from "@mui/material/Slider";
import CloseIcon from "/static/images/close.png";
import styled from "styled-components";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";

import "./App.css";
const CompanyLogo = styled.img`
  width: 50%;
  max-width: 50px;
  margin-top: 15px;
  object-fit: contain;
`;
const CloseHolder = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
const DoMiddle = styled.div`
  cursor: pointer;
  font-size: 1.5em;
  text-align: center;
  width: 100%;
  vertical-align: bottom;
`;
function SettingsPanel(props) {
  const exMetal = useSceneStore((state) => state.exMetal);
  const settingPanelX = useSceneStore.getState().settingPanelX;
  const settingPanelY = useSceneStore.getState().settingPanelY;
  const showLidar = useSceneStore((state) => state.showLidar);
  const dirShadowBias = useSceneStore((state) => state.dirShadowBias);
  const ambientIntensity = useSceneStore((state) => state.ambientIntensity); 
  const posLogo = useSpring({ x: settingPanelX, y: settingPanelY });

  const bindLogo = useDrag((params) => {
    posLogo.x.set(params.offset[0]);
    posLogo.y.set(params.offset[1]);
    useSceneStore.setState({ settingPanelX: params.offset[0] });
    useSceneStore.setState({ settingPanelY: params.offset[1] });
  });

  return (
    <>
      <animated.div
        id="SettingsOverlayDiv"
        style={{
          left: posLogo.x,
          top: posLogo.y,
          zIndex: 200,
          width: "50%",
          height: "50%",
          position: "fixed",
        }}
        className="iconxsFloater"
      >
        <CloseHolder>
          {/* closed */}
          {/* <img src={CloseIcon}/> */}
        </CloseHolder>
        <div {...bindLogo()} id="setttitle">
          Settings
        </div>

        <div
          id="SettingsOverlayInterior"
          style={{
            zIndex: 999999,
            padding: "15px",
            touchAction: "auto",
            cursor: "auto",
            backgroundColor: "orange",
            pointerEvents: "auto",
          }}
        >
          <FormGroup>
            <DoMiddle>
              {" "}
              <FormControlLabel
                size="large"
                checked={showLidar}
                control={<Switch />}
                onChange={(e, val) => {
                  useSceneStore.setState({ showLidar: val });
                }}
                label={
                  <Box component="div" fontSize={15}>
                    Show
                  </Box>
                }
                labelPlacement="bottom"
              />{" "}
              <FormControlLabel
                size="large"
                checked={showLidar}
                control={<Switch />}
                onChange={(e, val) => {
                  useSceneStore.setState({ showLidar: val });
                }}
                label={
                  <Box component="div" fontSize={15}>
                    Show
                  </Box>
                }
                labelPlacement="bottom"
              />
            </DoMiddle>
          </FormGroup>
          <div style={{ backgroundColor: "pink" }}>
            <div>
              Shadow bias {dirShadowBias}
              <Slider
                value={dirShadowBias}
                decimals={1}
                step={0.000001}
                max={0.0001}
                aria-label="Default"
                valueLabelDisplay="auto"
                onChange={(e, val) =>
                  useSceneStore.setState({ dirShadowBias: val })
                }
              />
            </div>
            <div>
              Ambient Light {ambientIntensity}
              <Slider
                value={ambientIntensity}
                decimals={1}
                step={0.01}
                max={.7}
                aria-label="Default"
                valueLabelDisplay="auto"
                onChange={(e, val) =>
                  useSceneStore.setState({ ambientIntensity: val })
                }
              />
            </div>
          </div>
          <div>
            Glass exterior metalness {exMetal}
            <Slider
              value={exMetal}
              decimals={1}
              step={0.01}
              max={0.6}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, val) => useSceneStore.setState({ exMetal: val })}
            />
          </div>
        </div>
      </animated.div>
    </>
  );
}
export default SettingsPanel;
