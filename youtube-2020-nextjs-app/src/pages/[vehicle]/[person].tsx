import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {VehiclePerson} from "../../api/VehiclePerson";
import {NextPageContext} from "next";

export interface PersonProps {
    ownersList: VehiclePerson[] | undefined
}

const Person = ({ownersList}: PersonProps) => {
    const router = useRouter();
    const [owners, setOwners] = useState(ownersList);

    useEffect(() => {
        const loadData = async () => {
            const response = await fetch(`http://localhost:4000/vehicles?ownerName=${router.query.person}&ownerName=${router.query.vehicle}`);
            const ownersList: VehiclePerson[] | undefined = await response.json();
            setOwners(ownersList);
        }
        if (ownersList?.length == 0) {
            loadData();
        }
    }, [])

    if (!owners?.[0]) {
        return <div>Loading...</div>
    }

    return <h2>{owners?.[0].ownerName}'s {owners?.[0].vehicle}</h2>;
}

interface MyNextPageContext extends NextPageContext {
    query: {
        person: string,
        vehicle: string
    }
}

Person.getInitialProps = async (context: MyNextPageContext) => {
    if (!context.req) {
        return {ownersList: []}
    }

    const query = context.query;
    const response = await fetch(`http://localhost:4000/vehicles?ownerName=${query.person}&ownerName=${query.vehicle}`);
    const ownersList = await response.json();
    return {ownersList: ownersList}
}

export default Person;
