import React, { useState, useEffect } from "react";
import useSceneStore from "/src/useSceneStore";
import SettingsPng from "/static/images/icons/settings.png";
import SettingsPanel from "@components/ui/SettingsPanel";
import "./scicons.css";
import styled from "styled-components";
const backgroundNotSelected = "#4e7ea4";
const backgroundSelected = "#023258";

export const IconDiv = styled.div`
  text-align: center;
  align-items: center;
  npmalign-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  pointer-events: all;
  position: relative;
  z-index: 100;
  background: ${(props) =>
    !props.selected ? backgroundNotSelected : backgroundSelected};
  border-radius: 20%;
  height: 47px;
  margin-top: 10px;
  width: 47px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 101;
`;
const TheIconDiv = (props) => {
  const clickSet = (e) => {
    useSceneStore.setState({ settingsOpen: !props.selected });
  };

  return (
    <IconDiv id="iconzz" onClick={clickSet} selected={props.selected}>
      <img className="myicon" height="35px" src={SettingsPng} alt="Settings" />
    </IconDiv>
  );
};

function SettingsIcon(props) {
  const settingsOpen = useSceneStore((state) => state.settingsOpen);

  return (
    <>
      {settingsOpen ? (
        <SettingsPanel />
      ) : (
        <div
          id="zControlOverlay"
          style={{ width: "100%" }}
          className="iconxsFloater"
        >
          <div
            className="flexboxholder"
            style={{
              justifyContent: "left",
              paddingTop: "10px",
            }}
          >
            <>
              <div className="flexboxx-item  fader flexboxx-1">
                <TheIconDiv selected={settingsOpen} />
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
}
export default SettingsIcon;
