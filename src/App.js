import React, {useState} from 'react';
import DamageChart from './DamageChart'; 
import UserInputs from './UserInputs';
import { defaultAttackData, skills } from './DataTypes';

function App() {
  const [userSkills, setUserSkills] = useState(skills);
  const [userAttacks, setUserAttacks] = useState(defaultAttackData);
  return (
    <div className="App">
        <UserInputs updateSkills={setUserSkills} updateAttacks={setUserAttacks} />
        <DamageChart skills={userSkills} attacks={userAttacks} />
    </div>
  );
}

export default App;