// components/ArtworkCardDetail.js
import useSWR from "swr";
import { Card } from "react-bootstrap";
import Error from "next/error";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

  if (error) return <Error statusCode={404} />;

  if (!data) return null;

  return (<>
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || 'N/A'} <br />
          <strong>Classification:</strong> {data.classification || 'N/A'} <br />
          <strong>Medium:</strong> {data.medium || 'N/A'}
        </Card.Text>
        <br />
        <br />
        <Card.Text>
          <strong>Artist:</strong> {data.artistDisplayName || 'N/A'}{' '}
          {data.artistDisplayName && data.artistWikidata_URL && (
            <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
          )}
        <br />
        <strong>Credit Line:</strong> {data.creditLine || 'N/A'} <br />
        <strong>Dimensions:</strong> {data.dimensions || 'N/A'}
        </Card.Text>
      </Card.Body>
    </Card>
  </>);
};