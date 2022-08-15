import { Link } from "react-router-dom";
import Navbar from "../organisms/Navbar";

function NotFound() {
    return (
        <>
            <Navbar />
            <div className="container pt-[100px]">
                <div className="ml-[200px] mr-[200px]">
                    <div className="relative">
                        <div
                            className="bg-sub1 text-white text-[43px] font-bold p-[10px_31px] rounded-[20px] w-[151px]
                    h-[72px] flex justify-center items-center"
                        >
                            404
                        </div>
                        <div className="bg-sub1 w-[17.5px] h-[12.5px] rotate-[45deg] absolute bottom-[-4px] left-[20px]"></div>
                    </div>
                    <div className="text-[100px] ml-[20px] text-sub1">
                        PAGE NOT FOUND
                    </div>
                    <div className="font-thin tracking-wide text-[#646464] text-[30px] ml-[30px] mt-[11px]">
                        <div>we looked everywhere for this page.</div>
                        <div>Are you sure the website URL is correct?</div>
                        <div>Get in touch with the site owner.</div>
                    </div>
                    <div className="mt-[80px] ml-[25px]">
                        <Link
                            to="/"
                            className=" font-thin text-[40px] border-[3px] border-sub1 p-[23px_21px] rounded-[50px] text-sub1
                    hover:bg-sub1 hover:text-white"
                        >
                            Go Back Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;
