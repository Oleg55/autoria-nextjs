import MainForm from "../components/mainForm";
import { useState } from "react";

const AddCar = () => {
  const [values, setValues] = useState({
    brand: "",
    engine: "",
    model: "",
    price: "",
    spec_model: "",
    type: "",
    year: "",
  });

  const handlSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const handleInputChange = (e) => {
    console.log(e.target.name);
  };

  return (
    <>
      <form onSubmit={handlSubmit}>
        <div>
            <input 
                type="text" 
                name="brand" 
                id="brand" 
                value={values.brand}
                onChange={handleInputChange}/>
        </div>
        <div>
            <input 
                type="text" 
                name="engine" 
                id="engine" 
                value={values.engine}
                onChange={handleInputChange}/>
        </div>
        <div>
            <input 
                type="text" 
                name="model" 
                id="model" 
                value={values.model}
                onChange={handleInputChange}/>
        </div>
        <div>
            <input 
                type="text" 
                name="price" 
                id="price" 
                value={values.price}
                onChange={handleInputChange}/>
        </div>
        <div>
            <input 
                type="text" 
                name="spec_model" 
                id="spec_model" 
                value={values.spec_model}
                onChange={handleInputChange}/>
        </div>
        <div>
            <input 
                type="text" 
                name="type" 
                id="type" 
                value={values.type}
                onChange={handleInputChange}/>
        </div>
        <div>
            <input 
                type="text" 
                name="year" 
                id="year" 
                value={values.year}
                onChange={handleInputChange}/>
        </div>



        <input type="submit"  value={"Add"}/>
      </form>
    </>
  );
};


export default AddCar;
