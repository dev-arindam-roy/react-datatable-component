# React DataTable Component

## Check It!
[https://dev-arindam-roy.github.io/react-datatable-component/](https://dev-arindam-roy.github.io/react-datatable-component/)

```js
import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BeatLoader from "react-spinners/BeatLoader";
import DataTable from 'react-data-table-component';
import {
    FiArrowDownCircle,
    FiArrowUpCircle  
} from "react-icons/fi";

/**
React DataTable Doc
https://react-data-table-component.netlify.app/?path=/docs/api-props--docs

https://www.youtube.com/watch?v=3oHUtG0cjfY
https://github.com/devopsdeveloper1107/React-Data-Table-Component/blob/main/src/component/Product.js
https://www.youtube.com/watch?v=RiXSojXJS90&list=PLKvreMEGikMWRPUHl6FiCCZzCxoVAFYT4&index=5
https://www.youtube.com/watch?v=nQFWW7Rq2Hs&list=PLKvreMEGikMWRPUHl6FiCCZzCxoVAFYT4&index=8

https://www.youtube.com/watch?v=hson9BXU9F8&list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz&index=3

React Pagination

https://www.youtube.com/watch?v=g8iwLCogC04&list=PLKvreMEGikMWRPUHl6FiCCZzCxoVAFYT4&index=16
 */

const DataTableComponent = () => {

    const columns= [
        {
            name:"Sr.No",
            selector:(row)=>row.id,
        },
        {
            name:"Title",
            selector:(row)=>row.title,
            sortable:true
        },
        {
            name:"Category",
            selector:(row)=>row.category,
            sortable:true
        },
        {
            name:"Price",
            selector:(row)=>row.price,
            sortable:true
        },
        {
            name:"Image",
            selector:(row)=><img  height ={70} width={80} src={ row.image} alt="xxx"/>,
        },
        {
            name:"Action",
            cell:(row)=>(
                <div>
                    <button className="btn btn-sm btn-danger mx-2" onClick={()=>handleDelete(row.id)}>Delete</button>
                    <button className="btn btn-sm btn-success" onClick={()=>handleDelete(row.id)}>Edit</button>
                </div>
            )
        }

    ];

    const [data, setData]= useState([]);
    const [search, SetSearch]= useState('');
    const [filter, setFilter]= useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDarktheme, setTheme] = useState(false);

    const getProduct=async()=>{
        try{
            setIsLoading(true);
            const req= await fetch("https://fakestoreapi.com/products?limit=100");
            const res= await req.json();
            setData(res);
            setFilter(res);
            setIsLoading(false);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getProduct();
    }, []);

    useEffect(()=>{
        const result= data.filter((item)=>{
            return item.title.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
    },[search, data]);

    const handleDelete=(val)=>{
        const newdata = data.filter((item)=>item.id!==val);
        setFilter(newdata);
    }

    const tableHeaderstyle={
        headCells:{
            style:{
                fontWeight:"bold",
                fontSize:"14px",
                backgroundColor:"#ccc"
    
            },
        },
        rows:{
            style:{
                fontWeight:"bold",
                fontSize:"14px"
            },
        },
    }

    const handleSelectedRows = (rows) => {
        console.log(rows?.selectedRows);
    }

    const handleDisabledRows = (rows) => {
        console.log(rows);
        if (parseInt(rows.price) > 10) {
            return true;
        } else {
            return false;
        }
    }

    const handlePreSelectedRows = (rows) => {
        if (rows.id > 0 && rows.id < 4) {
            return true;
        } else {
            return false;
        }
    }

    const handleExpendableRows = ({data}) => {
        return <pre>{JSON.stringify(data, null, 2)}</pre>
    }

    const handleExpendableRowsDisabled = (rows) => {
        if (rows.id === 10) {
            return true;
        } else {
            return false;
        }
    }

    const handlePreExpendableRows = (rows) => {
        if (rows.id === 1) {
            return true;
        } else {
            return false;
        }
    }

  return (
    <>
        <Container fluid="md">
            <Row className="mt-3">
                <Col xs={12} md={12}>
                    <h3><strong>React DataTable App</strong></h3>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={12} md={12}>
                    <DataTable
                        customStyles={ tableHeaderstyle}
                        progressPending={isLoading}
                        progressComponent={<BeatLoader color={"#065ae1"} />}
                        columns={columns}
                        data={filter}
                        pagination
                        selectableRows
                        onSelectedRowsChange={handleSelectedRows}
                        //selectableRowSelected={handlePreSelectedRows}
                        selectableRowDisabled={handleDisabledRows}
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        defaultSortFieldId={4}
                        actions={
                            <div>
                                <Form.Check
                                    type="switch"
                                    id="theme-switch"
                                    label="Dark Mode?"
                                    checked={isDarktheme}
                                    onChange={(e) =>
                                        e.target.checked
                                        ? setTheme(true)
                                        : setTheme(false)
                                    }
                                />
                                <button className="btn btn-sm btn-secondary mx-2">Export PDF</button>
                                <button className="btn btn-sm btn-secondary mx-2">Export CSV</button>
                                <button className="btn btn-sm btn-primary">Add Product</button>
                            </div>
                        }
                        subHeader
                        subHeaderComponent={
                            <input type="text"
                            className="w-25 form-control"
                            placeholder="Search..."
                            value={ search}
                            onChange={(e)=>SetSearch(e.target.value)}
                            
                            />
                        }
                        subHeaderAlign="right"
                        expandableRows
                        expandableRowsComponent={handleExpendableRows}
                        expandableIcon={{ collapsed: <FiArrowDownCircle />, expanded: <FiArrowUpCircle /> }}
                        expandableRowDisabled={handleExpendableRowsDisabled}
                        expandableRowExpanded={handlePreExpendableRows}
                        dense
                        pointerOnHover
                        theme={isDarktheme ? 'dark' : 'default'}
                    />
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default DataTableComponent
```