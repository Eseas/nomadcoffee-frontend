import { useNavigate } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "../apollo";
import routes from "../routes";

function useNavigation() {
    const navigate = useNavigate();
    function moveAdmin() {
        navigate(`${routes.admin}/${localStorage.getItem("USERNAME")}`);
    }

    return { moveAdmin };
}

function Home() {
    const { moveAdmin } = useNavigation();

    return (
        <div>
            <h1>Home</h1>
            <button onClick={moveAdmin}>Go Admin</button>
            <button onClick={() => logUserOut()}>Log out now!</button>
        </div>
    );
}

export default Home;