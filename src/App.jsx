import { useState } from 'react'
import Header from './components/Header'
import Gallery from './components/Gallery'
import AddMediaModal from './components/AddMediaModal'

function App() {
  const [open, setOpen] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(0)

  const onSaved = () => setRefreshFlag(x => x + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative">
        <Header onAddClick={() => setOpen(true)} />
        {/* Use key to force reload when new item added */}
        <div key={refreshFlag}>
          <Gallery />
        </div>
        <AddMediaModal open={open} onClose={() => setOpen(false)} onSaved={onSaved} />
      </div>
    </div>
  )
}

export default App
