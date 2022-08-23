export default function MainForm({ carsInfo, carButtonText }) {
  const { car_brands, car_year } = carsInfo;

  return (
    <>
      <form>
        {/* компонетн вывода марок авто */}
        <div>
          <label htmlFor="carBrans">Choose a car:</label>
          <select name="carBrans" id="carBrans">
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
            <select name="yearFromsFrom" id="yearFromsFrom">
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
    </>
  );
}
