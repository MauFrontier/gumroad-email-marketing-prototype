
const DeveloperTools = () => {

  const scrollToDevTools = () => {
    if (devToolsRef.current) {
      devToolsRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };
  return (
    <div aria-label="Developer tools container">
      <div aria-label="Toggle show developer tools">
        {state.showDevTools ? (
          <Button
            label="Show developer tools button"
            onClick={() => ShowOrHideDeveloperTools(false)}>
            <Icon type={IconType.Code} /> Hide developer tools
          </Button>
        ) : (
          <Button
            label="Show developer tools button"
            onClick={() => ShowOrHideDeveloperTools(true)}>
            <Icon type={IconType.Code} /> Show developer tools
          </Button>
        )}
      </div>
    </div>
  );
};

export default DeveloperTools;
