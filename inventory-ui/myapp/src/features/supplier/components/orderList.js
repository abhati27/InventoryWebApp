 import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateStatus } from "../../../store/action/supplier";
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
 import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
 import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
 
function OrderList(){
    const dispatch = useDispatch();
    let {list} = useSelector((state)=>state.supplier)
    const dt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(()=>{
        dispatch(getOrders());
        
    },[dispatch]);

     const filterList = (status)=>{
        list = list.filter(o=>o.status !== status).sort((o1,o2)=>o1.id-o2.id)
        
     }

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <h3>Current Pending Order List</h3>
                   </div>
        );
    };

    const rightToolbarTemplate = () => {
        return(
            <React.Fragment>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
                </span>
                &nbsp;&nbsp;
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
            </React.Fragment>    
        ) 
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };
    

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.product.price);
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
    };
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    const getSeverity = (order) => {
        switch (order.status) {
            case 'APPROVED':
            case 'ACCEPTED':
            case 'DELIVERED':
                return 'success';

            case 'PENDING':
            case 'RECIEVED':
                return 'warning';

            case 'REJECTED':
            case 'DENIED':
                return 'danger';

            default:
                return 'success';
        }
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                 <button className="btn btn-info" onClick={()=>editStatus(rowData.id,'ACCEPTED')}> ACCEPTED </button>
                &nbsp;&nbsp;
                <button className="btn btn-danger"  onClick={()=>editStatus(rowData.id,'REJECTED')} >  REJECTED </button>
                &nbsp;&nbsp;
                <button className="btn btn-success"  onClick={()=>editStatus(rowData.id,'DELIVERED')}> DELIVERED</button>
            </React.Fragment>
        );
    };

    const editStatus = (id,status) =>{
        dispatch(updateStatus(id,status));
    }
    return(
        <div> 
            {filterList('APPROVED')}
             <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={list}  
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[2, 10, 25, 100]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" 
                        globalFilter={globalFilter}  >
                     <Column field="id" header="Order Id" sortable style={{ minWidth: '4rem' }}></Column>
                    <Column field="product.title" header="Product" sortable style={{ minWidth: '8rem' }}></Column>
                     <Column field="product.price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '6rem' }}></Column>
                    <Column field="supplier.name" header="Supplier Name" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="dateOfOrder" header="Order Date" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="quantity" header="Order Qty" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="warehouse.location" header="Warehouse Loc" sortable style={{ minWidth: '8rem' }}></Column>
                     <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '16rem' }}></Column>
                </DataTable>
            </div>
        </div>
    )
}
export default OrderList;