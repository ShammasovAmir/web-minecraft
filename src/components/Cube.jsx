import React, { useState } from "react"
import { useBox } from "@react-three/cannon"
import * as textures from "../images/textures"
import { useStore } from "../hooks/useStore"

const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false)

  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }))

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ])

  const activeTexture = textures[texture + "Texture"]

  return (
    <mesh
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        const clickedFace = Math.floor(e.faceIndex / 2)
        const { x, y, z } = ref.current.position

        if (e.shiftKey) {
          console.log(e)
          removeCube(x, y, z)
          return
        } else {
          switch (clickedFace) {
            case 0:
              addCube(x + 1, y, z)
              break
            case 1:
              addCube(x - 1, y, z)
              break
            case 2:
              addCube(x, y + 1, z)
              break
            case 3:
              addCube(x, y - 1, z)
              break
            case 4:
              addCube(x, y, z + 1)
              break
            case 5:
              addCube(x, y, z - 1)
              break
          }
          return
        }

        console.log(clickedFace)
      }}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "grey" : "white"}
        map={activeTexture}
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
        attach="material"
      />
    </mesh>
  )
}

export default Cube
