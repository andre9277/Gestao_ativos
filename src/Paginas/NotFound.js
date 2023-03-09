import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Componentes/Footer";

const NotFound = () => {
  return (
    <div id="layoutError">
      <div id="layoutError_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <div class="text-center mt-4">
                  <img
                    class="mb-4 img-error"
                    src="img/error-404-monochrome.svg"
                  />
                  <p class="lead">
                    This requested URL was not found on this server.
                  </p>
                  <Link to="/dashboard">
                    <i class="fas fa-arrow-left me-1"></i>
                    Return to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default NotFound;
