import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../lib/access'

/**
 * One row per piece of public work: papers, systems, and projects.
 * `sourceId` keeps re-syncs from the CV repository idempotent.
 */
export const Work: CollectionConfig = {
  slug: 'work',
  labels: { singular: 'Work item', plural: 'Work' },
  admin: {
    useAsTitle: 'title',
    group: 'Portfolio',
    defaultColumns: ['title', 'kind', 'year', 'order'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'sourceId',
      type: 'text',
      index: true,
      unique: true,
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'project',
      options: [
        { label: 'Publication', value: 'publication' },
        { label: 'System', value: 'system' },
        { label: 'Research', value: 'research' },
        { label: 'Project', value: 'project' },
      ],
    },
    {
      name: 'venue',
      type: 'text',
    },
    {
      name: 'year',
      type: 'text',
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'link',
      type: 'text',
      admin: { description: 'Canonical URL. Leave empty for no link.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
