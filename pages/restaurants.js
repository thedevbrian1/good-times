import { parse } from "postcss";
import { useEffect, useState } from "react"

const parseJSON = resp => (resp.json ? resp.json() : resp);
        const checkStatus = resp => {
            if (resp.status >= 200 && resp.status < 300) {
                return resp;
            }

            return parseJSON(resp).then(resp => {
                throw resp;
            });
        };

        const headers = {
            'Content-Type': 'application/json',
        };

function Restaurants({ restaurants, error, allCategories }) {
    console.log(restaurants);
    console.log(allCategories);

    const [modifiedData, setModifiedData] = useState({
        name: '',
        description: '',
        categories: [],
    });

    const [errorRestaurants, setErrorRestaurants] = useState(null);

    const handleChange = ({ target: { name, value }}) => {
        setModifiedData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:1337/restaurants', {
                method: 'POST',
                headers,
                body: JSON.stringify(modifiedData),
            })
                .then(checkStatus)
                .then(parseJSON);
        }catch(error) {
            setErrorRestaurants(error);
        }
    };

    const renderCheckbox = category => {
        const { categories } = modifiedData;
        const isChecked = categories.includes(category.id);
        const handleCheckboxChange = () => {
            if (!categories.includes(category.id)) {
                handleChange({ target: { name: 'categories', value: categories.concat(category.id) }});
            } else {
                handleChange({ target: { name: 'categories', value: categories.filter(v => v!== category.id)}});
            }
        };
        return (
            <div key={category.id}>
                <label htmlFor={category.id}>{category.name}</label>
                <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    name='categories'
                    id={category.id}
                />
            </div>
        );
    };

    // if (errorCategories) {
    //     return <div>An error occured (categories): {errorCategories.message}</div>;
    // }
    if (errorRestaurants) {
        return <div>An error occured (restaurants): {errorRestaurants.message}</div>;
    }
    if (error) {
        return <div>An error occured: {error.message}</div>;
    }
    return (
        <div>
            <h1>Restaurants(GET)</h1>
            <ul>
                {restaurants.map(restaurant => (
                    <li key={restaurant.id}>{restaurant.name}</li>
                ))}
            </ul>
            <br />
            <form onSubmit={handleSubmit}>
                <h3>Restaurants</h3>
                <br />
                <label>
                    Name:
                    <input type="text" name="name" value={modifiedData.name} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={modifiedData.description} onChange={handleChange} />
                </label>
                <div>
                    <br />
                    <b>Select categories</b>
                    <br />
                    {allCategories.map(renderCheckbox)}
                </div>
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

Restaurants.getInitialProps = async ctx => {
    try {
        // const parseJSON = resp => (resp.json ? resp.json() : resp);
        // const checkStatus = resp => {
        //     if (resp.status >= 200 && resp.status < 300) {
        //         return resp;
        //     }

        //     return parseJSON(resp).then(resp => {
        //         throw resp;
        //     });
        // };

        // const headers = {
        //     'Content-Type': 'application/json',
        // };

        // const restaurants = await fetch('http://localhost:1337/restaurants', {
        //     method: 'GET',
        //     headers,
        // })
        //     .then(checkStatus)
        //     .then(parseJSON);
        const [restaurants, allCategories] = await Promise.all([
            fetch('http://localhost:1337/restaurants', {
                method: 'GET',
                headers,
            })
                .then(checkStatus)
                .then(parseJSON),
            fetch('http://localhost:1337/categories', {
                method: 'GET',
                headers,
            })
             .then(checkStatus)
             .then(parseJSON)
        ]);
        return { restaurants, allCategories };

    } catch(error) {
        return { error };
    }

    
};

export default Restaurants;