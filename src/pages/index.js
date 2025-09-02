
import SchoolRegistrationForm from "./SchoolRegistrationForm";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={`flex flex-col p-5  w-full gradient-background`}>
        <div class="gradient-shape shape-1"></div>
        <div class="gradient-shape shape-2"></div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </div>
      <div className="content">
        <h1>A better Future For Your Kids</h1>
        <p>
          A centralized digital paltform to manage schools admissions with ease
          - from discovery to enrollment
        </p>

        <Link href="/SchoolsPage">
          <div className="button-container">
            <button className="btn btn-primary">
              <i className="fas fa-rocket"></i> Get Started
            </button>
          </div>
        </Link>
        <div className="features">
          <Link href="/SchoolRegistrationForm">
            <div className="feature">
              <h3>
                <i className="fas fa-palette"></i> Register School
              </h3>
              <p>Add your school on this platform</p>
            </div>
          </Link>

          <Link href="/SchoolsPage">
            <div className="feature">
              <h3>
                <i className="fas fa-palette"></i> Explore Schools
              </h3>
              <p>Find the best school for your child</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
