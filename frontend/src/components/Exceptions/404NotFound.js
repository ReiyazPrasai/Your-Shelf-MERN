import React from "react"
import { Link } from "react-router-dom"

const NotFound = (props) => {
  return (
    <div className={"h-full centralize"} style={{ width: "100%" }}>
      <div>
        <h1
          style={{
            color: "#014f80",
            fontSize: "10rem",
            fontWeight: "bold",
            margin: 0,
            height: "185px",
            textAlign: "center",
          }}
        >
          404
        </h1>
        <h1 style={{ fontSize: "2.4rem", margin: 0, textAlign: "center" }}>
          Page not found
        </h1>
        <h4 style={{ margin: 0, textAlign: "center" }}>
          <Link className={"link-color"} to="/h/home">
            Click here
          </Link>{" "}
          to return to home
        </h4>
        <br />
        <br />
        <br />
        <br />
        <div
          style={{
            width: "80%",
            margin: "auto",
            height: "20px",
            borderRadius: "50%",
            background: "#d9d9d9",
            boxShadow: "0 0 12px #d3d3d3",
          }}
        ></div>
      </div>
    </div>
  )
}

export default NotFound
