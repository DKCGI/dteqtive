import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import Typewriter from 'typewriter-effect';
import WorkSample from '../components/WorkSample';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImageDataArgs } from 'gatsby-source-sanity';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import ToolBelt from '../components/ToolBelt';

const StyledSection = styled.section<{ columns: number }>`
  margin-top: 20px;
  padding-bottom: 20px;
  :last-child {
    padding-bottom: 50px;
  }
  .sectionContent {
    padding: 20px;
    display: grid;
    align-items: start;
    justify-items: center;
    overflow: hidden;
    max-height: ${(props) => {
      return props.columns * 1000 + 'px';
    }};
    max-width: 100vw;
    transition: max-height 1s;
    grid-template-columns: repeat(
      ${(props) => {
        return props.columns < 5 ? props.columns : Math.ceil(props.columns / 2);
      }},
      1fr
    );
    column-gap: 20px;
    row-gap: 20px;
    @media screen and (max-width: 1000px) {
      column-gap: 10px;
      row-gap: 10px;
      grid-template-columns: repeat(
        ${(props) => {
          if (props.columns === 2) {
            return 2;
          } else if (props.columns === 1) {
            return 1;
          } else {
            return 2;
          }
        }},
        1fr
      );
    }
    &.hide {
      max-height: 0;
      padding: 0;
      transition: max-height 0s;
    }
    .logos {
      grid-column: 1/-1;
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      column-gap: 20px;
      row-gap: 20px;
      @media screen and (max-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
      }
      h3 {
        grid-column: 1/-1;
        text-align: center;
        color: #fff;
        padding: 20px;
        font-size: 1.5rem;
      }
    }
  }
  button {
    width: 100%;
    h2 {
      text-align: center;
      color: #012;
      padding: 20px;
      background-color: #fff;
      font-size: 2rem;
      ::after {
        content: ' ▼';
      }
      :hover {
        transition: text-shadow 0.2s;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
      }
    }
  }
  h3 {
    font-size: 1.5rem;
  }
`;

interface Edge {
  node: {
    name: string;
    url?: string;
    image?: {
      asset: GatsbyImageDataArgs;
    };
    youtube?: {
      url: string;
    };
    caption?: string;
    category: string;
  };
}
interface Node {
  name: string;
  image?: {
    asset: GatsbyImageDataArgs;
  };
  caption?: string;
}

const Work = () => {
  <Helmet>
    <meta charSet='utf-8' />
    <title>Sample Work</title>
  </Helmet>;

  const [sectionState, setSection] = useState('web development');
  const toggleSection = (section: string) => {
    if (sectionState === section) {
      setSection('');
    } else {
      setSection(section);
    }
  };

  const { allSanityWorkSample, allSanityLogo } = useStaticQuery(
    graphql`
      query WorkSampleQuery {
        allSanityWorkSample {
          edges {
            node {
              name
              slug {
                current
              }
              url
              image {
                asset {
                  gatsbyImageData(width: 800)
                }
              }
              youtube {
                url
              }
              caption
              category
            }
          }
        }
        allSanityLogo {
          nodes {
            name
            image {
              asset {
                gatsbyImageData(width: 400)
              }
            }
          }
        }
      }
    `
  );

  let webDev = allSanityWorkSample.edges.filter((edge: Edge) => {
    return edge.node.category === 'web development';
  });
  let programming = allSanityWorkSample.edges.filter((edge: Edge) => {
    return edge.node.category === 'programming';
  });
  let graphicdesign = allSanityWorkSample.edges.filter((edge: Edge) => {
    return edge.node.category === 'graphic design';
  });
  let animation = allSanityWorkSample.edges.filter((edge: Edge) => {
    return edge.node.category === 'animation';
  });
  let imageData: any;

  const modalRef1 = useRef<any>();
  let currentModal = modalRef1.current;
  useEffect(() => {
    currentModal = modalRef1.current;
  }, [currentModal]);

  return (
    <Layout>
      <h1>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('Sample Work').start();
          }}
        />
      </h1>
      {webDev.length > 0 ? (
        <StyledSection columns={webDev.length}>
          <button
            onClick={() => {
              toggleSection('web development');
            }}
          >
            <h2>Web Development</h2>
          </button>

          <div
            className={`sectionContent ${
              sectionState != 'web development' ? 'hide' : ''
            }`}
          >
            {webDev.map((edge: Edge) => {
              return (
                <WorkSample
                  columns={webDev.length}
                  key={edge.node.name}
                  data={edge.node}
                />
              );
            })}
          </div>
        </StyledSection>
      ) : (
        ''
      )}
      {programming.length > 0 ? (
        <StyledSection columns={programming.length}>
          <button
            onClick={() => {
              toggleSection('programming');
            }}
          >
            <h2>Other Programming</h2>
          </button>
          <div
            className={`sectionContent ${
              sectionState != 'programming' ? 'hide' : ''
            }`}
          >
            {programming.map((edge: Edge) => {
              return (
                <WorkSample
                  columns={programming.length}
                  key={edge.node.name}
                  data={edge.node}
                />
              );
            })}
          </div>
        </StyledSection>
      ) : (
        ''
      )}

      <StyledSection columns={graphicdesign.length}>
        <button
          onClick={() => {
            toggleSection('graphic design');
          }}
        >
          <h2>Graphic Design</h2>
        </button>
        <div
          className={`sectionContent ${
            sectionState != 'graphic design' ? 'hide' : ''
          }`}
        >
          <div className='logos'>
            <h3>Logos</h3>
            {allSanityLogo.nodes.map((node: any) => {
              if (node.image) {
                imageData = getImage(node.image.asset);
              }
              return (
                <GatsbyImage
                  key={node.name}
                  alt={node.name}
                  image={imageData}
                />
              );
            })}
          </div>
          {graphicdesign.length > 0 ? (
            <>
              {graphicdesign.map((edge: Edge) => {
                return (
                  <WorkSample
                    columns={graphicdesign.length}
                    key={edge.node.name}
                    data={edge.node}
                  />
                );
              })}
            </>
          ) : (
            ''
          )}
        </div>
      </StyledSection>

      {animation.length > 0 ? (
        <StyledSection columns={animation.length}>
          <button
            onClick={() => {
              toggleSection('animation');
            }}
          >
            <h2>Animation</h2>
          </button>

          <div
            className={`sectionContent ${
              sectionState != 'animation' ? 'hide' : ''
            }`}
          >
            {animation.map((edge: Edge) => {
              return (
                <WorkSample
                  columns={animation.length}
                  key={edge.node.name}
                  data={edge.node}
                />
              );
            })}
          </div>
        </StyledSection>
      ) : (
        ''
      )}
      <ToolBelt />
    </Layout>
  );
};

export default Work;
