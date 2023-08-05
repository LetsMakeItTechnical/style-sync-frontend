import axios from 'axios'

axios.defaults.withCredentials = true

export const createAxiosInstance = () => {
    return axios.create({
        baseURL: 'http://localhost:9000/v1',
        withCredentials: true,
    });
};

class UserAuthenticationService {
    private axiosInstance

    constructor() {
        this.axiosInstance = createAxiosInstance()
    }

    public signup = async ({
        name,
        email,
        password,
        passwordConfirm,
    }: {
        name: string,
        email: string,
        password: string,
        passwordConfirm: string,
    }) => {
        const { data } = await this.axiosInstance.post('/auth/signup', {
            name,
            email,
            password,
            passwordConfirm
        })

        return data
    }


    public login = async ({
        email,
        password,
    }: {
        email: string,
        password: string,
    }) => {
        const { data } = await this.axiosInstance.post('/auth/login', {
            email,
            password,
        })

        return data
    }


    public getUsers = async () => {
        const { data } = await this.axiosInstance.get('/users')
        return data
    }

    public isLoggedIn = async () => {
        try {
            const { data } = await this.axiosInstance.post('/auth/isLoggedin')
            return data.status === 'success'
        } catch (error) {
            return false
        }
    }
}

const userAuthenticationService = new UserAuthenticationService()


export default userAuthenticationService