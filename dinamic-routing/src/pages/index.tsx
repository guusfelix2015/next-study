import path from 'path';
import fs from 'fs/promises';
import { GetStaticProps } from 'next';
import { starInterface } from './test/[something]';
import Link from 'next/link';

async function getData() {
  const filePath = path.join(
    process.cwd(),
    'backendData',
    'some-backend-data.json'
  );
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData.toString());
  return data;
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getData();

  return {
    props: {
      data: data.stars,
    },
    revalidate: 30,
  };
};

export default function Home({ data }: { data: starInterface[] }) {
  return (
    <>
      {data.map(item => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <Link href={`/test/${item.id}`}>Navegue</Link>
        </div>
      ))}
    </>
  );
}
