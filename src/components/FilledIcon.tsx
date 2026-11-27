"use client";
import {
  MdAccessible, MdNotificationsActive, MdMenuBook, MdWork, MdApartment, MdDirectionsBus,
  MdCheckCircle, MdAssignmentTurnedIn, MdAccessTimeFilled, MdMonetizationOn, MdMeetingRoom,
  MdFactCheck, MdPublic, MdSchool, MdSupportAgent, MdVolunteerActivism, MdMonitorHeart,
  MdHome, MdLocalHospital, MdCurrencyRupee, MdAccountBalance, MdLaptopMac, MdLightbulb,
  MdLocationOn, MdCampaign, MdCall, MdSavings, MdRocketLaunch, MdRoute, MdBalance, MdSearch,
  MdVerifiedUser, MdHealthAndSafety, MdSmartphone, MdSentimentSatisfiedAlt, MdAutoAwesome,
  MdMedicalServices, MdStorefront, MdConfirmationNumber, MdTrendingDown, MdTrendingUp,
  MdEmojiEvents, MdHowToReg, MdGroups, MdAccountBalanceWallet, MdAgriculture,
  MdLocationCity, MdHouse, MdBusinessCenter, MdDeliveryDining, MdMoreHoriz, MdCircle, MdFavorite,
} from "react-icons/md";

const MAP: Record<string, any> = {
  Accessibility: MdAccessible, BellRing: MdNotificationsActive, BookOpen: MdMenuBook,
  Briefcase: MdWork, Building2: MdApartment, Bus: MdDirectionsBus, CheckCircle: MdCheckCircle,
  ClipboardCheck: MdAssignmentTurnedIn, Clock: MdAccessTimeFilled, Coins: MdMonetizationOn,
  DoorOpen: MdMeetingRoom, FileCheck: MdFactCheck, Globe: MdPublic, GraduationCap: MdSchool,
  Headphones: MdSupportAgent, HeartHandshake: MdVolunteerActivism, HeartPulse: MdMonitorHeart,
  Home: MdHome, Hospital: MdLocalHospital, IndianRupee: MdCurrencyRupee, Landmark: MdAccountBalance,
  Laptop: MdLaptopMac, Lightbulb: MdLightbulb, MapPin: MdLocationOn, Megaphone: MdCampaign,
  Phone: MdCall, PiggyBank: MdSavings, Rocket: MdRocketLaunch, Route: MdRoute, Scale: MdBalance,
  School: MdSchool, Search: MdSearch, ShieldCheck: MdVerifiedUser, ShieldPlus: MdHealthAndSafety,
  Smartphone: MdSmartphone, Smile: MdSentimentSatisfiedAlt, Sparkles: MdAutoAwesome,
  Stethoscope: MdMedicalServices, Store: MdStorefront, Ticket: MdConfirmationNumber,
  TrendingDown: MdTrendingDown, TrendingUp: MdTrendingUp, Trophy: MdEmojiEvents, UserCheck: MdHowToReg,
  Users: MdGroups, Wallet: MdAccountBalanceWallet, Wheat: MdAgriculture, Favorite: MdFavorite,
  // split / category helpers
  City: MdLocationCity, Town: MdHouse, Rural: MdAgriculture, LongRoute: MdRoute,
  Government: MdAccountBalance, Aided: MdVolunteerActivism, Private: MdBusinessCenter,
  BankDBT: MdAccountBalance, CoopBank: MdSavings, Doorstep: MdDeliveryDining, Other: MdMoreHoriz,
  Micro: MdStorefront, Self: MdWork, Startup: MdRocketLaunch, HomeBased: MdHome,
};

export function FilledIcon({ name, size = 20, className = "", style }: { name: string; size?: number; className?: string; style?: React.CSSProperties }) {
  const C = MAP[name] || MdCircle;
  return <C size={size} className={className} style={style} />;
}

// map a category split label to a filled-icon name
export function splitIconName(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("city")) return "City";
  if (l.includes("town")) return "Town";
  if (l.includes("rural") || l.includes("agri")) return "Rural";
  if (l.includes("long")) return "LongRoute";
  if (l.includes("government") || l.includes("govt")) return "Government";
  if (l.includes("aided")) return "Aided";
  if (l.includes("private")) return "Private";
  if (l.includes("bank dbt") || l.includes("dbt")) return "BankDBT";
  if (l.includes("co-op") || l.includes("co-operative")) return "CoopBank";
  if (l.includes("doorstep") || l.includes("assisted")) return "Doorstep";
  if (l.includes("micro")) return "Micro";
  if (l.includes("self")) return "Self";
  if (l.includes("startup") || l.includes("innovation")) return "Startup";
  if (l.includes("home")) return "HomeBased";
  if (l.includes("mission") || l.includes("charit")) return "HeartHandshake";
  if (l.includes("welfare") || l.includes("centre") || l.includes("center")) return "Building2";
  if (l.includes("health camp") || l.includes("camp")) return "Hospital";
  if (l.includes("helpline") || l.includes("outreach")) return "Headphones";
  return "Other";
}
