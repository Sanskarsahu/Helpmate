
import { UserButton } from "@clerk/nextjs"

import Mobilesidebar from "./mobile-sidebar"
import { getApiLimitCount } from "@/lib/api-limits"
import { checkSubscription } from "@/lib/subscription"

const Navbar = async()=> {
    const isPro=await checkSubscription()
    const apiLimitCount = await getApiLimitCount();
 return (
    <div className=" flex  items-center p-4">
        <Mobilesidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
        <div className="w-full flex justify-end">
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
 )
}
export default Navbar;