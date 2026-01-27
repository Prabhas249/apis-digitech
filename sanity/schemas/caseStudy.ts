import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'e.g., "E-commerce / Retail"',
    }),
    defineField({
      name: 'preview',
      title: 'Preview Text',
      type: 'text',
      rows: 3,
      description: 'Short description for listing page',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'metric',
      title: 'Main Metric',
      type: 'string',
      description: 'e.g., "340%"',
    }),
    defineField({
      name: 'metricLabel',
      title: 'Metric Label',
      type: 'string',
      description: 'e.g., "Traffic Increase"',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      description: 'e.g., "8 months"',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', type: 'string', title: 'Metric' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'industry',
      media: 'featuredImage',
    },
  },
});
