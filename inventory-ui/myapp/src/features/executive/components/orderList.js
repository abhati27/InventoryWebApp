import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';

function OrderList(){
    let emptyOrder = {
        id: null,
        title: '',
        name: null,
        dateOfOrder: '',
        quantity: null,
        sname: 0,
        location: 0,
        status: 'INSTOCK'
    };
 
    const [orders,setOrders] = useState([]); 
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
     const [, setProduct] = useState({});
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [suppliers, setSuppliers] = useState([]);
    const [warehouse, setWarehouse] = useState([]);

    const [productId,setProductId] = useState(null);
    const [supplierId,setSupplierId] = useState(null);
    const [warehouseId,setWarehouseId] = useState(null);
    const [quantity,setQuantity] = useState(null);


    useEffect(() => {
         async function getOrders(){
            try{
                let token = localStorage.getItem('token'); 
                const response 
                    = await axios.get('http://localhost:8282/order/all',{
                        headers:{
                            'Authorization': 'Basic ' + token
                        }
                    }); 
                setOrders(response.data);    
             }
            catch(err){
                setErrorMsg('Invalid Credentials!!')
            }  
        }

        async function getProducts(){
            try{
                let token = localStorage.getItem('token'); 
                const response 
                    = await axios.get('http://localhost:8282/product/all',{
                        headers:{
                            'Authorization': 'Basic ' + token
                        }
                    }); 
                setProducts(response.data);    
             }
            catch(err){
                setErrorMsg('Invalid Credentials!!')
            }  
        }

        async function getSuppliers(){
            try{
                let token = localStorage.getItem('token'); 
                const response 
                    = await axios.get('http://localhost:8282/supplier/all',{
                        headers:{
                            'Authorization': 'Basic ' + token
                        }
                    }); 
                setSuppliers(response.data);    
             }
            catch(err){
                setErrorMsg('Invalid Credentials!!')
            }  
        }

        async function getWarehouse(){
            try{
                let token = localStorage.getItem('token'); 
                const response 
                    = await axios.get('http://localhost:8282/warehouse/all',{
                        headers:{
                            'Authorization': 'Basic ' + token
                        }
                    }); 
                    setWarehouse(response.data);    
             }
            catch(err){
                setErrorMsg('Invalid Credentials!!')
            }  
        }
        getOrders();
        getProducts();
        getSuppliers();
        getWarehouse();
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyOrder);
        setSubmitted(false);
        setProductDialog(true);
        setErrorMsg(null)
        setSuccessMsg(null)
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };
 
 

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };
 

    

    const exportCSV = () => {
        dt.current.exportCSV();
    };

   

   
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New Order" icon="pi pi-plus" severity="success" onClick={openNew} />
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
    
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.product.price);
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                &nbsp;&nbsp;
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() =>{}} />
            </React.Fragment>
        );
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

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Order List</h4>
            
        </div>
    );

    const processOrder=()=>{
       // console.log(JSON.stringify(productId) + '--' + supplierId + "--" + warehouseId + '--' + quantity);
        let order ={
            'productId': productId.id,
            'supplierId': supplierId.id,
            'warehouseId': warehouseId,
            'quantity': quantity
        }
        const postOrder = async ()=>{
            try{
                let token=localStorage.getItem('token'); 
                const response = await axios.post('http://localhost:8282/order/post',order,{
                    headers:{
                        'Authorization': 'Basic ' + token
                    }
                });
                setSuccessMsg('Order successfully placed');
                let temp = orders; 
                temp.push(response.data);
                setOrders(temp); 
             }
            catch(err){
                setErrorMsg('Error adding info, pls contact IT')
            }
            
        } 
        postOrder();

    }
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Add Order" icon="pi pi-check" onClick={()=>processOrder()} /> 
        </React.Fragment>
    );
    
    /** Add Order Dailog functions */
    const selectedProductTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                     <div value={option.id}>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const productOptionTemplate = (product) => {
        return (
            <div className="flex align-items-center">
                 <div>{product.name}</div>
            </div>
        );
    };
 

        return(
            <div>
             <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={orders} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[2, 10, 25, 100]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" 
                        globalFilter={globalFilter} header={header}>
                     <Column field="id" header="Order Id" sortable style={{ minWidth: '4rem' }}></Column>
                    <Column field="product.title" header="Product" sortable style={{ minWidth: '8rem' }}></Column>
                     <Column field="product.price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '6rem' }}></Column>
                    <Column field="supplier.name" header="Supplier Name" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="dateOfOrder" header="Order Date" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="quantity" header="Order Qty" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="warehouse.location" header="Warehouse Loc" sortable style={{ minWidth: '12rem' }}></Column>
                     <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '40rem' }} 
                    breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                    header="Order Details" modal className="p-fluid" 
                    footer={productDialogFooter} onHide={hideDialog}>
                
                {!successMsg?'': <div className="alert alert-primary mb-4" role="alert">
                       {successMsg}
                </div> }
                {!errorMsg?'': <div className="alert alert-danger mb-4" role="alert">
                       {errorMsg}
                </div> }
                <label htmlFor="name" className="font-bold">
                        Select Product:
                    </label>
                <div className="card flex justify-content-center mb-4">
                     <Dropdown value={productId} onChange={(e) => setProductId(e.value)} options={products} optionLabel="name" placeholder="Select a Product" 
                     filter valueTemplate={selectedProductTemplate} itemTemplate={productOptionTemplate} className="w-full md:w-14rem" />
                </div>    
                
                <label htmlFor="name" className="font-bold">
                        Select Supplier:
                    </label>
                <div className="card flex justify-content-center mb-4">
                     <Dropdown value={ supplierId} onChange={(e) => setSupplierId(e.target.value)} options={suppliers} optionLabel="name" placeholder="Select a Supplier" 
                     filter valueTemplate={selectedProductTemplate} itemTemplate={productOptionTemplate} className="w-full md:w-14rem" />
                </div>     

                <div className="field">
                    <label className="mb-3 font-bold">Warehouse: </label>
                     

                    <div className="form-check mb-4">
                        {
                            warehouse.map((w,index)=>{
                                return(
                                    <div key={index}>
                                             <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"  value={w.id}
                                              onClick={(e)=> {setWarehouseId(e.target.value)}} />
                                            <label className="form-check-label" for="flexRadioDefault1">
                                                {w.location}
                                             </label>
                                    </div>
                                )
                            })
                        }
                       
                    </div>
                        
                    
                </div>

                <div className="formgrid grid">
                     
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <input type="text" className="form-control" value={quantity} onChange={(e)=> setQuantity(e.target.value)}  />
                    </div>
                </div>
            </Dialog>
            </div>
        )
    
}

export default OrderList;