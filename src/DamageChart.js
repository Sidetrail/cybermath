import React, { useState, useEffect } from 'react';
import './DamageChart.css'; 
import {enemyData, ranges, permutations} from './DataTypes.js'

const DamageChart = ({skills, attacks}) => {

    // Dice roll function
    const diceRoll = (diceString) => {
        const diceRegex = /(\d+)d(\d+)([+-]?\d*)?(?:x(\d+))?/;
        const match = diceString.match(diceRegex);

        const numDice = parseInt(match[1]);
        const numSides = parseInt(match[2]);
        const modifier = parseInt(match[3] || 0);
        const multiplier = parseInt(match[4] || 1);

        let total = 0;
        const rolls = [];
        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * numSides) + 1;
            total += roll;
            rolls.push(roll)
        }

        total = (total + modifier) * multiplier;

        return {
            rolls: rolls,
            total: total,
            modifier: modifier,
            multiplier: multiplier,
            diceString: diceString
        };
    };

    // Get dice string suffix for autofire weapons
    const getAutofireMultiplier = (diff, weapon) => {
        if (!weapon.autofiremax) { return "x1" }
        return weapon?.autofiremax < diff + 1 ? "x" + weapon.autofiremax : "x" + (+diff + 1);
    }

    // Function to run a single attack simulation
    const runAttack = (weaponAttack, enemy) => {
        let attackRoll = diceRoll("1d10+" + (+weaponAttack.bonus + +skills[weaponAttack.skill]));
        if(attackRoll.rolls[0] == 10){ // Dice crit handling
            attackRoll = diceRoll("1d10+" + attackRoll.total);
        } else if(attackRoll.rolls[0] == 1){
            attackRoll.total -= diceRoll("1d10").total;
        }
        const result = {}
        Object.keys(ranges).map(range => {
            const dv = ranges[range][weaponAttack.rangeType];
            const damageRoll = diceRoll(weaponAttack.damage + (getAutofireMultiplier(attackRoll.total - dv, weaponAttack) || 0));
            const damageBeforeReductions = attackRoll.total > dv ? damageRoll.total : 0;
            let damageAfterReductions = weaponAttack.multiplier ? (damageBeforeReductions - enemy.headSp) * weaponAttack.multiplier : damageBeforeReductions - enemy.bodySp;
            if (damageRoll.rolls.filter(i => i == 6).length > 2 && !weaponAttack.damageBonus) { // Critical damage, ignoring attacks that guarentee crits
                damageAfterReductions += 5;
            }
            if (damageAfterReductions > 0) { // Guarenteed crits like leg shots
                damageAfterReductions += weaponAttack.damageBonus || 0;
            }
            
            return result[range] = damageAfterReductions > 0 ? damageAfterReductions : 0;
        })
        return result;
    };    



    // Function to average simulation results
    const averageResults = (results, runAmount) => {
        const reducedResults = results.reduce((accumulator, current) => {
            const newAccumulator = {}
            Object.keys(current).map(a => newAccumulator[a] = current[a] + (accumulator[a] || 0))
            return newAccumulator
        }, {});
        Object.keys(reducedResults).map(key => reducedResults[key] = reducedResults[key] / runAmount)
        return reducedResults;
    }

    const generateHeatMapTable = (tableId, chartTitle, chartData) => {
        const armorLevels = Object.keys(chartData[chartTitle]);
        const rangeLabels = Object.keys(chartData[chartTitle]["Armor 0"]);

        return (
            <>
                <h2>{chartTitle}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Range / Armor</th>
                            {armorLevels.map((armorLevel) => (
                                <th key={armorLevel}>{armorLevel.replace("Armor ", "")}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rangeLabels.map((rangeLabel) => (
                            <tr key={rangeLabel}>
                                <td>{rangeLabel.replace(/\d+:\s/, "")}</td>
                                {armorLevels.map((armorLevel) => {
                                    const damage = chartData[chartTitle][armorLevel][rangeLabel];
                                    const color = getColorForValue(damage);

                                    return (
                                        <td key={armorLevel} className="heat-cell">
                                            <div className="heat-cell-color" style={{ backgroundColor: color }}>
                                                {damage.toFixed(1)}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }

    const generateBestTypeTable = (tableId, chartData) => {
        const attackTypes = Object.keys(chartData);
        const armorLevels = Object.keys(chartData[attackTypes[0]]);
        const rangeLabels = Object.keys(chartData[attackTypes[0]]["Armor 0"]);

        return (
            <>
                <h2>Best Attack Type</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Range / Armor</th>
                            {armorLevels.map((armorLevel) => (
                                <th key={armorLevel}>{armorLevel.replace("Armor ", "")}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rangeLabels.map((rangeLabel) => (
                            <tr key={rangeLabel}>
                                <td>{rangeLabel.replace(/\d+:\s/, "")}</td>
                                {armorLevels.map((armorLevel) => {
                                    let bestType = "";
                                    let maxDamage = -Infinity;
                                    for (const attackType of attackTypes) {
                                        const damage = chartData[attackType][armorLevel][rangeLabel];
                                        if (damage > maxDamage) {
                                            maxDamage = damage;
                                            bestType = attackType.replace("Assault Rifle ", "").replace(" Shot", "");
                                        }
                                    }
                                    return <td key={armorLevel}>{bestType}</td>;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }


    const getColorForValue = (value) => {
        const min = 0;
        const max = 180;
        const clampedValue = Math.min(Math.max(value, min), max);
        const normalizedValue = (clampedValue - min) / (max - min);
        const hue = 240;
        const saturation = 100;
        const lightness = Math.round((1 - normalizedValue) * 70 + 30);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    const calculateResults = () => {
        const results = {}

        attacks.map((attack) => {
            const testresults = enemyData.reduce(
                (acc, data) => {
                    const attackResults = [];
                    for (let index = 0; index < permutations; index++) {
                        const evalattack = runAttack(attack, data.enemy);
                        attackResults.push(evalattack);
                    }
                    return { ...acc, [data.name]: averageResults(attackResults, permutations) }
                }, {}
            )
            results[attack.name] = testresults;
        })
        return results;
    };

    const results = calculateResults();

    console.log('RENDER',skills, attacks)

    return (
        <div>
            <div className="chart-container">
                {generateHeatMapTable('table1', "Assault Rifle Single Shot", results)}
            </div>
            <div className="chart-container">
                {generateHeatMapTable('table2', "Assault Rifle Autofire", results)}
            </div>
            <div className="chart-container">
                {generateHeatMapTable('table3', "Assault Rifle Targeted Head Shot", results)}
            </div>
            <div className="chart-container">
                {generateHeatMapTable('table4', "Assault Rifle Targeted Leg Shot", results)}
            </div>
            <div className="chart-container">
                {generateBestTypeTable('table5', results)}
            </div>
        </div>
    );
};

export default DamageChart;