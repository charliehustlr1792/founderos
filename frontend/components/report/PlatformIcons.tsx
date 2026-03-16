// Branded platform SVG icons — each uses its official brand color

export function RedditIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-label="Reddit">
      {/* Orange circle background */}
      <circle cx="10" cy="10" r="10" fill="#FF4500"/>
      {/* White mascot */}
      <path fill="#fff" d="M16.67 10.46a1.38 1.38 0 00-2.32-.97 6.78 6.78 0 00-3.65-.92l.62-2.93 2.03.43a.95.95 0 10.1-.9l-2.27-.48a.16.16 0 00-.19.12l-.7 3.28a6.8 6.8 0 00-3.66.92 1.38 1.38 0 10-1.52 2.27c-.01.14-.01.27 0 .42 0 2.13 2.48 3.86 5.54 3.86s5.54-1.73 5.54-3.86c.01-.15.01-.28 0-.42a1.38 1.38 0 00.48-1.82zM7.13 11.38a.95.95 0 111.9 0 .95.95 0 01-1.9 0zm5.3 2.52a3.07 3.07 0 01-2.7-.48 3.07 3.07 0 01-2.7.48.16.16 0 01-.23-.23 2.92 2.92 0 002.93-.47 2.92 2.92 0 002.93.47.16.16 0 01-.23.23zm-.24-1.57a.95.95 0 110-1.9.95.95 0 010 1.9z"/>
    </svg>
  )
}

export function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="X">
      <rect width="24" height="24" rx="4" fill="#000"/>
      <path fill="#fff" d="M17.53 4.5h2.8l-6.12 7 7.2 9.5h-5.64l-3.99-5.27-4.57 5.27H4.4l6.54-7.54L3.2 4.5h5.78l3.61 4.77zm-.98 14.8h1.55L7.56 6.06H5.9z"/>
    </svg>
  )
}

export function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="LinkedIn">
      <rect width="24" height="24" rx="3" fill="#0A66C2"/>
      <path fill="#fff" d="M7.2 9.8H4.6v8.4h2.6V9.8zm-1.3-4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm13.9 4.9c-.5-1.4-1.6-2.1-3-2.1-1.3 0-2.1.5-2.7 1.3V9.8H11.5v8.4h2.6v-4.4c0-1.2.6-1.9 1.6-1.9s1.5.7 1.5 1.9v4.4h2.6v-4.5c0-.7-.1-1.3-.3-1.8z"/>
    </svg>
  )
}

export function DiscordIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Discord">
      <rect width="24" height="24" rx="5" fill="#5865F2"/>
      <path fill="#fff" d="M19.54 5.08A18.77 18.77 0 0015 3.64a.07.07 0 00-.07.04 13.1 13.1 0 00-.58 1.19 17.33 17.33 0 00-5.21 0A12.1 12.1 0 008.56 3.68a.07.07 0 00-.07-.04 18.73 18.73 0 00-4.54 1.44.07.07 0 00-.03.03C1.36 8.72.82 12.27 1.09 15.77a.08.08 0 00.03.05 18.9 18.9 0 005.7 2.88.07.07 0 00.08-.03c.44-.6.83-1.24 1.17-1.9a.07.07 0 00-.04-.1 12.44 12.44 0 01-1.78-.85.07.07 0 010-.12c.12-.09.24-.18.35-.28a.07.07 0 01.07-.01c3.74 1.71 7.79 1.71 11.49 0a.07.07 0 01.07.01c.12.1.23.19.35.28a.07.07 0 010 .12c-.57.33-1.17.61-1.78.85a.07.07 0 00-.04.1c.35.65.74 1.28 1.17 1.89a.07.07 0 00.08.03 18.84 18.84 0 005.71-2.88.08.08 0 00.03-.05c.33-3.99-.56-7.46-2.35-10.66a.06.06 0 00-.03-.03zM8.52 13.58c-1.13 0-2.05-1.04-2.05-2.3s.91-2.3 2.05-2.3c1.15 0 2.07 1.04 2.05 2.3 0 1.26-.91 2.3-2.05 2.3zm7.58 0c-1.13 0-2.05-1.04-2.05-2.3s.9-2.3 2.05-2.3c1.15 0 2.07 1.04 2.05 2.3 0 1.26-.9 2.3-2.05 2.3z"/>
    </svg>
  )
}

export function IndieHackersIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Indie Hackers">
      <rect width="24" height="24" rx="4" fill="#0E2150"/>
      <path fill="#fff" d="M5 6h3.5v12H5V6zm6 0H14c3.3 0 5 1.7 5 4.5v3C19 16.3 17.3 18 14 18H11V6zm3.5 3.5H14v6h.5c1.2 0 1.5-.6 1.5-1.5v-3c0-.9-.3-1.5-1.5-1.5z"/>
    </svg>
  )
}

export function SlackIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Slack">
      <rect width="24" height="24" rx="5" fill="#4A154B"/>
      <path fill="#fff" d="M9 5.5a1.5 1.5 0 00-3 0v4h3V5.5zm-1.5 5.5a1.5 1.5 0 000 3h4V11H7.5zM14.5 19a1.5 1.5 0 003 0v-4h-3v4zm1.5-5.5a1.5 1.5 0 000-3h-4v3h4zM5.5 15a1.5 1.5 0 100-3H3v1.5A1.5 1.5 0 005.5 15zm5.5-1.5V15H9.5a1.5 1.5 0 010-3H11v2.5zM18.5 9a1.5 1.5 0 100 3H21V10.5A1.5 1.5 0 0018.5 9zM13 9.5V8h1.5a1.5 1.5 0 010 3H13V9.5z"/>
    </svg>
  )
}

export function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Facebook">
      <circle cx="12" cy="12" r="12" fill="#1877F2"/>
      <path fill="#fff" d="M16.5 8H14c-.3 0-.5.2-.5.5V10H16l-.3 2.5H13.5V19h-3v-6.5H9V10h1.5V8.5C10.5 6.6 11.6 5 14 5h2.5v3z"/>
    </svg>
  )
}
