
import { createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    const logGoogleUser = async () => {
        const doc = await signInWithGooglePopup();
        console.log(doc);
        const userDocRef = await createUserDocumentFromAuth(doc.user);
    }

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;