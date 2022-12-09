import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function Home(){
    const dispatch = useDispatch();

    const [newSearch, setNewSearch] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'GET_SEARCH',
            payload: newSearch,
        });
        setNewSearch('');
    };





    return(
        <>
            <form onSubmit={handleSubmit} id="searchForm">
                <h2>Find a Giphy</h2>
                <input
                    className="search-field"
                    type="text"
                    value={newSearch}
                    onChange={(event) => {
                    setNewSearch(event.target.value);
                    }}
                    placeholder="Search Giphy"
                />
                <button type='submit'>Search Giphy</button>
            </form>
        </>
    )
}

export default Home;