import Button from '../../../shared/ui/Button/Button';
import Sticker from '../../../shared/ui/Sticker/Sticker';

const triggers = [
  {
    stickerURI: './src/assets/images/stickers/sticker_thumbs-up.svg',
    name: 'Purchase',
    shortDescription: 'A customer purchases your product',
  },
  {
    stickerURI: './src/assets/images/stickers/sticker_click.svg',
    name: 'New Subscriber',
    shortDescription: 'A user subscribes to your email list',
  },
  {
    stickerURI: './src/assets/images/stickers/sticker_peace.svg',
    name: 'Member cancels',
    shortDescription: 'A membership product subscriber cancels',
  },
  {
    stickerURI: './src/assets/images/stickers/sticker_talking-mouth.svg',
    name: 'New affiliate',
    shortDescription: 'A user becomes an affiliate of your products',
  },
];

const TriggerSelection = () => {
  return (
    <div data-testid="TriggerSelection">
      {triggers.map(trigger => (
        <Button onClick={() => {}} key={trigger.name}>
          <Sticker uri={trigger.stickerURI} label={trigger.name} />
          <h3>{trigger.name}</h3>
          <p>{trigger.shortDescription}</p>
        </Button>
      ))}
    </div>
  );
};

export default TriggerSelection;
