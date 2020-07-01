import Link from "next/link";
import {VehiclePerson} from "../api/VehiclePerson";

export interface ListProps {
    people: VehiclePerson [] | undefined;
}

export default function List({people}: ListProps) {
    // const [people, setPeople] = useState([]);
    // useEffect(() => {
    //     async function loadData() {
    //         const response = await fetch('http://localhost:4000/vehicles');
    //         const personList = await response.json();
    //         setPeople(personList);
    //     }
    //
    //     loadData();
    // })

    return <div>
        {people?.map(person =>
            <div>
                <Link as={`${person.vehicle}/${person.ownerName}`} href='[vehicle]/[person]'>
                    <a>Navifated to {person.ownerName}'s {person.vehicle}</a>
                </Link>
            </div>
        )}

    </div>;
}

List.getInitialProps = async () => {
    const response = await fetch('http://localhost:4000/vehicles');
    const people: VehiclePerson[] | undefined = await response.json();
    return {
        people
    }
}
