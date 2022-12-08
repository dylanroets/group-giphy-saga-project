import { useState } from 'react';

function Favorites(){
    const [category, setNewCategory]= useState('');

    const setCategory = (event) => {
        setNewCategory(event.target.value);
    }
    const handleSubmit = () => {
        console.log('Fetch Gif by category', category);
        //dispatch({type: 'FETCH_BY_CATEGORY', payload: {categoryID: category}});
    }

    return(
        <>
            <h1>I am Favorites</h1>
            <label for="categories">Choose a category:</label>
            <select name="categories" id="categories" onChange={(event) => setCategory(event)}>
                <option value=''></option>
                <option value="1">Funny</option>
                <option value="2">Cohort</option>
                <option value="3">Cartoon</option>
                <option value="4">NSFW</option>
                <option value="5">Meme</option>
            </select>
            <button onClick={() => handleSubmit()}>Search</button>
        </>
    )
}

export default Favorites;