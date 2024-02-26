import React, { Children, createRef, forwardRef } from 'react';

import clsx from 'clsx';

import Loader from '../loaders/Loader';
import useButtonStyle from './useButtonStyle';
import { ElementSizeType } from '../types';


export const tuple = <T extends string[]>(...args: T) => args;


const ButtonVariantTypes = tuple(
    'primary-dark',
    'primary-light',
    'primary-outline',
    'primary-text',
    'error-dark',
    'error-light',
    'error-outline',
    'error-text',
    'warning-dark',
    'warning-light',
    'warning-outline',
    'warning-text',
    'success-dark',
    'success-light',
    'success-outline',
    'success-text',
    'white',
    'white-text',
    'gray-outline'
);
export type ButtonVariantType = (typeof ButtonVariantTypes)[number];
const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];
const ButtonSizeTypes = tuple('xs', 'sm', 'base', 'lg', 'xl', '2xl');
export type ButtonSizeType = (typeof ButtonSizeTypes)[number];
const CustomColorType = tuple('gray', 'primary', 'error', 'warning', 'success');
export type CustomColorTypes = (typeof CustomColorType)[number];

const ColorShadesType = tuple('50', '100', '200', '300', '500', '600');
export type ColorShadesTypes = (typeof ColorShadesType)[number];
const PartialColorType = tuple('inherit', 'current', 'transparent', 'white');
export type PartialColorTypes = (typeof PartialColorType)[number];

export type ColorType = PartialColorTypes | `${CustomColorTypes}-${ColorShadesTypes}`;


export interface DefaultButtonProps {
    icon?: React.ReactNode;
    hideLabel?: boolean;
    size?: ButtonSizeType;
    variant?: ButtonVariantType;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    fitWidth?: boolean;
    fitHeight?: boolean;
    customStyle?: string;
    withoutPaddings?: boolean;
    children?: React.ReactNode;
}

export type AnchorButtonProps = {
    href: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    textColor?: ColorType;
} & DefaultButtonProps &
    Omit<React.ButtonHTMLAttributes<HTMLAnchorElement>, 'onClick'>;

export interface ButtonPropTypes
    extends React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >,
        DefaultButtonProps {}

export type ButtonProps = Partial<AnchorButtonProps & ButtonPropTypes>;

const textSize = {
    xs: 'xs',
    sm: 'sm',
    base: 'base',
    lg: 'lg',
    xl: 'lg',
    '2xl': 'xl',
};

const loaderSize = {
    xs: 'sm',
    sm: 'base',
    base: 'lg',
    lg: 'lg',
    xl: 'lg',
    '2xl': 'lg',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (
        {
            loading = false,
            variant = 'primary-dark',
            size = 'sm',
            disabled = false,
            className,
            onClick,
            children,
            onKeyDown,
            icon,
            type = 'button',
            hideLabel = false,
            fitWidth = false,
            fitHeight = false,
            customStyle,
            withoutPaddings,
            ...rest
        }: ButtonProps,
        ref
    ) => {
        const withChildren = Children.count(children) === 1;
        const withIcon = !!icon;

        const { defaultClassName, loaderColor } = useButtonStyle({
            size,
            withChildren,
            withIcon,
            variant,
            disabled,
            className,
            fitWidth,
            fitHeight,
            customStyle,
            withoutPaddings,
        });
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const buttonRef = (ref as any) || createRef<HTMLButtonElement | HTMLAnchorElement>();

        const handleClick = (
            e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
        ) => {
            if (loading || disabled) {
                e.preventDefault();
                return;
            }
            if (onClick) {
                (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
            }
        };

        const kids =
            typeof children === 'string' ? (
                <>
                    {icon}
                    <div
                        className={clsx(
                            hideLabel ? 'hidden sm:flex' : 'flex',
                            'p-0 m-0 w-fit truncate text-lg'
                        )}
                    >
                        <p
                            className="whitespace-nowrap truncate"
                        >
                            {children}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    {icon}
                    {children}
                </>
            );

        const content = !loading ? (
            kids
        ) : (
            <Loader
                color={loaderColor}
                size={loaderSize[size] as ElementSizeType}
                className="m-none"
            />
        );

        const anchorProps = {
            ...(rest as AnchorButtonProps),
            className: defaultClassName,
            disabled,
            ref: buttonRef,
        };

        const buttonProps = {
            ...(rest as ButtonPropTypes),
            className: defaultClassName,
            onClick: handleClick,
            disabled,
            ref: buttonRef,
        };

        if (anchorProps.href !== undefined) {
            return (
                <a role="button" tabIndex={0} {...anchorProps}>
                    {content}
                </a>
            );
        }

        switch (type) {
            case 'submit':
                return (
                    <button type="submit" {...buttonProps}>
                        {content}
                    </button>
                );
            default:
                return (
                    <button type="button" {...buttonProps}>
                        {content}
                    </button>
                );
        }
    }
);
