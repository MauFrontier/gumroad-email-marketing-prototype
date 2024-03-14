import {TriggerType} from './emailMarketingTypes';

export const triggers = [
  {
    type: TriggerType.Purchase,
    shortDescription: 'A customer purchases your product',
    stickerURI: './src/assets/images/stickers/sticker_thumbs-up.svg',
  },
  {
    type: TriggerType.NewSubscriber,
    shortDescription: 'A user subscribes to your email list',
    stickerURI: './src/assets/images/stickers/sticker_click.svg',
  },
  {
    type: TriggerType.MemberCancels,
    shortDescription: 'A membership product subscriber cancels',
    stickerURI: './src/assets/images/stickers/sticker_peace.svg',
  },
  {
    type: TriggerType.NewAffiliate,
    shortDescription: 'A user becomes an affiliate of your products',
    stickerURI: './src/assets/images/stickers/sticker_talking-mouth.svg',
  },
];
