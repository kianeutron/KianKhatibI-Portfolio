export const contactInfo = {
  email: 'kiankhatibi770@gmail.com',
  github: 'https://github.com/kianeutron',
  linkedin: 'https://www.linkedin.com/in/kian-khatibi-604164338',
};

export const contactLinks = [
  {
    icon: '📧',
    label: 'Email',
    href: `mailto:${contactInfo.email}`,
    display: contactInfo.email,
  },
  {
    icon: '💻',
    label: 'GitHub',
    href: contactInfo.github,
    display: 'GitHub',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    href: contactInfo.linkedin,
    display: 'LinkedIn',
  },
];

