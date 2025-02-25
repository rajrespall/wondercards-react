import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import background from "../assets/images/celebration.gif"; // Background image
import bgMusic from "../assets/audio/celebrate.mp3"; // Background music file
import congratulationImage from "../assets/images/congrats2.png"; // Path to your congratulation image

// Styled Components
const PixelBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  fontFamily: '"Press Start 2P", cursive',
  position: "relative",
}));

const ImageContainer = styled(Box)(() => ({
  position: "relative", 
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  top: "-10%",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "80%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
}));

const PixelButton = styled(Box)(({ theme }) => ({
  display: "inline-block",
  backgroundColor: "#2c2c54",
  color: "#fff",
  fontFamily: '"Press Start 2P", cursive',
  fontSize: "18px",
  padding: "20px 50px",
  border: "3px solid #00d9ff",
  borderRadius: "12px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
  cursor: "pointer",
  textAlign: "center",
  transition: "transform 0.3s, background-color 0.3s, box-shadow 0.3s",
  "&:hover": {
    backgroundColor: "#40407a",
    borderColor: "#00aaff",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const Congtnormal = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [bgVolume, setBgVolume] = useState(
    parseInt(localStorage.getItem("bgVolume"), 10) || 0
  );

  // Audio setup
  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio(bgMusic);
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = bgVolume / 100;

    const handleClick = () => {
      audio.play().catch((error) =>
        console.error("Background music playback failed:", error)
      );
      document.removeEventListener("click", handleClick);
    };

    document.addEventListener("click", handleClick);

    return () => {
      // Cleanup
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener("click", handleClick);
    };
  }, [bgVolume]);

  // Listen to volume changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const newVolume = parseInt(localStorage.getItem("bgVolume"), 10) || 0;
      setBgVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume / 100;
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Ensure the game was completed before showing congratulations
  useEffect(() => {
    const gameCompleted = localStorage.getItem("gameCompleted");
    if (!gameCompleted || gameCompleted !== "true") {
      navigate("/Play");
    }
  }, [navigate]);

  // Handlers for navigation buttons
  const handlePlayAgain = () => {
    navigate("/medium");
  };

  const handleExit = () => {
    localStorage.removeItem("gameCompleted");
    navigate("/play");
  };

  return (
    <PixelBox>
      <ImageContainer>
        <img
          src={congratulationImage}
          alt="Congratulations"
          style={{
            width: "100%",  // Adjust the width as you desire (e.g., 50%)
            height: "89%", // Maintain the aspect ratio
          }}
        />
      </ImageContainer>

      <ButtonContainer>
        <PixelButton onClick={handlePlayAgain}>Yes</PixelButton>
        <PixelButton onClick={handleExit}>No</PixelButton>
      </ButtonContainer>
    </PixelBox>
  );
};

export default Congtnormal;
