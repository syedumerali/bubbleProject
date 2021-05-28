import { Platform } from 'react-native';

export const Fonts = {
  BM: "Barlow-Medium",
  BL: "Barlow-Light",
  BB: "Barlow-Bold",
  BR: "Barlow-Regular",
  BS: "Barlow-SemiBold",
  PM: "PlayfairDisplay-Medium",
  PB: "PlayfairDisplay-Bold",
  CB: 'CircularStd-Bold',
  CBook: 'CircularStd-Book',
  KM: 'Khand-Medium',
  KS: 'Khand-SemiBold',
  MB: Platform.OS == 'ios' ? 'MountainBridgeRegular' : 'MountainBridge',
}