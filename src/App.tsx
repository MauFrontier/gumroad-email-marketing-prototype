import './App.css';
import TextInput from './features/shared/ui/TextInput';

function App() {
  return (
    <div data-testid="App">
      <label htmlFor="name">Name:</label>
      <div>
        <TextInput id="name" />
      </div>
    </div>
  );
}

export default App;
