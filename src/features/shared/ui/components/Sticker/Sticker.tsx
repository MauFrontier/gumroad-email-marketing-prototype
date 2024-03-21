import React from 'react';

type Props = {
  uri?: string;
  label?: string;
  className?: string;
  ariaHidden?: boolean;
};

const Sticker = React.memo(
  ({uri, label, className, ariaHidden = true}: Props) => {
    return (
      <img
        src={uri}
        alt={label}
        aria-hidden={ariaHidden}
        className={className}
      />
    );
  },
);

export default Sticker;
