import { APP_NAME } from "@/lib/constants";

const Footer_66 = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bordet-t">
            <div className="p-5 flex-center">
                {currentYear} {APP_NAME}. All rights reserved.
            </div>
        </footer>
    );
}
export default Footer_66;