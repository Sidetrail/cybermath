const diceRoll = (diceString) => {
    // Regular expression to parse the dice string (XdY+Z or XdY-Z or XdY or XdYxM)
    const diceRegex = /(\d+)d(\d+)([+-]?\d*)?(?:x(\d+))?/;
    const match = diceString.match(diceRegex);

    const numDice = parseInt(match[1]);
    const numSides = parseInt(match[2]);
    const modifier = parseInt(match[3] || 0); // Default to 0 if no modifier
    const multiplier = parseInt(match[4] || 1); // Default to 1 if no multiplier

    let total = 0;
    const rolls = [];
    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * numSides) + 1; // Simulate a die roll
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
}


const getEnemy = (headSp, bodySp, health) => {
    return { headSp, bodySp, health }
}

const skillData = {
    autofire: 14,
    shoulderArms: 14,
    handgun: 10
}

const attackData = [
    { name: "Assault Rifle Single Shot", rangeType: "Assault Rifle", skill: "shoulderArms", damage: "5d6", bonus: 2 },
    { name: "Assault Rifle Autofire", rangeType: "Assault Rifle Autofire", skill: "autofire", damage: "2d6", bonus: 2, autofiremax: 4 },
    { name: "Assault Rifle Targeted Head Shot", rangeType: "Assault Rifle", skill: "shoulderArms", damage: "5d6", bonus: -4, multiplier: 2 },
    { name: "Assault Rifle Targeted Leg Shot", rangeType: "Assault Rifle", skill: "shoulderArms", damage: "5d6", bonus: -4, damageBonus: 5 }
]

const ranges = {
    "1: cqc 0-6m": {
        "Assault Rifle": 17,
        "Assault Rifle Autofire": 22,
    },
    "2: close 7-12m": {
        "Assault Rifle": 16,
        "Assault Rifle Autofire": 20,
    },
    "3: medium 13-25m": {
        "Assault Rifle": 15,
        "Assault Rifle Autofire": 17,
    },
    "4: ideal 26-50m": {
        "Assault Rifle": 13,
        "Assault Rifle Autofire": 20,
    },
    "5: far 51-100m": {
        "Assault Rifle": 15,
        "Assault Rifle Autofire": 25,
    },
    "6: extreme 101-200m": {
        "Assault Rifle": 20,
    },
    "7: extreme ++ 201-400m": {
        "Assault Rifle": 25,
    },
    "8: extreme +++ 400-800m": {
        "Assault Rifle": 30,
    },
}
const getAutofireMultiplier = (diff, weapon) => {
    if(!weapon.autofiremax){ return "x1" }
    return weapon?.autofiremax < diff + 1 ? "x" + weapon.autofiremax : "x" + (+diff + 1);
}

const runAttack = (weaponAttack, enemy) => {
    const attackRoll = diceRoll("1d10+" + (+weaponAttack.bonus + +skillData[weaponAttack.skill]));
    const result = {}
    Object.keys(ranges).map(range => {
        const dv = ranges[range][weaponAttack.rangeType];
        const damageRoll = diceRoll(weaponAttack.damage + (getAutofireMultiplier(attackRoll.total - dv, weaponAttack) || 0));
        const damageBeforeReductions = attackRoll.total > dv ? damageRoll.total : 0;
        let damageAfterReductions = weaponAttack.multiplier ? (damageBeforeReductions - enemy.headSp) * weaponAttack.multiplier : damageBeforeReductions - enemy.bodySp;
        if(damageRoll.rolls.filter(i=>i==6).length > 2){
            damageAfterReductions += 5;
        }
        if(damageAfterReductions > 0){
            damageAfterReductions += weaponAttack.damageBonus || 0;
        }
        // console.log(`${weaponAttack.name}: ${range}: roll:${attackRoll.total} damage: ${damageAfterReductions}`)
        return result[range] = damageAfterReductions > 0 ? damageAfterReductions : 0;
    })
    return result;
}

const permutations = 10000;

const runData = [
    { name: 'Armor 0', enemy: getEnemy(0, 0, 20) },
    { name: 'Armor 4', enemy: getEnemy(4, 4, 20) },
    { name: 'Armor 7', enemy: getEnemy(7, 7, 20) },
    { name: 'Armor 11', enemy: getEnemy(11, 11, 20) },
    { name: 'Armor 12', enemy: getEnemy(12, 12, 20) },
    { name: 'Armor 13', enemy: getEnemy(13, 13, 20) },
    { name: 'Armor 15', enemy: getEnemy(15, 15, 20) },
    { name: 'Armor 18', enemy: getEnemy(18, 18, 20) },
]

const averageResults = (results, runAmount) => {
    const reducedResults = results.reduce((accumulator, current) => {
        const newAccumulator = {}
        Object.keys(current).map(a => newAccumulator[a] = current[a] + (accumulator[a] || 0))
        return newAccumulator
    }, {});
    Object.keys(reducedResults).map(key => reducedResults[key] = reducedResults[key] / runAmount)
    return reducedResults;
}
const results = {}

attackData.map((attack) => {
    const testresults = runData.reduce(
        (acc, data) => {
            const attackResults = [];
            for (let index = 0; index < permutations; index++) {
                const eval = runAttack(attack, data.enemy);
                attackResults.push(eval);
            }
            return { ...acc, [data.name]: averageResults(attackResults, permutations) }
        }, {}
    )
    results[attack.name] = testresults;
})

console.log(JSON.stringify(results));