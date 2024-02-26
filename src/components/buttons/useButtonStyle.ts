import { useCallback, useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import getHoverTransition  from 'utils/getHoverTransition';

import { ColorType as DefaultColorType } from '../types';
import { ButtonSizeType, ButtonVariantType } from './Button';

interface PropTypes {
    size: ButtonSizeType;
    variant: ButtonVariantType;
    disabled: boolean;
    fitWidth: boolean;
    fitHeight: boolean;
    withChildren?: boolean;
    withIcon?: boolean;
    className?: string;
    customStyle?: string;
    withoutPaddings?: boolean;
}

export const sizeMap: Record<ButtonSizeType, string> = {
    xs: 'h-7',
    sm: `h-9`,
    base: `h-10`,
    lg: `h-11`,
    xl: `h-12`,
    '2xl': `h-14`,
};

export const gapMap: Record<ButtonSizeType, string> = {
    xs: 'gap-0.5',
    sm: 'gap-1',
    base: 'gap-1.5',
    lg: 'gap-2',
    xl: 'gap-2.5',
    '2xl': 'gap-3',
};

export const paddingsMap: Record<ButtonSizeType, string> = {
    xs: 'px-0',
    sm: 'px-3',
    base: 'px-4.5',
    lg: 'px-5',
    xl: 'px-6',
    '2xl': 'px-7',
};

const getVariantMap = (isDisabled: boolean) => ({
    white: clsx(
        isDisabled
            ? 'border border-gray-200 text-gray-300 bg-gray-50'
            : 'border bg-white border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-800 focus:outline focus:outline-1 focus:outline-gray-300 focus:shadow-xs',
        ''
    ),
    'white-text': clsx(isDisabled ? 'text-gray-300' : 'text-white hover:text-gray-default'),
    'gray-outline': clsx(
        isDisabled
            ? 'bg-transparent text-gray-300 outline outline-1 outline-gray-300'
            : 'text-gray-700 outline outline-1 outline-gray-700'
    ),
    'primary-dark': clsx(
        isDisabled
            ? 'bg-primary-200'
            : 'bg-primary-700 hover:bg-primary-800 focus:outline focus:outline-1 focus:outline-primary-100',
        'text-white'
    ),
    'primary-light': clsx(
        isDisabled
            ? 'bg-primary-25 text-primary-300'
            : 'text-primary-700 bg-primary-50 hover:text-primary-800 hover:bg-primary-100 focus:outline focus:outline-1 focus:outline-primary-100'
    ),
    'primary-outline': clsx(
        isDisabled
            ? 'bg-none text-primary-100 border border-primary-100'
            : 'bg-none border border-primary-300 text-primary-800 hover:bg-primary-50 focus:outline focus:bg-none focus:outline-2 focus:outline-primary-100'
    ),
    'primary-text': clsx(
        isDisabled
            ? 'text-primary-300'
            : 'text-primary-700 bg-none hover:text-primary-800 focus:text-primary-700 focus:bg-none'
    ),
    'error-dark': clsx(
        isDisabled
            ? 'bg-error-200'
            : 'bg-error-600 hover:bg-error-700 focus:outline focus-outline-1 focus:outline-error-100',
        'text-white'
    ),
    'error-light': clsx(
        isDisabled
            ? 'bg-error-25 text-error-300'
            : 'text-error-700 bg-error-50 hover:text-error-800 hover:bg-error-100 focus:outline focus:outline-2 focus:outline-error-100'
    ),
    'error-outline': clsx(
        isDisabled
            ? 'bg-none text-error-100 border border-error-100'
            : 'text-error-700 bg-none border border-error-300 hover:text-error-800 hover:bg-error-50 focus:outline focus:bg-none focus:outline-2 focus:outline-error-100'
    ),
    'error-text': clsx(
        isDisabled
            ? 'text-error-300'
            : 'text-error-700 bg-none hover:text-error-800 hover:bg-error-50 focus:text-error-700 focus:bg-none'
    ),
    'warning-dark': clsx(
        isDisabled
            ? 'bg-warning-200'
            : 'bg-warning-600 hover:bg-warning-700 focus:outline focus-outline-1 focus:outline-warning-100',
        'text-white'
    ),
    'warning-light': clsx(
        isDisabled
            ? 'bg-warning-25 text-warning-300'
            : 'text-warning-700 bg-warning-50 hover:text-warning-700 hover:bg-warning-100 focus:outline focus:outline-1 focus:outline-warning-100'
    ),
    'warning-outline': clsx(
        isDisabled
            ? 'bg-none text-warning-100 border border-warning-100'
            : 'text-warning-600 bg-none border border-warning-300 hover:bg-warning-50 focus:outline focus:bg-none focus:outline-2 focus:outline-warning-100'
    ),
    'warning-text': clsx(
        isDisabled
            ? 'text-warning-300'
            : 'text-warning-700 bg-none hover:text-warning-800 hover:bg-warning-50 focus:text-warning-700 focus:bg-none'
    ),
    'success-dark': clsx(
        isDisabled
            ? 'bg-success-200'
            : 'bg-success-600 hover:bg-success-700 focus:outline focus-outline-1 focus:outline-success-100',
        'text-white'
    ),
    'success-light': clsx(
        isDisabled
            ? 'bg-success-25 text-success-300'
            : 'text-success-700 bg-success-50 hover:text-success-700 hover:bg-success-100 focus:outline focus:outline-1 focus:outline-success-100'
    ),
    'success-outline': clsx(
        isDisabled
            ? 'bg-none text-success-300 border border-success-200'
            : 'text-success-700 bg-none border border-success-300 hover:text-success-800 hover:bg-success-50 focus:outline focus:bg-none focus:outline-2 focus:outline-success-100'
    ),
    'success-text': clsx(
        isDisabled
            ? 'text-success-300'
            : 'text-success-700 bg-none hover:text-success-800 hover:bg-success-50 focus:text-success-700 focus:bg-none'
    ),
});

const useButtonStyle = ({
    size,
    variant,
    disabled,
    withChildren,
    withIcon,
    className,
    fitWidth,
    fitHeight,
    customStyle,
    withoutPaddings,
}: PropTypes) => {
    const [loaderColor, setLoaderColor] = useState<DefaultColorType>('gray-700');
    const getLoaderColor = useCallback(() => {
        switch (variant) {
            case 'primary-dark':
            case 'error-dark':
            case 'warning-dark':
            case 'success-dark':
                setLoaderColor('white');
                break;
            case 'primary-text':
            case 'primary-outline':
            case 'primary-light':
                setLoaderColor('primary-700');
                break;
            case 'error-light':
            case 'error-text':
            case 'error-outline':
                setLoaderColor('error-600');
                break;
            case 'warning-light':
            case 'warning-text':
            case 'warning-outline':
                setLoaderColor('warning-600');
                break;
            case 'success-light':
            case 'success-text':
            case 'success-outline':
                setLoaderColor('success-600');
                break;
            case 'white':
            case 'gray-outline':
            case 'white-text':
                setLoaderColor('black');
                break;
            default:
                break;
        }
    }, [variant]);

    useEffect(() => {
        getLoaderColor();
    }, [getLoaderColor]);

    const defaultStyle = useMemo(() => {
        const withGap = withIcon && withChildren;

        const buttonClassConfig = {
            width: fitWidth ? 'w-fit max-w-fit' : 'w-full',
            height: fitHeight ? 'h-fit max-h-fit' : sizeMap[size],
            disabled: disabled ? 'cursor-not-allowed' : 'cursor-pointer shadow-xs',
            gap: withGap ? gapMap[size] : 'gap-0',
        };

        const defaultClassName = clsx(
            'flex rounded-md items-center font-normal justify-center',
            getHoverTransition(),
            buttonClassConfig.height,
            buttonClassConfig.width,
            buttonClassConfig.disabled,
            buttonClassConfig.gap,
            className
        );

        const style = customStyle ?? defaultClassName;
        return clsx(
            style,
            getVariantMap(disabled)[variant],
            !withoutPaddings ? paddingsMap[size] : undefined
        );
    }, [
        withIcon,
        withChildren,
        fitWidth,
        fitHeight,
        size,
        disabled,
        className,
        customStyle,
        variant,
        withoutPaddings,
    ]);

    return { defaultClassName: defaultStyle, loaderColor };
};

export default useButtonStyle;
