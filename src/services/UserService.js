import axios from "axios"


export const loginUser = async (data ) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
    return response.data
}

export const signupUser = async (data ) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
    return response.data
}