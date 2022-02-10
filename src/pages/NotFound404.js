import React from "react"

export const NotFound404 = ({ product }) => {
  return product ? <div>Product not found</div> : <div>Page not found 404</div>
}
