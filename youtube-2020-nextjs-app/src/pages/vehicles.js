import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

export default function Vehicles({vehicles}) {
    return (
        <Table aria-label='simple table'>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align='right'>Brand</TableCell>
                    <TableCell align='right'>Model</TableCell>
                    <TableCell align='right'>OwnerId</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {vehicles.map(vehicle => (
                    <TableRow key={vehicle.id}>
                        <TableCell component='th' scope='row'>{vehicle.id}</TableCell>
                        <TableCell align='right'>{vehicle.brand}</TableCell>
                        <TableCell align='right'>{vehicle.model}</TableCell>
                        <TableCell align='right'>{vehicle.ownerId}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

Vehicles.getInitialProps = async () => {
    const resp = await fetch('http://localhost:3000/api/vehicles');
    const vehicles = await resp.json();
    return {vehicles}
}
