import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../lib/access'

export const Education: CollectionConfig = {
  slug: 'education',
  labels: { singular: 'Education entry', plural: 'Education' },
  admin: {
    useAsTitle: 'school',
    group: 'Portfolio',
    defaultColumns: ['school', 'degree', 'period'],
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
      name: 'school',
      type: 'text',
      required: true,
    },
    {
      name: 'degree',
      type: 'text',
    },
    {
      name: 'period',
      type: 'text',
    },
    {
      name: 'startDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'monthOnly' } },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'monthOnly' } },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'honors',
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
