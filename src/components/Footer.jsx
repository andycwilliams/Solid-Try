import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

const Copyright = () => {
  return (
    <div>
      {"Copyright © "}
      <a href="/">Solid Try</a>
      &nbsp;
      {new Date().getFullYear()}
    </div>
  );
};

const Footer = () => {
  return (
    <footer>
      <div>
        <ul>
          <li>
            <FaGlobe />
            <a href="https://andy-williams-portfolio.netlify.app/">Website</a>
          </li>
          <li>
            <FaGithub />
            <a href="https://github.com/andycwilliams">GitHub</a>
          </li>
          <li>
            <FaLinkedin />
            <a href="https://www.linkedin.com/in/andrewcharleswilliams/">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
