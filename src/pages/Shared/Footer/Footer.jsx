import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <footer className="footer justify-between px-10 md:px-29 mx-auto sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <aside>
        <Logo></Logo>
        <p>
          SPORTS CLUB MANAGEMENT SYSTEM
          <br />
          Providing reliable tech since 2020
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a href='' className="link link-hover">Home</a>
        <a href='/courts' className="link link-hover">Courts</a>
        <a href='/about-us' className="link link-hover">About Us</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-6">
          <a href='https://www.facebook.com/sajeeb.1711'>
            <FaFacebook size={30} />
          </a>
          <a href='https://github.com/sajeeb5523' target='_blank'>
            <FaGithub size={30} />
          </a>
          <a href='mailto:sajeebaljabed1@gmail.com'>
            <MdEmail size={30} />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;