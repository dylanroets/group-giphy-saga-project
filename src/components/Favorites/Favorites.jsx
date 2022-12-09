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

    const removeFavorite = (id, category_id) => {
        //deleted an image from favorite DB
        console.log('requesting delete of:', id, '&', category_id);
        dispatch({type: "DELETE_FAVORITE", payload: {id, category_id}});
    }

    const imageCategory = (category) => {
        switch (category){
            case 1:
                return 'Funny';
            case 2:
                return 'Cohort';
            case 3:
                return 'Cartoon';
            case 4: 
                return 'NSFW';
            case 5:
                return 'Meme';
            default:
                return 'No Category';
        }
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
                            <div>
                                <div>
                                    <label>{imageCategory(image.category_id)}</label>
                                </div>
                                <div>
                                    <button data-id={image.id} onClick={() => removeFavorite(image.id, image.category_id)}>Unfavorite</button>
                                </div>
                            </div>
                        </div>
                    )}
                )}
            </div>        
        </>
    )
}

export default Favorites;