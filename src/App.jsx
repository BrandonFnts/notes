import { NoteListView } from './features/notes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <ReactiveProvider>
        <NoteListView />
        <Toaster />
      </ReactiveProvider>
    </>
  )
}

export default App

const ReactiveProvider = ({ children }) => {
  return <>{children}</>;
};
