import React from 'react';

type Props = {
  uri?: string;
  label?: string;
  className?: string;
};

const Sticker = React.memo(({uri, label, className}: Props) => {
  return <img src={uri} alt={label} className={className} />;
});

export default Sticker;
