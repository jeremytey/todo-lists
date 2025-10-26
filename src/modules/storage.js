import Project from './project.js';

export function saveProjects(projects) {
  // Convert projects to plain objects (JSON.stringify handles it)
  localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadProjects() {
  const data = localStorage.getItem('projects');
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    // Reconstruct Project instances with methods
    return parsed.map(p => Project.fromJSON(p));
  } catch (e) {
    console.error('Failed to parse projects from storage', e);
    return [];
  }
}
