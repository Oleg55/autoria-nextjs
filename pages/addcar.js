import { useState } from "react";
import Link from 'next/link'

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

  const [dataSend, setDataSend] = useState(false);

//   console.log(values);

  const handlSubmit = (e) => {
    e.preventDefault();
    

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
        process.env.NEXT_PUBLIC_HASURA_URL,
      {
        method: "POST",
        headers: {
          'x-hasura-admin-secret': process.env.NEXT_PUBLIC_X_HASURA_ADMIN_SECRET
        },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    );
  
    return await result.json();
  }
  
  const operationsDoc = `
    mutation MyMutation($brand: String!, $engine: Int!, $model: String!, $price: Int!, $spec_model: String!, $type: String!, $year: Int!) {
      insert_users_cars_one(object: {brand: $brand, engine: $engine, model: $model, price: $price, spec_model: $spec_model, type: $type, year: $year}) {
        brand
        engine
        id
        model
        price
        spec_model
        type
        year
      }
    }
  `;
  
  function executeMyMutation(brand, engine, model, price, spec_model, type, year) {
    return fetchGraphQL(
      operationsDoc,
      "MyMutation",
      {"brand": brand, "engine": engine, "model": model, "price": price, "spec_model": spec_model, "type": type, "year": year}
    );
  }
  
  async function startExecuteMyMutation(brand, engine, model, price, spec_model, type, year) {
    const { errors, data } = await executeMyMutation(brand, engine, model, price, spec_model, type, year);
  
    if (errors) {
      // handle those errors like a pro
      console.log("error");
      console.error(errors);
    }
    
    // do something great with this precious data
    console.log(data);
    setDataSend(true)
  }
  
  startExecuteMyMutation(values.brand, values.engine, values.model, values.price, values.spec_model, values.type, values.year);
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]:value})
  };

  return (
    <div className="container">
      <form onSubmit={handlSubmit}>
        <div className="addCarItem">
        Brand:
            <input 
                className="addCarInput"
                type="text" 
                name="brand" 
                id="brand" 
                value={values.brand}
                onChange={handleInputChange}/>
        </div>
        <div className="addCarItem">
        Engine:
            <input 
                className="addCarInput"
                type="text" 
                name="engine" 
                id="engine" 
                value={values.engine}
                onChange={handleInputChange}/>
        </div>
        <div className="addCarItem">
        Model:
            <input 
                className="addCarInput"
                type="text" 
                name="model" 
                id="model" 
                value={values.model}
                onChange={handleInputChange}/>
        </div>
        <div className="addCarItem">
        Price:
            <input 
                className="addCarInput"
                type="text" 
                name="price" 
                id="price" 
                value={values.price}
                onChange={handleInputChange}/>
        </div>
        <div className="addCarItem">
        Spesial Model:
            <input
                className="addCarInput" 
                type="text" 
                name="spec_model" 
                id="spec_model" 
                value={values.spec_model}
                onChange={handleInputChange}/>
        </div>
        <div className="addCarItem">
        Type:
            <input 
                className="addCarInput"
                type="text" 
                name="type" 
                id="type" 
                value={values.type}
                onChange={handleInputChange}/>
        </div>
        <div className="addCarItem">
        Year:
            <input 
                className="addCarInput"
                type="text" 
                name="year" 
                id="year" 
                value={values.year}
                onChange={handleInputChange}/>
        </div>



        <input type="submit"  value={"Add"}/>
      </form>
      {dataSend && (
        <div>Car was Add success</div>
      )}
      <div>
        <Link href="/">
        <a>Main page</a>
        </Link>
      </div>
    </div>
  );
};


export default AddCar;
