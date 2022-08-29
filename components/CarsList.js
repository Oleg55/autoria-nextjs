

const CarsList = ({userCars}) => {
  return (
    <>
        {  
            userCars.map((item) => {
                return (
                    <div key={item.id}>
                        <div style={{ color: "red" }}>Brand:{item.brand}</div>
                        <div>Model:{item.model}</div>
                        <div>Engine:{item.engine}</div>
                        <div>Price:{item.price}</div>
                        <div>Spesial Model:{item.spec_model}</div>
                        <div>Type:{item.type}</div>
                        <div>Year:{item.year}</div>
                    </div>
                );
            })
        } 
    </>
  )
}

export default CarsList;