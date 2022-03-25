import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from 'react-router-dom';
import ironMan404 from '../../resources/img/404.gif'


const Page404 = () => {

    return (
        <div>
            {/* <ErrorMessage/> */}
            <img src={ironMan404} alt="404" style={{margin: '0 auto', background: 'none', display: 'block', maxHeight: '300px'}} />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'color': '#9f0013'}} to="/">Back to main page</Link>
        </div>
    )

}

export default Page404