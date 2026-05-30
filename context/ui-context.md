# UI Context

## Theme

Modern and polished layout. The design language should feel clean, professional, and optimized for an AI tooling workspace. Responsive and mobile-friendly.

## Components & Styling

- Framework: Next.js 15
- Styling: Tailwind CSS
- Component Library: shadcn/ui

## Colors

Use shadcn/ui default theming or customize with modern CSS variables.

| Role            | CSS Variable       |
| --------------- | ------------------ |
| Background      | `--background`     |
| Foreground      | `--foreground`     |
| Primary         | `--primary`        |
| Secondary       | `--secondary`      |
| Muted           | `--muted`          |
| Accent          | `--accent`         |
| Border          | `--border`         |

## Typography

| Role      | Font                | Variable      |
| --------- | ------------------- | ------------- |
| UI text   | Default Sans (Inter)| `--font-sans` |
| Code/mono | Default Mono        | `--font-mono` |

## Layout Patterns

- **Sidebar Navigation**: Dashboard, Offerings, Prompts, Prospects, Messages, Analytics.
- **Analytics Cards**: Simple cards for total messages, total prospects, total replies, most used offering. Complex analytics are unnecessary.
- **Forms**: Clean inputs for offering creation, prompt creation, and prospect URL/notes inputs.
- **Generative UI**: Loading states during AI generation, minimal waiting perceived by user.

## Icons

Lucide React. Stroke-based icons for navigation and actions.
