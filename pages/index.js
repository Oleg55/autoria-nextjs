export default function Home({brands}) {
  
  console.log(brands);
  return (
    <>
    <ul>
      {
        brands.map((brand)=>{
          return <li key={brand.id}>{brand.brand}</li>
        })
      }
    </ul>
    </>
  )
}

export async function getStaticProps(context) {
  async function fetchGraphQL(operationsDoc, operationName, variables) {
    // const dev = process.env.HASURA_URL !== 'production';
    // const server = dev ? 'http://localhost:8080/v1/graphql': 'https://autorianext.hasura.app/v1/graphql';

    const result = await fetch(
      'https://autorianext.hasura.app/v1/graphql',
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
    query CarBrands {
      car_brands {
        brand
        id
      }
    }
  `;
  
  function fetchMyQuery() {
    return fetchGraphQL(
      operationsDoc,
      "CarBrands",
      {}
    );
  }
  
  async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    return data.car_brands
  }
  
  const brands = await startFetchMyQuery();

  console.log(brands);

  return {
    props: {brands}, // will be passed to the page component as props
  }
}
