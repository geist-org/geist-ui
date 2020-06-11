import React, { useRef, useState, useEffect, useImperativeHandle } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import PlayIcon from './play-icon'
import PauseIcon from './pause-icon'
import FullScreenIcon from './fullscreen-icon'
import CloseFullScreenIcon from './fullscreen-close-icon'
import {
  openFullscreen,
  onFullscreenChange,
  closeFullscreen,
  formatTime,
  isFullscreenEnabled,
  isSafari,
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
    const mouseTimer = useRef(0)
    const [controlsVisible, setControlsVisibility] = useState(false)
    const [isDragging, setDragging] = useState(false)
    const handlePosition = useRef(0)
    const videoRef = useRef<HTMLVideoElement>(null)
    useImperativeHandle(ref, () => videoRef.current)

    const handleFullScreen = () => {
      onFullscreenChange(setFullscreen)
      if (isFullscreen) return closeFullscreen()
      if (isSafari()) {
        openFullscreen(videoRef.current as HTMLElement)
      } else {
        openFullscreen(containerRef.current as HTMLElement)
      }
    }
    const handleMouseMove = () => {
      if (mouseTimer.current) clearTimeout(mouseTimer.current)
      setControlsVisibility(true)
      mouseTimer.current = window.setTimeout(() => setControlsVisibility(false), 3000)
    }
    const handleProgress = () => {
      if (!isDragging && videoRef.current) {
        const time = videoRef.current.currentTime
        setCurrentTime(time)
        handlePosition.current = (time / duration) * 100
      }
    }
    const onLoadedMetadata = () => {
      if (videoRef.current) setDuration(videoRef.current.duration)
    }
    const play = () => {
      if (videoRef.current) videoRef.current.play()
    }
    const pause = () => {
      if (videoRef.current) videoRef.current.pause()
    }
    const toggle = () => {
      if (isPlaying) return pause()
      play()
    }
    const updateHandlePosition = (e: TouchEvent | MouseEvent) => {
      let pageX
      if (e instanceof TouchEvent) {
        pageX = e.touches[0].pageX
      } else {
        pageX = e.pageX
      }
      if (dragHandlerRef.current) {
        const rect = dragHandlerRef.current.getBoundingClientRect()
        const position = ((pageX - (rect.left || 0)) / (rect.width || 0)) * 100
        handlePosition.current = parseInt(`${Math.min(Math.max(position, 0), 100)}`) || 0
      }
    }
    const startDrag = (e: MouseEvent | TouchEvent) => {
      setDragging(true)
      updateHandlePosition(e)
    }
    useEffect(() => {
      const onDarg = (e: MouseEvent) => {
        if (isDragging) updateHandlePosition(e)
      }
      const endDrag = () => {
        setDragging(false)
        if (videoRef.current) {
          videoRef.current.currentTime = (handlePosition.current * videoRef.current.duration) / 100
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
      <div className={`video ${className}`}>
        <div
          className={`container ${controlsVisible ? 'controls-visible' : ''}`}
          ref={containerRef}
          onMouseMove={handleMouseMove}>
          <video
            onClick={toggle}
            ref={videoRef}
            onLoadedMetadata={onLoadedMetadata}
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
                <PauseIcon />
              </button>
            ) : (
              <button onClick={play} className="play-button">
                <PlayIcon />
              </button>
            )}
            <div className="time current-time">{formatTime(currentTime)}</div>
            <div className="progress">
              <div
                className="drag-handler"
                ref={dragHandlerRef}
                onMouseDown={e => startDrag(e.nativeEvent)}
                onTouchStart={e => startDrag(e.nativeEvent)}
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
                {isFullscreen ? <CloseFullScreenIcon size={14} /> : <FullScreenIcon />}
              </button>
            )}
          </div>
        </div>

        <style jsx>{`
          .video {
            margin: 0 auto;
            max-width: 100%;
            width: ${width}px;
          }
          .container {
            display: flex;
            justify-content: center;
            position: relative;
            padding-bottom: ${(height / width) * 100}%;
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
            ${isDragging ? '' : 'transition: width 0.3s ease;'}
          }
          .video-controls .progress .handle {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: ${theme.palette.foreground};
            transform: translateX(-4px) translateY(1px) scale(0);
            top: calc(50% - 6px);
            pointer-events: none;
            transition: ${isDragging ? '' : 'left 0.3s ease, '} transform 0.1s ease;
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
          @media (max-width: ${theme.breakpoints.sm.max}) {
            .container .video-controls {
              opacity: 1;
              transform: translate3d(0px, 0px 0px) scale(1, 0px);
            }
          }
        `}</style>
      </div>
    )
  },
)

const MemoVideo = React.memo(Video)

export default withDefaults(MemoVideo, defaultProps)
