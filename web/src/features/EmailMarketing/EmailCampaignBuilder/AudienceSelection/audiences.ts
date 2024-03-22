import {AudienceType} from '../emailMarketingTypes';

export const audiences = [
  {
    type: AudienceType.Everyone,
    shortDescription: 'All the people in your audience.',
    stickerURI: '/assets/images/stickers/sticker_peace.svg',
  },
  {
    type: AudienceType.Customers,
    shortDescription: 'People who have already made a purchase.',
    stickerURI: '/assets/images/stickers/sticker_thumbs-up.svg',
  },
  {
    type: AudienceType.Followers,
    shortDescription: 'People who have subscribed to your page',
    stickerURI: '/assets/images/stickers/sticker_click.svg',
  },
  {
    type: AudienceType.Affiliates,
    shortDescription: 'People who actively promote your products',
    stickerURI: '/assets/images/stickers/sticker_talking-mouth.svg',
  },
];
