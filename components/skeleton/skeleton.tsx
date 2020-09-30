import React from 'react'
import { SkeletonAnimations, SkeletonVariants } from '../utils/prop-types'

interface SkeletonBaseProps {
  animation?: SkeletonAnimations
  width?: string
  height?: string
  variant?: SkeletonVariants
  style?: React.CSSProperties
}

const defaultSkeletonProps = {
  animation: 'wave' as SkeletonAnimations,
  width: '',
  height: '',
  variant: 'text' as SkeletonVariants,
  style: {} as React.CSSProperties,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof SkeletonBaseProps>
export type SkeletonProps = React.PropsWithChildren<SkeletonBaseProps & NativeAttrs>
type SkeletonPropsWithDefault = SkeletonProps & typeof defaultSkeletonProps

export const Skeleton: React.FC<SkeletonProps> = ({
  children,
  animation,
  variant,
  width,
  height,
  style,
}: SkeletonPropsWithDefault) => {
  const hasChildren = Boolean(children)
  let className = `skeleton ${variant}`

  if (animation !== 'none') {
    className += ' ' + animation
  }
  if (hasChildren) {
    className += ' withChildren'
  }
  if (hasChildren && !width) {
    className += ' fitContent'
  }
  if (hasChildren && !height) {
    className += ' heightAuto'
  }

  return (
    <div
      className={className}
      style={{
        width,
        height,
        ...style,
      }}>
      {children}
      <style jsx>
        {`
          @keyframes pulse {
            0% {
              opacity 1;
            }
            50% {
              opacity 0.5;
            }
            100% {
              opacity 1;
            }
          }
          @keyframes wave {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .skeleton {
            display: block;
            background-color: #EFF2FA;
            height: 1.5714rem;
            transform-style: preserve-3d;
          }
          .skeleton.text {
            margin-top: 0;
            margin-bottom: 0;
            border-radius: 0.2857rem;
          }
          .skeleton.rect {
          }
          .skeleton.circle {
            border-radius: 50%;
          }
          .skeleton.pulse {
            animation: pulse 1.5s ease-in-out 0.5s infinite;
          }
          .skeleton.wave {
            position: relative;
            overflow: hidden;
          }
          .skeleton.wave::after {
            animation: wave 1.6s linear 0.5s infinite;
            background: linear-gradient(90deg, #EFF2FA, #E1E5EE, #EFF2FA);
            content: '';
            position: absolute;
            transform: translateX(-100%);
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
          }
          /* Styles applied when the component is passed children and no width. */
          .skeleton.fitContent {
            max-width: fit-content;
          }
          /* Styles applied when the component is passed children and no height. */
          .skeleton.heightAuto {
            height: auto;
          }
          .skeleton.withChildren > :global(*) {
            visibility: hidden;
          }
        `}
      </style>
    </div>
  )
}

Skeleton.defaultProps = defaultSkeletonProps

export default Skeleton
