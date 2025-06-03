import { useEffect, useMemo, useRef, useState } from "react";
import { Typography } from "@mui/material";
import {
  flipPicture,
  getMedia,
  getVideoDeviceList,
  takePicture,
} from "./utils";
import { CameraFooter } from "./CameraFooter";
import { IFileUploader } from "../../../../types";
import { getFileMetaData } from "../../../../utils";

const UploadFromCamera = ({
  onChange,
  getLocalizedText,
}: IFileUploader.UploadOption) => {
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [clickedPicture, setClickedPicture] = useState<File | null>(null);
  const [isMirrored, setIsMirrored] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // handling accept picture
  const handleAcceptPicture = async () => {
    if (clickedPicture) {
      onChange([getFileMetaData(clickedPicture)]);
    }
    setClickedPicture(null);
  };

  // handling decline picture
  const handleDeclinePicture = async () => {
    setClickedPicture(null);
  };

  // handling flip picture
  const handleFlipPicture = async () => {
    if (canvasRef.current) {
      const pic = await flipPicture(canvasRef.current);
      if (pic) {
        setClickedPicture(pic);
        setIsMirrored(!isMirrored);
      }
    }
  };

  // handling click picture
  const handleClickPicture = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const audio = audioRef.current;

    if (canvas && video && audio) {
      await audio.play();

      setTimeout(async () => {
        const { width, height } = video.getBoundingClientRect();

        canvas.width = width;
        canvas.height = height;

        const pic = await takePicture(
          canvas,
          video,
          canvas.width,
          canvas.height
        );
        pic && setClickedPicture(pic);
      }, 1000);
    }
  };

  const playMediaStream = (deviceId?: string) => {
    if (streamRef.current) {
      stopMediaStream();
    }

    getMedia(deviceId).then((mediaStream) => {
      const video = videoRef.current;
      if (video && mediaStream) {
        streamRef.current = mediaStream;
        video.srcObject = mediaStream;
        video.onloadedmetadata = () => {
          setIsCameraLoading(false);
        };
      }
    });
  };

  const stopMediaStream = () => {
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.src = "";
    }

    if (streamRef.current) {
      console.log("stopping track");

      const track = streamRef.current.getVideoTracks()[0];
      track.stop();
      track.enabled = false;
      streamRef.current = null;
    }
  };

  const getDevices = async () => {
    const deviceList = (await getVideoDeviceList()) || [];

    setDevices(deviceList);
    setSelectedDeviceId(deviceList[0]?.deviceId || "");
  };

  const handleCameraChange = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
  };

  useMemo(() => {
    selectedDeviceId && playMediaStream(selectedDeviceId);
  }, [selectedDeviceId]);

  useEffect(() => {
    getDevices();
    setIsCameraLoading(true);

    return () => {
      stopMediaStream();
    };
  }, []);

  return (
    <Typography component={"div"} sx={{ textAlign: "center" }}>
      <Typography
        component={"div"}
        sx={{
          mx: "auto",
          position: "relative",
          background: "rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* video tag to render the video */}
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: !!clickedPicture ? "none" : "block",
          }}
          autoPlay
          playsInline
        ></video>

        {/* canvas tag to draw the image */}
        <canvas
          ref={canvasRef}
          style={{
            display: !!clickedPicture ? "block" : "none",
            margin: "auto",
            width: "100%",
            height: "auto",
          }}
        ></canvas>

        {/* showing loading until camera not loaded */}
        {isCameraLoading && (
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {getLocalizedText?.("loading") || "Loading..."}
          </Typography>
        )}

        {/* hidden audio tag for playing capture sound */}
        <audio
          ref={audioRef}
          style={{ display: "none" }}
          src={"/camera-click.wav"}
        ></audio>

        {/* Rendering camera options */}
        <CameraFooter
          devices={devices}
          selectedDeviceId={selectedDeviceId}
          onChangeSelectedDevice={handleCameraChange}
          isPictureClicked={!!clickedPicture}
          onClickPicture={handleClickPicture}
          onAccept={handleAcceptPicture}
          onDecline={handleDeclinePicture}
          onMirror={handleFlipPicture}
        />
      </Typography>
    </Typography>
  );
};

export default UploadFromCamera;
