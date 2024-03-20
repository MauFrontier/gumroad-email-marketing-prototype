import './DeveloperTools.scss';

const DeveloperTools = () => {
  return (
    <div aria-label="Developer tools container">
      <header className="dev-tools-heading">
        <h2>Internal tools</h2>
        <img src="./src/assets/images/shushing-face-emoji.png" alt="Shhh..." />
      </header>
      <section role="region" aria-label="Developer tools"></section>
    </div>
  );
};

export default DeveloperTools;
