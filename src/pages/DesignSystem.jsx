import styles from "./DesignSystem.module.scss";

/**
 * Design System Demo Page
 * Showcases the modern design system inspired by Dr. Venkat's images
 */
export default function DesignSystem() {
  return (
    <div className={styles.designSystemDemo}>
      <div className={styles.demoContainer}>
        <h1 className={styles.demoTitle}>🎨 Design System Demo</h1>
        <p className={styles.demoSubtitle}>Inspired by Dr. Venkat's provided images</p>

        {/* Color Palette */}
        <section className={styles.demoSection}>
          <h2>Color Palette</h2>
          <div className={styles.colorGrid}>
            <div className={styles.colorCard}>
              <div className={`${styles.colorSwatch} ${styles.primaryOrange}`}></div>
              <span>Primary Orange</span>
            </div>
            <div className={styles.colorCard}>
              <div className={`${styles.colorSwatch} ${styles.primaryGreen}`}></div>
              <span>Primary Green</span>
            </div>
            <div className={styles.colorCard}>
              <div className={`${styles.colorSwatch} ${styles.primaryBlue}`}></div>
              <span>Primary Blue</span>
            </div>
            <div className={styles.colorCard}>
              <div className={`${styles.colorSwatch} ${styles.primaryOlive}`}></div>
              <span>Primary Olive</span>
            </div>
            <div className={styles.colorCard}>
              <div className={`${styles.colorSwatch} ${styles.sunsetPurple}`}></div>
              <span>Sunset Purple</span>
            </div>
            <div className={styles.colorCard}>
              <div className={`${styles.colorSwatch} ${styles.digitalCyan}`}></div>
              <span>Digital Cyan</span>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className={styles.demoSection}>
          <h2>Buttons</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.buttonDemo}>Primary Button</button>
            <button className={`${styles.buttonDemo} ${styles.secondary}`}>Secondary Button</button>
            <button className={`${styles.buttonDemo} ${styles.success}`}>Success Button</button>
            <button className={`${styles.buttonDemo} ${styles.danger}`}>Danger Button</button>
          </div>
        </section>

        {/* Typography */}
        <section className={styles.demoSection}>
          <h2>Typography</h2>
          <div className={styles.typographyDemo}>
            <div className={`${styles.typographyItem} ${styles.heading1}`}>
              <div className={styles.label}>Heading 1</div>
              <div className={styles.sample}>The Quick Brown Fox</div>
            </div>
            <div className={`${styles.typographyItem} ${styles.heading2}`}>
              <div className={styles.label}>Heading 2</div>
              <div className={styles.sample}>The Quick Brown Fox</div>
            </div>
            <div className={`${styles.typographyItem} ${styles.heading3}`}>
              <div className={styles.label}>Heading 3</div>
              <div className={styles.sample}>The Quick Brown Fox</div>
            </div>
            <div className={`${styles.typographyItem} ${styles.body}`}>
              <div className={styles.label}>Body Text</div>
              <div className={styles.sample}>The quick brown fox jumps over the lazy dog. This is sample body text to demonstrate the typography.</div>
            </div>
            <div className={`${styles.typographyItem} ${styles.caption}`}>
              <div className={styles.label}>Caption</div>
              <div className={styles.sample}>Small caption text for additional information</div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className={styles.demoSection}>
          <h2>Cards</h2>
          <div className={styles.cardGrid}>
            <div className={styles.cardDemo}>
              <h3>Feature Card</h3>
              <p>This is a sample card component with glass effect and hover animations.</p>
              <button className={styles.cardButton}>Learn More</button>
            </div>
            <div className={styles.cardDemo}>
              <h3>Info Card</h3>
              <p>Cards provide a clean way to organize content with consistent styling.</p>
              <button className={styles.cardButton}>View Details</button>
            </div>
            <div className={styles.cardDemo}>
              <h3>Action Card</h3>
              <p>Interactive cards with buttons and hover effects for better UX.</p>
              <button className={styles.cardButton}>Take Action</button>
            </div>
          </div>
        </section>

        {/* Forms */}
        <section className={styles.demoSection}>
          <h2>Form Elements</h2>
          <form className={styles.formDemo}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className={styles.formGroup}>
              <label>Category</label>
              <select>
                <option>Select a category</option>
                <option>Education</option>
                <option>Technology</option>
                <option>Business</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea placeholder="Enter your message" rows="4"></textarea>
            </div>
            <button type="submit" className={styles.formButton}>Submit Form</button>
          </form>
        </section>

        {/* Badges */}
        <section className={styles.demoSection}>
          <h2>Badges</h2>
          <div className={styles.badgeGroup}>
            <span className={`${styles.badgeDemo} ${styles.success}`}>Success</span>
            <span className={`${styles.badgeDemo} ${styles.warning}`}>Warning</span>
            <span className={`${styles.badgeDemo} ${styles.error}`}>Error</span>
            <span className={`${styles.badgeDemo} ${styles.info}`}>Info</span>
          </div>
        </section>

        {/* Grid System */}
        <section className={styles.demoSection}>
          <h2>Grid System</h2>
          <div className={styles.gridDemo}>
            <div className={styles.gridItem}>1</div>
            <div className={styles.gridItem}>2</div>
            <div className={styles.gridItem}>3</div>
            <div className={styles.gridItem}>4</div>
          </div>
        </section>

        {/* Spacing */}
        <section className={styles.demoSection}>
          <h2>Spacing Scale</h2>
          <div className={styles.spacingDemo}>
            <div className={`${styles.spacingItem} ${styles.spacing1}`}>
              <div className={styles.label}>spacing-1</div>
              <div className={styles.spacingVisual}></div>
              <span>4px</span>
            </div>
            <div className={`${styles.spacingItem} ${styles.spacing2}`}>
              <div className={styles.label}>spacing-2</div>
              <div className={styles.spacingVisual}></div>
              <span>8px</span>
            </div>
            <div className={`${styles.spacingItem} ${styles.spacing4}`}>
              <div className={styles.label}>spacing-4</div>
              <div className={styles.spacingVisual}></div>
              <span>16px</span>
            </div>
            <div className={`${styles.spacingItem} ${styles.spacing6}`}>
              <div className={styles.label}>spacing-6</div>
              <div className={styles.spacingVisual}></div>
              <span>24px</span>
            </div>
            <div className={`${styles.spacingItem} ${styles.spacing8}`}>
              <div className={styles.label}>spacing-8</div>
              <div className={styles.spacingVisual}></div>
              <span>32px</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}