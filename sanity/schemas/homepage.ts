import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Hero Highlight Text',
      type: 'string',
      description: 'Text that appears in gradient/accent color',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'string',
      description: 'e.g., "#1 Rated SEO Agency in Texas"',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'suffix', type: 'string', title: 'Suffix (optional)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Services Section Title',
      type: 'string',
    }),
    defineField({
      name: 'servicesSubtitle',
      title: 'Services Section Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'whyUsTitle',
      title: 'Why Us Section Title',
      type: 'string',
    }),
    defineField({
      name: 'whyUsSubtitle',
      title: 'Why Us Section Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'whyUsItems',
      title: 'Why Us Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'processTitle',
      title: 'Process Section Title',
      type: 'string',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', type: 'string', title: 'Step Number' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Section Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Content',
      };
    },
  },
});
