import React from "react";
import {getMakes, Make} from "../database/getMakes";
import {GetServerSideProps} from "next";
import {Field, Form, Formik, useField} from "formik";
import {FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectProps} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useRouter} from "next/router";
import {getModels, Model} from "../database/getModels";
import {getAsString} from "../getAsString";
import useSWR from 'swr'

interface HomeProps {
    makes: Make[];
    models: Model[]
}

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: 'auto',
        maxWidth: 500,
        padding: theme.spacing(3)
    }
}))

const Home = ({makes, models}: HomeProps) => {
    const classes = useStyles();
    const {query} = useRouter();

    const initialValues = {
        make: getAsString(query.make) || 'all',
        model: getAsString(query.model) || 'all',
        minPrice: query.minPrice || 'all',
        maxPrice: query.maxPrice || 'all'
    }

    const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];
    let newModels = [];

    const applyMake = (make: string, models = []) => {
        console.log('Apply Make called : ' , make)
        const {data} = useSWR('/api/models?make=' + initialValues.make);
        newModels = data || models;
        return <></>
    }

    return (
        <Formik initialValues={initialValues} onSubmit={() => {
            console.log('Submit')
        }}>
            {
                ({values}) => (
                    <Form>
                        <Paper elevation={5} className={classes.paper}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant='outlined'>
                                        <InputLabel id='search-make'>Make</InputLabel>
                                        <Field name='make' as={Select} labelId='search-make' label='Make'>
                                            <MenuItem value='all'><em>All Makes</em></MenuItem>
                                            {makes.map(make => (
                                                <MenuItem key={make.make} value={make.make}>{`${make.make} (${make.count})`}</MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {console.log(values)}
                                    {applyMake(values.make)}
                                    <FormControl fullWidth variant='outlined'>
                                        <InputLabel id='search-models'>Model</InputLabel>
                                        <Field name='models' as={Select} labelId='search-model' label='Model'>
                                            <MenuItem value='all'><em>All Models</em></MenuItem>
                                            {newModels.map(model => (
                                                <MenuItem key={model.model} value={model.model}>{`${model.model} (${model.count})`}</MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant='outlined'>
                                        <InputLabel id='search-min'>Minimum Price</InputLabel>
                                        <Field name='minPrice' as={Select} labelId='search-min' label='Minimum Price'>
                                            <MenuItem value='all'><em>No Minimum Price</em></MenuItem>
                                            {prices.map(price => (
                                                <MenuItem key={price} value={price}>{price}</MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant='outlined'>
                                        <InputLabel id='search-max'>Minimum Price</InputLabel>
                                        <Field name='maxPrice' as={Select} labelId='search-max' label='Maximum Price'>
                                            <MenuItem value='all'><em>No Maximum Price</em></MenuItem>
                                            {prices.map(price => (
                                                <MenuItem key={price} value={price}>{price}</MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Form>
                )
            }
        </Formik>
    );
};


interface ModelSelectProps extends SelectProps {
    name: string
}

export function ModelSelect(props: ModelSelectProps) {
    const [field] = useField({
        name: props.name
    })
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const make = getAsString(ctx.query.make)
    const makes = await getMakes()
    const models = await getModels(make);
    return {props: {makes, models}}
}

export default Home;

