import AiIcon from '@/assets/icons/icon_ai.svg?react';
import ArchiveIcon from '@/assets/icons/icon_archive.svg?react';
import CalendarIcon from '@/assets/icons/icon_calendar.svg?react';
import CheckIcon from '@/assets/icons/icon_check.svg?react';
import ChevronDownIcon from '@/assets/icons/icon_chevron-down.svg?react';
import CloneIcon from '@/assets/icons/icon_clone.svg?react';
import CodeIcon from '@/assets/icons/icon_code.svg?react';
import CreditCardIcon from '@/assets/icons/icon_credit-card.svg?react';
import GlobeIcon from '@/assets/icons/icon_globe.svg?react';
import PlusCircleClearIcon from '@/assets/icons/icon_plus-circle-clear.svg?react';
import PlusIcon from '@/assets/icons/icon_plus-circle-clear.svg?react';
import ThumbsDownFilledIcon from '@/assets/icons/icon_thumbs-down-filled.svg?react';
import ThumbsDownRegularIcon from '@/assets/icons/icon_thumbs-down-regular.svg?react';
import ThumbsUpFilledIcon from '@/assets/icons/icon_thumbs-up-filled.svg?react';
import ThumbsUpRegularIcon from '@/assets/icons/icon_thumbs-up-regular.svg?react';
import TrashIcon from '@/assets/icons/icon_trash.svg?react';
import WarningIcon from '@/assets/icons/icon_warning.svg?react';
import XIcon from '@/assets/icons/icon_x.svg?react';

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
