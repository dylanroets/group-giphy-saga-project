import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function Home(){
    const dispatch = useDispatch();
    const searchArray = useSelector(store => store.searchReducer);

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
            <div className="searches-grid-container">
                {searchArray.map(image => 
                    {return (
                        <div className="grid-item" key={image.id}>
                            <img src={image.original} height='200px' width='200px'/>
                        </div>
                    )}
                )}
            </div> 
        </>
    )
}

export default Home;