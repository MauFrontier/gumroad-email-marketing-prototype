import './App.scss';
import EmailCampaignBuilder from './features/EmailMarketing/EmailCampaignBuilder/EmailCampaignBuilder';

function App() {
  return (
    <div data-testid="App" className="app">
      <EmailCampaignBuilder />
    </div>
  );
}

export default App;
