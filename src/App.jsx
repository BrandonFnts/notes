import { NoteListView } from './features/notes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <NoteListView />
      <Toaster />
    </>
  )
}

export default App
