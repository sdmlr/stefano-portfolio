import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../../../client";
import "./ProjectDetail.scss";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomed, setZoomed] = useState(false);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const query = `*[_type == "projects" && slug.current == "${slug}"]`;
    client.fetch(query).then((data) => {
      setProject(data[0]);
    });
  }, [slug]);

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div className="app__project-detail">
      <section
        className="app__project-header"
        style={{ background: project.themeColor }}
      >
        <p className="project-category">{project.category}</p>
        <h1 className="project-title">{project.title}</h1>
        <p className="project-intro">{project.intro}</p>
      </section>

      {/* <img
        src={urlFor(project.primaryImage).url()}
        alt={project.title}
        className="project-image"
      /> */}
      <section className="app__project-details">
        {project.details.map((detail, index) => (
          <div
            key={index}
            className={`project-section ${
              index % 2 === 0 ? "bg-light" : "bg-dark"
            }`}
          >
            <div className="app__project-section-info">
              <h4>{detail.title}</h4>
              <h3>{detail.title}</h3>
              <p>{detail.content}</p>
            </div>
            {detail.image && (
              <img
                src={urlFor(detail.image).url()}
                alt={detail.title}
                className="detail-image"
              />
            )}
          </div>
        ))}
      </section>

      {/* {project.tags && project.tags.length > 0 && (
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )} */}

      <div
        className="project-links"
        style={{ "--theme-color": project.themeColor }}
      >
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            Live Project
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repo
          </a>
        )}
        {project.githubLink2 && (
          <a
            href={project.githubLink2}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Backend
          </a>
        )}
      </div>

      <div className="project-gallery">
        <h3>Gallery</h3>
        <div className="gallery-images">
          {project.gallery.map((image, index) => (
            <img
              key={index}
              src={urlFor(image).url()}
              alt={`Gallery Image ${index + 1}`}
              onClick={() => openModal(urlFor(image).url())} //open modal on click
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              className="zoom-container"
              onClick={() => setZoomed(!zoomed)} //toggle zoom
            >
              <img
                src={selectedImage}
                alt="Expanded View"
                className={zoomed ? "zoomed" : ""}
              />
            </div>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
