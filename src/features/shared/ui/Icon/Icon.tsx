import React from 'react';
import {Icons, IconType} from './iconLibrary';

import './Icon.scss';

type Props = {
  type: IconType;
  label?: string;
  size?: number;
  className?: string;
  ariaHidden?: boolean;
};

const Icon = React.memo(
  ({
    type: icon,
    label = 'Icon',
    size = 6,
    className,
    ariaHidden = true,
  }: Props) => {
    const IconElement = Icons[icon];

    label = label || 'Icon';

    return (
      <div
        className={`icon-wrapper ${className} icon-${size}
      
      `}
        aria-hidden={ariaHidden}
        aria-label={label}>
        <IconElement />
      </div>
    );
  },
);

export default Icon;
