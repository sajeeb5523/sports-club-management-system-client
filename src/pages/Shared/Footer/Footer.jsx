import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content p-10">
      <aside>
        <Logo></Logo>
        <p className="font-bold">
          SPORTS CLUB MANAGEMENT SYSTEM
          <br />
          Providing reliable tech since 2020
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
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