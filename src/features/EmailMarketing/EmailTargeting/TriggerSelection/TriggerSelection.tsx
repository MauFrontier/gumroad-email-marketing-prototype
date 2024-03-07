import Sticker from '../../../shared/ui/Sticker/Sticker';

const triggers = [
  {
    stickerURI: './src/assets/images/stickers/sticker_thumbs-up.svg',
    name: 'Purchase',
    shortDescription: 'Purchase',
  },
  {
    stickerURI: './src/assets/images/stickers/sticker_click.svg',
    name: 'Cancellation',
    shortDescription: 'Cancellation',
  },
  {
    stickerURI: './src/assets/images/stickers/sticker_peace.svg',
    name: 'Refund',
    shortDescription: 'Refund',
  },
  {
    stickerURI: './src/assets/images/stickers/sticker_talking-mouth.svg',
    name: 'Refund',
    shortDescription: 'Refund',
  },
];

const TriggerSelection = () => {
  return (
    <div data-testid="TriggerSelection">
      {triggers.map(trigger => (
        <Sticker
          key={trigger.name}
          uri={trigger.stickerURI}
          label={trigger.name}
        />
      ))}
    </div>
  );
};

export default TriggerSelection;
