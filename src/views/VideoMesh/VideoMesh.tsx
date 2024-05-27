import { useRef } from "react";
import { VideoTexture } from "three";

const VideoMesh = ({ videoUrl }) => {
  const mesh = useRef();
  const video = document.createElement('video');

  video.src = videoUrl;
  video.crossOrigin = "anonymous";
  video.loop = true;
  video.muted = true;
  video.play();

  const texture = new VideoTexture(video);
  texture.minFilter = <THREE></THREE>.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;

  useFrame(() => {
    // 更新纹理
    texture.needsUpdate = true;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[5, 3]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};