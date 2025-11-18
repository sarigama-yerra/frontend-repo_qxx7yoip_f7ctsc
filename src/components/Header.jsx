import { useState } from 'react'

function Header({ onAddClick }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
          <div>
            <h1 className="text-white font-semibold leading-tight">Premanand Maharaj Media Library</h1>
            <p className="text-xs text-slate-400 -mt-0.5">Reels, talks and all referenced scriptures</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onAddClick} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors">
            <span className="text-sm font-medium">Add Media</span>
          </button>
          <a href="/test" className="text-xs text-slate-400 hover:text-slate-200">Status</a>
        </div>
      </div>
    </header>
  )
}

export default Header
