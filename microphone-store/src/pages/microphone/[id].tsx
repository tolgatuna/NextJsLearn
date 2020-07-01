import {NextPageContext} from "next";
import {Microphone} from "../../../model/Microphone";
import {openDB} from "../../openDb";


export type MicrophoneDetailProps = Microphone;

export interface PathProps {
    id: String
}

export interface StaticNextPageContext extends NextPageContext {
    params: PathProps
}

const MicrophoneDetail = ({id, brand, model, price, imageUrl}: MicrophoneDetailProps) => {
    return <div>
        <div>{id}</div>
        <div>{brand}</div>
        <div>{model}</div>
        <div>{price}</div>
        <div>{imageUrl}</div>
    </div>
}

export const getStaticProps = async (context: StaticNextPageContext) => {
    const db = await openDB();
    const microphone = await db.get('select * from microphone where id = ?', context.params.id)

    return {
        props: microphone
    }
}

export const getStaticPaths = async () => {
    // return {
    //     fallback: true,
    //     paths: [
    //         {params: {id: '6'}},
    //         {params: {id: '7'}}
    //     ]
    // }

    const db = await openDB();
    const microphoneIds = await db.all('select id from microphone');
    const paths = microphoneIds.map(microphoneId => {
        return {params: {id: microphoneId.id.toString()}}
    });
    return {
        fallback: true,
        paths
    }
}

export default MicrophoneDetail;
