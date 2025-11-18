import { useEffect, useState } from 'react'
import VideoCard from './VideoCard'

function Gallery() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [platform, setPlatform] = useState('')
  const [scripture, setScripture] = useState('')

  const load = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (platform) params.set('platform', platform)
    if (scripture) params.set('scripture', scripture)
    const res = await fetch(`${baseUrl}/api/videos?${params.toString()}`)
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const onSubmit = (e) => { e.preventDefault(); load() }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <input placeholder="Search by title or tag" value={q} onChange={e => setQ(e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
        <select value={platform} onChange={e => setPlatform(e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white">
          <option value="">All platforms</option>
          <option value="youtube">YouTube</option>
          <option value="instagram">Instagram</option>
          <option value="other">Other</option>
        </select>
        <input placeholder="Scripture name (e.g., Gita)" value={scripture} onChange={e => setScripture(e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
        <button className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2">Search</button>
      </form>

      {loading ? (
        <div className="text-slate-300">Loading...</div>
      ) : (
        items.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => <VideoCard key={item.id} video={item} />)}
          </div>
        ) : (
          <div className="text-slate-300">No media found. Try adding some.</div>
        )
      )}
    </div>
  )
}

export default Gallery
