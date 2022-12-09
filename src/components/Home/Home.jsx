
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './Home.css';

function Home(){
    const dispatch = useDispatch();
    const searchArray = useSelector(store => store.searchReducer);

    const [category, setNewCategory]= useState('');
    const [newSearch, setNewSearch] = useState('');

    const setCategory = (event) => {
        setNewCategory(event.target.value);
    }

    const handleFavorite = (image) => {
        dispatch ({
            type: 'ADD_TO_FAVORITES',
            payload: {category_id: category, URL: image.embed_url, description: image.title}
        });
    };

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
            <div className="searches grid-container">
                {searchArray.map(image => 
                    {return (
                        <div className="grid-item" key={image.id}>
                            <iframe src={image.embed_url} height='200px' width='200px'/>
                            <button data-id={image.id} onClick={() => handleFavorite(image)}>Favorite</button>
                            <select name="categories" id="categories" onChange={(event) => setCategory(event)}>
                                <option value=''></option>
                                <option value="1">Funny</option>
                                <option value="2">Cohort</option>
                                <option value="3">Cartoon</option>
                                <option value="4">NSFW</option>
                                <option value="5">Meme</option>
                            </select>
                        </div>
                    )}
                )}
            </div> 
        </>
    )
}

export default Home;