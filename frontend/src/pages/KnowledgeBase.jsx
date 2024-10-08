import React from 'react';
import './Knowledgebase.css'; // Import the CSS for styling

// Reusable Section Component for Knowledge Base
const Section = ({ title, children }) => {
  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      <div className="section-content">{children}</div>
    </div>
  );
};

// Sidebar Section for Popular Posts and Treatments
const SidebarSection = ({ title, items }) => {
  return (
    <div className="sidebar-section">
      <h3 className="sidebar-title">{title}</h3>
      <ul className="sidebar-list">
        {items.map((item, index) => (
          <li key={index} className="sidebar-item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Main KnowledgeBase Component
const KnowledgeBase = () => {
  return (
    <div className="knowledgebase-container">
      {/* Main content area */}
      <div className="main-content">
        <h1 className="page-title">What is Hijama (Cupping Therapy)?</h1>

        <Section title="Introduction to Hijama (Cupping Therapy)">
          <p>
            Welcome to <strong>[Your Clinic Name]</strong>, where we specialize in providing Hijama (Cupping Therapy)—an ancient healing practice with roots in both Islamic tradition and modern medical science. Hijama is a natural, holistic treatment that involves placing cups on the skin to create suction. This process stimulates blood flow, removes toxins, and alleviates a wide range of health conditions.
          </p>
          <p>
            Whether you are seeking relief from chronic pain, migraines, or simply looking to boost your immune system, Hijama is a proven therapeutic method with centuries of success. At <strong>[Your Clinic Name]</strong>, our certified practitioners are committed to offering you the best care using Hijama to enhance your overall health and wellness.
          </p>
        </Section>

        <Section title="Book Your Hijama Appointment Now">
          <p>
            Ready to experience the benefits of Hijama therapy? Whether you're new to Hijama or a regular, we offer personalized treatment plans tailored to your specific health needs. Our professional team is here to guide you through every step of the process.
          </p>
          <button className="book-now-button">Book Now</button>
        </Section>

        <Section title="Download Our Free Hijama Information Guides">
          <p>
            Curious to learn more about Hijama and how it can benefit you? We’ve prepared free downloadable guides that offer in-depth information on what to expect during your session, how to prepare, and post-care tips to maximize your healing process.
          </p>
          <ul className="pdf-download-list">
            <li><a href="">Hijama Preparation Guide [Download PDF]</a></li>
            <li><a href="">Post-Hijama Care Tips [Download PDF]</a></li>
            <li><a href="">Scientific Benefits of Hijama [Download PDF]</a></li>
          </ul>
        </Section>

        <Section title="Watch Our Hijama Demonstration and Informative Videos">
          <p>
            Our video library offers a closer look at how Hijama works and the experiences of our clients. These educational and informative videos provide a firsthand understanding of the Hijama process, helping you feel more comfortable and informed before your appointment.
          </p>
          <ul className="video-list">
            <li><a href="">How Hijama Works [Watch Video]</a></li>
            <li><a href="">Health Benefits of Hijama Therapy [Watch Video]</a></li>
          </ul>
        </Section>

        <Section title="Scientific and Islamic Foundations of Hijama">
          <p>
            Hijama (Cupping Therapy) is not only recommended in Islamic teachings but is also backed by modern scientific research. The combination of traditional wisdom and scientific validation makes Hijama one of the most trusted therapeutic methods available today.
          </p>
          <ul className="reference-list">
            <li><strong>Islamic Reference:</strong> The Prophet Muhammad (PBUH) said, "Indeed, the best of remedies you have is Hijama." (Sahih Al-Bukhari)</li>
            <li><strong>Scientific Study:</strong> "Cupping therapy has been shown to increase blood circulation, reduce pain, and improve the body's natural healing process." - <em>Journal of Complementary and Alternative Medicine, 2021</em>.</li>
            <li><strong>Islamic Reference:</strong> The Prophet (PBUH) mentioned, "Whoever performs Hijama on the 17th, 19th, or 21st of the lunar month, it will be a cure for every disease." (Sunan Abu Dawood)</li>
            <li><strong>Medical Journal:</strong> "Wet cupping significantly reduces musculoskeletal pain, inflammation, and swelling." - <em>Journal of Pain Research, 2020</em>.</li>
          </ul>
        </Section>

        <Section title="The Benefits of Hijama (Cupping Therapy)">
          <p>
            Hijama offers an extensive range of health benefits. Whether you are dealing with chronic pain, seeking detoxification, or looking to enhance your overall health, Hijama provides a natural, effective solution.
          </p>
          <ul className="benefits-list">
            <li><strong>Pain Relief:</strong> Effective for back pain, neck pain, joint pain, and migraines.</li>
            <li><strong>Detoxification:</strong> Removes toxins and waste from the body, promoting better organ function.</li>
            <li><strong>Improved Blood Circulation:</strong> Stimulates the flow of blood, oxygen, and nutrients throughout the body.</li>
            <li><strong>Boosting Immune System:</strong> Strengthens the body’s natural defenses, helping to prevent illness.</li>
            <li><strong>Stress and Anxiety Relief:</strong> Reduces tension and promotes mental well-being.</li>
            <li><strong>Skin Health:</strong> Helps treat acne, eczema, and other skin conditions.</li>
            <li><strong>Muscle Tension Reduction:</strong> Relaxes tight muscles and improves flexibility.</li>
            <li><strong>Anti-Aging Benefits:</strong> Promotes skin rejuvenation and reduces signs of aging.</li>
          </ul>
        </Section>

        <Section title="Hijama for Various Health Conditions">
          <p>
            At <strong>[Your Clinic Name]</strong>, we provide specialized Hijama treatments for a variety of medical conditions. Our experienced practitioners customize each session to address the specific needs of each client, ensuring effective and targeted healing.
          </p>
          <ul className="conditions-list">
            <li>Chronic Back and Neck Pain</li>
            <li>Arthritis and Joint Pain</li>
            <li>Migraines and Tension Headaches</li>
            <li>Hypertension (High Blood Pressure)</li>
            <li>Digestive Issues (Bloating, Indigestion)</li>
            <li>Menstrual Pain and PMS</li>
            <li>Anxiety, Depression, and Mental Fatigue</li>
            <li>Respiratory Conditions (Asthma, Bronchitis)</li>
            <li>Muscle and Joint Injuries</li>
          </ul>
        </Section>

        <Section title="Track Your Health Progress with Hijama">
          <p>
            At <strong>[Your Clinic Name]</strong>, we believe that the true value of Hijama lies in its ability to support long-term health improvements. To help you stay on top of your wellness journey, we offer a <strong>Health Progress Monitoring Tool</strong>, where you can track your symptoms and health metrics before and after each Hijama session.
          </p>
          <p>
            This section allows clients to track changes in their health conditions, such as pain levels, energy, sleep quality, and more, providing real data on their improvements over time. Not only does this help you see how effective Hijama has been, but it also offers an interactive way to take charge of your health.
          </p>
          <ul className="health-tracker-list">
            <li><strong>Before Your Session:</strong> Log your current health status, noting areas of pain, discomfort, or other issues you want to address.</li>
            <li><strong>Track Changes:</strong> After each session, return to the tool to record improvements or changes in your condition. This might include reduced pain, improved mobility, or an increase in energy.</li>
            <li><strong>Monitor Your Wellness Journey:</strong> Over time, this health log will show patterns of improvement, making it easier to see how Hijama has benefited your overall health and well-being.</li>
          </ul>
          <button className="track-progress-button">Start Tracking Now!</button>
        </Section>

        {/* Modern Health Insights Section */}
        <Section title="Modern Health Insights for Hijama">
          <p>
            Stay up-to-date with the latest health insights and trends related to Hijama therapy. We continuously research and compile modern studies and innovations in the field of cupping therapy, so you always have access to current information.
          </p>
          <p>
            <strong>Featured Insights:</strong>
          </p>
          <ul className="insights-list">
            <li><a href="">Hijama and Immune Function: New Findings [Read More]</a></li>
            <li><a href="">How Cupping Therapy Can Aid in Stress Management [Read More]</a></li>
            <li><a href="">The Role of Hijama in Modern Sports Recovery [Read More]</a></li>
          </ul>
        </Section>
      </div>

      {/* Sidebar area with two separate sections */}
      <div className="sidebar">
        <SidebarSection 
          title="Popular Posts" 
          items={[
            'Non-surgical Lower Back and Neck Hernia', 
            'Injection Therapy', 
            'Treatment of Lower Back and Neck Hernia with Ozone', 
            'Lower Back and Neck Hernia Treatment with Laser', 
            'Nucleoplasty'
          ]}
        />
        
        <SidebarSection 
          title="Treatments" 
          items={[
            'Non-surgical Hernia Treatment', 
            'Pain Treatments', 
            'Cellular Treatments', 
            'Alternative Treatments'
          ]}
        />
      </div>
    </div>
  );
};

export default KnowledgeBase;