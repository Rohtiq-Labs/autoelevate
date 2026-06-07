import { SEO_FAQ_ITEMS } from "@/data/seo-faq";

export const FaqSection = (): React.ReactElement => (
  <section id="faq" className="section faq-section" aria-labelledby="faq-heading">
    <div className="faq-inner">
      <div className="section-header">
        <p className="section-eyebrow reveal">FAQ</p>
        <h2 id="faq-heading" className="section-title reveal">
          Answers for Luxury
          <br />
          <em>Automotive</em> Studio Owners
        </h2>
        <p className="faq-intro reveal">
          Common questions about our{" "}
          <a href="#services">luxury automotive digital services</a>, timelines, SEO
          results, and how to{" "}
          <a href="#contact">start your project with AutoElevate</a>.
        </p>
      </div>
      <div className="faq-list reveal">
        {SEO_FAQ_ITEMS.map((item) => (
          <details className="faq-item" key={item.question}>
            <summary>
              <h3 className="faq-question">{item.question}</h3>
            </summary>
            <p className="faq-answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
