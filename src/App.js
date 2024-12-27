import React, { useState } from 'react';
import DamageChart from './DamageChart.js';
import UserInputs from './UserInputs';
import { defaultAttackData, skills } from './DataTypes';
import Header from './Header';
import Footer from './Footer';

function App() {
  const [userSkills, setUserSkills] = useState(skills);
  const [userAttacks, setUserAttacks] = useState(defaultAttackData);
  return (
    <div className="App">
      <Header />
      <UserInputs updateSkills={setUserSkills} updateAttacks={setUserAttacks} />
      <DamageChart skills={userSkills} attacks={userAttacks} />
      <Footer />
    </div>
  );
}

export default App;