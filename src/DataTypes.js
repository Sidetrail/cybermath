export const ranges = {
    "1: cqc 0-6m": {
        "Assault Rifle": 17,
        "Assault Rifle Autofire": 22,
        "Submachine Gun": 15,
        "Submachine Gun Autofire": 20,
        "Pistol": 13,
        "Shotgun": 13,
        "Bows": 15,
        "Grenade Launcher": 16,
        "Rocket Launcher": 17,
        "Sniper Rifle": 30
    },
    "2: close 7-12m": {
        "Assault Rifle": 16,
        "Assault Rifle Autofire": 20,
        "Submachine Gun": 15,
        "Submachine Gun Autofire": 17,
        "Pistol": 15,
        "Shotgun": 15,
        "Bows": 13,
        "Grenade Launcher": 15,
        "Rocket Launcher": 16,
        "Sniper Rifle": 25
    },
    "3: medium 13-25m": {
        "Assault Rifle": 15,
        "Assault Rifle Autofire": 17,
        "Submachine Gun": 15,
        "Submachine Gun Autofire": 20,
        "Pistol": 20,
        "Shotgun": 20,
        "Bows": 15,
        "Grenade Launcher": 15,
        "Rocket Launcher": 15,
        "Sniper Rifle": 25
    },
    "4: ideal 26-50m": {
        "Assault Rifle": 13,
        "Assault Rifle Autofire": 20,
        "Submachine Gun": 15,
        "Submachine Gun Autofire": 25,
        "Pistol": 25,
        "Shotgun": 25,
        "Bows": 17,
        "Grenade Launcher": 17,
        "Rocket Launcher": 15,
        "Sniper Rifle": 20
    },
    "5: far 51-100m": {
        "Assault Rifle": 15,
        "Assault Rifle Autofire": 25,
        "Submachine Gun": 15,
        "Submachine Gun Autofire": 30,
        "Pistol": 30,
        "Shotgun": 30,
        "Bows": 20,
        "Grenade Launcher": 20,
        "Rocket Launcher": 20,
        "Sniper Rifle": 15

    },
    "6: extreme 101-200m": {
        "Assault Rifle": 20,
        "Submachine Gun": 15,
        "Pistol": 30,
        "Shotgun": 35,
        "Bows": 22,
        "Grenade Launcher": 22,
        "Rocket Launcher": 20,
        "Sniper Rifle": 16
    },
    "7: extreme ++ 201-400m": {
        "Assault Rifle": 25,
        "Submachine Gun": 15,
        "Pistol": 13,
        "Grenade Launcher": 25,
        "Rocket Launcher": 25,
        "Sniper Rifle": 17

    },
    "8: extreme +++ 400-800m": {
        "Assault Rifle": 30,
        "Sniper Rifle": 20,
        "Rocket Launcher": 30,
    }
}

export const skills = {
    autofire: 14,
    shoulderArms: 14,
    handgun: 14,
    heavyWeapons: 14,
    archery: 14
};


const getEnemy = (headSp, bodySp, health) => {
    return { headSp, bodySp, health };
};

export const enemyData = [
    { name: 'Armor 0', enemy: getEnemy(0, 0, 20) },
    { name: 'Armor 4', enemy: getEnemy(4, 4, 20) },
    { name: 'Armor 7', enemy: getEnemy(7, 7, 20) },
    { name: 'Armor 11', enemy: getEnemy(11, 11, 20) },
    { name: 'Armor 12', enemy: getEnemy(12, 12, 20) },
    { name: 'Armor 13', enemy: getEnemy(13, 13, 20) },
    { name: 'Armor 15', enemy: getEnemy(15, 15, 20) },
    { name: 'Armor 18', enemy: getEnemy(18, 18, 20) },
];

export const permutations = 10000;

export const defaultAttackData = [
    { name: "Assault Rifle Single Shot", rangeType: "Assault Rifle", skill: "shoulderArms", damage: "5d6", bonus: 2 },
    { name: "Assault Rifle Autofire", rangeType: "Assault Rifle Autofire", skill: "autofire", damage: "2d6", bonus: 2, autofiremax: 4 },
    { name: "Assault Rifle Targeted Head Shot", rangeType: "Assault Rifle", skill: "shoulderArms", damage: "5d6", bonus: -4, multiplier: 2 },
    { name: "Assault Rifle Targeted Leg Shot", rangeType: "Assault Rifle", skill: "shoulderArms", damage: "5d6", bonus: -4, damageBonus: 5 }
];

