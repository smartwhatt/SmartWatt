import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../lib/access'

/**
 * Everything that is not a list: identity, hero copy, about prose, links.
 * A global keeps the editor to one screen for the content most likely to change.
 */
export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'shortName', type: 'text', required: true },
              ],
            },
            {
              name: 'role',
              type: 'text',
              required: true,
              admin: { description: 'One line under the name, e.g. “Researcher, engineer & teacher”.' },
            },
            {
              type: 'row',
              fields: [
                { name: 'location', type: 'text' },
                { name: 'timezone', type: 'text' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email' },
                {
                  name: 'available',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { description: 'Shows the availability dot in the header.' },
                },
              ],
            },
            {
              name: 'portraitUrl',
              type: 'text',
              admin: { description: 'Square portrait, at least 800px. e.g. /img/profile.png' },
            },
            {
              name: 'links',
              type: 'array',
              labels: { singular: 'Link', plural: 'Links' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
                { name: 'kind', type: 'text', admin: { description: 'Optional key: github, linkedin, email, cv.' } },
              ],
            },
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'headline',
              type: 'textarea',
              required: true,
              admin: {
                description:
                  'Shown at display size. Use line breaks for rhythm. Square brackets mark the emphasised phrase, e.g. “Building [thoughtful] systems”.',
              },
            },
            { name: 'intro', type: 'textarea' },
            { name: 'currently', type: 'textarea' },
            { name: 'openTo', type: 'textarea' },
            { name: 'stack', type: 'textarea' },
          ],
        },
        {
          label: 'About',
          fields: [
            { name: 'profile', type: 'textarea' },
            {
              name: 'interests',
              type: 'array',
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'skills',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
            {
              name: 'honors',
              type: 'array',
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'metrics',
              type: 'array',
              labels: { singular: 'Metric', plural: 'Metrics' },
              admin: { description: 'Verified figures from the CV, shown as evidence in some layouts.' },
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
                { name: 'note', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'contactIntro', type: 'textarea' },
            {
              name: 'contactMethods',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
                { name: 'url', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'CV',
          fields: [
            {
              name: 'cvRepoUrl',
              type: 'text',
              defaultValue: 'https://github.com/smartwhatt/cv-resume',
            },
            {
              type: 'row',
              fields: [
                { name: 'resumeUrl', type: 'text', admin: { description: 'English one-page resume PDF.' } },
                { name: 'cvUrl', type: 'text', admin: { description: 'English full CV PDF.' } },
              ],
            },
            {
              name: 'lastSyncedAt',
              type: 'date',
              admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
            { name: 'ogImage', type: 'text' },
          ],
        },
      ],
    },
  ],
}
