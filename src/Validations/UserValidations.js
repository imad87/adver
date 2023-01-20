import * as yup from "yup";

export const userSchema =yup.object().shape({
image: yup.string().required("image is required"),


content: yup.string().required("content is required").min(10),


})


