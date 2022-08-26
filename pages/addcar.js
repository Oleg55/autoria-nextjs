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
  }
  
  startExecuteMyMutation(values.brand, values.engine, values.model, values.price, values.spec_model, values.type, values.year);
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]:value})
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
