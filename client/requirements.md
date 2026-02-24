## Packages
framer-motion | Page transitions, micro-interactions, and beautiful layout animations
lucide-react | High-quality icons for the interface
recharts | Data visualization for dashboard and pool progress
clsx | Utility for constructing className strings conditionally
tailwind-merge | Utility to merge tailwind classes without style conflicts
@hookform/resolvers | React Hook Form resolvers for Zod integration
react-hook-form | Form state management
zod | Schema validation

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["var(--font-display)"],
  sans: ["var(--font-sans)"],
}
The app assumes credentials are included in fetch requests for auth.
Dynamic routes are handled by wouter.
All links use href prop directly on the Link component.
