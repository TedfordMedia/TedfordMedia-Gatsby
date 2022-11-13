import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import React, { Suspense, useEffect, useCallback, useState } from "react";
import { Canvas, useTexture, useFrame } from "@react-three/fiber";

import Layout from "../../components/layoutwidellh";

function MyPage(props) {
  return (
    <Layout>
      <div></div>
    </Layout>
  );
}

export default MyPage;
