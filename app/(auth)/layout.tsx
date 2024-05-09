import { LandingNavbar } from "@/components/landing-navbar";

const AuthLayout = ({
    children
}:
{children:React.ReactNode;
})=>{
    return(
        <div className="flex items-center justify-center h-full bg-blue-950">
            <LandingNavbar/>
            {children}
        </div>
    );
}
export default AuthLayout;