import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Apis Digitech',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 2,
      description: 'Used for SEO meta description',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'twitter', type: 'url', title: 'Twitter' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer About Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
    }),
    defineField({
      name: 'googleVerification',
      title: 'Google Verification Code',
      type: 'string',
    }),
    defineField({
      name: 'analyticsId',
      title: 'Google Analytics ID',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
