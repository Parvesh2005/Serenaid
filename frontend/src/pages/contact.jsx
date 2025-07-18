import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-base-100 p-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mt-12 mb-12"
      >
        <h1 className="text-5xl font-extrabold text-primary mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-base-content">
          We're here to help and answer any question you might have. We look forward to hearing from you.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-10 max-w-6xl w-full">
        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card bg-base-200 shadow-xl p-8 w-full md:w-1/2 border border-primary/20"
        >
          <h2 className="text-2xl font-bold mb-6 text-primary">Send us a Message</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label htmlFor="name" className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="message" className="label">
                <span className="label-text">Your Message</span>
              </label>
              <textarea
                id="message"
                className="textarea textarea-bordered w-full"
                rows={4}
                placeholder="Your message..."
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn btn-primary w-full"
            >
              Submit
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full md:w-1/2 space-y-8"
        >
            <div className="card bg-base-200 shadow-xl p-6 border border-accent/20">
                <h2 className="text-2xl font-bold mb-4 text-accent">Contact Information</h2>
                <div className="space-y-4 text-base-content">
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-accent" />
                        <span>contact@serenaid.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-accent" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-accent mt-1" />
                        <span>
                        123 Health Tech Avenue, <br />
                        Innovation City, MedState 54321
                        </span>
                    </div>
                </div>
            </div>
             <div className="card bg-base-200 shadow-xl p-6 border border-info/20">
                <h2 className="text-2xl font-bold mb-4 text-info">Office Hours</h2>
                <div className="space-y-2 text-base-content">
                    <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                    <p><strong>Saturday:</strong> 10:00 AM - 3:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                </div>
            </div>
        </motion.div>
      </div>

      <footer className="mt-24 mb-4 text-sm text-center text-base-content/70">
        © 2025 Serenade | Made with ❤️ for smarter care.
      </footer>
    </div>
  );
};

export default ContactPage;