import React, { useState } from 'react';
import { skills, defaultAttackData, ranges, entryExplination } from './DataTypes';
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
            <div className="weaponEntry" key={attack.id}>
                <div className="weaponEntryPair">
                    <label data-tooltip={entryExplination.name}>Attack Name</label>
                    <input defaultValue={attack.name} onChange={(e) => setUserAttacks([...userAttacks.map(i => i.name !== attack.name ? i : { ...attack, name: e.target.value })])} />
                </div>
                <div className="weaponEntryPair">
                    <label data-tooltip={entryExplination.rangeType}>Range Table</label>
                    <select defaultValue={attack.rangeType} onChange={(e) => setUserAttacks([...userAttacks.map(i => i.name !== attack.name ? i : { ...attack, rangeType: e.target.value })])}>
                        {Object.keys(ranges["1: cqc 0-6m"]).map(rangeTable => (<option key={rangeTable+attack.id} value={rangeTable}>{rangeTable}</option>))}
                    </select>
                </div>
                <div className="weaponEntryPair">
                    <label data-tooltip={entryExplination.skill}>Weapon Skill</label>
                    <select defaultValue={attack.skill} onChange={(e) => setUserAttacks([...userAttacks.map(i => i.name !== attack.name ? i : { ...attack, skill: e.target.value })])}>
                        {Object.keys(skills).map(skill => (<option key={skill+attack.id} value={skill}>{camelCaseConversion(skill)}</option>))}
                    </select>
                </div>
                <div className="weaponEntryPair">
                    <label data-tooltip={entryExplination.damage}>Damage</label>
                    <input type="text" defaultValue={attack.damage || '0d6'} className="damageInput" onChange={(e) => setUserAttacks([...userAttacks.map(i => i.name !== attack.name ? i : { ...attack, damage: e.target.value })])} />
                </div>
                <div className="weaponEntryPair">
                    <label data-tooltip={entryExplination.rof}>Rate of Fire</label>
                    <input type="number" className="singleNumber" defaultValue={attack.rof || 1} onChange={(e) => setUserAttacks([...userAttacks.map(i => i.name !== attack.name ? i : { ...attack, rof: e.target.value })])} />
                </div>
                <div className="weaponEntryPair">
                    <label data-tooltip={entryExplination.bonus}>To Hit Bonus</label>
                    <input type="number" className="singleNumber" defaultValue={attack.bonus || 0} onChange={(e) => setUserAttacks([...userAttacks.map(i => i.name !== attack.name ? i : { ...attack, bonus: e.target.value })])} />
                </div>
                <div className="weaponEntryPair">
                    <label data-tooltip={entryExplination.autofiremax}>Autofire Multiplier</label>
                    <input type="number" className="singleNumber" defaultValue={attack.autofiremax || 0} onChange={(e) => setUserAttacks([...userAttacks.map(i => i.name !== attack.name ? i : { ...attack, autofiremax: e.target.value })])} />
                </div>
                <div className="weaponEntryPair">
                    <label data-tooltip={entryExplination.damageBonus}>Bonus Damage</label>
                    <input type="number" className="singleNumber" defaultValue={attack.damageBonus || 0} onChange={(e) => setUserAttacks([...userAttacks.map(i => i.name !== attack.name ? i : { ...attack, damageBonus: +e.target.value })])} />
                </div>
                <div className="weaponEntryPair">
                    <label data-tooltip={entryExplination.multiplier}>Damage Multiplier</label>
                    <input type="number" className="singleNumber" defaultValue={attack.multiplier || 1} onChange={(e) => setUserAttacks([...userAttacks.map(i => i.name !== attack.name ? i : { ...attack, multiplier: e.target.value })])} />
                </div>
                <div className="weaponEntryPair">
                    <button className="removeAttack" onClick={() => setUserAttacks([...userAttacks.filter(i => i.name !== attack.name)])}>Remove</button>
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
                    Weapon Skills
                    {Object.keys(skills).map((skill, index) => getSkillInput(skill, index))}
                </div>
                <div className="weaponArea">
                    Attack Types
                    {userAttacks.map(attack => getAttackInput(attack))}
                    <div>
                        Add Additional Attack
                        <button className="addAttack" onClick={() => setUserAttacks([...userAttacks, { id: crypto.randomUUID(), name: "new", rangeType: "Assault Rifle", skill: "autofire", damage: "5d6", bonus: 0, damageBonus: 0, rof: 1}])}>+</button>
                    </div>
                </div>
            </div>
            <button onClick={regerateTables} className="regenButton">Regenerate Tables</button>
        </div>
    );
}

export default UserInputs;