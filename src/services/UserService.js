import axios from "axios"


export const loginUser = async (data ) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
    return response.data
}

export const signupUser = async (data ) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
    return response.data
}

export const getDetailsUser = async (id, access_token ) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return response.data
}