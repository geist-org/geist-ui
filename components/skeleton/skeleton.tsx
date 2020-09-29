import React, { useRef, useImperativeHandle, PropsWithoutRef, RefAttributes } from 'react'
import PropTypes from 'prop-types'
import { SkeletonAnimations, SkeletonVariants } from '../utils/prop-types'
import { HTMLAttributes } from 'enzyme'

interface SkeletonBaseProps {
  animation?: SkeletonAnimations | boolean
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

type SkeletonNativeAttrs = Omit<React.HTMLAttributes<any>, keyof SkeletonBaseProps>
export type SkeletonProps = SkeletonBaseProps & typeof defaultSkeletonProps & SkeletonNativeAttrs

export const SkeletonRender = <T, P>(
  {
    children,
    animation,
    variant,
    width,
    height,
    style,
  }: React.PropsWithChildren<T> & SkeletonProps,
  ref: React.Ref<P | null>,
) => {
  const skeletonRef = useRef<P>(null)
  useImperativeHandle(ref, () => skeletonRef.current)

  const hasChildren = Boolean(children)
  let className = `skeleton ${variant}`

  if (animation) {
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
            height: 22px;
          }
          .skeleton.text {
            margin-top: 0;
            margin-bottom: 0;
            border-radius: 4px;
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
            background: linear-gradient(90deg, transparent, #E1E5EE, transparent);
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

const Skeleton = React.forwardRef<HTMLAttributes, React.PropsWithChildren<SkeletonBaseProps>>(
  SkeletonRender,
)

Skeleton.defaultProps = defaultSkeletonProps
Skeleton.propTypes = {
  animation: PropTypes.oneOf(['pulse', 'wave', false]),
  width: PropTypes.string,
  height: PropTypes.string,
  variant: PropTypes.oneOf(['circle', 'rect', 'text']),
  style: PropTypes.object,
}

type SkeletonComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>
type SkeletonComponentProps = Partial<typeof defaultSkeletonProps> &
  Omit<SkeletonBaseProps, keyof typeof defaultSkeletonProps> &
  SkeletonNativeAttrs

const SkeletonComponent = React.memo(Skeleton) as SkeletonComponent<
  HTMLAttributes,
  SkeletonComponentProps
>

export default SkeletonComponent
