export async function getMedia(deviceId?: string) {
  console.log("getMedia");

  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId,
      },
      audio: false,
    });

    return stream;
  } catch (err) {
    console.log(err);
  }
}

export async function takePicture(
  canvas: HTMLCanvasElement,
  video: CanvasImageSource,
  width: number,
  height: number
) {
  const context = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;

  if (context) {
    canvas.width = width * ratio;
    canvas.height = height * ratio;

    // Scale the context to match the devicePixelRatio
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    context.clearRect(0, 0, width, height);
    context.drawImage(video, 0, 0, width, height);

    return getImageFromCanvas(canvas);
  }

  console.error("Canvas context is not available.");
  return false;
}

export async function flipPicture(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;

  if (context) {
    // Save the current image as a source
    const imageBitmap = await createImageBitmap(canvas);

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Save the context state before applying transformations
    context.save();

    // Apply horizontal flip transformation with devicePixelRatio compensation
    context.scale(-1, 1);
    context.translate(-canvas.width / ratio, 0);

    // Draw the flipped image
    context.drawImage(
      imageBitmap,
      0,
      0,
      canvas.width / ratio,
      canvas.height / ratio
    );

    // Restore the context state to reset transformations
    context.restore();

    return getImageFromCanvas(canvas);
  }

  console.error("Canvas context is not available.");
  return false;
}

async function getImageFromCanvas(canvas: HTMLCanvasElement) {
  const blob: any = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 1.0)
  );

  if (blob) {
    return new File([blob], "fileName.jpg", { type: "image/jpeg" });
  }

  return false;
}

export async function getVideoDeviceList() {
  try {
    console.log("getVideoDeviceList");

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });

    if (!navigator.mediaDevices?.enumerateDevices || !stream) {
      console.log("enumerateDevices() not supported.");
    } else {
      const devices = await navigator.mediaDevices.enumerateDevices();

      return devices.filter((device) => device.kind === "videoinput");
    }
  } catch (error) {
    console.log(error);
  }
}

export function stopStreamedVideo(): void {
  const videoElem = document.querySelector("video");

  if (!videoElem) return;

  const stream = videoElem.srcObject as MediaStream | null;

  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  }

  videoElem.srcObject = null;

  stopAllMediaStreams();
}

export function stopAllMediaStreams() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Get all active media streams
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((mediaStream) => {
        mediaStream.getTracks().forEach((track) => track.stop()); // Stop all tracks globally
      })
      .catch((err) => console.error("Error stopping media streams: ", err));
  }
}
