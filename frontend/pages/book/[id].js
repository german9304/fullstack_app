import { useRouter } from 'next/router';

function Book() {
  const { query } = useRouter();
  return (
    <section className={`book book${query.id}`}>
      <h1>This is the book {query.id}</h1>
    </section>
  );
}

export default Book;
