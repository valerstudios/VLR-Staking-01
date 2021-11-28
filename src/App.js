import * as Style from './style.js';
import StatusBar from './components/MetaMaskDetector/index.js';
import StakingBox from './components/StakingBox/index.js';
import StakingStats from './components/StakingStats/index.js'

function App() {
  return (
    <Style.MainArea>
      <StatusBar />
      <StakingBox />
      <StakingStats/>
    </Style.MainArea>

  );
}

export default App;
