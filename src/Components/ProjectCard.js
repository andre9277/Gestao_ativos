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

const ProjectCard = () => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
      </div>
      <div className="card-body">
        <h4 className="small font-weight-bold">
          Server Migration <span className="float-right">20%</span>
        </h4>
        <div className="progress mb-4">
          <div className="progress-bar bg-danger a2" role="progressbar"></div>
        </div>
        <h4 className="small font-weight-bold">
          Sales Tracking <span className="float-right">40%</span>
        </h4>
        <div className="progress mb-4">
          <div className="progress-bar bg-warning a3" role="progressbar"></div>
        </div>
        <h4 className="small font-weight-bold">
          Customer Database <span className="float-right">60%</span>
        </h4>
        <div className="progress mb-4">
          <div className="progress-bar a7" role="progressbar"></div>
        </div>
        <h4 className="small font-weight-bold">
          Payout Details <span className="float-right">80%</span>
        </h4>
        <div className="progress mb-4">
          <div className="progress-bar bg-info a4" role="progressbar"></div>
        </div>
        <h4 className="small font-weight-bold">
          Account Setup <span className="float-right">Complete!</span>
        </h4>
        <div className="progress">
          <div className="progress-bar bg-success a5" role="progressbar"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
