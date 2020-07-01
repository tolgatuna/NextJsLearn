import Index, {getStaticProps} from "./index";
import {GetStaticPaths} from "next";
import {openDB} from "../openDb";

export default Index;
export {getStaticProps};

export const getStaticPaths: GetStaticPaths = async () => {
    const db = await openDB();
    const {total} = await db.get('select count(*) as total from microphone')
    const numberOfPages = Math.ceil(total / 5.0);
    const paths = Array(numberOfPages - 1).fill('')
    console.log(total);
    return {
        fallback: false,
        paths: paths.map((_, index) => (
                {params: {currentPage: (index + 1).toString()}}
            ))
    }
}
