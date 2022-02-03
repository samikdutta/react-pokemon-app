import React from 'react';
//let pd = [];
//let loading = false;


export default function PokemonList({allPokemons}) {
  //console.log(fPokDet)
  /*loading = true;
  fPokDet.map(p=>(
    fetch(p.url)
    .then(response=>response.json())
    .then(data=>{
      pd.push({
        
        'name':data.name,
        'stat':data.stats
      
      });
      loading = false;     
    })))

    console.log(loading)
    if(loading) return "Loading ...";*/
    return <div className="container">      
    <div className="row align-items-start mr-2">
    {allPokemons.map((p, key) => (      
        <div className="card mt-2 sm-2" style={{"width": "18rem"}} key={key}>  
        <img src={p.sprites.front_default} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title" key={p.name} id='name'>{p.name}</h5>
            <h5>Abilities</h5>
            {p.abilities.map((ability, key) => (
                <div key={key}>
                    <span>{ability.ability.name}</span>
                </div>
            ))}
            <h5>Types:</h5>
          {p.types.map((type, key) => (
              <div key={key}>
                  <span>{type.type.name}</span>
              </div>
          ))}  
          <h5>Base Stats</h5>
          {p.stats.map((stat, key) => (
              <div key={key}>
                  <strong>{stat.stat.name}</strong>
                  <div className="progress">
                      <div className="progress-bar" role="progressbar" style={{"width": stat.base_stat}} aria-valuenow={stat.base_stat} aria-valuemin={0} aria-valuemax={255}>{stat.base_stat}</div>
                  </div>
              </div>
          ))}
          </div>
        </div>
  
        ))}  
    </div>      
  </div> ;
}
