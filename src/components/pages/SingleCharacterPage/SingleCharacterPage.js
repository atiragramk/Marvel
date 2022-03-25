import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";


import './singleCharacterPage.scss';



const SingleCharacterPage = ({data}) => {

      
    const {thumbnail, name, description, comicsCount} = data;


    return (
        <>
        <div className="single-character">    
            <Helmet>
                <meta
                    name="description"
                    content={`${name} page`}
                    />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt="x-men" className="single-character__img"/>
            <div className="single-character__info">
                <h2 className="single-character__name">{name}</h2>
                <p className="single-character__descr">{description ? description : 'There is no description about this character'}</p>
                <Link to="/comics"  className="single-character__back">{`${comicsCount} comics available`}</Link>
            </div>
            <Link to="/" className="single-character__back">Back to main</Link>
        </div>
        </>
    )
}

export default SingleCharacterPage;