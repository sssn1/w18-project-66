import Image from "next/image";
import loader from '@/assets/loader.gif';
 
const Loading_66 = () => {
    return (
        <div className="flex justify-center items-center h-lvh w-lvh">
            <Image src={loader} alt="Loading..." width={150} height={150} />
        </div>
    );
}
export default Loading_66;