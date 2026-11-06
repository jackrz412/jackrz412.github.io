// The one place for my profile links. The contact page and the header read from here, so a
// changed URL only needs changing once. Project repo links stay with their projects.

export interface Profile {
  label: string;
  url: string;
  handle: string; // the short name shown beside the link
  description: string;
  priority: number; // 1 is the main way to reach me; lower numbers list first
}

export const linkedin: Profile = {
  label: 'LinkedIn',
  url: 'https://www.linkedin.com/in/jack-roberts-412-pgh',
  handle: 'in/jack-roberts-412-pgh',
  description: 'Best way to reach me.',
  priority: 1,
};

export const github: Profile = {
  label: 'GitHub',
  url: 'https://github.com/jackrz412',
  handle: 'jackrz412',
  description: 'Code and projects',
  priority: 2,
};

export const profiles = [linkedin, github].sort((a, b) => a.priority - b.priority);

// The rel value for profile links, which open in a new tab. noopener and noreferrer keep the new
// tab from reaching back to this page or seeing where the visitor came from; "me" says the
// profile is mine.
export const profileRel = 'noopener noreferrer me';

// A site path. The contact page shows the link only once this file exists in public/.
export const resumePath = '/resume.pdf';

// No public link to share, so this one is a note rather than a profile.
export const clearanceJobsNote = 'You can also find me on ClearanceJobs under the same name.';
