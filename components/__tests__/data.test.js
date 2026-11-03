import { describe, expect, it } from 'vitest';
import websiteData from '../../data.js';

describe('websiteData', () => {
  it('provides complete portfolio metadata', () => {
    expect(websiteData.metaData.title.default).toBe('Alfaz Khan | Frontend Engineer | React & Typescript');
    expect(websiteData.metaData.description).toBeTruthy();
    expect(websiteData.metaData.openGraph.url).toBe(
      'https://www.theonlyalfaz.com',
    );
    expect(websiteData.metaData.metadataBase.toString()).toContain('theonlyalfaz.com');
  });

  it('includes projects with the information required by project views', () => {
    expect(websiteData.projects).toHaveLength(2);

    for (const project of websiteData.projects) {
      expect(project.title).toBeTruthy();
      expect(project.link).toMatch(/^https:\/\//);
      expect(project.repoLink).toMatch(/^https:\/\//);
      expect(project.skills.length).toBeGreaterThan(0);
      expect(project.techStack.length).toBeGreaterThan(0);
      expect(project.features).toBeDefined();
      expect(project.challengesSolved).toBeDefined();
    }

    // Verify specific project details
    const subAnalyzer = websiteData.projects.find(p => p.title === 'Subreddit Analyzer');
    expect(subAnalyzer).toBeDefined();
    expect(subAnalyzer.techStack).toContain('React.js');
    expect(subAnalyzer.techStack).toContain('Python 3.11');

    const subs2Learn = websiteData.projects.find(p => p.title === '2Subs2Learn');
    expect(subs2Learn).toBeDefined();
    expect(subs2Learn.downloadLinks.chrome).toBeTruthy();
    expect(subs2Learn.downloadLinks.firefox).toBeTruthy();
  });

  it('provides valid education records', () => {
    expect(websiteData.educationData.length).toBeGreaterThan(0);

    for (const record of websiteData.educationData) {
      expect(record.id).toEqual(expect.any(Number));
      expect(record.title).toBeTruthy();
      expect(record.period).toMatch(/^\d{4} - \d{4}$/);
      expect(record.type).toBeTruthy();
      expect(record.location).toBeTruthy();
    }

    // Verify specific education records
    const currentEducation = websiteData.educationData.find(r => r.title === 'MBA: Business Intelligence & Data Science');
    expect(currentEducation).toBeDefined();
    expect(currentEducation.period).toBe('2025 - 2026');
    expect(currentEducation.type).toBe('Education');

    const firstWorkExperience = websiteData.educationData.find(r => r.title === 'System Engineer');
    expect(firstWorkExperience).toBeDefined();
    expect(firstWorkExperience.type).toBe('Work Experince');
  });

  it('builds skills with the requested theme color', () => {
    const skills = websiteData.getSkillsData('#123456');

    expect(skills.core.length).toBeGreaterThan(0);
    expect(skills.secondary.length).toBeGreaterThan(0);
    expect(skills.core.every((skill) => skill.name && skill.icon)).toBe(true);
    expect(skills.secondary.every((skill) => skill.name && skill.icon)).toBe(true);
    
    // Verify that the requested color is applied to Next.js skill
    const nextJsSkill = skills.core.find(skill => skill.name === 'Next.js');
    expect(nextJsSkill).toBeDefined();
    expect(nextJsSkill.color).toBe('#123456');
  });

  it('includes sidebar data with profile and social information', () => {
    expect(websiteData.sidebarData.profileImg).toBeTruthy();
    expect(websiteData.sidebarData.name).toBe('Alfaz');
    expect(websiteData.sidebarData.title).toBeTruthy();
    expect(websiteData.sidebarData.socials.length).toBeGreaterThan(0);

    const linkedin = websiteData.sidebarData.socials.find(s => s.id === 'linkedin');
    expect(linkedin).toBeDefined();
    expect(linkedin.link).toContain('linkedin.com/in/alfaz-khan/');

    const github = websiteData.sidebarData.socials.find(s => s.id === 'github');
    expect(github).toBeDefined();
    expect(github.link).toContain('github.com/alfazkhan');
  });

  it('includes intro data with CV download links', () => {
    expect(websiteData.introData.headline).toBeTruthy();
    expect(websiteData.introData.cvLinks.english).toBeTruthy();
    expect(websiteData.introData.cvLinks.deutsch).toBeTruthy();
  });
});
