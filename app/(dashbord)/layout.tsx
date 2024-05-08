import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import ToasterProvider from "@/components/toaster-provider"
import { getApiLimitCount } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";

const DashbordLayout = async ({
    children
}:
{children:React.ReactNode;
})=>{
    const isPro =await checkSubscription()
    const apiLimitCount = await getApiLimitCount();
    return(
        <div className="h-full relative">
            <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0">
                <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
            </div>
            <main className="md:pl-72 h-full ">
                <ToasterProvider/>
                <Navbar/>
                {children}
            </main>
        </div>
    );
}
export default DashbordLayout;{/* {children} */}