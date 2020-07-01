import {Microphone} from "../../model/Microphone";
import {GetStaticProps} from "next";
import {openDB} from "../openDb";
import Link from "next/link";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {getStaticPaths} from "./microphone/[id]";

interface IndexProps {
    microphones: Microphone[];
}

const Index = ({microphones}: IndexProps) => {
    return (
        <Grid container spacing={1}>
            {microphones.map(microphone => (
                <Grid container item xs={12} sm={6} md={3} spacing={3}>
                    <Link href='/microphone/[id]' as={`/microphone/${microphone.id}`} key={microphone.id}>
                        <a>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={microphone.brand + ' ' + microphone.model}
                                        height="200"
                                        image={microphone.imageUrl}
                                        title={microphone.brand + ' ' + microphone.model}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {microphone.brand + ' ' + microphone.model}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </a>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}

export const getStaticProps: GetStaticProps = async ctx => {
    const currentPage = ctx.params?.currentPage as string;
    console.log(ctx.params);
    const currentPageNumber = +(currentPage || 0);

    const min = currentPageNumber * 5;
    const max = (currentPageNumber + 1) * 5;

    const db = await openDB();

    return {
        props: {
            microphones: await db.all('SELECT * from microphone where id > ? and id <= ?', min, max)
        }
    }
}


export default Index;


