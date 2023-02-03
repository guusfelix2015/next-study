import { GetServerSideProps } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface starInterface {
  id: string;
  name: string;
  description: string;
  link: string;
}

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const itemId = params?.something;
  const data = await getData();
  const foundItem = data.stars.find(
    (item: starInterface) => item.id === itemId
  );

  if (!foundItem) {
    return {
      props: { hasError: true },
    };
  }

  console.log('opa');

  return {
    props: {
      specificStarData: foundItem,
    },
  };
};

function projectPage(props: {
  specificStarData: starInterface;
  hasError: boolean;
}) {
  const router = useRouter();

  if (props.hasError) {
    return <h1>Error - please try another parameter</h1>;
  }

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{props.specificStarData.name}</h1>
      <p>{props.specificStarData.description}</p>
      <a href={props.specificStarData.link}>More Information here (link)</a>
      <Link href='/'>Voltar</Link>
    </div>
  );
}

export default projectPage;
