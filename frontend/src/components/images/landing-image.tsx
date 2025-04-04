import React from "react";
export default function LandingImage() {
  return (
    <div>
      <video width="1000" height="1000" autoPlay controls>
        <source src={'/images/3d-galaxy.mp4'} type="video/mp4" />
      </video>
    </div>
  );
}
