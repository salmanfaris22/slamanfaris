#!/bin/sh
# Run once AFTER the site is live. Sets each public repo's website field to its case study page.
set -e
base="https://www.salmanfaris.in/projects"
gh repo edit salmanfaris22/video-editing-software --homepage "$base/lectern/"
gh repo edit salmanfaris22/mybuddy --homepage "$base/mybuddy/"
gh repo edit salmanfaris22/hms --homepage "$base/hms/"
gh repo edit salmanfaris22/intgome --homepage "$base/reel-series/"
gh repo edit salmanfaris22/reelbot-media --homepage "$base/reelbot/"
gh repo edit salmanfaris22/salmanfarisk --homepage "$base/atelier-monolith/"
echo "Done. Repos with their own live site or docs keep their existing homepage."
