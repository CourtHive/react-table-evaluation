import { TournamentProvider } from './hooks/useTournamentContext';
import HomePage from './pages/HomePage';
import { setDev } from './utils/setDev';

function App() {
  setDev();

  return (
    <TournamentProvider>
      <HomePage />
    </TournamentProvider>
  );
}

export default App;
