import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContex";
import { Loader } from "lucide-react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { session, signInUser } = UserAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInUser(email, password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 bg-black flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl bg-base-200">
        <form onSubmit={handleSignIn} className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary">Log In</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-4">
            <button type="submit" disabled={loading} className="btn btn-primary flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>

          {error && <p className="text-red-600 text-center pt-4">{error}</p>}

          <p className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-secondary">
              Sign Up!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;