import Button from "@/modules/common/components/Button";
import Typography from "@/modules/common/components/Typography";
import styles from "./AboutMe.module.scss";
import { KEY_DESIGNATION, KEY_SECTION_IDS } from "@/config/keys";
import getDifferenceBetweenDates from "@/utils/getDifferenceBetweenDates";

export default function AboutMe(props: React.HTMLAttributes<HTMLDivElement>) {
  const startDateTime = new Date("2017-09-01T00:00:00.000Z");
  const endDateTime = new Date();
  const diff = getDifferenceBetweenDates(startDateTime, endDateTime);

  return (
    <section className={styles.root} {...props}>
      <Typography variant="h2" className={styles.heading}>
        About Me
      </Typography>
      <Typography>
        I am an experienced {KEY_DESIGNATION} with over {diff} years of industry experience. I've
        worked with various companies to improve my skills in building websites and applications. I
        specialize in using modern tools and frameworks like React, Node.js, Redux, Flutter, Vue.js,
        Next.js, Nuxt.js, Express.js, Material UI, SASS, Tailwind CSS and Stylus.
      </Typography>

      <Typography>
        Currently, I am part of the team at Multipyr where we are building a web3 protocol that
        empowers people to grow their money. My passion for coding and working with microcontrollers
        during my studies in Electrical & Electronics Engineering led me to explore the world of
        software engineering, and I have been committed to staying at the forefront of industry
        developments ever since.
      </Typography>

      <Typography>
        My career goal is to build applications that truly understand and solve users' pain points.
        I aspire to be a part of a team that creates innovative, user-centric products that make a
        meaningful impact in people's lives. I am dedicated to continually expanding my knowledge
        and expertise in frontend development, and am excited to collaborate with like-minded
        individuals and teams to create transformative products that push the boundaries of what's
        possible.
      </Typography>

      <Button
        className={styles.button}
        url={{
          hash: `#${KEY_SECTION_IDS.PROJECTS}`,
        }}
      >
        Recent Projects
      </Button>
    </section>
  );
}
