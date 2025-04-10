/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common'
import { exec } from 'child_process'
import { existsSync, rmSync } from 'fs'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  async processVideo(): Promise<void> {
    try {
      const before = Date.now()

      this.logger.log('Processing video')
      await this.downscaleVideo()

      const after = Date.now()
      const deltaTime = (after - before) / 1000

      this.logger.log(`Process time ${deltaTime}s`)
    } catch (e) {
      this.logger.error(e.message)
      const filePath = __dirname + '/../../public/video.mp4'

      rmSync(filePath + 'v480p', { recursive: true, force: true })
      rmSync(filePath + 'v720p', { recursive: true, force: true })
      rmSync(filePath + 'v1080p', { recursive: true, force: true })

      if (existsSync(filePath + 'master.m3u8')) rmSync(filePath + 'master.m3u8')

      if (existsSync(filePath)) rmSync(filePath)
    }
  }

  async downscaleVideo() {
    return new Promise<void>((resolve, reject) => {
      const filePath = __dirname + '/../public/video.mp4'
      const ffmpegConsole = exec

      this.logger.log('Starting ffmpeg process')
      ffmpegConsole(
        `ffmpeg -hide_banner -re -i ${filePath} -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -c:a aac -ar 48000 -filter:v:0 scale=w=850:h=480:force_original_aspect_ratio=decrease -maxrate:v:0 1400k -bufsize:v:0 2100k -b:a:0 128k -filter:v:1 scale=w=1280:h=720:force_original_aspect_ratio=decrease -maxrate:v:1 2996k -bufsize:v:1 4200k -b:a:1 128k -filter:v:2 scale=w=1920:h=1080:force_original_aspect_ratio=decrease -maxrate:v:2 5350k -bufsize:v:2 7500k -b:a:2 192k -var_stream_map "v:0,a:0,name:480p v:1,a:1,name:720p v:2,a:2,name:1080p" -master_pl_name master.m3u8 -f hls -hls_time 10 -hls_playlist_type vod -hls_list_size 0 -hls_segment_filename "${filePath}v%v/segment%d.ts" ${filePath}v%v/index.m3u8`,
        (err, _, __) => {
          if (err) {
            reject(new Error(err.message))

            return
          }

          resolve()
        },
      )
    })
  }
}
