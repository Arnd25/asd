import slugify from 'slugify';
//для перевода в url
export const generateSlug = (title: string): string => {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'":@]/g,
  });
};
