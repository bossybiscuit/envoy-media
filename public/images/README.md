# Images Folder Structure

This folder contains all images used in the Envoy Media website.

## Folder Organization

### `/images/`
- `nav-logo.png` - Navigation bar logo (current: 13KB)
- `favicon.png` - Site favicon

### `/images/portfolio/`
Portfolio gallery images. Add your actual portfolio images here with the following filenames:

**Photography:**
- `luxury-estate.jpg` - Luxury estate photography showcase
- `downtown-condo.jpg` - Downtown condo photography

**Videography:**
- `modern-home-tour.jpg` - Video thumbnail for modern home tour
- `waterfront-property.jpg` - Video thumbnail for waterfront property

**3D Tours:**
- `virtual-walkthrough.jpg` - 3D virtual tour thumbnail

**Vacation Rentals:**
- `beach-house-rental.jpg` - Beach house vacation rental thumbnail

## Image Guidelines

### Recommended Specifications:
- **Format:** JPG for photos, PNG for logos with transparency
- **Portfolio Images:** 1200x800px minimum (3:2 aspect ratio)
- **Thumbnails:** 800x600px (optimized for web)
- **File Size:** Compress images to <500KB for optimal loading
- **Naming:** Use lowercase, hyphenated names (e.g., `luxury-estate.jpg`)

### Optimization Tips:
1. Use tools like TinyPNG or ImageOptim to compress images
2. Consider WebP format for better compression
3. Include alt text in components for accessibility
4. Use lazy loading for portfolio images

## Adding New Portfolio Items

When adding new portfolio items:

1. Add the image to `/images/portfolio/`
2. Update `src/components/Portfolio.tsx` with the new item
3. Follow the existing naming convention
4. Ensure image is properly optimized before uploading
