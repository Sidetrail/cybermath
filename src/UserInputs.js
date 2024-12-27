import React, { useState } from 'react';
import { skills, defaultAttackData, ranges } from './DataTypes';
import "./UserInput.css";

const UserInputs = ({ updateAttacks, updateSkills }) => {
    const [userSkills, setUserSkills] = useState(skills);
    const [userAttacks, setUserAttacks] = useState(defaultAttackData);

    const getSkillInput = (skillName) => {
        return (
            <div className="skill" key={skillName}>
                <label className="skillLabel">{camelCaseConversion(skillName)}</label>
                <input type="number" className="singleNumber" value={userSkills[skillName]} onChange={(e) => setUserSkills({ ...userSkills, [skillName]: +e.target.value })} />
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
                    <label>Attack Name</label>
                    <input type="text" value={attack.name} onChange={(e) => setUserAttacks([...userAttacks.filter(i => i.name !== attack.name), { ...attack, name: e.target.value }])} />
                </div>
                <div className="weaponEntryPair">
                    <label>Range Table</label>
                    <select value={attack.rangeType} onChange={(e) => setUserAttacks([...userAttacks.filter(i => i.name !== attack.name), { ...attack, rangeType: e.target.value }])}>
                        {Object.keys(ranges["1: cqc 0-6m"]).map(rangeTable => (<option value={rangeTable}>{rangeTable}</option>))}
                    </select>
                </div>
                <div className="weaponEntryPair">
                    <label>Weapon Skill</label>
                    <select value={attack.skill} onChange={(e) => setUserAttacks([...userAttacks.filter(i => i.name !== attack.name), { ...attack, skill: e.target.value }])}>
                        {Object.keys(skills).map(skill => (<option value={skill}>{camelCaseConversion(skill)}</option>))}
                    </select>
                </div>
                <div className="weaponEntryPair">
                    <label>Damage</label>
                    <input type="text" value={attack.damage || '0d6'} onChange={(e) => setUserAttacks([...userAttacks.filter(i => i.name !== attack.name), { ...attack, damage: e.target.value }])} />
                </div>
                <div className="weaponEntryPair">
                    <label>Rate of Fire</label>
                    <input type="number" className="singleNumber" value={attack.rof || 1} onChange={(e) => setUserAttacks([...userAttacks.filter(i => i.name !== attack.name), { ...attack, rof: e.target.value }])} />
                </div>
                <div className="weaponEntryPair">
                    <label>Bonus</label>
                    <input type="number" className="singleNumber" value={attack.bonus || 0} onChange={(e) => setUserAttacks([...userAttacks.filter(i => i.name !== attack.name), { ...attack, bonus: e.target.value }])} />
                </div>
                <div className="weaponEntryPair">
                    <label>Auto Fire Multiplier</label>
                    <input type="number" className="singleNumber" value={attack.autofiremax || 0} onChange={(e) => setUserAttacks([...userAttacks.filter(i => i.name !== attack.name), { ...attack, autofiremax: e.target.value }])} />
                </div>
                <div className="weaponEntryPair">
                    <label>Bonus Damage</label>
                    <input type="number" className="singleNumber" value={attack.damageBonus || 0} onChange={(e) => setUserAttacks([...userAttacks.filter(i => i.name !== attack.name), { ...attack, damageBonus: e.target.value }])} />
                </div>
            </div>)
    }

    const regerateTables = () => {
        updateAttacks(userAttacks);
        updateSkills(userSkills);
    }

    return (
        <div className="userInput">
            <div className="inputArea">
                <div className="skillArea">
                    {Object.keys(skills).map(skill => getSkillInput(skill))}
                </div>
                <div className="weaponArea">
                    {userAttacks.map(attack => getAttackInput(attack))}
                    <div>
                        Add Additional Attack?
                        <button onClick={() => setUserAttacks([...userAttacks, { name: "new" }])}>+</button>
                    </div>
                </div>
            </div>
            <button onClick={regerateTables} className="regenButton">Regenerate Tables</button>
        </div>
    );
}

export default UserInputs;