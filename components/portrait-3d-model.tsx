"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei"
import * as THREE from "three" // Import THREE directly, not just as a type
import { useTheme } from "next-themes"
import { PortraitInteractionHint } from "./portrait-interaction-hint"

// Podium component
function Podium({ color }: { color: string }) {
  return (
    <mesh position={[0, -4.5, 0]} receiveShadow>
      <cylinderGeometry args={[2, 2, 0.3, 32]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

// Auto-reset camera controls after timeout
function AutoResetControls() {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const [lastInteraction, setLastInteraction] = useState(Date.now())
  const defaultPosition = useRef(new THREE.Vector3(0, 0, 10))
  const defaultTarget = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    // Store initial camera position
    defaultPosition.current.copy(camera.position)

    const handleInteraction = () => {
      setLastInteraction(Date.now())
    }

    window.addEventListener("mousedown", handleInteraction)
    window.addEventListener("wheel", handleInteraction)

    return () => {
      window.removeEventListener("mousedown", handleInteraction)
      window.removeEventListener("wheel", handleInteraction)
    }
  }, [camera])

  useFrame(() => {
    if (!controlsRef.current) return

    // Check if 5 seconds have passed since last interaction
    const now = Date.now()
    if (now - lastInteraction > 5000) {
      // Reset camera position and controls
      controlsRef.current.reset()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.5}
      minDistance={5}
      maxDistance={15}
    />
  )
}

// Particles component that creates the dotted portrait
function PortraitParticles({ isDarkTheme }: { isDarkTheme: boolean }) {
  const particlesRef = useRef<THREE.Points>(null)
  const texture = useTexture("/images/portrait-full.jpeg")
  const [particles, setParticles] = useState<Float32Array | null>(null)
  const [colors, setColors] = useState<Float32Array | null>(null)

  // Generate particles based on image data
  useEffect(() => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    if (!context) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width
      canvas.height = img.height

      // Draw image to canvas
      context.drawImage(img, 0, 0)

      // Get image data
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Sample points from the image
      const particleCount = 20000
      const particlesArray = new Float32Array(particleCount * 3)
      const colorsArray = new Float32Array(particleCount * 3)

      let particleIndex = 0
      const sampleRate = 3 // Sample every 3 pixels

      for (let y = 0; y < canvas.height; y += sampleRate) {
        for (let x = 0; x < canvas.width; x += sampleRate) {
          const i = (y * canvas.width + x) * 4
          const alpha = data[i + 3]

          // Only create particles for non-transparent pixels
          if (alpha > 50 && particleIndex < particleCount) {
            // Get color
            const r = data[i] / 255
            const g = data[i + 1] / 255
            const b = data[i + 2] / 255

            // Calculate brightness
            const brightness = (r + g + b) / 3

            // Skip very dark (background) pixels
            if (brightness > 0.05) {
              // Normalize coordinates to center the model
              // Flip the x-axis to correct orientation
              const xPos = -(x / canvas.width - 0.5) * 5
              const yPos = -(y / canvas.height - 0.5) * 9
              const zPos = (Math.random() - 0.5) * 0.5 // Add slight depth variation

              particlesArray[particleIndex * 3] = xPos
              particlesArray[particleIndex * 3 + 1] = yPos
              particlesArray[particleIndex * 3 + 2] = zPos

              colorsArray[particleIndex * 3] = r
              colorsArray[particleIndex * 3 + 1] = g
              colorsArray[particleIndex * 3 + 2] = b

              particleIndex++
            }
          }
        }
      }

      setParticles(particlesArray)
      setColors(colorsArray)
    }

    img.src = "/images/portrait-full.jpeg"
  }, [])

  // Animate particles
  useFrame((state) => {
    if (particlesRef.current) {
      // Gentle floating animation
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  if (!particles || !colors) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        color={isDarkTheme ? "#ffffff" : "#333333"}
      />
    </points>
  )
}

// Main component
export function Portrait3DModel() {
  const { resolvedTheme } = useTheme()
  const isDarkTheme = resolvedTheme === "dark"

  return (
    <>
      <div className="fixed top-20 right-0 w-[400px] h-[600px] pointer-events-auto">
        <Canvas shadows dpr={[1, 2]}>
          <color attach="background" args={[isDarkTheme ? "#000000" : "#ffffff"]} transparent={true} />

          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />

          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <Podium color={isDarkTheme ? "#333333" : "#f0f0f0"} />
          <PortraitParticles isDarkTheme={isDarkTheme} />

          <AutoResetControls />
        </Canvas>
      </div>
      <PortraitInteractionHint />
    </>
  )
}
