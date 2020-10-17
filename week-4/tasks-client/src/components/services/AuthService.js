import axios from "axios";

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_DOMAIN}/auth`,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                // Authorization: "Bearer <token_here>",
            },
        });

        this.service = service;
        console.log({ service, domain: process.env.REACT_APP_API_DOMAIN });
    }

    signup = (email, password, username) => {
        return this.service
            .post("/signup", { email, password, username })
            .then((response) => response.data);
    };

    login = (email, password) => {
        return this.service
            .post("/login", { email, password })
            .then((response) => response.data);
    };

    logout = () => {
        return this.service.delete(`/logout`).then((response) => response.data);
    };

    currentUser = () => {
        console.log("checking for current user");
        return this.service
            .get("/isLoggedIn")
            .then((response) => response.data);
    };
}

export default AuthService;
