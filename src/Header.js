import React from 'react';
import "./Header.css";

const Header = () => {
    return (
    <div className="explanation">
        <p>This is a Damage Per Round calculator to be used with the tabletop RPG Cyberpunk RED</p>
        <p>On the left update the skills to match your build or the build you wish to generate data for, and the right section should be filled with different attack types. When creating an attack, make sure to add all bonuses (from cyberware, role abilities, or weapon ugrades) to the bonus section.</p>
        <p>Each weapon attack is run 10,000 times against each common armor class for each range bracket.</p>
        <p>Source code can be found <a href="https://github.com/Sidetrail/cybermath" target="_blank">here</a></p>
        <p>For any feedback please message me via reddit at <a href="https://old.reddit.com/user/Sidetrail/" target="_blank">/u/sidetrail</a></p>
    </div>
    )
}

export default Header;