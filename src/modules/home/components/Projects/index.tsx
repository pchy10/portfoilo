import { KEY_SKILLS } from "@/config/keys";
import Card from "@/modules/common/components/Card";
import Grid from "@/modules/common/components/Grid";
import { IProject, ISkill } from "@/types/projects";
import { useRouter } from "next/router";
import { createRef, useEffect, useMemo, useState } from "react";
import styles from "./Projects.module.scss";
import Typography from "@/modules/common/components/Typography";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import RECENT_PROJECTS from "@/config/recent-projects.json";

export const SECTION_ID_PROJECTS = "projects";

interface IProjectCardProps {
  isSelected?: boolean;
  onSelect?: (name: IProject) => void;
  project: IProject;
}

function ProjectCard({ project, onSelect, isSelected }: IProjectCardProps) {
  const description: string = useMemo(() => {
    return project.responsibilities.join(", ");
  }, [project]);

  return (
    <Grid item xs={12} sm={6} md={4} as="li" className={styles.grid}>
      <Card
        fullWidth
        fullHeight
        className={`${styles.item} ${isSelected ? styles.selected : ""}`}
        onClick={() => onSelect?.(project)}
      >
        <Typography variant="h4">{project.name}</Typography>
        <Typography>
          {description.length > 100 ? <>{description.substring(0, 100)}...</> : description}
        </Typography>
        <Typography variant="caption">{project.technologies.join(", ")}</Typography>
      </Card>
    </Grid>
  );
}

function ProjectList({
  projects,
  selectedProject,
  setSelectedProject,
}: {
  projects: IProject[];
  selectedProject?: IProject;
  setSelectedProject?: (project: IProject) => void;
}) {
  const emptyListMsgRef = createRef<HTMLLIElement>();
  const projectWithRefs = projects.map((project) => {
    return {
      ...project,
      ref: createRef<HTMLLIElement>(),
    };
  });

  return (
    <Grid container className={styles.list} as="ul">
      <TransitionGroup component={null} className="staggered-list">
        {projectWithRefs.length ? (
          projectWithRefs.map((project, i) => (
            <CSSTransition
              timeout={500}
              nodeRef={project.ref}
              key={project.name}
              classNames="staggered-item"
            >
              <ProjectCard
                project={project}
                onSelect={setSelectedProject}
                isSelected={selectedProject?.name === project.name}
              />
            </CSSTransition>
          ))
        ) : (
          <CSSTransition
            timeout={500}
            nodeRef={emptyListMsgRef}
            key="no-projects"
            classNames="staggered-item"
          >
            <Grid as="li" ref={emptyListMsgRef} item xs={12}>
              <Typography variant="h4">No project found!</Typography>
            </Grid>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Grid>
  );
}

export default function Projects(props: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const { skill } = router.query;
  const [selectedProject, setSelectedProject] = useState<IProject | undefined>(undefined);
  const selectedSkill: ISkill | undefined = useMemo(() => {
    if (skill) {
      return KEY_SKILLS.find((s) => s.toLowerCase() === skill.toString().toLowerCase());
    }
    return;
  }, [skill]);

  const projects: IProject[] = useMemo(() => {
    if (selectedSkill) {
      return RECENT_PROJECTS.filter((project) =>
        project.technologies
          .map((s) => s.toLowerCase())
          .includes(selectedSkill.toString().toLowerCase())
      );
    }

    return RECENT_PROJECTS;
  }, [selectedSkill]);

  useEffect(() => {
    // reset selectedProject when skill changes
    if (selectedSkill) {
      setSelectedProject(undefined);
    }
  }, [selectedSkill]);

  return (
    <section className={styles.root} {...props}>
      <Typography variant="h2">
        {!selectedSkill ? "Recent " : ""} Projects {selectedSkill ? `using ${selectedSkill}` : ""}
      </Typography>
      <ProjectList
        projects={projects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </section>
  );
}
