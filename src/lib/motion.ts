export const MOTION_TOKENS = {
  // Standardized motion durations in seconds
  durationFast: 0.18, // 180ms - hover, focus, press, and micro-interactions
  durationMedium: 0.28, // 280ms - card selections and panel crossfades
  durationStandard: 0.28, // 280ms - standard UI transitions
  durationEnter: 0.55, // 550ms - group and section reveals
  durationSlow: 0.7, // 700ms - major scene/dial transitions
  durationHero: 0.75, // 750ms - initial hero entry sequence

  // Stagger intervals in seconds
  staggerFast: 0.06, // 60ms between children in small groups (max 6 items)
  staggerMedium: 0.1, // 100ms between larger section elements

  // Standardized easing curves (no bouncy/elastic effects)
  easeStandard: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeSubtle: "cubic-bezier(0.25, 1, 0.5, 1)",
} as const;
