import { SiteImage } from "@/components/autoelevate/site-image";
import { SELECTED_WORK } from "@/data/selected-work";

const padIndex = (index: number): string => String(index + 1).padStart(2, "0");

export const WorkSection = (): React.ReactElement => (
  <section id="work" className="section work-section">
    <div className="work-intro">
      <p className="work-intro-index reveal">03</p>
      <div className="work-intro-copy">
        <p className="section-eyebrow reveal">Selected Work</p>
        <h2 className="work-intro-title reveal">
          Sites we built
          <br />
          for <em>studios that convert.</em>
        </h2>
      </div>
    </div>

    <div className="work-index">
      {SELECTED_WORK.map((project, index) => {
        const isFlipped = index % 2 === 1;

        return (
          <article
            className={`work-piece${isFlipped ? " work-piece--flip" : ""}`}
            key={project.name}
          >
            <div className="work-copy">
              <p className="work-num" aria-hidden="true">
                {padIndex(index)}
              </p>
              <h3 className="work-name">{project.name}</h3>
              <p className="work-desc">{project.description}</p>
              <a
                className="work-preview"
                href={project.previewUrl}
                target={project.previewUrl.startsWith("http") ? "_blank" : undefined}
                rel={
                  project.previewUrl.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                Preview
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <a
              className="work-stage"
              href={project.previewUrl}
              target={project.previewUrl.startsWith("http") ? "_blank" : undefined}
              rel={
                project.previewUrl.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label={`Preview ${project.name}`}
            >
              <div className="work-chrome">
                <span className="work-chrome-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="work-chrome-url">{project.domain}</span>
              </div>
              <div className="work-shot">
                <SiteImage
                  src={project.screenshot}
                  alt={project.screenshotAlt}
                  sizes="(max-width: 640px) 100vw, 70vw"
                  objectFit="contain"
                  className="object-contain"
                />
              </div>
            </a>
          </article>
        );
      })}
    </div>
  </section>
);
