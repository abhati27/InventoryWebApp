import  supplier from  './store/reducer/supplier'; 
const { configureStore } = require("@reduxjs/toolkit");
export default configureStore({
    reducer: {supplier} /** Make entry of all reducers here  */
})
