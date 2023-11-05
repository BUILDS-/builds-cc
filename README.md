# BUILDS.cc

Install dependencies and run development server:

```shell
npm i
npm run develop
```

The site is now running at http://localhost:8000.

## Adding New Events

You can add new events using a markdown file in the `src/events/` directory. The filename should be in the format `YYYY-MM-DD-event-name.md`. The file should have the following format:

```markdown
---
title: "Event Title"
description: "Event description."
badges:
  - label: "Beginner Friendly"
    emoji: "👶"
  - label: "3D Modeling"
    emoji: "📐"
  - label: "3D Printing"
    emoji: "🖨️"
date: YYYY-MM-DDTHH:MM:SS-04:00
image: "./assets/events/event-image.jpg"
instructors:
  - name: "Instructor Name"
    image: "./assets/eboard/instructor-image.jpg"
location: "Location"
---
```

You can add any necessary image assets to the `src/assets/events/` directory. The image path in the markdown file should be relative to the `src/` directory.

Remember to run all images through https://tinypng.com/ before adding them to the site. This will reduce the file size and improve load times.