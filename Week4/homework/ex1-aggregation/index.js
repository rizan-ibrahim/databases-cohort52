import {
  getPopulationByCountry,
  getAgeDataWithTotal,
} from "./aggregationFunctions.js";

const run = async () => {
  console.log("Population totals for Netherlands by year:");
  const netherlands = await getPopulationByCountry("Netherlands");
  console.log(netherlands);

  console.log("All continents with Age '100+' in 2020:");
  const ageGroup = await getAgeDataWithTotal(2020, "100+");
  console.log(ageGroup);
};

run();
