import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
    return (
        <div className="text-center">
            <div className="divider"></div>
            <button className="btn btn-outline pr-6">
                <FaGoogle className="w-7" /> Google
            </button>
        </div>
    );
};

export default SocialLogin;