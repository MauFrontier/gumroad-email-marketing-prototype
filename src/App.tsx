import './App.scss';
import WorkflowBuilder from './features/EmailMarketing/WorkflowBuilder/WorkflowBuilder';
import {EmailMarketingProvider} from './features/EmailMarketing/store/emailMarketingStore';

function App() {
  return (
    <EmailMarketingProvider>
      <main data-testid="App">
        <WorkflowBuilder />
      </main>
    </EmailMarketingProvider>
  );
}

export default App;
