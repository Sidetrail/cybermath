import React, { useState } from 'react';
import { skills, defaultAttackData, ranges } from './DataTypes';
import "./UserInput.css";

const UserInputs = ({updateAttacks, updateSkills}) => {
    const [userSkills, setUserSkills] = useState(skills);
    const [userAttacks, setUserAttacks] = useState(defaultAttackData);

    const getSkillInput = (skillName) => {
        return (
        <div key={skillName}>
            <label>{camelCaseConversion(skillName)}</label>
            <input type="text" value={userSkills[skillName]} onChange={(e)=>setUserSkills({...userSkills, [skillName]:+e.target.value})}/>
        </div>)
    }

    const camelCaseConversion = (camelCaseString) => {
        const spacedString = camelCaseString.replace(/([A-Z])/g, ' $1').trim(); // Insert spaces before capital letters
        const capitalizedString = spacedString.charAt(0).toUpperCase() + spacedString.slice(1); // Capitalize first letter
        
        return capitalizedString;
    }

    const getAttackInput = (attack) => {
        return (
            <div className="weaponEntry" key={attack.name}>
                <div className="weaponEntryPair">
                    <label>Name</label>
                    <input type="text" value={attack.name} onChange={(e)=>setUserAttacks([...userAttacks.filter(i => i.name != attack.name), {...attack, name:e.target.value}])}/>
                </div>
                <div className="weaponEntryPair">
                    <label>Range Table</label>
                    <select value={attack.rangeType} onChange={(e)=>setUserAttacks([...userAttacks.filter(i => i.name != attack.name), {...attack, rangeType: e.target.value }])}>
                        {Object.keys(ranges["1: cqc 0-6m"]).map(rangeTable => (<option value={rangeTable}>{rangeTable}</option>))}
                    </select>
                </div>
                <div className="weaponEntryPair">
                    <label>Weapon Skill</label>
                    <select value={attack.skill} onChange={(e)=>setUserAttacks([...userAttacks.filter(i => i.name != attack.name), {...attack, skill: e.target.value}])}>
                        {Object.keys(skills).map(skill => (<option value={skill}>{camelCaseConversion(skill)}</option>))}
                    </select>
                </div>
                <div className="weaponEntryPair">
                    <label>Damage</label>
                    <input type="text" value={attack.damage || '0d6'} onChange={(e)=>setUserAttacks([...userAttacks.filter(i => i.name != attack.name), {...attack, damage:e.target.value }])}/>
                </div>
                <div className="weaponEntryPair">
                    <label>Bonus</label>
                    <input type="text" value={attack.bonus || 0} onChange={(e)=>setUserAttacks([...userAttacks.filter(i => i.name != attack.name), {...attack, bonus:e.target.value}])}/>
                </div>
                <div className="weaponEntryPair">
                    <label>Auto Fire Multiplier</label>
                    <input type="text" value={attack.autofiremax || 0} onChange={(e)=>setUserAttacks([...userAttacks.filter(i => i.name != attack.name), {...attack, autofiremax:e.target.value}])}/>
                </div>
                <div className="weaponEntryPair">
                    <label>Bonus Damage</label>
                    <input type="text" value={attack.damageBonus || 0} onChange={(e)=>setUserAttacks([...userAttacks.filter(i => i.name != attack.name), {...attack, damageBonus:e.target.value}])}/>
                </div>
            </div>)
    }

    // { name: "Assault Rifle Single Shot", rangeType: "Assault Rifle", skill: "shoulderArms", damage: "5d6", bonus: 2 },
    // { name: "Assault Rifle Autofire", rangeType: "Assault Rifle Autofire", skill: "autofire", damage: "2d6", bonus: 2, autofiremax: 4 },
    // { name: "Assault Rifle Targeted Head Shot", rangeType: "Assault Rifle", skill: "shoulderArms", damage: "5d6", bonus: -4, multiplier: 2 },
    // { name: "Assault Rifle Targeted Leg Shot", rangeType: "Assault Rifle", skill: "shoulderArms", damage: "5d6", bonus: -4, damageBonus: 5 }

    const regerateTables = () => {
        console.log("NEW STATE", userAttacks, userSkills)
        updateAttacks(userAttacks);
        updateSkills(userSkills);
    }

  return (
    <div className="inputArea">
        <div className="skillArea">
            {Object.keys(skills).map(skill => getSkillInput(skill))}
        </div>
        <div className="weaponArea">
            {userAttacks.map(attack => getAttackInput(attack))}
            <div>
                Add Additional Attack?
                <button onClick={()=>setUserAttacks([...userAttacks, {name:"new"}])}>+</button>
            </div>
        </div>
        <button onClick={regerateTables}>REGEN TABLES</button>
    </div>
  );
}

export default UserInputs;