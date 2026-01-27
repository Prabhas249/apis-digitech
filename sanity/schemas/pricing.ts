import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pricing',
  title: 'Pricing Plans',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'SEO', value: 'seo' },
          { title: 'AEO', value: 'aeo' },
          { title: 'GEO', value: 'geo' },
          { title: 'Local SEO', value: 'local' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "$749"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Billing Period',
      type: 'string',
      initialValue: '/month',
      options: {
        list: [
          { title: 'Per Month', value: '/month' },
          { title: 'Per Year', value: '/year' },
          { title: 'One Time', value: '' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'popular',
      title: 'Most Popular',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      category: 'category',
    },
    prepare({ title, subtitle, category }) {
      return {
        title: `${title} (${category?.toUpperCase()})`,
        subtitle: subtitle,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
