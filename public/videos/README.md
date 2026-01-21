# Videos Folder Structure

This folder contains all video files used in the Envoy Media website.

## Current Videos

### Hero Section
- `hero-video.mp4` - Background video for the hero section (42MB, MOV format)
  - Original filename: IMG_8366.MOV
  - Usage: Auto-playing background video on homepage

## Video Guidelines

### Recommended Specifications:
- **Format:** MP4 (H.264 codec) for best browser compatibility
- **Resolution:** 1920x1080 (Full HD) or 1280x720 (HD)
- **Aspect Ratio:** 16:9 for hero videos
- **Frame Rate:** 24-30 fps
- **File Size:** Compress to <50MB for reasonable loading times
- **Duration:** 10-30 seconds for background loops

### Optimization Tips:
1. Use HandBrake or FFmpeg to compress videos
2. Remove audio track if not needed (hero videos are muted)
3. Consider creating multiple quality versions for responsive loading
4. Use poster images (thumbnails) for videos that aren't auto-playing

### Example FFmpeg Compression Command:
```bash
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart output.mp4
```

## Adding New Videos

When adding new videos:

1. Add the video file to `/videos/`
2. Update the relevant component (e.g., Hero.tsx)
3. Ensure video is optimized for web delivery
4. Test loading performance across different connection speeds
5. Consider adding a poster image for the video

## Portfolio Video Thumbnails

For portfolio video items, the thumbnail images should be placed in `/images/portfolio/` with a `.jpg` extension, not in this folder. Only the actual playable video files belong here.
