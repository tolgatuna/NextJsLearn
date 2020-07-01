import React from "react";
import {GetStaticProps} from "next";
import {openDB} from "../openDB";
import {FaqModel} from "../../models/Faq";
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export interface FaqProps {
    faq: FaqModel[];
}

export default function FAQ({faq}: FaqProps) {
    return <div>
        {faq.map(f => (
            <ExpansionPanel key={f.id}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        {f.question}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        {f.answer}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        ))}
    </div>;
}

export const getStaticProps: GetStaticProps = async () => {
    const db = await openDB();
    const faq = await db.all('SELECT * FROM FAQ ORDER BY createDate DESC');

    return {
        props: {faq}
    }
}
