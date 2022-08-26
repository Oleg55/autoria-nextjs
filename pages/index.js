import MainForm from '../components/mainForm'
import { useState, useEffect } from "react";

import CarsForm from '../components/carsForm'

export default function Home({carsInfo}) {
  


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
  // console.log(values);

  const handlSubmit = (e) => {
    e.preventDefault();
    // console.log(values.brand);
    // console.log(values.year);

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
        users_cars(where: {brand: {_eq: $brand}, _and: {year: {_eq: $year}}}) {
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
      // console.log(data);
      return setData(data.users_cars);
    }

    startFetchMyQuery(values.brand, values.year);

    // console.log(carsFinded);

    // return carsFinded;
  };

  useEffect(() => {
    console.log(data);
    setData(data)
  }, [])
  

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
          <input type="submit" value={"Find"} />
        </div>
      </form>
      

      {data && (
        data.map((item) => {
          return (
            <li  key={item.id} >
              <span>{item.brand}</span><br/>
              <span>{item.engine}</span><br/>
              <span>{item.price}</span><br/>
              <span>{item.spec_model}</span><br/>
              <span>{item.type}</span><br/>
              <span>{item.year}</span><br/>
            </li>
          );
        }))
      }
    


    </>
  );
}

export async function getStaticProps(context) {
  async function fetchGraphQL(operationsDoc, operationName, variables) {

    const result = await fetch(
      process.env.HASURA_URL,
      {
        method: "POST",
        headers: {
          'x-hasura-admin-secret': process.env.X_HASURA_ADMIN_SECRET
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
    query MyQuery {
      car_year {
        id
        year
      }
      car_brands {
        brand
        id
      }
    }
  `;

  
  function fetchMyQuery() {
    return fetchGraphQL(operationsDoc,"MyQuery",{});
  }
  
  async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    return data
  }
  
  const carsInfo = await startFetchMyQuery();

  console.log(carsInfo);

  return {
    props: {carsInfo}, // will be passed to the page component as props
    revalidate: 10
  }

  
}



