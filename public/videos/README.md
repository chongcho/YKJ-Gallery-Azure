# Video files

**Not stored in git:** `.mp4` files in this folder are listed in `.gitignore` because the total size exceeds the **Azure Static Web Apps** free-tier deployment limit (~250 MB for app content).

**Options:**

1. **YouTube or Vimeo** — Set `youtubeId` or `vimeoId` on each entry in `src/data/videos.ts`. No large files in the deploy bundle.
2. **Local / manual hosting** — Keep `.mp4` files only on your machine under `public/videos/` for local testing; do not commit them. To ship self-hosted video later, use **Azure Blob Storage**, a CDN, or upgrade to a plan with a higher size limit.

Filenames used by `src/data/videos.ts` (add `src` when you host the file):

- `Taos.mp4`, `Adobe 1.mp4`, `Adobe 2.mp4`, `Adobe 3.mp4`
- `Cactus 1.mp4` … `Cactus 6.mp4` (excluding unused numbers if any)
- `Blossom.mp4`, `Flowers.mp4`, `Flowers 2.mp4`, `Rose 2.mp4`, `Autumn Leaves.mp4`

Supported formats: **mp4**, **webm**
