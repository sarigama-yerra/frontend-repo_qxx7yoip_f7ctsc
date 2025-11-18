import { useState } from 'react'

function emptyScripture() {
  return { scripture: '', chapter: '', verses: '', quote: '', notes: '' }
}

function AddMediaModal({ open, onClose, onSaved }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({
    title: '',
    platform: 'youtube',
    youtube_id: '',
    url: '',
    thumbnail: '',
    published_at: '',
    tags: '',
    language: 'Hindi',
    duration_seconds: ''
  })
  const [scriptures, setScriptures] = useState([emptyScripture()])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const updateField = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const addScripture = () => setScriptures(prev => [...prev, emptyScripture()])
  const removeScripture = (idx) => setScriptures(prev => prev.filter((_, i) => i !== idx))
  const updateScripture = (idx, k, v) => setScriptures(prev => prev.map((s, i) => i === idx ? { ...s, [k]: v } : s))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = {
        title: form.title,
        platform: form.platform,
        youtube_id: form.youtube_id || null,
        url: form.url,
        thumbnail: form.thumbnail || null,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        scriptures: scriptures.filter(s => s.scripture.trim().length > 0),
        speaker: 'Premanand Maharaj',
        language: form.language,
        duration_seconds: form.duration_seconds ? parseInt(form.duration_seconds) : null
      }

      const res = await fetch(`${baseUrl}/api/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`Save failed: ${res.status}`)
      onSaved && onSaved()
      onClose && onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-3xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-white font-semibold">Add Media</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <form onSubmit={submit} className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-1">Title</label>
            <input value={form.title} onChange={e => updateField('title', e.target.value)} required className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Platform</label>
            <select value={form.platform} onChange={e => updateField('platform', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white">
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">YouTube ID (optional)</label>
            <input value={form.youtube_id} onChange={e => updateField('youtube_id', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-1">URL</label>
            <input value={form.url} onChange={e => updateField('url', e.target.value)} required className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-1">Thumbnail URL</label>
            <input value={form.thumbnail} onChange={e => updateField('thumbnail', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Published At</label>
            <input type="date" value={form.published_at} onChange={e => updateField('published_at', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Language</label>
            <input value={form.language} onChange={e => updateField('language', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Duration (seconds)</label>
            <input type="number" min="0" value={form.duration_seconds} onChange={e => updateField('duration_seconds', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-1">Tags (comma separated)</label>
            <input value={form.tags} onChange={e => updateField('tags', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
          </div>

          <div className="md:col-span-2 border-t border-slate-800 pt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-slate-200 font-medium">Scripture References</h4>
              <button type="button" onClick={addScripture} className="text-sm text-blue-400 hover:text-blue-300">+ Add</button>
            </div>
            <div className="space-y-3">
              {scriptures.map((s, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  <input placeholder="Scripture (e.g., Bhagavad Gita)" value={s.scripture} onChange={e => updateScripture(idx, 'scripture', e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white md:col-span-2" />
                  <input placeholder="Chapter" value={s.chapter} onChange={e => updateScripture(idx, 'chapter', e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
                  <input placeholder="Verses" value={s.verses} onChange={e => updateScripture(idx, 'verses', e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => removeScripture(idx)} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded">Remove</button>
                  </div>
                  <textarea placeholder="Quote/Notes" value={s.quote} onChange={e => updateScripture(idx, 'quote', e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white md:col-span-5" />
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="md:col-span-2 text-red-400 bg-red-900/20 border border-red-700/30 rounded px-3 py-2">{error}</div>
          )}

          <div className="md:col-span-2 flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 text-white">Cancel</button>
            <button disabled={saving} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMediaModal
