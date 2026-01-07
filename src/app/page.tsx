import {
  Hero,
  ScrollSpy,
  MigraineTypes,
  Quiz,
  ClinicalCases,
  Experts,
  Webinars,
  Library,
  Documents,
} from "@/components";
import styles from "./page.module.css";

const sectionIds = [
  'hero',
  'migraine-types',
  'quiz',
  'clinical-cases',
  'experts',
  'webinars',
  'library',
  'documents',
];

export default function Home() {
  return (
    <div className={styles.page}>
      <ScrollSpy sectionIds={sectionIds} offset={-100} />
      <Hero />
      <MigraineTypes />
      <Quiz />
      <ClinicalCases />
      <Experts />
      <Webinars />
      <Library />
      <Documents />
    </div>
  );
}
