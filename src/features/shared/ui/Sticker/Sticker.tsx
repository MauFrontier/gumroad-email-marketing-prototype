import React from 'react';

type Props = {
  uri?: string;
  label?: string;
};

const Sticker = React.memo(({uri, label}: Props) => {
  return <img src={uri} alt={label} />;
});

export default Sticker;
