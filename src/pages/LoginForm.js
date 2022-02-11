import * as Yup from "yup"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { allActions } from "../lib/redux/actions"
import { useFormik } from "formik"
import styled from "styled-components"
import userCredentials from "../logincredentials.json"
import { InputGroup, Button } from "react-bootstrap"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required")
})

export const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: ({ email, password }) => {
      if (
        email !== userCredentials.email &&
        password !== userCredentials.password
      )
        return alert(`Please check your credentials `)
      if (email !== userCredentials.email)
        return alert(`Please check your ${email} `)
      if (password !== userCredentials.password)
        return alert(`Please check your password `)
      dispatch(allActions.userActions.setUser({ email, password }))
      navigate("/")
    },
    validationSchema: LoginSchema
  })

  return (
    <form
      className="needs-validation"
      noValidate
      style={{
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "70%",
        width: "30%",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
      }}
      onSubmit={formik.handleSubmit}
    >
      <InputGroup>
        <input
          name="email"
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="form-control"
          type="email"
          placeholder="email"
        />
      </InputGroup>

      {formik.errors.email && formik.touched.email ? (
        <div>Email {formik.errors.email}</div>
      ) : null}

      <InputGroup>
        <input
          className="form-control"
          name="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          placeholder="password"
        />
      </InputGroup>

      {formik.errors.password && formik.touched.password ? (
        <label> Password {formik.errors.password}</label>
      ) : null}
      <Button type="submit">Login</Button>
    </form>
  )
}
