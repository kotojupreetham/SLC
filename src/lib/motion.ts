export const MOTION_TOKENS = {
  // Standardized motion durations in seconds
  durationFast: 0.16, // 160ms - hover and quick focus feedback
  durationMedium: 0.3, // 300ms - card selections and panel crossfades
  durationSlow: 0.7, // 700ms - major scene/dial transitions

  // Standardized easing curves
  easeStandard: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
} as const;
