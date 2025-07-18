import { motion } from "framer-motion";
import { Bell, HeartPulse, UserCheck, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen bg-base-100 p-6 flex flex-col items-center justify-between">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mt-12"
      >
        <h1 className="text-5xl font-extrabold text-primary mb-4">
          Serenaid
        </h1>
        <motion.h2
          className="text-xl md:text-2xl text-accent font-medium mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="relative inline-block">
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-1 bg-warning"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2 }}
            />
            Alarms That <span className="font-bold text-warning">Care</span>, Not Scare
          </span>
        </motion.h2>
        <p className="text-base-content mb-8">
          A smart hospital alarm management system that ensures rapid, safe, and precise communication between patients, nurses, and doctors.
        </p>
        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn btn-primary"
          >
          <Link to="/signup">
            Get Started
          </Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn btn-outline btn-accent"
          >
           <Link to="/about">
            Learn More
          </Link>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card border border-primary p-6 shadow-md bg-base-200"
        >
          <Bell className="h-8 w-8 text-primary mb-2" />
          <h3 className="font-bold text-lg mb-1">Real-Time Alarms</h3>
          <p className="text-sm text-base-content">
            Trigger and track alerts instantly from patients to nurses and doctors.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card border border-info p-6 shadow-md bg-base-200"
        >
          <HeartPulse className="h-8 w-8 text-info mb-2" />
          <h3 className="font-bold text-lg mb-1">Care-Focused Design</h3>
          <p className="text-sm text-base-content">
            Designed to reduce alarm fatigue while prioritizing patient safety.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card border border-success p-6 shadow-md bg-base-200"
        >
          <ShieldAlert className="h-8 w-8 text-success mb-2" />
          <h3 className="font-bold text-lg mb-1">Secure Role Access</h3>
          <p className="text-sm text-base-content">
            Nurses, Doctors, and Admins access dedicated dashboards with live updates.
          </p>
        </motion.div>
      </div>
      

      <footer className="mt-24 mb-4 text-sm text-center text-base-content/70">
        © 2025 Serenade | Made with ❤️ for smarter care.
      </footer>
    </div>
  );
};

export default Home;
