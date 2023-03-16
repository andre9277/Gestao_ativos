/* The MIT License (MIT)

Copyright (c) 2013-2023 Start Bootstrap LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. 

You may obtain a copy of the license at:

      https://github.com/StartBootstrap/startbootstrap-sb-admin-2


All the changes made to enable the implementation of the desired development tools were made by André Ferreira.
*/
import React from "react";

const Message = () => {
  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="messagesDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-envelope fa-fw"></i>
        {/*  <!-- Counter - Messages --> */}
        <span className="badge badge-danger badge-counter">7</span>
      </a>
      {/*   <!-- Dropdown - Messages --> */}
      <div
        className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="messagesDropdown"
      >
        <h6 className="dropdown-header">Message Center</h6>
        <a className="dropdown-item d-flex align-items-center" href="#">
          <div className="dropdown-list-image mr-3">
            <img
              className="rounded-circle"
              src="img/undraw_profile_1.svg"
              alt="..."
            />
            <div className="status-indicator bg-success"></div>
          </div>
          <div className="font-weight-bold">
            <div className="text-truncate">
              Hi there! I am wondering if you can help me with a problem I've
              been having.
            </div>
            <div className="small text-gray-500">Emily Fowler · 58m</div>
          </div>
        </a>
        <a className="dropdown-item d-flex align-items-center" href="#">
          <div className="dropdown-list-image mr-3">
            <img
              className="rounded-circle"
              src="img/undraw_profile_2.svg"
              alt="..."
            />
            <div className="status-indicator"></div>
          </div>
          <div>
            <div className="text-truncate">
              I have the photos that you ordered last month, how would you like
              them sent to you?
            </div>
            <div className="small text-gray-500">Jae Chun · 1d</div>
          </div>
        </a>
        <a className="dropdown-item d-flex align-items-center" href="#">
          <div className="dropdown-list-image mr-3">
            <img
              className="rounded-circle"
              src="img/undraw_profile_3.svg"
              alt="..."
            />
            <div className="status-indicator bg-warning"></div>
          </div>
          <div>
            <div className="text-truncate">
              Last month's report looks great, I am very happy with the progress
              so far, keep up the good work!
            </div>
            <div className="small text-gray-500">Morgan Alvarez · 2d</div>
          </div>
        </a>
        <a className="dropdown-item d-flex align-items-center" href="#">
          <div className="dropdown-list-image mr-3">
            <img
              className="rounded-circle"
              src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
              alt="..."
            />
            <div className="status-indicator bg-success"></div>
          </div>
          <div>
            <div className="text-truncate">
              Am I a good boy? The reason I ask is because someone told me that
              people say this to all dogs, even if they aren't good...
            </div>
            <div className="small text-gray-500">Chicken the Dog · 2w</div>
          </div>
        </a>
        <a className="dropdown-item text-center small text-gray-500" href="#">
          Read More Messages
        </a>
      </div>
    </li>
  );
};

export default Message;
