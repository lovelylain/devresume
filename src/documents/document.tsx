import { Resume } from "../types";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import { BasicsSection } from "./sections/basics-section";
import { VStack } from "./stack";
import {
  AwardsSection,
  CertificatesSection,
  EducationSection,
  ProjectsSection,
  PublicationsSection,
  SkillsSection,
  VolunteerSection,
  WorkSection,
} from "./sections";
import { Theme, createTheme } from "./theme";
import { Bar } from "./bar";
import { useMemo } from "react";

type Props = {
  resume: Resume;
};

function createStyles(theme: Theme) {
  return StyleSheet.create({
    page: {
      backgroundColor: "white",
      fontFamily: "Roboto",
      paddingVertical: theme.space[10],
      paddingHorizontal: theme.space[12],
      fontSize: theme.fontSize[0],
      lineHeight: theme.lineHeight,
      color: theme.color.text,
    },
  });
}

export function ResumeDocument({ resume }: Props) {
  const {
    basics,
    work,
    skills,
    projects,
    education,
    awards,
    certificates,
    publications,
    volunteer,
    meta,
  } = resume;

  const accentColor = meta && meta.accentColor;
  const baseFontSize = meta && meta.baseFontSize;
  const renderOrder = meta && meta.renderOrder || [];

  const theme = useMemo(
    () => createTheme(accentColor, baseFontSize),
    [accentColor, baseFontSize]
  );
  const styles = createStyles(theme);

  const parts: Record<string, JSX.Element> = {};
  basics && (parts["basics"] = <BasicsSection key="basics" theme={theme} basics={basics} />);
  skills && Array.isArray(skills) && (parts["skills"] =
    <SkillsSection key="skills" theme={theme} skills={skills} />
  );
  work && Array.isArray(work) && (parts["work"] =
    <WorkSection key="work" theme={theme} work={work} />
  );
  projects && Array.isArray(projects) && (parts["projects"] =
    <ProjectsSection key="projects" theme={theme} projects={projects} />
  );
  education && Array.isArray(education) && (parts["education"] =
    <EducationSection key="education" theme={theme} education={education} />
  );
  awards && Array.isArray(awards) && (parts["awards"] =
    <AwardsSection key="awards" theme={theme} awards={awards} />
  );
  certificates && Array.isArray(certificates) && (parts["certificates"] =
    <CertificatesSection key="certificates" theme={theme} certificates={certificates} />
  );
  publications && Array.isArray(publications) && (parts["publications"] =
    <PublicationsSection key="publications" theme={theme} publications={publications} />
  );
  volunteer && Array.isArray(volunteer) && (parts["volunteer"] =
    <VolunteerSection key="volunteer" theme={theme} volunteer={volunteer} />
  );
  const rows = Object.entries(parts).map(([k,v],i) => {
      const pos = renderOrder.indexOf(k);
      return {i: pos >= 0 ? pos : renderOrder.length + i, v}
    }).sort((a,b) => a.i-b.i).map(o => o.v);

  return (
    <Document>
      <Page style={styles.page} size="A4">
        <Bar theme={theme} />
        <VStack gap={theme.space[10]}>
          {rows}
        </VStack>
      </Page>
    </Document>
  );
}
