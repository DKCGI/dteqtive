import * as React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';
import { Helmet } from 'react-helmet';
import Carousel from '../components/Carousel';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const WorkPageContainer = styled.div`
  width: 100%;
  padding: 0 100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 50px;
  h1 {
    text-align: center;
    color: #fff;
  }
  .caption {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin: auto;
    background-color: rgba(255, 255, 255, 0.9);
    color: #111;
    padding: 20px;
    p {
      padding: 20px;
    }
    @media screen and (max-width: 1000px) {
      padding: 10px;
    }
  }
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
  .tools {
    h3 {
      color: #fff;
      text-align: center;
      padding: 20px;
    }
    padding: 40px;
    grid-column: 1/-1;
    ul {
      list-style-type: none;
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      li {
        height: 100%;
      }
    }
  }
`;

const pageTemplate = ({ pageContext }: any) => {
  <Helmet>
    <meta charSet='utf-8' />
    <title>Sample Work</title>
  </Helmet>;

  return (
    <Layout>
      <h1>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString(pageContext.node.name).start();
          }}
        />
      </h1>
      <WorkPageContainer>
        {pageContext.node.images.length > 0 ? (
          <Carousel images={pageContext.node.images} />
        ) : (
          ''
        )}
        <div className='caption'>
          <p>{pageContext.node.caption}</p>
          <p>
            Visit Site:{' '}
            <a href={pageContext.node.url}>{pageContext.node.url}</a>
          </p>
        </div>
        <div className='tools'>
          <h3>Tools Used</h3>
          <ul>
            {pageContext.node.toolsUsed.map((tool: any) => {
              let imageData = getImage(tool.image.asset);
              if (imageData) {
                return (
                  <li>
                    <GatsbyImage
                      key={tool.id}
                      alt={tool.id}
                      image={imageData}
                      title={tool.name}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </WorkPageContainer>
    </Layout>
  );
};
export default pageTemplate;
