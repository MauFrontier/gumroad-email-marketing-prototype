import './App.scss';
import EmailCampaignBuilder from './features/EmailMarketing/EmailCampaignBuilder/EmailCampaignBuilder';
import {EmailMarketingProvider} from './features/EmailMarketing/store/emailMarketingStore';

function App() {
  return (
    <EmailMarketingProvider>
      <main data-testid="App">
        <EmailCampaignBuilder />
      </main>
    </EmailMarketingProvider>
  );
}

export default App;
