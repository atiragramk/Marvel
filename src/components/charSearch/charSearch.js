import { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import useMarvelServices from '../../services/MarvelServices';

import avengers from './avengers.gif'
import './charSearch.scss'


const CharSearch = () => {

        const [character, setCharacter] = useState(null);
        const {getCharacterByName, clearError} = useMarvelServices();

        const onCharLoaded = (character) => {
            setCharacter(character);
        }

        const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                    .required('This field is required'),
        }),
        onSubmit: ({name}) => {
            clearError()
            getCharacterByName(name)
            .then(onCharLoaded)
        }
    })
    const results = !character ? null : character.length > 0?
        <div className="search__success"> 
        <h3 className="success">{`There is! Visit ${character[0].name} page?`}</h3>
            <Link to={`/character/${character[0].id}`} className="button button__secondary">
                <div className="inner">to page</div>
            </Link>
        </div> : 
        <h3 className="error">The character was not found. Check the name and try again</h3>


    return (
        <form className="wrapper" onSubmit={formik.handleSubmit}>
            <div className="wrapper__form">
                <h2>Or find a character by name:</h2>
                <div className="wrapper__content">
                    <input
                        placeholder="Enter a name"
                        id="name"
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                    <button className="button button__main">
                            <div className="inner">Find</div>
                    </button>
                    
                </div>
                {formik.errors.name && formik.touched.name ? <h4 className="error">{formik.errors.name}</h4> : null}
                {results}
            </div>
            <div className="form-static">
                <img src={avengers} alt="avengers" />
            </div>

        </form>
        
    )
}

export default CharSearch