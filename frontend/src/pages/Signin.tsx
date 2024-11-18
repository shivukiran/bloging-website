import { Quote } from '../components/Quote';
import { SignIn } from '../components/SignIn';

export const Signin = ()=>{
    return <div>
        {/* Signup Page */}
        <div className="grid grid-cols-1 lg:grid-cols-2">

            <div>
                <SignIn></SignIn>
            </div>

            <div className="hidden lg:block">
            <Quote></Quote>
            </div>
        </div>
    </div>
} 
