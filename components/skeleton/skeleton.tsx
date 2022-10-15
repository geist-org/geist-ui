import React from 'react'
import useTheme from '../use-theme'
import { useScale, withScale } from '../use-scale'
import useClasses from '../use-classes'

interface Props {
  width?: number
  squared?: boolean
  rounded?: boolean
  component?: keyof JSX.IntrinsicElements
  className?: string
  show?: boolean
  minHeight?: number
  animate?: boolean
  height?: number
}

const defaultProps = {
  squared: false,
  rounded: false,
  component: 'span' as keyof JSX.IntrinsicElements,
  className: '',
  show: false,
  minHeight: 24,
  animate: true,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SkeletonProps = Props & NativeAttrs

const SkeletonComponent: React.FC<React.PropsWithChildren<SkeletonProps>> = ({
  component,
  children,
  width,
  squared,
  rounded,
  show,
  minHeight,
  className,
  animate,
  height,
  ...props
}: React.PropsWithChildren<SkeletonProps> & typeof defaultProps) => {
  const Component = component
  let theme = useTheme()
  const { SCALES } = useScale()
  const classes = useClasses(
    'skeleton',
    { rounded, squared, show, stop: !animate, hasChildren: !!children },
    className,
  )

  return (
    <Component className={classes} {...props}>
      {children}
      <style jsx>{`
        .skeleton {
          width: ${SCALES.width(width ?? 1, 'initial')};
          height: ${SCALES.height(height ?? 1, 'initial')};
          display: block;
          min-height: ${minHeight}px;
          position: relative;
          overflow: hidden;
        }

        .skeleton,
        .skeleton:before {
          background-image: linear-gradient(
            270deg,
            ${theme.palette.accents_1},
            ${theme.palette.accents_2},
            ${theme.palette.accents_2},
            ${theme.palette.accents_1}
          );
          background-size: 400% 100%;
          -webkit-animation: loading 8s ease-in-out infinite;
          animation: loading 8s ease-in-out infinite;
          border-radius: 5px;
        }

        .skeleton.hasChildren:before {
          position: absolute;
          display: block;
          height: 100%;
          content: '';
          width: 100%;
          z-index: 2;
        }

        @media (prefers-reduced-motion: reduce) {
          .skeleton,
          .skeleton:before {
            -webkit-animation: none;
            animation: none;
          }
        }

        .skeleton.stop,
        .skeleton.stop:before {
          -webkit-animation: none;
          animation: none;
        }

        .skeleton.rounded, .skeleton.rounded:before {
          border-radius: 100%;
        }

        .skeleton.squared, .skeleton.squared:before {
          border-radius: 0;
        }

        .skeleton.show, .skeleton.show:before {
          background: transparent;
          width: initial;
          height: initial;
        }

        @-webkit-keyframes loading {
          0% {
            background-position: 200% 0;
          }

          to {
            background-position: -200% 0;
          }
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }

          to {
            background-position: -200% 0;
          }
        }
      `}</style>
    </Component>
  )
}

SkeletonComponent.defaultProps = defaultProps
SkeletonComponent.displayName = 'GeistCol'
const Skeleton = withScale(SkeletonComponent)
export default Skeleton
