import { GetStaticProps, NextPage } from "next"
import { ReactNode ,useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap"


type ApiResponse = {
  name: string
  timestamp: Date
};

export const getStaticProps: GetStaticProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_APIURL
  if (!apiUrl) {
    throw new Error("A variável de ambiente NEXT_PUBLIC_APIURL não está definida");
  }
  const staticData = await fetch(`${apiUrl}/api/hello`).then(res => res.json())

  return {
    props: {
      staticData
    },
    revalidate: 10
  }
}


const Static: NextPage = (props: {
  children?: ReactNode
  staticData?: ApiResponse
}) => {
  const [clientSideData, setClientSideData] = useState<ApiResponse>()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const data = await fetch("/api/hello").then(res => res.json())
    setClientSideData(data)
  }

  return (
    <Container tag="main">
      <h1 className="my-5">
        Como funcionam as renderizações do Next.js
      </h1>

      <Row>
        <Col>
          <h3>
            Gerado no servidor:
          </h3>
          <h2>
            {props.staticData?.timestamp.toString()}
          </h2>
        </Col>

        <Col>
          <h3>
            Gerado no cliente:
          </h3>
          <h2>
            {clientSideData?.timestamp.toString()}
          </h2>
        </Col>
      </Row>
    </Container>
  )
}

export default Static