# Video to Streaming Format (NestJS)

This project is a simple API built with NestJS that takes a video file as input and converts it to a series of ts file format. It leverages FFmpeg for the video processing.

## Prerequisites

Before running this project, you need to have **FFmpeg** installed on your system.

**Installation Instructions:**

- **Linux (Debian/Ubuntu):**
  ```bash
  sudo apt update
  sudo apt install ffmpeg
  ```
- **Linux (Fedora/CentOS):**
  ```bash
  sudo dnf install ffmpeg
  ```
- **macOS:**
  You can install FFmpeg using Homebrew:
  ```bash
  brew install ffmpeg
  ```
- **Windows:**
  You can install FFmpeg using either of the following methods:
  1.  **Using Scoop (Recommended):** If you have Scoop package manager installed, you can install FFmpeg with:
      ```bash
      scoop install ffmpeg
      ```
  2.  **Manual Installation:**
      1.  Go to the official FFmpeg website: [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html).
      2.  Download the appropriate pre-built binaries for Windows.
      3.  Extract the downloaded archive to a directory of your choice (e.g., `C:\ffmpeg`).
      4.  Add the `bin` directory within the extracted folder (e.g., `C:\ffmpeg\bin`) to your system's PATH environment variable. This allows you to run the `ffmpeg` command from any terminal.

### Project Installation

Follow these steps to set up the project:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/khouwdevin/video-to-streaming-format.git
    cd video-to-streaming-format
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

```bash
npm run start # run in production mode
npm run start:dev # run in dev mode with watch
npm run start:debug # run in dev mode with watch and debug
```

## Run with docker

```bash
docker build -t video-to-streaming-format .
docker run -d -p 3000:3000 video-to-streaming-format
```

## Add video to public

Add your video to **public** folder and rename it to **video.mp4**

## Make a request

Make a get request on **http://localhost:3000** or if you want to test your server **http(s)://{YOUR_SERVER_IP_OR_DOMAIN}:3000**

# Result

| Machine             | RAM    | Time     |
| ------------------- | ------ | -------- |
| Netcup VPS 500 G11s | 900MB  | 95s |
| Intel 12700h        | 1660MB | 54s |
| Rapsberry pi 5 | 1126MB | 97s |
