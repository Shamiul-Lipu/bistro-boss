import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const { googlSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";


    const handleGoogleSignIn = () => {
        googlSignIn()
            .then(result => {
                const loggedInUser = result.user;
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
                fetch(`http://localhost:5000/users`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        navigate(from, { replace: true });
                        if (data.insertedId) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate(from, { replace: true });
                        }
                    })
            })
    }
    return (
        <div className="text-center py-4">
            <div className="divider"></div>
            <button onClick={handleGoogleSignIn} className="btn btn-outline pr-6">
                <FaGoogle className="w-7" /> Google
            </button>
        </div>
    );
};

export default SocialLogin;