import MainForm from '../components/mainForm'

export default function Home({carsInfo}) {
  


  return (
    <>
      <MainForm carsInfo={carsInfo} carButtonText={"Find"}/>
    </>
  )
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



