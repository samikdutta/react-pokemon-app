import React from 'react';
const custStyle = {
    marginTop : '20px',
    marginBottom: '2px',
    marginRight: '10px',
    width: '18rem',
    paddingBottom: '10px'
}
export default function PokemonData(props) {
    
  return <div className='container'><div className='row align-items-start'><div className="card col-2" sm={2} style={custStyle}>
  <img src={props.sprite.front_default} className="card-img-top" alt={props.name} />
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <h5>Abilities</h5>
    {props.abilities.map((ability, key) => (
        <div key={key}>
            <span>{ability.ability.name}</span>
        </div>
    ))}
    <h5>Types:</h5>
    {props.types.map((type, key) => (
        <div key={key}>
            <span>{type.type.name}</span>
        </div>
    ))}    
  </div>
</div>
<div className="card col-2" sm={2} style={custStyle}>
    <h5>Base Stats</h5>
    {props.stats.map((stat, key) => (
        <div key={key}>
            <strong>{stat.stat.name}</strong>
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{"width": stat.base_stat}} aria-valuenow={stat.base_stat} aria-valuemin={0} aria-valuemax={255}>{stat.base_stat}</div>
            </div>
        </div>
    ))}
</div></div><hr noshade="true" />
</div>;
}
