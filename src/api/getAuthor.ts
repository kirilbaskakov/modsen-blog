import authors from '@/constants/data/authors';

const getAuthor = (id: number) => {
  return authors.find(author => author.id == id);
};

export default getAuthor;
