import Button from '../../../shared/ui/Button/Button';
import Sticker from '../../../shared/ui/Sticker/Sticker';

import './TriggerSelection.scss';

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
    <div data-testid="TriggerSelection" className="trigger-selection">
      <p className="mb-2">Trigger</p>
      <div className="trigger-selection-buttons">
        {triggers.map(trigger => (
          <Button onClick={() => {}} key={trigger.name} className="px-3 py-4">
            <Sticker
              className="mb-4"
              uri={trigger.stickerURI}
              label={trigger.name}
            />
            <h3 className="m-2 mt-0">{trigger.name}</h3>
            <p className="m-2 mt-0">{trigger.shortDescription}</p>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TriggerSelection;
