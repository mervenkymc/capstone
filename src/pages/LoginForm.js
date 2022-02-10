import * as Yup from "yup"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { allActions } from "../lib/redux/actions"
import { useFormik } from "formik"
import styled from "styled-components"
import userCredentials from "../logincredentials.json"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required")
})

export const LoginForm = () => {
  const currentUser = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: ({ email, password }) => {
      if (
        email !== userCredentials.useremail &&
        password !== userCredentials.userpassword
      )
        return alert(`Please check your credentials `)
      if (email !== userCredentials.useremail)
        return alert(`Please check your ${email} `)
      if (password !== userCredentials.userpassword)
        return alert(`Please check your password `)
      dispatch(allActions.userActions.setUser({ email, password }))
      navigate("/")
    },
    validationSchema: LoginSchema
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="email"
        id="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        type="email"
        placeholder="email"
      />
      <div>{JSON.stringify(currentUser.userData, null, 2)}</div>
      <div>{JSON.stringify(currentUser.isLoggedIn, null, 2)}</div>
      {formik.errors.email && formik.touched.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <input
        name="password"
        id="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        type="password"
        placeholder="password"
      />
      {formik.errors.password && formik.touched.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <button type="submit">Submit button</button>
    </form>
  )
}
const Input = styled.input``
