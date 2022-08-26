import { useState } from "react";

import CarsForm from './carsForm'


export default function MainForm({ carsInfo, carButtonText }) {
  const { car_brands, car_year } = carsInfo;

  const [values, setValues] = useState({
    brand: "",
    //   engine: "",
    //   model: "",
    //   price: "",
    //   spec_model: "",
    //   type: "",
    year: "",
  });

  const [data, setData] = useState([]);
  console.log(values);

  const handlSubmit = (e) => {
    e.preventDefault();
    console.log(values.brand);
    console.log(values.year);

    async function fetchGraphQL(operationsDoc, operationName, variables) {
      const result = await fetch(process.env.NEXT_PUBLIC_HASURA_URL, {
        method: "POST",
        headers: {
          "x-hasura-admin-secret":
            process.env.NEXT_PUBLIC_X_HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName,
        }),
      });

      return await result.json();
    }

    const operationsDoc = `
        query MyQuery($brand: String!, $year: Int!) {
        users_cars(where: {brand: {_eq: $brand}, engine: {_eq: $year}}) {
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

    function fetchMyQuery(brand, year) {
      return fetchGraphQL(operationsDoc, "MyQuery", {
        brand: brand,
        year: year,
      });
    }

    async function startFetchMyQuery(brand, year) {
      const { errors, data } = await fetchMyQuery(brand, year);

      if (errors) {
        // handle those errors like a pro
        console.error(errors);
      }

      // do something great with this precious data
      console.log(data);
      return setData(data.users_cars);
    }

    startFetchMyQuery(values.brand, values.year);

    // console.log(carsFinded);

    // return carsFinded;
  };

  console.log(data);
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <form onSubmit={handlSubmit}>
        {/* компонетн вывода марок авто */}
        <div>
          <label htmlFor="carBrans">Choose a car:</label>
          <select
            name="brand"
            id="carBrans"
            onChange={handleInputChange}
            value={values.brand}
          >
            <option value="any" defaultValue>
              Any
            </option>
            {car_brands.map((brand) => {
              return (
                <option value={brand.brand} key={brand.id}>
                  {brand.brand}
                </option>
              );
            })}
          </select>
        </div>
        {/* компонетн вывода марок авто --- */}

        {/* компонетн выбора года авто */}
        <div>
          <span>
            <label htmlFor="yearFromsFrom">Choose a car year from:</label>
            <select
              name="year"
              id="year"
              onChange={handleInputChange}
              value={values.year}
            >
              <option value="any" defaultValue>
                Any
              </option>
              {car_year.map((year) => {
                return (
                  <option value={year.year} key={year.id}>
                    {year.year}
                  </option>
                );
              })}
            </select>
          </span>

          <span>
            <label htmlFor="yearFromsUntil">Choose a car year to:</label>
            <select name="yearFromsFromUntil" id="yearFromsFromUntil">
              <option value="any" defaultValue>
                Any
              </option>
              {car_year.map((year) => {
                return (
                  <option value={year.year} key={year.id}>
                    {year.year}
                  </option>
                );
              })}
            </select>
          </span>
        </div>
        {/* компонетн выбора года авто --- */}
        <div>
          <input type="submit" value={carButtonText} />
        </div>
      </form>
      

      <CarsForm carsBrand={data.brand} carEngine={data.engine} carId={data.id} carPrice={data.price}/>


      {data.brand}
      {data.engine}
      {data.id}
      {data.price}
      {data.spec_model}
      {data.type}
      {data.year}


    </>
  );
}
