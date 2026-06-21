import type { ProjectDetailData } from "@/lib/project-detail";

export function ProjectDetail({ data }: { data: ProjectDetailData }) {
  return (
    <section className="fido-project-detail" aria-labelledby="project-title">
      <div className="fido-project-copy">
        <h1 id="project-title">{data.title}</h1>
        {data.subtitle ? <h2>{data.subtitle}</h2> : null}
        {data.summary ? <p className="fido-project-summary">{data.summary}</p> : null}

        <div className="fido-project-sections">
          {data.sections.map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items.length ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
            </section>
          ))}
        </div>

        {data.quote ? (
          <figure className="fido-project-quote">
            <blockquote>{data.quote}</blockquote>
            {data.quoteAuthor ? <figcaption>{data.quoteAuthor}</figcaption> : null}
          </figure>
        ) : null}
      </div>

      <div className="fido-project-gallery oxy-gallery" aria-label="Fotografie projektu">
        {data.gallery.map((image, index) => (
          <a className="oxy-gallery-item" href={image} key={`${image}-${index}`} aria-label={`Otvoriť fotografiu ${index + 1}`}>
            <img src={image} alt="" loading={index === 0 ? "eager" : "lazy"} />
          </a>
        ))}
      </div>
    </section>
  );
}
