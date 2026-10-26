import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../lib/access'

export const Experience: CollectionConfig = {
  slug: 'experience',
  labels: { singular: 'Experience entry', plural: 'Experience' },
  admin: {
    useAsTitle: 'role',
    group: 'Portfolio',
    defaultColumns: ['role', 'org', 'category', 'period'],
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
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'org',
      type: 'text',
      required: true,
    },
    {
      name: 'period',
      type: 'text',
      admin: { description: 'Human label shown on the site, e.g. “Jun 2026 - Present”.' },
    },
    {
      name: 'startDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'monthOnly' } },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'monthOnly' },
        description: 'Leave empty for a current role.',
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'work',
      options: [
        { label: 'Appointment', value: 'work' },
        { label: 'Research', value: 'research' },
        { label: 'Teaching & service', value: 'teaching' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'bullets',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
