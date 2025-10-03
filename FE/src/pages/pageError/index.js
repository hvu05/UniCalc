import React from "react";
import { motion } from "framer-motion";
import "./NotFound404.css"; // import css file

export default function NotFound404() {
  return (
    <div className="notfound-container">
      <div className="notfound-wrapper">
        <div className="notfound-grid">
          {/* Left: Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="notfound-illustration"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="notfound-illustration-box"
            >
              <div className="notfound-illustration-glow" />
              <div className="notfound-illustration-card">
                <div className="notfound-illustration-inner">
                  <span>Lost in space</span>
                </div>
              </div>
              <div className="notfound-illustration-circle big" />
              <div className="notfound-illustration-circle small" />
            </motion.div>
          </motion.div>

          {/* Right: Copy + Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="notfound-content"
          >
            <div className="notfound-card">
              <p className="notfound-code">404</p>
              <h1 className="notfound-title">Oops! Page not found</h1>
              <p className="notfound-text">
                The page you’re looking for doesn’t exist or was moved. Let’s get you back on track.
              </p>

              <div className="notfound-actions">
                <a href="/" className="btn primary">Go Home</a>
                <button onClick={() => window.history.back()} className="btn secondary">Go Back</button>
                <a href="mailto:support@example.com?subject=Help%20with%20404" className="btn secondary">Contact Support</a>
              </div>

              <div className="notfound-search">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Try searching…"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const q = encodeURIComponent(e.currentTarget.value.trim());
                        if (q) window.location.href = `/search?q=${q}`;
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Try searching…"]');
                      const q = encodeURIComponent(input?.value?.trim() || "");
                      if (q) window.location.href = `/search?q=${q}`;
                    }}
                  >Search</button>
                </div>
                <p className="tip">Tip: Press <kbd>Enter</kbd> to search.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <div className="notfound-footer">
          <span>If you believe this is an error, please contact support.</span>
        </div>
      </div>
    </div>
  );
}

