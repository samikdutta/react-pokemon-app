import React, { useState } from 'react';

export default function Search(props) {
    const [search, setSearch]  = useState();
    return <div className='container'>
        <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search For Pokemon" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
            <button className="btn btn-outline-success" type="button" onClick={(e)=> props.getPokemon(search)}>Search</button>
        </form>
    </div>
}
