import './App.scss';
import EmailCampaign from './features/EmailMarketing/EmailCampaign/EmailCampaign';

function App() {
  return (
    <div data-testid="App" className="app">
      <EmailCampaign />
    </div>
  );
}

export default App;
