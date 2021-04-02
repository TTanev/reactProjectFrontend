import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="footer">
      <p>
        <Link to="/" className="footer__link">
          Home
        </Link>{" "}
        |{" "}
        <Link className="footer__link" to="/about-us">
          About Us
        </Link>{" "}
        |{" "}
        <Link className="footer__link" to="/terms">
          Terms
        </Link>
      </p>
      <p className="footer__p">
        Copyright &copy; 2021{" "}
        <Link to="/" className="footer__link">
          WorkManager
        </Link>
        . All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
