import {
  Alert02Icon,
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  Book02Icon,
  Bug01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  ComputerIcon,
  Copy01Icon,
  Delete02Icon,
  Folder01Icon,
  GlobalIcon,
  HelpCircleIcon,
  TerminalIcon as HugeTerminalIcon,
  Image01Icon,
  InternetIcon,
  Logout01Icon,
  PlayCircleIcon,
  PlusSignIcon,
  Search01Icon,
  Settings02Icon,
  SidebarLeft01Icon,
  Tick02Icon,
  UnfoldMoreIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";

/**
 * The app's icon vocabulary, named by meaning rather than by drawing.
 *
 * HugeIcons exports 5,471 icons with names like `Bug01Icon`, so importing them
 * directly at call sites means every file re-decides which numbered variant to
 * use. Aliasing them once here keeps the set coherent and makes swapping an
 * icon a one-line change. These are bound as consts rather than re-exported so
 * the module is not a barrel file; tree-shaking is unaffected.
 */

export const AlertIcon = Alert02Icon;
export const ArrowLeftIcon = ArrowLeft02Icon;
export const ArrowRightIcon = ArrowRight02Icon;
export const BrowserIcon = InternetIcon;
export const BugIcon = Bug01Icon;
export const CheckCircleIcon = CheckmarkCircle02Icon;
export const CheckIcon = Tick02Icon;
export const ChevronDownIcon = ArrowDown01Icon;
export const ChevronRightIcon = ArrowRight01Icon;
export const ChevronUpDownIcon = UnfoldMoreIcon;
export const ClockIcon = Clock01Icon;
export const CloseIcon = Cancel01Icon;
export const CopyIcon = Copy01Icon;
export const DocsIcon = Book02Icon;
export const EyeIcon = ViewIcon;
export const EyeOffIcon = ViewOffSlashIcon;
export const FolderIcon = Folder01Icon;
export const GlobeIcon = GlobalIcon;
export const ImageIcon = Image01Icon;
export const LogoutIcon = Logout01Icon;
export const OsIcon = ComputerIcon;
export const PlusIcon = PlusSignIcon;
export const ReplayIcon = PlayCircleIcon;
export const SearchIcon = Search01Icon;
export const SettingsIcon = Settings02Icon;
export const SidebarIcon = SidebarLeft01Icon;
export const TerminalIcon = HugeTerminalIcon;
export const TrashIcon = Delete02Icon;
export const SupportIcon = HelpCircleIcon;
