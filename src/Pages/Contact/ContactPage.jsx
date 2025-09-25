import React, { useState } from 'react';
import { supabase } from '../../Features/Auth/Supabase/supabase-client';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', consent: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Please enter a valid email.';
    if (!form.message.trim()) return 'Please write a message.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
        consent: form.consent,
        created_at: new Date().toISOString(),
      };

      const { error: supaError } = await supabase.from('contacts').insert([payload]);

      if (supaError) throw supaError;

      setSuccess('Thanks! Your message has been sent. We will contact you soon.');
      setForm({ name: '', email: '', phone: '', message: '', consent: true });
    } catch (err) {
      console.error(err);
      setError('Something went wrong while sending your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  py-10 sm:py-16">
      <div className="max-w-8xl ">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* Left - Info + Image */}
          <div className="space-y-6">
            {/* <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1529692236671-f1d7f6d374b7?q=80&w=1600&auto=format&fit=crop"
                alt="restaurant interior"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div> */}

            <div className=" rounded-xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold">Get in touch</h2>
              <p className="mt-2 text-gray-600 leading-relaxed text-sm sm:text-base">
                Have a question, feedback or want to reserve a big table? Send us a message and our team will reply as soon as possible.
              </p>

              <div className="mt-6 grid gap-4 text-sm sm:text-base">
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="font-semibold">Address:</span>
                  <span className="text-gray-600">123 Food Street, Cairo, Egypt</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="font-semibold">Phone:</span>
                  <span className="text-gray-600">+20 123 456 789</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="font-semibold">Email:</span>
                  <span className="text-gray-600">info@masterchef.com</span>
                </div>
              </div>

              <div className="mt-4">
                <iframe
  title="map"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.545091285351!2d31.233569175565845!3d30.04442087490701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c4d0f9b56b%3A0x2f78db95a86d6a2f!2sTahrir%20Square!5e0!3m2!1sen!2seg!4v1726668739251!5m2!1sen!2seg"
  className="w-full h-48 md:h-64 lg:h-80 rounded-xl border-0"
  loading="lazy"
  allowFullScreen=""
  referrerPolicy="no-referrer-when-downgrade"
/>

              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className=" rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold">Contact Us</h3>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Fill the form below and we'll get back to you shortly.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {error && <div className="text-red-600 font-medium">{error}</div>}
              {success && <div className="text-green-600 font-medium">{success}</div>}

              <div>
                <label className="block text-sm font-medium">Full name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border-gray-200 shadow-sm p-2 sm:p-3 focus:ring-2 focus:ring-amber-300"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border-gray-200 shadow-sm p-2 sm:p-3 focus:ring-2 focus:ring-amber-300"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone (optional)</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border-gray-200 shadow-sm p-2 sm:p-3 focus:ring-2 focus:ring-amber-300"
                    placeholder="+20 1xx xxx xxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="mt-1 w-full rounded-lg border-gray-200 shadow-sm p-2 sm:p-3 focus:ring-2 focus:ring-amber-300"
                  placeholder="Write your message..."
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label className="text-xs sm:text-sm text-gray-600">I agree to be contacted about my inquiry.</label>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer inline-flex items-center justify-center rounded-lg px-5 py-2 sm:px-6 sm:py-3 bg-amber-500 text-white font-semibold shadow hover:opacity-95 disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ name: '', email: '', phone: '', message: '', consent: true })}
                  className="text-xs sm:text-sm text-gray-600 underline"
                >
                  Reset
                </button>
              </div>

              <p className="text-xs text-gray-400">
                We respect your privacy. Your info will be stored securely and used only to respond to your request.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
