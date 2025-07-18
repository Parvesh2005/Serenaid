import { HeartPulse, BellRing, Users, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-primary mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Serenaid
        </motion.h1>

        <motion.p
          className="text-center text-lg text-secondary mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <em>“Alarms That Care, Not Scare”</em>
        </motion.p>

        <motion.div
          className="text-lg text-grey-100 leading-relaxed space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            In hospitals, every beep counts — but not every beep should overwhelm. 
            Serenade is our solution to alarm fatigue — a smart, streamlined alert management system 
            that improves responsiveness while reducing cognitive load for clinical staff.
          </p>

          <p>
            Inspired by the countless lives impacted by late responses or ignored alerts, 
            Serenade brings clarity, urgency, and prioritization to hospital alarms. 
            We believe technology can harmonize with healthcare — to empower nurses, support doctors, and protect patients.
          </p>

          <p>
            Serenade is more than a notification tool — it's a bridge of care, designed with empathy. 
            Our system ensures that alarms are not just heard, but truly understood and acted upon, 
            when and where it matters most.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <FeatureCard icon={<HeartPulse size={36} />} title="Empathetic Design" desc="Built with user-centered principles to reduce noise, confusion, and stress." />
          <FeatureCard icon={<BellRing size={36} />} title="Smart Alerts" desc="Not all alarms are equal. We prioritize critical calls and escalate intelligently." />
          <FeatureCard icon={<Users size={36} />} title="Role-Based Dashboards" desc="Customized experiences for patients, nurses, doctors, and admins." />
          <FeatureCard icon={<ShieldCheck size={36} />} title="Reliable & Secure" desc="Data integrity and fast response pipelines, compliant with medical safety norms." />
        </div>
      </div>
      <footer className="mt-24 mb-4 text-sm text-center text-base-content/70">
        © 2025 Serenade | Made with ❤️ for smarter care.
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    className="card bg-base-200 p-6 shadow-md border border-primary/30 hover:shadow-lg transition-all"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-primary mb-3">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </motion.div>
);

export default About;
