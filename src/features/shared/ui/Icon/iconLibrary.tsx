import AiIcon from '@/assets/images/icons/icon_ai.svg?react';
import ArchiveIcon from '@/assets/images/icons/icon_archive.svg?react';
import CalendarIcon from '@/assets/images/icons/icon_calendar.svg?react';
import CheckIcon from '@/assets/images/icons/icon_check.svg?react';
import ChevronDownIcon from '@/assets/images/icons/icon_chevron-down.svg?react';
import CloneIcon from '@/assets/images/icons/icon_clone.svg?react';
import CodeIcon from '@/assets/images/icons/icon_code.svg?react';
import CreditCardIcon from '@/assets/images/icons/icon_credit-card.svg?react';
import GlobeIcon from '@/assets/images/icons/icon_globe.svg?react';
import PlusCircleClearIcon from '@/assets/images/icons/icon_plus-circle-clear.svg?react';
import PlusIcon from '@/assets/images/icons/icon_plus-circle-clear.svg?react';
import ThumbsDownFilledIcon from '@/assets/images/icons/icon_thumbs-down-filled.svg?react';
import ThumbsDownRegularIcon from '@/assets/images/icons/icon_thumbs-down-regular.svg?react';
import ThumbsUpFilledIcon from '@/assets/images/icons/icon_thumbs-up-filled.svg?react';
import ThumbsUpRegularIcon from '@/assets/images/icons/icon_thumbs-up-regular.svg?react';
import TrashIcon from '@/assets/images/icons/icon_trash.svg?react';
import WarningIcon from '@/assets/images/icons/icon_warning.svg?react';
import XIcon from '@/assets/images/icons/icon_x.svg?react';

export enum IconType {
  Ai = 'Ai',
  Archive = 'Archive',
  Calendar = 'Calendar',
  Check = 'Check',
  ChevronDown = 'ChevronDown',
  Clone = 'Clone',
  Code = 'Code',
  CreditCard = 'CreditCard',
  Globe = 'Globe',
  PlusCircleClear = 'PlusCircleClear',
  Plus = 'Plus',
  ThumbsDownFilled = 'ThumbsDownFilled',
  ThumbsDownRegular = 'ThumbsDownRegular',
  ThumbsUpFilled = 'ThumbsUpFilled',
  ThumbsUpRegular = 'ThumbsUpRegular',
  Trash = 'Trash',
  Warning = 'Warning',
  X = 'X',
}

export const Icons: {
  [key in IconType]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  [IconType.Ai]: AiIcon,
  [IconType.Archive]: ArchiveIcon,
  [IconType.Calendar]: CalendarIcon,
  [IconType.Check]: CheckIcon,
  [IconType.ChevronDown]: ChevronDownIcon,
  [IconType.Clone]: CloneIcon,
  [IconType.Code]: CodeIcon,
  [IconType.CreditCard]: CreditCardIcon,
  [IconType.Globe]: GlobeIcon,
  [IconType.Plus]: PlusIcon,
  [IconType.PlusCircleClear]: PlusCircleClearIcon,
  [IconType.ThumbsUpRegular]: ThumbsUpRegularIcon,
  [IconType.ThumbsUpFilled]: ThumbsUpFilledIcon,
  [IconType.ThumbsDownRegular]: ThumbsDownRegularIcon,
  [IconType.ThumbsDownFilled]: ThumbsDownFilledIcon,
  [IconType.Trash]: TrashIcon,
  [IconType.Warning]: WarningIcon,
  [IconType.X]: XIcon,
};
