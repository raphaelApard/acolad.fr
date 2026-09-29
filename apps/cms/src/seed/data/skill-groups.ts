import type { SeedDoc } from '../types'

export const skillGroups: SeedDoc[] = [
  {
    shared: {
      order: 1,
      skills: ['TypeScript', 'React', 'Next.js', 'TanStack Query', 'Zustand', 'GraphQL'],
    },
    fr: {
      title: 'Front',
    },
    en: {
      title: 'Front',
    },
  },
  {
    shared: {
      order: 2,
      skills: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'PHP', 'Drupal', 'Symfony', 'REST API'],
    },
    fr: {
      title: 'Back',
    },
    en: {
      title: 'Back',
    },
  },
  {
    shared: {
      order: 3,
      skills: [
        'OpenAI',
        'Anthropic',
        'Google Gemini',
        'Mistral',
        'LangChain',
        'Llama',
        'AI Agents',
        'RAG',
        'MCP',
        'Prompt Engineering',
      ],
    },
    fr: {
      title: 'IA',
    },
    en: {
      title: 'AI',
    },
  },
  {
    shared: {
      order: 4,
      skills: [
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'Redis',
        'Elasticsearch',
        'n8n',
        'Docker',
        'GitHub Actions',
        'CI/CD',
      ],
    },
    fr: {
      title: 'Données & infra',
    },
    en: {
      title: 'Data & infra',
    },
  },
]
