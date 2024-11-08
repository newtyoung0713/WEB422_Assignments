import useSWR from "swr";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

  function previousPage() {
    if (page > 1) setPage(page - 1);
  }

  function nextPage() {
    if (page < artworkList.length) setPage(page + 1);
  }

  useEffect(() => {
    if (data) {
      let results = [];
      for (let i = 0; i < data.objectIDs?.length; i += PER_PAGE) {
        const chunk = data.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    } else {
      setArtworkList([]);
    }
  }, [data]);
  
  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null;

  return (<>
    <Row className="gy-4">
      {artworkList.length > 0 ? (
        artworkList[page - 1].map((currentObjectID) => (
          <Col lg={3} key={currentObjectID}>
            <ArtworkCard objectID={currentObjectID} />
          </Col>
        ))
      ) : (
        <Card>
          <h4 className="mt-3">Nothing here</h4>
          <p>Try searching for something else.</p>
        </Card>
      )}
    </Row>
    {artworkList.length > 0 && (
      <Row>
        <Col>
          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </Col>
      </Row>
    )}
  </>);
}
