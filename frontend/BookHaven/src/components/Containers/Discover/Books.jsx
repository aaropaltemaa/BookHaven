import OpeningText from "./HeaderSection";
import { initializeBooks } from '../../../reducers/bookReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const Books = () => {
    const dispatch = useDispatch();
    //const books = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(initializeBooks());
    }, [dispatch]);

    return (
        <div>
            <OpeningText
                title="Welcome to the Hall of Pages!"
                subtitle="Here you can find a collection of books from all over the world."
            />
        </div>
    );
}

export default Books;