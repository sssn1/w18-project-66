//import sampleData from "@/db/sample-data";
import ProductList_66 from "@/components/product_66/product-list_66";
import { getLatestProducts_66 } from "@/lib/actions/procduct.actions_66";

//const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HomePage_66 =  async () => {
  // await delay(3000);
 // console.log("sampleData", sampleData);
 const latestProducts = await getLatestProducts_66();
  return  (
    <>
    <ProductList_66 data={latestProducts} title="Newest Arrival" limit={4}/>
    </> 
  )
}
export default HomePage_66;