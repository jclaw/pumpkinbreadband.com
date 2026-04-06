export interface Video {
  id: string
  youtubeId: string
  title: string
}

export const videos: Video[] = [
  { id: '1', youtubeId: '84lhFUkyBB4', title: 'Pepitas (Dimension Sound Sessions)' },
  { id: '2', youtubeId: 'B7YEh0IgBX4', title: 'Catch the Crow' },
  { id: '3', youtubeId: 'KFZ8waEZYc8', title: 'Corner of My Mind' },
  { id: '4', youtubeId: 'OtAl6oz8E0I', title: 'Pushes Back – Live at The Burren Backroom Series' },
  { id: '5', youtubeId: 'n7DBbGi51YM', title: 'Know You Too Well – Live in Takoma Park' },
  { id: '6', youtubeId: 'DCkVUbh8Lwc', title: 'Pushes Back – Live at Chianti' },
  { id: '7', youtubeId: '7qmPOFhDXaQ', title: 'The Brunch Party – Live at Chianti' },
  { id: '8', youtubeId: 'Gv9BqTccmtU', title: 'Song for a Friend' },
  { id: '9', youtubeId: 'ZVnox_fCVm0', title: 'Turn the Page Again (Tim O\'Brien cover)' },
  { id: '10', youtubeId: 'VQPyWaLTnWQ', title: 'Try to Understand' },
]

export function getYoutubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
}
