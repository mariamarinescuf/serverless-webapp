import React from 'react';

import clsx from 'clsx';

interface PropTypes {
    size?: any;
    color?: any;
    opacity?: any;
    className?: string;
}

const SIZE_MAP: { [key in any]: string } = {
    sm: 'h-1 w-1',
    base: 'h-1.5 w-1.5',
    lg: 'h-2 w-2',
    xl: 'h-3 w-3',
};

const Loader = ({
    size = 'base',
    color = 'primary-500',
    opacity = '100',
    className = 'm-auto',
}: PropTypes) => {
    const backgroundColor = `bg-${color}`;
    const backgroundOpacity = `bg-opacity-${opacity}`;
    const baseClasses = clsx(backgroundColor, backgroundOpacity, SIZE_MAP[size], 'rounded-full');

    return (
        <div className={clsx('flex w-fit h-fit m-auto')}>
            <div className={clsx(baseClasses, 'mr-1 animate-bounce')} />
            <div className={clsx(baseClasses, 'mr-1 animate-bounce200')} />
            <div className={clsx(baseClasses, 'animate-bounce400')} />
        </div>
    );
};

export default Loader;
