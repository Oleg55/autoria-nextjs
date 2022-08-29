import SidebarFormfrom  from "../components/SidebarForm";
import { useState, useEffect } from "react";

import CarsList from "../components/CarsList";

export default function Home({ carsInfo }) {
  const { car_brands, car_year } = carsInfo;

  // текущая дата
  const date = new Date();
  const getNowYear = date.getFullYear();

  const [values, setValues] = useState({
    brand: "",
    //   engine: "",
    //   model: "",
    //   price: "",
    //   spec_model: "",
    //   type: "",
    yearFrom: 1900,
    yearTo: getNowYear,
  });

  //данные которые прийдут
  const [data, setData] = useState([]);
  // console.log(values);

  // действия на отправку формы
  const handlSubmit = (e) => {
    e.preventDefault();

    // если пользователь не заполнил поле бранд
    // P.S временное решение
    if (values.brand == "") {
      async function fetchGraphQL(
        operationsDocGetAllCars,
        operationName,
        variables
      ) {
        const result = await fetch(process.env.NEXT_PUBLIC_HASURA_URL, {
          method: "POST",
          headers: {
            "x-hasura-admin-secret":
              process.env.NEXT_PUBLIC_X_HASURA_ADMIN_SECRET,
          },
          method: "POST",
          body: JSON.stringify({
            query: operationsDocGetAllCars,
            variables: variables,
            operationName: operationName,
          }),
        });

        return await result.json();
      }
      const operationsDocGetAllCars = `
      query MyQuery2 {
        users_cars {
          id
          model
          brand
          engine
          price
          spec_model
          type
          year
        }
      }
    `;

      function fetchMyQuery2() {
        return fetchGraphQL(operationsDocGetAllCars, "MyQuery2", {});
      }

      async function startFetchMyQuery2() {
        const { errors, data } = await fetchMyQuery2();

        if (errors) {
          // handle those errors like a pro
          console.error(errors);
        }

        // do something great with this precious data
        console.log(data);
        return setData(data.users_cars);
      }

      startFetchMyQuery2();
    } else {
      // если пользователь заполнил поле бранд
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
      query MyQuery($brand: String!, $yearFrom: Int! , $yearTo: Int!) {
      users_cars(where: {brand: {_eq: $brand}, _and: {year: {_gte: $yearFrom, _lte: $yearTo}}}) {
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
      function fetchMyQuery(brand, yearFrom, yearTo) {
        return fetchGraphQL(operationsDoc, "MyQuery", {
          brand: brand,
          yearFrom: yearFrom,
          yearTo: yearTo,
        });
      }
      async function startFetchMyQuery(brand, yearFrom, yearTo) {
        const { errors, data } = await fetchMyQuery(brand, yearFrom, yearTo);

        if (errors) {
          // handle those errors like a pro
          console.error(errors);
        }

        // do something great with this precious data
        // console.log(data);
        return setData(data.users_cars);
      }
      startFetchMyQuery(values.brand, values.yearFrom, values.yearTo);
    }
  };

  console.log(data);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="main">
      <div className="container">
        <div className="container-wrapper">
          <div className="sidebar">
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
                  <option value="" defaultValue>
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
                    name="yearFrom"
                    id="yearFrom"
                    onChange={handleInputChange}
                    value={values.yearFrom}
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
                  <select
                    name="yearTo"
                    id="yearTo"
                    onChange={handleInputChange}
                    value={values.yearTo}
                  >
                    <option value={getNowYear} defaultValue>
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
          </div>

          <div className="mainBlock">
            <CarsList userCars={data}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(process.env.HASURA_URL, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": process.env.X_HASURA_ADMIN_SECRET,
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
    return fetchGraphQL(operationsDoc, "MyQuery", {});
  }

  async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();

    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }

    // do something great with this precious data
    return data;
  }

  const carsInfo = await startFetchMyQuery();

  console.log(carsInfo);

  return {
    props: { carsInfo }, // will be passed to the page component as props
    revalidate: 10,
  };
}
