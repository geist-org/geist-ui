import React, { useRef, useState, useEffect, useImperativeHandle } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import PlayIcon from '@zeit-ui/react-icons/playFill'
import PauseIcon from '@zeit-ui/react-icons/pauseFill'
import FullScreenIcon from '@zeit-ui/react-icons/fullScreen'
import CloseFullScreenIcon from '@zeit-ui/react-icons/fullScreenClose'
import {
  openFullscreen,
  onFullscreenChange,
  closeFullscreen,
  formatTime,
  isFullscreenEnabled,
} from './utils'

interface Props {
  src: string
  width: number
  height: number
  fullscreenable?: boolean
  className?: string
}

const defaultProps = {
  src: '',
  width: 600,
  height: 300,
  fullscreenable: true,
  className: '',
}

type NativeAttrs = Omit<React.VideoHTMLAttributes<any>, keyof Props>
export type VideoProps = Props & typeof defaultProps & NativeAttrs

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
  (
    { src, width, height, fullscreenable, className, ...props },
    ref: React.Ref<HTMLVideoElement | null>,
  ) => {
    const theme = useTheme()
    const containerRef = useRef<HTMLDivElement>(null)
    const dragHandlerRef = useRef<HTMLDivElement>(null)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setPlaying] = useState(false)
    const [isFullscreen, setFullscreen] = useState(false)
    const [mouseTimer, setMouseTimer] = useState(0)
    const [controlsVisible, setControlsVisibility] = useState(false)
    const [isDragging, setDragging] = useState(false)
    const handlePosition = useRef(0)
    const videoRef = useRef<HTMLVideoElement>(null)
    useImperativeHandle(ref, () => videoRef.current)

    const handleFullScreen = () => {
      onFullscreenChange(setFullscreen)
      if (isFullscreen) {
        closeFullscreen()
      } else {
        if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
          openFullscreen(videoRef.current as HTMLElement)
        } else {
          openFullscreen(containerRef.current as HTMLElement)
        }
      }
    }
    const handleMouseMove = () => {
      if (mouseTimer) clearTimeout(mouseTimer)
      setControlsVisibility(true)
      const timeoutId: number = window.setTimeout(() => setControlsVisibility(false), 3000)
      setMouseTimer(timeoutId)
    }
    const handleProgress = () => {
      const time = videoRef?.current?.currentTime || 0
      if (!isDragging) {
        setCurrentTime(time)
        handlePosition.current = (time / duration) * 100
      }
    }
    const play = () => videoRef?.current?.play()
    const pause = () => videoRef?.current?.pause()
    const toggle = () => {
      if (isPlaying) pause()
      else play()
    }
    const updateHandlePosition = (e: any) => {
      const rect = dragHandlerRef?.current?.getBoundingClientRect()
      const pageX = e.pageX || e.touches[0].pageX
      const position = ((pageX - (rect?.left || 0)) / (rect?.width || 0)) * 100
      handlePosition.current = parseInt(`${Math.min(Math.max(position, 0), 100)}`) || 0
    }
    const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
      setDragging(true)
      updateHandlePosition(e)
    }
    useEffect(() => {
      const onDarg = (e: MouseEvent) => {
        if (isDragging) updateHandlePosition(e)
      }
      const endDrag = () => {
        if (!isDragging) return
        setDragging(false)
        if (videoRef?.current) {
          videoRef.current.currentTime = (handlePosition.current * duration) / 100
          setCurrentTime(videoRef.current.currentTime)
        }
      }

      window.addEventListener('mousemove', onDarg)
      window.addEventListener('touchmove', onDarg)
      window.addEventListener('mouseup', endDrag)
      window.addEventListener('touchend', endDrag)

      return () => {
        window.removeEventListener('mousemove', onDarg)
        window.removeEventListener('touchmove', onDarg)
        window.removeEventListener('mouseup', endDrag)
        window.removeEventListener('touchend', endDrag)
      }
    }, [isDragging])

    return (
      <span className={className}>
        <figure>
          <main>
            <div
              className={`container ${controlsVisible ? 'controls-visible' : ''}`}
              ref={containerRef}
              onMouseMove={handleMouseMove}>
              <video
                onClick={toggle}
                ref={videoRef}
                onLoadedMetadata={() => setDuration(videoRef?.current?.duration || 0)}
                onTimeUpdate={handleProgress}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                src={src}
                playsInline
                {...props}
              />
              <div className="video-controls">
                {isPlaying ? (
                  <button onClick={pause} className="play-button">
                    <PauseIcon size={14} />
                  </button>
                ) : (
                  <button onClick={play} className="play-button">
                    <PlayIcon size={14} />
                  </button>
                )}
                <div className="time current-time">{formatTime(currentTime)}</div>
                <div className="progress">
                  <div
                    className="drag-handler"
                    ref={dragHandlerRef}
                    onMouseDown={startDrag}
                    onTouchStart={startDrag}
                  />
                  <progress
                    value={isDragging ? handlePosition.current / 100 : currentTime / duration || 0}
                    max={1}
                  />
                  <div className="handle" style={{ left: handlePosition.current + '%' }} />
                </div>
                <div className="time total-time">{formatTime(duration)}</div>
                {fullscreenable && isFullscreenEnabled() && (
                  <button onClick={handleFullScreen} className="full-screen-button">
                    {isFullscreen ? (
                      <CloseFullScreenIcon size={14} />
                    ) : (
                      <FullScreenIcon size={14} />
                    )}
                  </button>
                )}
              </div>
            </div>
          </main>
        </figure>

        <style jsx>{`
          figure {
            display: block;
            text-align: center;
            margin: 40px 0;
          }
          main {
            margin: 0 auto;
            max-width: 100%;
            width: ${width}px;
          }
          video {
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            cursor: pointer;
          }
          video:-webkit-full-screen {
            width: 100%;
            height: 100%;
            max-height: 100%;
            z-index: 99999999;
          }
          .container {
            display: flex;
            justify-content: center;
            position: relative;
            padding-bottom: ${(height / width) * 100}%;
          }
          p {
            color: var(--accents-5);
            font-size: 14px;
            margin: 0;
            text-align: center;
          }
          .video-controls {
            position: absolute;
            bottom: 5%;
            background: ${theme.palette.background};
            height: 40px;
            display: flex;
            align-items: center;
            width: 85%;
            padding: 0 8px;
            opacity: 0;
            transform: translate3d(0px, 6px, 0px);
            transition: all 0.2s cubic-bezier(0.25, 0.57, 0.45, 0.94);
          }
          .container.controls-visible .video-controls {
            opacity: 1;
            transform: translate3d(0px, 0, 0px);
            box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.12);
          }
          .play-button,
          .full-screen-button {
            background: transparent;
            border: 0;
            height: 40px;
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            outline: 0;
            cursor: pointer;
            flex: 0 0 40px;
            padding: 0;
          }
          .video-controls .progress {
            position: relative;
            display: flex;
            align-items: center;
            flex: 1 0 auto;
          }
          .video-controls progress {
            background-color: ${theme.palette.accents_2};
            height: 2px;
            width: 100%;
            position: absolute;
            top: calc(50% - 1px);
            left: 0;
            pointer-events: none;
          }
          .video-controls progress[value]::-webkit-progress-bar {
            background-color: ${theme.palette.accents_2};
          }
          .video-controls progress[value]::-webkit-progress-value {
            background-color: ${theme.palette.foreground};
          }
          .video-controls .progress .handle {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: ${theme.palette.foreground};
            transform: translateX(-4px) translateY(1px) scale(0);
            transition: width 0.1s ease, height 0.1s ease, border-radius 0.1s ease,
              transform 0.1s ease, background-color 0.1s ease;
            top: calc(50% - 6px);
            pointer-events: none;
          }
          .video-controls .progress:hover .handle {
            transform: translateX(-4px) translateY(1px) scale(1);
          }
          .video-controls .drag-handler {
            width: 100%;
            height: 18px;
            cursor: pointer;
            background: transparent;
          }
          .video-controls .time {
            font-size: 12px;
            font-weight: 600;
            line-height: 40px;
            padding: 0 12px;
            flex: 0 0 auto;
            width: 60px;
            user-select: none;
          }
          .play-button,
          .time {
            padding-left: 0;
          }
          @media (max-width: 992px) {
            .container .video-controls {
              opacity: 1;
              transform: translate3d(0px, 0px 0px) scale(1, 0px);
            }
          }
        `}</style>
      </span>
    )
  },
)

const MemoVideo = React.memo(Video)

export default withDefaults(MemoVideo, defaultProps)
