/**
 * Design System Demo Page
 * Showcases the modern design system inspired by Dr. Venkat's images
 */
export default function DesignSystem() {
  return (
    <div className="design-system-demo">
      <div className="demo-container">
        <h1 className="demo-title">🎨 Design System Demo</h1>
        <p className="demo-subtitle">Inspired by Dr. Venkat's provided images</p>

        {/* Color Palette */}
        <section className="demo-section">
          <h2>Color Palette</h2>
          <div className="color-grid">
            <div className="color-card">
              <div className="color-swatch primary-orange"></div>
              <span>Primary Orange</span>
            </div>
            <div className="color-card">
              <div className="color-swatch primary-green"></div>
              <span>Primary Green</span>
            </div>
            <div className="color-card">
              <div className="color-swatch primary-blue"></div>
              <span>Primary Blue</span>
            </div>
            <div className="color-card">
              <div className="color-swatch primary-olive"></div>
              <span>Primary Olive</span>
            </div>
            <div className="color-card">
              <div className="color-swatch sunset-purple"></div>
              <span>Sunset Purple</span>
            </div>
            <div className="color-card">
              <div className="color-swatch digital-cyan"></div>
              <span>Digital Cyan</span>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="demo-section">
          <h2>Buttons</h2>
          <div className="button-group">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-success">Success Button</button>
            <button className="btn-danger">Danger Button</button>
          </div>
        </section>

        {/* Cards */}
        <section className="demo-section">
          <h2>Cards</h2>
          <div className="card-grid">
            <div className="card">
              <h3>Education Provider</h3>
              <p>Manage assessments and issue digital credentials for your students.</p>
              <button className="btn-primary">Get Started</button>
            </div>
            <div className="card">
              <h3>HR Verifier</h3>
              <p>Verify candidate credentials and make informed hiring decisions.</p>
              <button className="btn-secondary">Verify Now</button>
            </div>
            <div className="card glow">
              <h3>Blockchain Records</h3>
              <p>View all issued credentials recorded on the blockchain.</p>
              <button className="btn-success">View Records</button>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="demo-section">
          <h2>Form Elements</h2>
          <div className="form-demo">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input type="text" className="form-input" placeholder="Enter username" />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <select className="form-input">
                <option>Education Provider</option>
                <option>HR Verifier</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-input" placeholder="Enter your message" rows="4"></textarea>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="demo-section">
          <h2>Badges</h2>
          <div className="badge-group">
            <span className="badge badge-success">Verified</span>
            <span className="badge badge-warning">Pending</span>
            <span className="badge badge-danger">Failed</span>
          </div>
        </section>

        {/* Stats */}
        <section className="demo-section">
          <h2>Statistics Cards</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">42</div>
              <div className="stat-label">Active Assessments</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1,234</div>
              <div className="stat-label">Issued Credentials</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">89%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </section>

        {/* Glow Effects */}
        <section className="demo-section">
          <h2>Glow Effects</h2>
          <div className="glow-demo">
            <div className="glow-card glow-orange">
              <h3>Orange Glow</h3>
              <p>Inspired by sunset colors</p>
            </div>
            <div className="glow-card glow-green">
              <h3>Green Glow</h3>
              <p>Digital network theme</p>
            </div>
            <div className="glow-card glow">
              <h3>Cyan Glow</h3>
              <p>Blockchain nodes</p>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .design-system-demo {
          min-height: 100vh;
          background: var(--digital-dark);
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .design-system-demo::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(46, 134, 171, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .demo-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .demo-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary-orange) 0%, var(--sunset-orange) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 16px;
        }

        .demo-subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.2rem;
          text-align: center;
          margin-bottom: 48px;
        }

        .demo-section {
          margin-bottom: 48px;
        }

        .demo-section h2 {
          color: white;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 24px;
          text-align: center;
        }

        .color-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
        }

        .color-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .color-swatch {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          margin: 0 auto 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .primary-orange { background: var(--primary-orange); }
        .primary-green { background: var(--primary-green); }
        .primary-blue { background: var(--primary-blue); }
        .primary-olive { background: var(--primary-olive); }
        .sunset-purple { background: var(--sunset-purple); }
        .digital-cyan { background: var(--digital-cyan); }

        .button-group {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .form-demo {
          max-width: 500px;
          margin: 0 auto;
        }

        .badge-group {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
        }

        .glow-demo {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .glow-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .glow-card:hover {
          transform: translateY(-8px);
        }

        .glow-card h3 {
          color: var(--gray-800);
          margin-bottom: 12px;
        }

        .glow-card p {
          color: var(--gray-600);
        }

        @media (max-width: 768px) {
          .demo-title {
            font-size: 2rem;
          }
          
          .button-group {
            flex-direction: column;
            align-items: center;
          }
          
          .color-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
