import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from "@material-ui/core";

const bancos = [
  "bbva",
  "ciudad",
  "galicia",
  "hsbc",
  "hipotecario",
  "macro",
  "bna",
  "patagonia",
  "bapro",
  "santander",
  "supervielle",
  "brubank",
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
});

const TablaDolar = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const apiPromises = bancos.map((banco) =>
        axios.get(`https://criptoya.com/api/${banco}`)
      );

      try {
        const responses = await Promise.all(apiPromises);
        const parsedData = responses.map((response) => response.data.ask);
        setData(parsedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const oficial = 350;
  const impuesto75 = oficial * 0.75;
  const impuesto80 = oficial * 0.8;

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.headerCell}>Banco</TableCell>
          <TableCell className={classes.headerCell}>
            Dolar oficial
          </TableCell>
          <TableCell className={classes.headerCell}>
            Dolar tarjeta (75% de impuestos)
          </TableCell>
          <TableCell className={classes.headerCell}>
            Dolar Qatar (80% de impuestos)
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bancos.map((banco, index) => (
          <TableRow key={banco}>
            <TableCell>{banco}</TableCell>
            <TableCell>{data[index]?.toFixed(2)}</TableCell>
            <TableCell>{(data[index] + impuesto75).toFixed(2)}</TableCell>
            <TableCell>{(data[index] + impuesto80).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TablaDolar;
