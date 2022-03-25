import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";


import './singleComicPage.scss';


const SingleComicPage = ({data}) => {


    const {thumbnail, title, descr, lang, price, pages} = data;

    return (
        <>
            <div className="single-comic">

                <Helmet>
                    <meta
                        name="description"
                        content={`${title} comics book`}
                        />
                    <title>{title}</title>
                </Helmet>
                <img src={thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{descr}</p>
                    <p className="single-comic__descr">{pages}</p>
                    <p className="single-comic__descr">{`Language: ${lang}`}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
            </>
    )
}

export default SingleComicPage;