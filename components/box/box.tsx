import React from 'react'
import {DynamicScales, makeScaleHandler, ScaleProps} from "../use-scale";
import useClasses from "../use-classes";
import useTheme from "../use-theme";

type PropsOf<E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export interface BoxOwnProps<E extends React.ElementType = React.ElementType> {
    as?: E;
}

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
    Omit<PropsOf<E>, keyof BoxOwnProps> & ScaleProps;

const defaultElement = 'div';

export type BoxComponent = <E extends React.ElementType = typeof defaultElement>(
    props: BoxProps<E>,
) => React.ReactElement | null

export const Box: BoxComponent = React.forwardRef(
    <E extends React.ElementType = typeof defaultElement>
    ({as, children, className, ...restProps}: BoxProps<E>, ref: typeof restProps.ref | null) => {
        const Element = as || defaultElement;
        const {layout} = useTheme()
        const {
            paddingLeft,
            pl,
            paddingRight,
            pr,
            paddingTop,
            pt,
            paddingBottom,
            pb,
            marginTop,
            mt,
            marginRight,
            mr,
            marginBottom,
            mb,
            marginLeft,
            ml,
            px,
            py,
            mx,
            my,
            width,
            height,
            font,
            w,
            h,
            margin,
            padding,
            unit = layout.unit,
            scale = 1,
            ...innerProps
        } = restProps

        const SCALES: DynamicScales = {
            pt: makeScaleHandler(paddingTop ?? pt ?? py ?? padding, scale, unit),
            pr: makeScaleHandler(paddingRight ?? pr ?? px ?? padding, scale, unit),
            pb: makeScaleHandler(paddingBottom ?? pb ?? py ?? padding, scale, unit),
            pl: makeScaleHandler(paddingLeft ?? pl ?? px ?? padding, scale, unit),
            px: makeScaleHandler(px ?? paddingLeft ?? paddingRight ?? pl ?? pr ?? padding, scale, unit),
            py: makeScaleHandler(py ?? paddingTop ?? paddingBottom ?? pt ?? pb ?? padding, scale, unit),
            mt: makeScaleHandler(marginTop ?? mt ?? my ?? margin, scale, unit),
            mr: makeScaleHandler(marginRight ?? mr ?? mx ?? margin, scale, unit),
            mb: makeScaleHandler(marginBottom ?? mb ?? my ?? margin, scale, unit),
            ml: makeScaleHandler(marginLeft ?? ml ?? mx ?? margin, scale, unit),
            mx: makeScaleHandler(mx ?? marginLeft ?? marginRight ?? ml ?? mr ?? margin, scale, unit),
            my: makeScaleHandler(my ?? marginTop ?? marginBottom ?? mt ?? mb ?? margin, scale, unit),
            width: makeScaleHandler(width ?? w, scale, unit),
            height: makeScaleHandler(height ?? h, scale, unit),
            font: makeScaleHandler(font, scale, unit),
        }

        return (
            <Element
                className={useClasses('box', className)}
                ref={ref}
                {...innerProps}
            >
                {children}
                <style jsx>{`
                  .box {
                    line-height: ${SCALES.height(1)};
                    font-size: ${SCALES.font(1)};
                    width: ${SCALES.width(0, 'auto')};
                    height: ${SCALES.height(0, 'auto')};
                    padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
                    margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
                  }
                `}</style>
            </Element>
        );
    },
);

// Box.displayName = 'GeistBox'

export default Box
