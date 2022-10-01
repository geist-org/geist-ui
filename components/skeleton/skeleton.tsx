import React from 'react'
import useTheme from "../use-theme";

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

const Skeleton: React.FC<React.PropsWithChildren<SkeletonProps>> = ({
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
    let theme = useTheme();

    return (
        <Component className={`skeleton ${className}`} {...props}>
            {children}
            <style jsx>{`
              .skeleton {
                background-image: linear-gradient(270deg, ${theme.palette.accents_1}, ${theme.palette.accents_2}, ${theme.palette.accents_2}, ${theme.palette.accents_1});
                background-size: 400% 100%;
                -webkit-animation: ${animate ? 'loading 8s ease-in-out infinite' : 'none'};
                animation: ${animate ? 'loading 8s ease-in-out infinite' : 'none'};
                ${width && !show ? `width: ${width}px;` : ''}
                ${height && !show  ? `height: ${height}px;` : ''}
                border-radius: ${rounded ? '100%' : (squared ? '0' : '5px')};
                display: block;
                min-height: ${minHeight}px;
                position: relative;
                overflow: hidden;
              }


              .skeleton:before {
                ${!show && children && `
                position: absolute;
                display: block;
                height: 100%;
                content: '';
                background-image: linear-gradient(270deg, ${theme.palette.accents_1}, ${theme.palette.accents_2}, ${theme.palette.accents_2}, ${theme.palette.accents_1});
                background-size: 400% 100%;
                -webkit-animation: ${animate ? 'loading 8s ease-in-out infinite' : 'none'};
                animation: ${animate ? 'loading 8s ease-in-out infinite' : 'none'};
                width: 100%;
                z-index: 2;
                border-radius: ${rounded ? '100%' : (squared ? '0' : '5px')};
              `};
              }

              @-webkit-keyframes loading {
                0% {
                  background-position: 200% 0
                }

                to {
                  background-position: -200% 0
                }
              }

              @keyframes loading {
                0% {
                  background-position: 200% 0
                }

                to {
                  background-position: -200% 0
                }
              }
            `}</style>
        </Component>
    )
}

Skeleton.defaultProps = defaultProps
Skeleton.displayName = 'GeistCol'
export default Skeleton
