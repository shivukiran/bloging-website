import  {Quote}  from '../components/Quote'
import { SignUp } from '../components/SignUp'

export const Signup = ()=>{
    return <div>
        {/* Signup Page */}
        <div className="grid grid-cols-1  lg:grid-cols-2">

            <div>
                <SignUp></SignUp>
            </div>

            <div className="hidden lg:block">
            <Quote></Quote>
            </div>
        </div>
    </div>
} 