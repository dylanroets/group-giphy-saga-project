import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Favorite.css';

function Favorites(){
    const dispatch = useDispatch();
    const imagesArray = useSelector(store => store.favoritesReducer);

    const [category, setNewCategory]= useState('');

    const setCategory = (event) => {
        setNewCategory(event.target.value);
    }
    const handleSubmit = () => {
        console.log('Fetch Gif by category', category);
        dispatch({type: 'FETCH_BY_CATEGORY', payload: {categoryID: category}});
    }

    useEffect(()=>{

    }, []);

    return(
        <>
            <h1>I am Favorites</h1>
            <label htmlFor="categories">Choose a category:</label>
            {/* Selector to register the category the user wants to fetch */}
            <select name="categories" id="categories" onChange={(event) => setCategory(event)}>
                <option value=''></option>
                <option value="1">Funny</option>
                <option value="2">Cohort</option>
                <option value="3">Cartoon</option>
                <option value="4">NSFW</option>
                <option value="5">Meme</option>
            </select>
            {/* Submits category */}
            <button onClick={() => handleSubmit()}>Search</button>
            <div className="favorites grid-container">
                {imagesArray.map(image => 
                    {return (
                        <div className="grid-item" key={image.id}>
                            <img src={image.url} alt={image.description} height='200px' width='200px'/>
                        </div>
                    )}
                )}
            </div>        
        </>
    )
}

export default Favorites;