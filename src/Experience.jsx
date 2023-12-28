import {
    OrbitControls,
    useGLTF,
    useTexture,
    Center,
    Sparkles,
    shaderMaterial,
    PresentationControls
} from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#c1dde6'),
        uColorEnd: new THREE.Color('#f8ffff')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience()
{
    const { nodes } = useGLTF('./model/portal.glb')

    const bakedTexture = useTexture('./model/baked.jpg')

    const portalMaterial = useRef()
    useFrame((state, delta) =>
    {
        portalMaterial.current.uTime += delta
    })

    return <>

        <color args={[ '#030202' ]} attach="background" />

        <OrbitControls
            makeDefault
            maxPolarAngle={ Math.PI * 0.48 }
        />

        <Center>
            <mesh
                geometry={ nodes.baked.geometry }
                rotation={ nodes.baked.rotation }
            >
                <meshBasicMaterial map={ bakedTexture } map-flipY={ false } />
            </mesh>

            <mesh
                geometry={ nodes.poleLightA.geometry }
                position={ nodes.poleLightA.position }
                rotation={ nodes.poleLightA.rotation }
            >
                <meshBasicMaterial color="#fffef8" />
            </mesh>
            <mesh
                geometry={ nodes.poleLightB.geometry }
                position={ nodes.poleLightB.position }
                rotation={ nodes.poleLightB.rotation }
            >
                <meshBasicMaterial color="#fffef8" />
            </mesh>

            <mesh
                geometry={ nodes.portalLight.geometry }
                position={ nodes.portalLight.position }
                rotation={ nodes.portalLight.rotation }
            >
                <portalMaterial ref={ portalMaterial } side={ THREE.DoubleSide }/>
            </mesh>

            <Sparkles
                size={ 6 }
                scale={[ 4, 1, 4 ]}
                position-y={ 1 }
                count={ 25 }
                opacity={ 0.3 }
            />
        </Center>

    </>
}