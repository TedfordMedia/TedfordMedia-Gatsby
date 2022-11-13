import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
 
export default function Model(props) {
  
  const group = useRef() 
  const { nodes, materials, animations } = useGLTF('/surgeon2aGood2a.glb')
  const { actions } = useAnimations(animations, group)
 console.dir(actions)
  useEffect(() => { 
    //actions.headnodsarc.play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh castShadow 
          geometry={nodes.Ch16_Body1.geometry}
          material={nodes.Ch16_Body1.material}
          skeleton={nodes.Ch16_Body1.skeleton}
        />
        <skinnedMesh castShadow 
          geometry={nodes.Ch16_Cap.geometry}
          material={nodes.Ch16_Cap.material}
          skeleton={nodes.Ch16_Cap.skeleton}
        />
        <skinnedMesh castShadow 
          geometry={nodes.Ch16_Eyelashes.geometry}
          material={materials.Ch16_eyelashes}
          skeleton={nodes.Ch16_Eyelashes.skeleton}
        />
        <skinnedMesh castShadow 
          geometry={nodes.Ch16_Mask.geometry}
          material={nodes.Ch16_Mask.material}
          skeleton={nodes.Ch16_Mask.skeleton}
        />
        <skinnedMesh castShadow 
          geometry={nodes.Ch16_Pants.geometry}
          material={nodes.Ch16_Pants.material}
          skeleton={nodes.Ch16_Pants.skeleton}
        />
        <skinnedMesh castShadow 
          geometry={nodes.Ch16_Shirt.geometry}
          material={nodes.Ch16_Shirt.material}
          skeleton={nodes.Ch16_Shirt.skeleton}
        />
        <skinnedMesh castShadow 
          geometry={nodes.Ch16_Shoes.geometry}
          material={nodes.Ch16_Shoes.material}
          skeleton={nodes.Ch16_Shoes.skeleton}
        />
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <group position={[0.22, 0.2, -94.43]} rotation={[-1.64, -0.09, -0.06]}>
          <group position={[0, 10.68, -0.87]} rotation={[-0.02, 0.02, 0.04]}>
            <group position={[0, 12.5, 0]} rotation={[0.02, 0, 0.03]}>
              <group position={[0, 14.29, 0]} rotation={[0.02, 0, 0.03]}>
                <group position={[0, 16.08, 0]} rotation={[0.18, 0, 0.01]}>
                  <group position={[0, 7.7, 2.69]} rotation={[-0.13, 0.02, 0]} />
                </group>
                <group position={[6.42, 14.32, -0.14]} rotation={[1.73, -0.48, -1.27]}>
                  <group position={[0, 13.45, 0]} rotation={[0.99, 0.33, -0.02]}>
                    <group position={[0, 28.43, 0]} rotation={[0, 0, 0.03]}>
                      <group position={[0, 21.75, 0]} rotation={[0.16, -0.53, 0]}>
                        <group position={[-2.97, 3.03, 1.29]} rotation={[0.3, 0.23, 0.36]}>
                          <group position={[-0.6, 3.5, 0]} rotation={[-0.17, 0.18, -0.33]}>
                            <group position={[0.08, 3.37, 0]} rotation={[-0.25, -0.15, 0.14]} />
                          </group>
                        </group>
                        <group position={[-3.48, 9.6, 0.26]} rotation={[0.1, 0.01, 0.13]}>
                          <group position={[0.04, 3.41, 0]} rotation={[0.3, -0.01, -0.06]} scale={[1, 1, 1]}>
                            <group position={[-0.01, 3.15, 0]} rotation={[0.14, 0, -0.03]} />
                          </group>
                        </group>
                        <group position={[-1.07, 10.21, -0.3]} rotation={[0.24, 0.01, 0.05]}>
                          <group position={[0.02, 3.51, 0]} rotation={[0.3, -0.01, -0.05]}>
                            <group position={[-0.02, 3.27, 0]} rotation={[0.32, -0.01, -0.04]} />
                          </group>
                        </group>
                        <group position={[1.22, 10.37, -0.34]} rotation={[0.34, 0, 0.02]}>
                          <group position={[-0.01, 2.91, 0]} rotation={[0.36, -0.01, -0.05]}>
                            <group position={[0, 2.72, 0]} rotation={[0.31, -0.01, -0.05]} />
                          </group>
                        </group>
                        <group position={[3.33, 9.21, 0.03]} rotation={[0.44, 0, -0.01]}>
                          <group position={[0.01, 2.65, 0]} rotation={[0.3, -0.01, -0.05]}>
                            <group position={[-0.01, 2.3, 0]} rotation={[0.29, 0, -0.04]} />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
                <group position={[-6.42, 14.32, -0.14]} rotation={[1.73, 0.52, 1.31]}>
                  <group position={[0, 13.45, 0]} rotation={[0.85, -0.51, 0.03]} scale={[1, 1, 1]}>
                    <group position={[0, 28.42, 0]} rotation={[0.01, 0, -0.12]} scale={[1, 1, 1]}>
                      <group position={[0, 21.74, 0]} rotation={[0.15, 0.29, 0.07]}>
                        <group position={[3.01, 3.19, 1.38]} rotation={[0.31, -0.22, -0.39]}>
                          <group position={[0.66, 3.62, 0]} rotation={[-0.14, -0.16, 0.39]}>
                            <group position={[-0.11, 3.29, 0]} rotation={[-0.33, 0.15, -0.14]} />
                          </group>
                        </group>
                        <group position={[3.62, 9.94, 0.13]} rotation={[0.1, -0.01, -0.12]} scale={[1, 1, 1]}>
                          <group position={[-0.01, 3.3, 0]} rotation={[0.3, 0.01, 0.04]}>
                            <group position={[0.01, 3.01, 0]} rotation={[0.14, 0, 0.01]} />
                          </group>
                        </group>
                        <group position={[0.97, 10, -0.21]} rotation={[0.24, -0.01, -0.06]} scale={[1, 1, 1]}>
                          <group position={[-0.02, 3.54, 0]} rotation={[0.3, 0.01, 0.04]}>
                            <group position={[0.02, 3.37, 0]} rotation={[0.32, 0, 0.03]} scale={[1, 1, 1]} />
                          </group>
                        </group>
                        <group position={[-1.17, 10.15, -0.22]} rotation={[0.34, 0, -0.04]}>
                          <group position={[0, 2.91, 0]} rotation={[0.36, 0.01, 0.04]}>
                            <group position={[0, 2.78, 0]} rotation={[0.31, 0, 0.03]} scale={[1, 1, 1]} />
                          </group>
                        </group>
                        <group position={[-3.42, 9.06, 0.04]} rotation={[0.44, -0.01, 0]}>
                          <group position={[-0.01, 2.73, 0]} rotation={[0.3, 0.01, 0.04]}>
                            <group position={[0.01, 2.31, 0]} rotation={[0.29, 0, 0.03]} scale={[1, 1, 1]} />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
          <group position={[9.55, -5.93, -0.28]} rotation={[-0.15, 0.26, -2.96]} scale={[1, 1, 1]}>
            <group position={[0, 40.86, 0]} rotation={[-0.23, -0.04, 0.05]}>
              <group position={[0, 37.85, 0]} rotation={[1.08, -0.1, 0.05]}>
                <group position={[0, 17.38, 0]} rotation={[0.68, -0.1, 0.07]} scale={[1, 1, 1]} />
              </group>
            </group>
          </group>
          <group position={[-9.55, -5.93, -0.43]} rotation={[0.09, -0.17, -3.08]} scale={[1, 1, 1]}>
            <group position={[0, 40.81, 0]} rotation={[-0.06, 0.17, -0.03]} scale={[1, 1, 1]}>
              <group position={[0, 37.85, 0]} rotation={[1.15, 0.03, -0.1]} scale={[1, 1, 1]}>
                <group position={[0, 17.9, 0]} rotation={[0.71, 0.11, -0.08]} scale={[1, 1, 1]} />
              </group>
            </group>
          </group>
        </group>
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <group position={[0.22, 0.2, -94.43]} rotation={[-1.64, -0.09, -0.06]}>
          <group position={[0, 10.68, -0.87]} rotation={[-0.02, 0.02, 0.04]} scale={[1, 1, 1]}>
            <group position={[0, 12.5, 0]} rotation={[0.02, 0, 0.03]}>
              <group position={[0, 14.29, 0]} rotation={[0.02, 0, 0.03]}>
                <group position={[0, 16.08, 0]} rotation={[0.18, 0, 0.01]}>
                  <group position={[0, 7.7, 2.69]} rotation={[-0.13, 0.02, 0]} />
                </group>
                <group position={[6.42, 14.32, -0.14]} rotation={[1.73, -0.48, -1.27]} scale={[1, 1, 1]}>
                  <group position={[0, 13.45, 0]} rotation={[0.99, 0.33, -0.02]}>
                    <group position={[0, 28.43, 0]} rotation={[0, 0, 0.03]}>
                      <group position={[0, 21.75, 0]} rotation={[0.16, -0.53, 0]}>
                        <group position={[-2.97, 3.03, 1.29]} rotation={[0.3, 0.23, 0.36]}>
                          <group position={[-0.6, 3.5, 0]} rotation={[-0.17, 0.18, -0.33]}>
                            <group position={[0.08, 3.37, 0]} rotation={[-0.25, -0.15, 0.14]} />
                          </group>
                        </group>
                        <group position={[-3.48, 9.6, 0.26]} rotation={[0.1, 0.01, 0.13]} scale={[1, 1, 1]}>
                          <group position={[0.04, 3.41, 0]} rotation={[0.3, -0.01, -0.06]}>
                            <group position={[-0.01, 3.15, 0]} rotation={[0.14, 0, -0.03]} />
                          </group>
                        </group>
                        <group position={[-1.07, 10.21, -0.3]} rotation={[0.24, 0.01, 0.05]} scale={[1, 1, 1]}>
                          <group position={[0.02, 3.51, 0]} rotation={[0.3, -0.01, -0.05]} scale={[1, 1, 1]}>
                            <group position={[-0.02, 3.27, 0]} rotation={[0.32, -0.01, -0.04]} />
                          </group>
                        </group>
                        <group position={[1.22, 10.37, -0.34]} rotation={[0.34, 0, 0.02]}>
                          <group position={[-0.01, 2.91, 0]} rotation={[0.36, -0.01, -0.05]}>
                            <group position={[0, 2.72, 0]} rotation={[0.31, -0.01, -0.05]} />
                          </group>
                        </group>
                        <group position={[3.33, 9.21, 0.03]} rotation={[0.44, 0, -0.01]}>
                          <group position={[0.01, 2.65, 0]} rotation={[0.3, -0.01, -0.05]}>
                            <group position={[-0.01, 2.3, 0]} rotation={[0.29, 0, -0.04]} />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
                <group position={[-6.42, 14.32, -0.14]} rotation={[1.73, 0.52, 1.31]}>
                  <group position={[0, 13.45, 0]} rotation={[0.85, -0.51, 0.03]}>
                    <group position={[0, 28.42, 0]} rotation={[0.01, 0, -0.12]}>
                      <group position={[0, 21.74, 0]} rotation={[0.15, 0.29, 0.07]}>
                        <group position={[3.01, 3.19, 1.38]} rotation={[0.31, -0.22, -0.39]} scale={[1, 1, 1]}>
                          <group position={[0.66, 3.62, 0]} rotation={[-0.14, -0.16, 0.39]}>
                            <group position={[-0.11, 3.29, 0]} rotation={[-0.33, 0.15, -0.14]} />
                          </group>
                        </group>
                        <group position={[3.62, 9.94, 0.13]} rotation={[0.1, -0.01, -0.12]} scale={[1, 1, 1]}>
                          <group position={[-0.01, 3.3, 0]} rotation={[0.3, 0.01, 0.04]}>
                            <group position={[0.01, 3.01, 0]} rotation={[0.14, 0, 0.01]} />
                          </group>
                        </group>
                        <group position={[0.97, 10, -0.21]} rotation={[0.24, -0.01, -0.06]} scale={[1, 1, 1]}>
                          <group position={[-0.02, 3.54, 0]} rotation={[0.3, 0.01, 0.04]}>
                            <group position={[0.02, 3.37, 0]} rotation={[0.32, 0, 0.03]} />
                          </group>
                        </group>
                        <group position={[-1.17, 10.15, -0.22]} rotation={[0.34, 0, -0.04]}>
                          <group position={[0, 2.91, 0]} rotation={[0.36, 0.01, 0.04]} scale={[1, 1, 1]}>
                            <group position={[0, 2.78, 0]} rotation={[0.31, 0, 0.03]} />
                          </group>
                        </group>
                        <group position={[-3.42, 9.06, 0.04]} rotation={[0.44, -0.01, 0]}>
                          <group position={[-0.01, 2.73, 0]} rotation={[0.3, 0.01, 0.04]}>
                            <group position={[0.01, 2.31, 0]} rotation={[0.29, 0, 0.03]} />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
          <group position={[9.55, -5.93, -0.28]} rotation={[-0.15, 0.26, -2.96]} scale={[1, 1, 1]}>
            <group position={[0, 40.86, 0]} rotation={[-0.23, -0.04, 0.05]}>
              <group position={[0, 37.85, 0]} rotation={[1.08, -0.1, 0.05]}>
                <group position={[0, 17.38, 0]} rotation={[0.68, -0.1, 0.07]} />
              </group>
            </group>
          </group>
          <group position={[-9.55, -5.93, -0.43]} rotation={[0.09, -0.17, -3.08]} scale={[1, 1, 1]}>
            <group position={[0, 40.81, 0]} rotation={[-0.06, 0.17, -0.03]}>
              <group position={[0, 37.85, 0]} rotation={[1.15, 0.03, -0.1]}>
                <group position={[0, 17.9, 0]} rotation={[0.71, 0.11, -0.08]} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/surgeon2aGood2a.glb')
