function VideoCard({ video }) {
  const time = (secs) => {
    if (!secs) return null
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="group bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden hover:border-blue-500/40 transition-colors">
      <a href={video.url} target="_blank" rel="noreferrer" className="block">
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover" />
        ) : (
          <div className="w-full aspect-video bg-slate-700 grid place-items-center text-slate-300 text-sm">No thumbnail</div>
        )}
      </a>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 text-xs rounded bg-slate-700/60 text-slate-300">{video.platform}</span>
          {video.duration_seconds ? (
            <span className="px-2 py-0.5 text-xs rounded bg-slate-700/60 text-slate-300">{time(video.duration_seconds)}</span>
          ) : null}
        </div>
        <h3 className="text-white font-medium leading-snug line-clamp-2">{video.title}</h3>
        {video.scriptures?.length ? (
          <div className="mt-3 text-xs text-slate-300/90 space-x-2">
            {video.scriptures.slice(0, 3).map((s, i) => (
              <span key={i} className="inline-block mb-1 px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/20">
                {s.scripture}{s.chapter ? ` ${s.chapter}` : ''}{s.verses ? `:${s.verses}` : ''}
              </span>
            ))}
            {video.scriptures.length > 3 && (
              <span className="text-slate-400">+{video.scriptures.length - 3} more</span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default VideoCard
