"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clientData from "@/data/clientData";
import { Mail, MapPin, Send, MessageCircle, Phone } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setStatus("loading");

  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  } catch (error) {
    console.error("Failed to send message", error);
    setStatus("error");
  }
};

  return (
    <section id="contact" className="py-16 px-6 bg-gradient-to-b from-fuchsia-50/20 to-transparent dark:from-fuchsia-900/10 dark:to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-base font-medium text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2">Get In Touch</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300">Let's Work Together</h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all duration-300 group">
          
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50 pointer-events-none transition-colors duration-300"></div>
          
          <div className="flex-1 space-y-10 relative z-10">
            <div>
              <h4 className="text-3xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">Contact Information</h4>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-sm mt-4 transition-colors duration-300">
                Feel free to reach out to me for any project or collaboration. I'm always open to discussing new opportunities.
              </p>
            </div>

            <div className="space-y-8">
              {clientData.contact.email && (
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-blue-100 dark:border-gray-600 transition-colors duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-500 dark:text-gray-400 mb-1">Email Me At</p>
                    <a href={`mailto:${clientData.contact.email}`} className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {clientData.contact.email}
                    </a>
                  </div>
                </div>
              )}
              
              {clientData.contact.phone && (
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-blue-100 dark:border-gray-600 transition-colors duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-500 dark:text-gray-400 mb-1">Call Me At</p>
                    <a href={`tel:${clientData.contact.phone}`} className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {clientData.contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {clientData.contact.location && (
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-blue-100 dark:border-gray-600 transition-colors duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-500 dark:text-gray-400 mb-1">Location</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{clientData.contact.location}</p>
                  </div>
                </div>
              )}

            </div>
          </div>

          <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-inner border border-gray-100 dark:border-gray-800 relative z-10 transition-colors duration-300">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Send Me A Message</h4>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-300" htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-xl border-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 transition-all shadow-sm font-medium`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-300" htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-xl border-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 transition-all shadow-sm font-medium`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-300" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-5 py-4 rounded-xl border-2 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 transition-all resize-none shadow-sm font-medium`}
                  placeholder="How can I help you?"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1 font-bold">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === "success" 
                    ? "bg-green-500 text-white hover:bg-green-600" 
                    : status === "error"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02]"
                }`}
              >
                {status === "loading" ? (
                  "Sending..."
                ) : status === "success" ? (
                  "Message Sent Successfully"
                ) : status === "error" ? (
                  "Failed to Send. Try Again"
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
